import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import Button from '@mui/material/Button';

import { styled, alpha } from '@mui/material/styles';
import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AvatarImg from './img/avatar.png';

const MyAppBar = styled(AppBar)({
    backgroundColor: '#f2f2f2',
    color: '#1d9a1d',
});
export default function HeaderRegister() {
    const updateProfile = useContext(true);
    return (
        <div>
            <MyAppBar position="static">
                <Toolbar align="center" sx={{ justifyContent: 'space-between' }}>
                    <Button href="\">
                        <Avatar alt="Avatar" src={AvatarImg} sx={{ width: '60px', height: '60px' }} />
                    </Button>

                    <Box>
                        <Button
                            href="/login"
                            variant="contained"
                            color="success"
                            
                            sx={{ marginRight: 5, paddingLeft: 5, paddingRight: 5, textTransform: 'none' }}
                        >
                            Login
                        </Button>
                        <Button
                            href="/signup"
                            variant="outlined"
                            color="inherit"
                            sx={{ paddingLeft: 5, paddingRight: 5, textTransform: 'none' }}
                        >
                            Signup
                        </Button>
                    </Box>
                </Toolbar>
            </MyAppBar>
        </div>
    );
}
