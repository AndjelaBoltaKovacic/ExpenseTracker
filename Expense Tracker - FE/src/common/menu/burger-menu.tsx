import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { MenuItem as Item } from '../../models/common';

function BurgerMenu({ items }: { items: Item[] }) {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleMenuItemClick = (page: string) => {
        handleCloseNavMenu()
        navigate(page)
    }
    return (<>
        <IconButton
            size='large'
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleOpenNavMenu}
            color='inherit'
        >
            <MenuIcon />
        </IconButton>
        <Menu
            id='menu-appbar'
            anchorEl={anchorElNav}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
                display: { xs: 'block', md: 'none' },
            }}
        >
            {items.map(({ title, page }, i) => (
                <MenuItem key={title + i} onClick={() => handleMenuItemClick(page)}>
                    <Typography color='white' textAlign='center'>{title}</Typography>
                </MenuItem>
            ))}
        </Menu>
    </>
    )
}

export default BurgerMenu;