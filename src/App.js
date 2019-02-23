import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

import Header from './components/Header';
import './App.css';
import SearchBar from './components/Search';
import PlaylistGrid from './components/PlaylistGrid';

const spotifyApi = new SpotifyWebApi();

class App extends Component {
  state = {
    loggedIn: false,
    nowPlaying: { name: '', albumArt: '' },
    me: null,
    playlists: null,
  };

  componentDidMount() {
    const token = this.getToken();
    if (token) {
      spotifyApi.setAccessToken(token);
    }

    this.setState({ loggedIn: !!token });
    this.getNowPlaying();
    this.getMe();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevState.me && this.state.me) {
      this.getPlaylists(this.state.me.id);
    }
  }

  getToken() {
    const params = App.getHashParams();
    return params.access_token;
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

  getPlaylists = id => {
    spotifyApi.getUserPlaylists(id)
      .then(response => {
        this.setState({ playlists: response.items });
      });
  };

  filterPlaylists = searchTerm => {
    const {playlists} = this.state;
    const filteredPlaylists = playlists.filter(playlist => {
      const lowercaseName = playlist.name.toLowerCase().trim();
      const lowercaseSearchTerm = searchTerm.toLowerCase().trim();
      return lowercaseName.includes(lowercaseSearchTerm);
    });
    this.setState({playlists: filteredPlaylists})
  };

  getMe() {
    spotifyApi.getMe()
      .then(response => {
        console.log(response);
        this.setState({
          me: response
        });
      });
  }

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState()
      .then(response => {
        this.setState({
          nowPlaying: {
            name: response.item.name,
            albumArt: response.item.album.images[0].url
          }
        });
      });
  };

  render() {
    const { loggedIn, nowPlaying, me, playlists } = this.state;
    const token = this.getToken();

    if (!loggedIn && !token) {
      window.location.assign('http://localhost:8888');
    }
    return (

      <div className="App">
        <Header nowPlaying={nowPlaying}
                loggedIn={loggedIn}
                me={me}
        />
        <div className="mainContainer">
          {me ? <h1 className="username">{me.display_name}</h1> : null}
          <SearchBar search={this.filterPlaylists}/>
          <PlaylistGrid playlists={playlists}/>
        </div>
      </div>
    );
  }
}

export default App;
