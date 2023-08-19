import { useState } from 'react';
import { Tooltip, IconButton, Avatar, Menu, MenuItem, Typography, Divider } from '@mui/material';
import { useUserContext } from '../../contexts/userContext';

export const ProfileMenu = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { user, logout } = useUserContext();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ pl: 1 }}>
          <Avatar />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <Typography sx={{ textAlign: 'center', pb: 1 }} color="white">
          {user?.firstName}
        </Typography>
        <Divider />
        <MenuItem>
          <Typography color="white" textAlign="center">
            Set Reminder
          </Typography>
        </MenuItem>
        <MenuItem>
          <Typography color="white" textAlign="center" onClick={() => logout()}>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};
