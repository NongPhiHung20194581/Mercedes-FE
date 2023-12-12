import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { loginUser } from '../../api/auth.api';
import { useDispatch, useSelector } from 'react-redux';
import { saveUserInfo } from '../../redux/slices/auth.slice';
import { useNavigate } from 'react-router-dom';
import { authSelector } from '../../redux/selector';

// TODO remove, this demo shouldn't need to reset the theme.

const MyAppBar = styled(Button)({
    backgroundColor: '#1d9a1d',
    color: 'white',
});
const defaultTheme = createTheme();

export default function Login() {
    const [userIdError, setUserIdError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isLogin} = useSelector(authSelector);
    const [userId, setUserId] = useState('');
    const accountIds = [
        '647b77348af6c322511fed58',
        '647b77348af6c322511fed59',
        '647b77348af6c322511fed5a',
        '647b77348af6c322511fed5b',
        '647b77348af6c322511fed5c',
        '647b77348af6c322511fed5d',
        '647b77348af6c322511fed5e',
        '647b77348af6c322511fed5f',
        '647b77348af6c322511fed60',
        '647b77348af6c322511fed61',
        '647b77348af6c322511fed62',
        '647b77348af6c322511fed63',
        '647b77348af6c322511fed64',
        '647b77348af6c322511fed65',
        '647b77348af6c322511fed66',
        '647b77348af6c322511fed67',
        '647b77348af6c322511fed68',
        '647b77348af6c322511fed69',
        '647b77348af6c322511fed6a',
        '647b77348af6c322511fed6b',
    ];

    const handleChangeUserId = (event) => {
        setUserIdError(false);
        if(event.target){
            const {value} = event.target;
            setUserId(value)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const id = accountIds[1];

        loginUser(id)
            .then(res => {
                console.log(res.data.result)
                const { id, account_status, user_info, username } = res.data.result;
                dispatch(saveUserInfo({ id, account_status, username, fullName: user_info.name }))
                navigate(`/profile`);
            })
            .catch(err => {
                setUserIdError(true);
            })
    };

    React.useEffect(() => {
        if (isLogin) {
            navigate("/")
        }
    }, [isLogin, navigate])

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: 'calc(100vh - 72px)', marginTop: "72px" }}>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" color={userIdError ? 'red' : '#1d9a1d'}>
                            {userIdError ? 'Invalid User' : 'Log In'}
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="userId"
                                label="Enter userId"
                                name="userId"
                                autoComplete="userId"
                                autoFocus
                                value={userId}
                                onChange={handleChangeUserId}
                            />

                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />

                            <MyAppBar
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, textTransform: 'none', ':hover': { backgroundColor: '#106510' } }}
                            >
                                Log In
                            </MyAppBar>
                        </Box>
                    </Box>
                </Grid>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://img.freepik.com/premium-vector/babysitter-nanny-services-care-baby-needs-play-with-children-flat-illustration_2175-8229.jpg?w=1380)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            </Grid>
        </ThemeProvider>
    );
}
