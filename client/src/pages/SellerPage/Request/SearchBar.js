import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 180,
    height: 43,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

const SearchBar = () => {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
    <IconButton type="submit" className={classes.iconButton} aria-label="search">
      <SearchIcon />
    </IconButton>
      <InputBase
        className={classes.input}
      />
    </Paper>
  );
}

export default SearchBar;