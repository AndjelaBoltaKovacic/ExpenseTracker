import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Tab, Tabs } from '@mui/material';
import { Theme } from '../../values/enums/theme';
import { MenuItem } from '../../models/common';
import { getLocationValue } from '../../helpers/common';

export const NavTabs = ({ items, isChildRoute }: { items: MenuItem[], isChildRoute?: boolean }) => {
  const [value, setValue] = useState<number>(0);
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setValue(getLocationValue(location.pathname, isChildRoute));
  }, [location.pathname]);

  const themeOverride = theme.palette.mode === Theme.Light ? 'secondary' : 'primary';

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Tabs
      value={value || 0}
      onChange={handleChange}
      aria-label="nav tabs"
      textColor={themeOverride}
      indicatorColor={themeOverride}
    >
      {items.map(({ title, page }, i) => (
        <Tab
          key={`${title}_${i}`}
          onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            event.preventDefault();
            navigate(`${page}`);
          }}
          label={title}
          href={`/${page}`}
        />
      ))}
    </Tabs>
  );
};
