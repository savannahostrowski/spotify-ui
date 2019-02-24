import React, { Component } from 'react';

class Header extends Component {

  render() {
    const { nowPlaying, lastArtist } = this.props;
    return (
      <div className="headerContainer">
        {nowPlaying.albumArt.length > 0 ?
          <img src={nowPlaying.albumArt} alt={nowPlaying.name}/> :
          <img src={lastArtist.images[0].url} alt={lastArtist.name}/>}
      </div>
    );
  }

}

export default Header;