import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { ThemeProvider, createTheme, ThemeOptions } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { theme } from '../theme/theme';


export const ThemeContext = createContext({
  toggleColorMode: () => {},
});

export default function MyThemeProvider({ children }: { children: ReactNode }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light');

  useEffect(() => {
    setMode(prefersDarkMode ? 'dark' : 'light');
  }, [prefersDarkMode]);
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const _theme = useMemo(() => createTheme(theme[mode] as ThemeOptions), [mode, theme]);
  return (
    <ThemeContext.Provider value={colorMode}>
      {/* 3. supply it to MUI ThemeProvider */}
      <ThemeProvider theme={_theme}>
        <GlobalStyles styles={{}} />
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
