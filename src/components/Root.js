import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import App from './App';
import theme from '../styles/theme';

const Root = () => (
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);

export default Root;