import { useContext } from 'react';
import { Tooltip, Switch } from '@mui/material';
import { ThemeContext } from '../contexts/themeContext';


export const Toggler = () => {
    const colorMode: any = useContext(ThemeContext);

    return (
        <Tooltip title="Change theme">
            <Switch color="secondary" onChange={colorMode.toggleColorMode} />
        </Tooltip>
    );
};
