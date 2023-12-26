import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';

import AvatarImg from './img/avatar.png';
import Avt from './img/avt.png';

import Avatar from '@mui/material/Avatar';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const MyAppBar = styled(AppBar)({
    backgroundColor: '#f2f2f2',
    color: '#1d9a1d',
});

export default function HeadederMain() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [userName, setUserName] = React.useState();
    const [address, setAddress] = React.useState();
    var isLogin = localStorage.getItem('isLogin');
    const userId = localStorage.getItem('userId');

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const isUpdated = localStorage.getItem('isUpdated');

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleLogout = () => {
        // Xóa thông tin trong localStorage
        localStorage.removeItem('isLogin');
        localStorage.removeItem('userId');
        localStorage.removeItem('isUpdated');
        localStorage.removeItem('childCare');
        localStorage.removeItem('cooking');
        localStorage.removeItem('language');
        localStorage.removeItem('address');
        window.location.href = '/logout';
    };
    // const handleLogout = () => {
    //     return new Promise((resolve, reject) => {
    //         // Xóa thông tin trong localStorage
    //         localStorage.removeItem('isLogin');
    //         localStorage.removeItem('userId');
    //         localStorage.removeItem('isUpdated');

    //         // Giải quyết promise sau khi xóa thông tin thành công
    //         resolve();
    //     });
    // };

    // Sử dụng hàm handleLogout với promise
    // handleLogout().then(() => {
    //     // Chuyển trang sau khi xóa thông tin thành công
    //     window.location.href = '/logout';
    // });

    React.useEffect(() => {
        const url = 'https://babybuddies-be-dev.onrender.com/api/v1/accounts/' + userId;
        axios
            .get(url)
            .then(function (response) {
                // handle success
                console.log(response);
                const data = response.data.result.user_info;
                setUserName(data.name);
                setAddress(data.address);
                console.log(data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    });

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>
                <Button
                    href={`/profile/${userId}`}
                    sx={{
                        textTransform: 'none',
                        color: '#000000',
                    }}
                >
                    Profile
                </Button>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
                <Button href="/hired" sx={{ textTransform: 'none', color: '#000000' }}>
                    Hired Nanny
                </Button>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
                <Button onClick={handleLogout} sx={{ textTransform: 'none', color: '#000000' }}>
                    Logout
                </Button>
            </MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4}>
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                    <Badge badgeContent={5}>
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }} position="static">
            <MyAppBar position="static">
                <Toolbar>
                    {/* <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Button href={isUpdated ? '/home' : ''}>
                            <Avatar alt="Avatar" src={AvatarImg} sx={{ width: '60px', height: '60px' }} />
                        </Button>
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="success">
                                <MailIcon />
                            </Badge>
                        </IconButton> */}
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                            sx={{ width: '50px', height: '50px', marginTop: '7px', marginRight: '6px' }}
                        >
                            <Badge badgeContent={5} color="success">
                                <NotificationsIcon sx={{ width: '30px', height: '30px' }} />
                            </Badge>
                        </IconButton>
                        {isLogin && (
                            <Box sx={{ marginTop: '6px' }}>
                                <Typography sx={{ fontSize: '20px' }}>{userName}</Typography>
                                <Typography sx={{ fontSize: '12px' }}>{address}</Typography>
                            </Box>
                        )}

                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            {/* <AccountCircle /> */}
                            <Avatar alt="Avt" src={Avt} sx={{ width: '40px', height: '40px' }} />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </MyAppBar>

            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
