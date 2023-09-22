import ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import MyThemeProvider from './contexts/themeContext';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/userContext';
import { ReminderProvider } from './contexts/reminder.context';
import App from './App';
import ModalProvider from './contexts/modals.context';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StyledEngineProvider injectFirst>
    <MyThemeProvider>
      <UserProvider>
        <ModalProvider>
        <ReminderProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
          </ReminderProvider>
        </ModalProvider>
      </UserProvider>
    </MyThemeProvider>
  </StyledEngineProvider>
);

