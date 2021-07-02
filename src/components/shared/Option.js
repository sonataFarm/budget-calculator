import React from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: props => ({
    width: 250,
    height: 40,
    margin: theme.spacing(1),
    border: `1px solid ${theme.palette.primary.dark}`,
    backgroundColor: props.selected ? theme.palette.primary.main : 'white',
    color: 'black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    cursor: 'default',
    userSelect: 'none'
  })
}));

const Option = (props) => {
  const { onClick, value } = props;
  const classes = useStyles(props);
  return (
    <Box 
      className={classes.container} 
      component="div"
      onClick={onClick}
    >
      <Typography align="center" variant="subtitle2">{value}</Typography>
    </Box>
  );
};
export default Option;