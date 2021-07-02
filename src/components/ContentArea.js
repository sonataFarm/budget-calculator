import React from 'react';
import { makeStyles } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles(theme => ({
  container: props => ({
    width: props.width,
    height: 'auto',
    padding: theme.spacing(3),
    backgroundColor: fade('#ffffff', 0.8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 30,
    '& > *': {
      margin: theme.spacing(1),
    }
  })
}));

const ContentArea = (props) => {
  // A reusable, nicely-styled container for content.
  const classes = useStyles(props);
  return (
    <div className={classes.container}>
      {props.children}
    </div>
  );
};

export default ContentArea;