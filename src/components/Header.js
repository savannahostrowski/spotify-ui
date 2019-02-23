import React, { Component } from 'react';

class Header extends Component {

  render() {
    const { nowPlaying } = this.props;
    return (
      <div className="headerContainer">
        {nowPlaying ?
          <img src={nowPlaying.albumArt} alt={nowPlaying.name}
               style={{ width: '100%', height: '100%', filter: 'brightness(60%)' }}/> : null}
      </div>
    );
  }

}

export default Header;