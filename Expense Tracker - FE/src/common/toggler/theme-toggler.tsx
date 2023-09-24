import { useContext } from 'react';
import { Tooltip, Switch } from '@mui/material';
import { ThemeContext } from '../../contexts/theme.context';
import { Theme } from '../../values/enums/theme';

export const ThemeToggler = () => {
  const colorMode: any = useContext(ThemeContext);

  return (
    <Tooltip title='Change theme'>
      <Switch color='secondary' checked={colorMode.mode === Theme.Dark} onChange={colorMode.toggleColorMode} />
    </Tooltip>
  );
};
