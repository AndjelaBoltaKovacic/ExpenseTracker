import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { ThemeProvider, createTheme, ThemeOptions } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';
import { useEffect } from 'react';
// 1. import our newly fresh yum exported theme
import { color as ThemeColors } from '../values/theme/index';

export const ThemeContext = React.createContext({
  toggleColorMode: () => {},
});
type MyThemeProviderProps = {
  children?: React.ReactNode;
};
export default function MyThemeProvider(props: MyThemeProviderProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = React.useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light');
  const [theme] = React.useState<0>(0);
  useEffect(() => {
    setMode(prefersDarkMode ? 'dark' : 'light');
  }, [prefersDarkMode]);
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );
  // 2. create theme object, pick theme from the mega theme object we exported earlier
  // based on our theme and mode values
  const _theme = React.useMemo(() => createTheme(ThemeColors[theme][mode] as ThemeOptions), [mode, theme]);
  return (
    <ThemeContext.Provider value={colorMode}>
      {/* 3. supply it to MUI ThemeProvider */}
      <ThemeProvider theme={_theme}>
        <GlobalStyles styles={{}} />
        <CssBaseline enableColorScheme />
        {props.children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
