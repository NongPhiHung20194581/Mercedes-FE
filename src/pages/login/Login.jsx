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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// TODO remove, this demo shouldn't need to reset the theme.

const MyAppBar = styled(Button)({
    backgroundColor: '#1d9a1d',
    color: 'white',
});
const defaultTheme = createTheme();

const notify_failed = (message) => toast.error(message, {
    position: "bottom-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
});;

export default function Login() {
    const [userIdError, setUserIdError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLogin } = useSelector(authSelector);
    const [email, setEmail] = useState('');

    const handleChangeEmail = (event) => {
        setUserIdError(false);
        if (event.target) {
            const { value } = event.target;
            setEmail(value);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        let loginPromise;
        let redirectPath;

        if (email === 'admin@hust.edu.vn') {
            loginPromise = loginUser('647b77348af6c322511fed6c');
            redirectPath = "/hired";
        } else if (email === 'lythanhnhi@soict.hust.edu.vn') {
            loginPromise = loginUser('647b77348af6c322511fed78');
            redirectPath = "/profile";
        } else if (email === 'ngoclinh@sis.hust.edu.vn') {
            loginPromise = loginUser('647b77348af6c322511fed5d');
            redirectPath = "/profile";
        } else if (email === 'hoangphuong@sis.hust.edu.vn') {
            loginPromise = loginUser('647b77348af6c322511fed5e');
            redirectPath = "/profile";
        } else {
            setEmailError(true);
        }

        if (loginPromise) {
            loginPromise
                .then(res => {
                    const { id, account_status, user_info, username } = res.data.result;
                    dispatch(saveUserInfo({ id, account_status, username, fullName: user_info.name }));
                    navigate(redirectPath);
                })
                .catch(err => {
                    setUserIdError(true);
                    setEmailError(true);
                });
        } else {
            notify_failed('Invalid email!');
        }
    };

    React.useEffect(() => {
        if (isLogin) {
            // navigate("/")
        }
    }, [isLogin, navigate])

    return (
        <ThemeProvider theme={defaultTheme}>
            <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
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
                                id="email"
                                label="Enter email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={handleChangeEmail}
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
