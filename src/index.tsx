import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// 1. Import StyledEngineProvider from MUI
import { StyledEngineProvider } from '@mui/material/styles';
// 2. Import ThemeProvider that we just created
import ThemeProvider from './contexts/themeContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);

reportWebVitals();
