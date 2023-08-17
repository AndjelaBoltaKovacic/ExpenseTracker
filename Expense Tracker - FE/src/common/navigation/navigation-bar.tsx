import {
  AppBar,
  Box,
  Toolbar,
  Container,
} from '@mui/material';
import { Logo } from '../logo';
import { Toggler } from '../toggler';
import { ProfileMenu } from '../menus/profile-menu';
import { MENU_ITEMS } from '../../values/constants/profileMenu';
import { NavTabs } from './nav-tabs';
import BurgerMenu from '../menus/burger-menu';

function NavigationBar() {

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Logo isLargeScreen />
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <BurgerMenu items={MENU_ITEMS} />
          </Box>
          <Logo />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            <NavTabs items={MENU_ITEMS} />
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Toggler />
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <ProfileMenu />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavigationBar;
