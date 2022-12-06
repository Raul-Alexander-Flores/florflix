import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
/* import {createTheme, ThemeProvider } from '@mui/material/styles'; */
import { Provider } from 'react-redux';
import ToggleColorModeProvider from './utils/ToggleColorMode';

import App from './components/App';

// Initially used as main color theme
/* const theme = createTheme({

  palette: {
    primary: {
      main: '#ADD8E6',
    },
  }
}); */


import store from './app/store';
ReactDOM.render(
  <Provider store={store}>
    <ToggleColorModeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ToggleColorModeProvider>,
  </Provider>,
  document.getElementById('root'),

);
