import { Button, Typography, makeStyles } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import React from 'react';

const useStyles = makeStyles(theme => ({
  container: {
    width: '70%',
    height: 'auto',
    padding: theme.spacing(3),
    backgroundColor: fade('#ffffff', 0.8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 30
  }
}));

const WelcomeScreen = ({ onNext }) => {
  const classes = useStyles();
  
  return (
    <div className={classes.container}>
      <Typography variant="h1">Welcome to Yardzen.</Typography>
      <Typography variant="h5" align="center" gutterBottom>Let's get started!</Typography>
      <Button 
        variant="contained" 
        color="primary"
        onClick={onNext}
      >
        Next
      </Button>
    </div>
  );
};

export default WelcomeScreen;