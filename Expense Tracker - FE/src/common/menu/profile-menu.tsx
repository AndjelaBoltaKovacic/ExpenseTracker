import { useState } from 'react';
import { Tooltip, IconButton, Avatar, Menu, MenuItem, Typography, Divider } from '@mui/material';
import { useUserContext } from '../../contexts/userContext';
import CustomModal from '../modal/custom-modal';
import { AddReminder } from '../form/add-reminder/add-reminder';
import Notice from '../form/steps/notice';

export const ProfileMenu = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { user, isPremium, logout } = useUserContext();

  const [remindernModal, setOpenReminderModal] = useState(false);
  const [logoutModal, setOpenLogoutModal] = useState(false);

  const handleOpenReminder = () => {
    handleCloseUserMenu();
    setOpenReminderModal(true);
  };

  const handleCloseReminder = () => {
    setOpenReminderModal(false);
  };

  const handleOpenLogout = () => {
    handleCloseUserMenu();
    setOpenLogoutModal(true);
  };

  const handleCloseLogout = () => {
    setOpenLogoutModal(false);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseLogout();
    logout();
  };

  return (
    <>
      <Tooltip title="Open User Menu">
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
        <Typography sx={{ textAlign: 'center', pb: 1 }} color="primary.main">
          <b>{user?.firstname}</b>
        </Typography>
        <Divider />
        {isPremium && (
          <MenuItem onClick={handleOpenReminder}>
            <Typography textAlign="center">Set Reminder</Typography>
          </MenuItem>
        )}
        <MenuItem>
          <Typography textAlign="center" onClick={handleOpenLogout}>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
      <CustomModal isOpen={remindernModal} handleClose={handleCloseReminder}>
        <AddReminder handleClose={handleCloseReminder} />
      </CustomModal>
      <CustomModal isOpen={logoutModal} title={'Are you sure you want to log out?'} handleClose={handleCloseLogout}>
        <Notice handleClose={handleLogout} btnText="Log out" />
      </CustomModal>
    </>
  );
};
