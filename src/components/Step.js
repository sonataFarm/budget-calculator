import React from 'react';

const Step = ({ number, currentStep, children }) => {
  if (number === currentStep) {
    return <React.Fragment>{ children }</React.Fragment>;
  } else {
    return null;
  }
};

export default Step;