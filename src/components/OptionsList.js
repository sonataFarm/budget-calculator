import React from 'react';
import { Typography } from '@material-ui/core';

const OptionsList = ({ title, children }) => {
  return (
    <div>
      <Typography variant="h6" align="center">{title}</Typography>
      { children }
    </div>
  );
};

export default OptionsList;

