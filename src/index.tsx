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
    {/* 4. Wrap Theme provider with MUI Styled engine */}
    <StyledEngineProvider injectFirst>
      {/* 5. Wrap your app with the Theme Provider */}
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: <https://bit.ly/CRA-vitals>
reportWebVitals();
