import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { ThemeProvider, createTheme, ThemeOptions } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { theme } from '../theme/theme';
import { Theme } from '../values/enums/theme';


export const ThemeContext = createContext({
  toggleColorMode: () => {},
});

export default function MyThemeProvider({ children }: { children: ReactNode }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<Theme>(prefersDarkMode ? Theme.Dark : Theme.Light);

  useEffect(() => {
    setMode(prefersDarkMode ? Theme.Dark : Theme.Light);
  }, [prefersDarkMode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === Theme.Light ? Theme.Dark : Theme.Light));
      },
    }),
    []
  );

  const _theme = useMemo(() => createTheme(theme[mode] as ThemeOptions), [mode]);

  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={_theme}>
        <GlobalStyles styles={{}} />
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
