import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Tab, Tabs } from '@mui/material';
import { Theme } from '../values/enums/theme';

interface Item {
    label?: string;
    href?: string;
}

export const NavTabs = ({ items }: { items: string[] }) => {
    const [value, setValue] = useState(0);
    const theme = useTheme();
    const isLightTheme = theme.palette.mode === Theme.Light;
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Tabs value={value} onChange={handleChange}
            aria-label="nav tabs"
            textColor={isLightTheme ? 'secondary' : 'primary'}
            indicatorColor={isLightTheme ? 'secondary' : 'primary'}>
            {items.map((page: any) => (
                <Tab
                    component="a"
                    onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                        event.preventDefault();
                    }}
                    label={page}
                    href={`/${page}`}


                />
            ))}
        </Tabs>
    );
};
