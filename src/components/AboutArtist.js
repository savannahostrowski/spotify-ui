import React, { Component, Fragment } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default class AboutArtist extends Component {

  render() {
    const { open, handleClose, artist } = this.props;

    return (
      <Fragment>
        <Dialog open={open} onClose={handleClose} aria-labelledby="About the Artist">
          <div>
            <DialogTitle>{artist.name}</DialogTitle>

            <DialogContent>
              <DialogContentText><b>Followers:</b> {artist.followers.total}</DialogContentText>
            </DialogContent>

            {artist.genres.length > 0 ?
              <div className="genres">
                {artist.genres.slice(0, 3).map((genre, idx) => {
                  return (
                    <Button key={idx} variant="contained" color="secondary" className="genreButton" size="small">
                      {genre}
                    </Button>
                  );
                })}
              </div> : null
            }

            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </div>
        </Dialog>
      </Fragment>
    );
  }
}