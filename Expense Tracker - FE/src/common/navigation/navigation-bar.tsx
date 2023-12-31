import { AppBar, Box, Toolbar, Container } from '@mui/material';
import { Logo } from '../logo';
import { Toggler } from '../toggler';
import { ProfileMenu } from '../menu/profile-menu';
import { MENU_ITEMS, AUTH_MENU_ITEMS } from '../../values/constants/menu';
import { NavTabs } from './nav-tabs';
import BurgerMenu from '../menu/burger-menu';
import { useUserContext } from '../../contexts/userContext';

function NavigationBar() {
  const { isPremium, user } = useUserContext();

  //NOTE: Filtering out paths that are only for premium users
  const menuItems = user ? MENU_ITEMS.filter((item) => (isPremium ? item : !item.isPremium)) : AUTH_MENU_ITEMS;

  return (
    <AppBar position='static' color='inherit'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Logo isLargeScreen />
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <BurgerMenu items={menuItems} />
          </Box>
          <Logo />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} ml={1}>
            <NavTabs items={menuItems} />
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Toggler />
          </Box>
          {!!user && (
            <Box sx={{ flexGrow: 0 }}>
              <ProfileMenu />
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavigationBar;
