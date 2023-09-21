import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StyledEngineProvider } from '@mui/material/styles';
import MyThemeProvider from './contexts/themeContext';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/userContext';
import { ReminderProvider } from './contexts/reminder.context';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StyledEngineProvider injectFirst>
    <MyThemeProvider>
      <UserProvider>
        <ReminderProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ReminderProvider>
      </UserProvider>
    </MyThemeProvider>
  </StyledEngineProvider>
);

