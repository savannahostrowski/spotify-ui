import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';

import AboutArtist from './AboutArtist';

class ArtistGrid extends Component {
  state = {
    open: false,
    selectedArtist: null,
  };

  openArtistDialog = artist => {
    this.setState({ open: true, selectedArtist: artist, });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { artists } = this.props;
    const { open, selectedArtist } = this.state;

    return (
      <div className="artistGrid">
        <Grid container spacing={24}>
          {artists.map(artist => (
            <Grid item key={artist.id} className="artistGridTile" xs={12} sm={6} md={3}
                  onClick={() => this.openArtistDialog(artist)}>
              <div className="artistName">
                <h4>{artist.name}</h4>
              </div>
              <img src={artist.images[0].url} alt={artist.name}/>
            </Grid>
          ))}
        </Grid>
        {open ?
          <AboutArtist
            open={open}
            handleClose={this.handleClose}
            artist={selectedArtist}
          /> : null
        }
      </div>
    );
  }
}


export default ArtistGrid;