import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

import ArtistGrid from './components/ArtistGrid';
import Header from './components/Header';
import LinearProgress from '@material-ui/core/LinearProgress';
import SearchBar from './components/Search';

import './App.css';

const spotifyApi = new SpotifyWebApi();

class App extends Component {
  state = {
    loggedIn: false,
    nowPlaying: { name: '', albumArt: '' },
    me: null,
    artists: null,
    filteredArtists: null,
  };

  componentDidMount() {
    const params = App.getHashParams();
    const token = params.access_token;

    if (token) {
      spotifyApi.setAccessToken(token);
    }

    this.interval = setInterval(() => this.getNowPlaying(), 5000);

    this.getNowPlaying();
    this.setState({ loggedIn: !!token });
    this.getMe();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { me } = this.state;
    if (!prevState.me && me) {
      this.getArtists(me.id);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  static getHashParams() {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  getArtists = id => {
    spotifyApi.getFollowedArtists(id)
      .then(response => {
        this.setState({ artists: response.artists.items, filteredArtists: response.artists.items });
      });
  };

  filterArtists = searchTerm => {
    const { artists } = this.state;
    const lowercaseSearchTerm = searchTerm.toLowerCase().trim();


    if (lowercaseSearchTerm.length === 0) {
      this.setState({ filteredArtists: artists });
    } else {
      const filteredArtists = artists.filter(artist => {
        const lowercaseName = artist.name.toLowerCase().trim();
        return lowercaseName.includes(lowercaseSearchTerm);
      });

      this.setState({ filteredArtists: filteredArtists });
    }
  };

  getMe() {
    spotifyApi.getMe()
      .then(response => {
        this.setState({
          me: response
        });
      });
  }

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState()
      .then(response => {
        if (response.item) {
          this.setState({
            nowPlaying: {
              name: response.item.name,
              albumArt: response.item.album.images[0].url,
              artist: response.item.artists[0].name,
            }
          });
        }
      });
  };

  render() {
    const { loggedIn, nowPlaying, me, artists, filteredArtists } = this.state;
    const params = App.getHashParams();
    const token = params.access_token;

    if (!loggedIn && !token) {
      window.location.assign('/login');
    }

    if(!me || !artists) {
      return( <LinearProgress/>)
    }

    return (
      <div className="App">
        <Header nowPlaying={nowPlaying} loggedIn={loggedIn} me={me} lastArtist={filteredArtists[0]}/>
        <div className="mainContainer">
          <div className="userInfo">
            {me ? <h1 className="username">{me.display_name}</h1> : null}
            {nowPlaying.name.length > 0 ?
              <p>Now Playing: {nowPlaying.name} by {nowPlaying.artist}</p> :
              <p>Not currently listening to music!</p>
            }
          </div>
          <SearchBar search={this.filterArtists}/>
          <ArtistGrid artists={filteredArtists}/>
        </div>
      </div>
    );
  }
}

export default App;
