import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import { Divider } from '@material-ui/core';

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
};

class SearchBar extends Component {
  state = {
    playlistSearchTerm: '',
  };

  updateSearchTerm = e => {
    this.setState({ playlistSearchTerm: e.target.value });
  };

  searchPlaylists = () => {
    const { playlistSearchTerm } = this.state;
    this.props.search(playlistSearchTerm);
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root} elevation={1}>
        <InputBase className={classes.input} placeholder="Search for a playlist" onChange={this.updateSearchTerm}/>
        <Divider/>
          <SearchIcon onClick={(e) => this.searchPlaylists(e)} className="searchIcon"/>
      </Paper>
    );
  }
}


SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchBar);