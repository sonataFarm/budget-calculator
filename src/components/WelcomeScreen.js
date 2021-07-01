import React from 'react';

const WelcomeScreen = ({ onNext }) => {
  return (
    <div>
      <div>Welcome to Yardzen!</div>
      <div>Enter your budget:</div>
      <input type="text" />
      <button onClick={() => onNext(1000)}>Next</button>
    </div>
  );
};

export default WelcomeScreen;