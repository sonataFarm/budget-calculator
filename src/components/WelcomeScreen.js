import React from 'react';
import { Button, Typography } from '@material-ui/core';
import ContentArea from './ContentArea';

const WelcomeScreen = ({ onNext }) => {
  return (
    <ContentArea>
      <Typography variant="h1">Welcome to Yardzen.</Typography>
      <Typography variant="h6" align="center" gutterBottom>Let's get started!</Typography>
      <Button 
        variant="contained" 
        color="primary"
        onClick={onNext}
      >
        Next
      </Button>
    </ContentArea>
  );
};

export default WelcomeScreen;