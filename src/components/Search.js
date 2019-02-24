import React, { Component } from 'react';

import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import { Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


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
    artistSearchTerm: '',
  };

  updateSearchTerm = e => {
    this.setState({ artistSearchTerm: e.target.value });
  };

  searchArtists = () => {
    const { artistSearchTerm } = this.state;
    this.props.search(artistSearchTerm);
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root} elevation={1}>
        <InputBase className={classes.input}
                   placeholder="Search for an artist"
                   onChange={this.updateSearchTerm}
                   onKeyPress={e => {
                     if (e.key === 'Enter') {
                       this.searchArtists(e);
                     }
                   }}
        />
        <Divider/>
        <SearchIcon onClick={e => this.searchArtists(e)}
                    className="searchIcon"/>
      </Paper>
    );
  }
}

export default withStyles(styles)(SearchBar);