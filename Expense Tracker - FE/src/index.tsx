import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StyledEngineProvider } from '@mui/material/styles';
import MyThemeProvider from './contexts/themeContext';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/userContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <MyThemeProvider>
        <UserProvider>
        <BrowserRouter>
          <App />
          </BrowserRouter>
        </UserProvider>
      </MyThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);

