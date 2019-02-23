import React from 'react';

import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';


const PlaylistGrid = props => {
  const { playlists } = props;

  if (!playlists) {
    return(
      <LinearProgress />
    )
  }

  return (
    <div className="playlistGrid">
      <Grid container spacing={24}>
        {playlists.map(playlist => (
          <Grid item key={playlist.id} className="playlistGridTile" xs={12} sm={6} md={3}>
            <div className="playlistName">
              <h4>{playlist.name}</h4>
            </div>
            <img src={playlist.images[0].url} alt={playlist.name}/>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PlaylistGrid;