import { useState } from "react";
import { Tooltip, IconButton, Avatar, Menu, MenuItem, Typography, Divider } from "@mui/material"


export const ProfileMenu = () => {

    const settings = ['Set Reminder', 'Logout'];

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);


    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <>
            <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ pl: 1 }}>
                    <Avatar />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
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
                <Typography sx={{ textAlign: 'center', pb: 1 }}>Andjela</Typography>
                <Divider />
                {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign='center'>{setting}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}