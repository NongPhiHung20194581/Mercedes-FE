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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Divider from '@mui/material/Divider';
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
    const [role, setRole] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLogin } = useSelector(authSelector);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(true);

    const handleChangeEmail = (event) => {
        setUserIdError(false);
        if (event.target) {
            const { value } = event.target;
            setEmail(value);
        }
    }

    const handleChangePassword = (event) => {
        setUserIdError(false);
        if (event.target) {
            const { value } = event.target;
            setPassword(value);
        }
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let loginPromise;
        let redirectPath;

        if (email === 'admin@hust.edu.vn' && password === '123456' && role === 'admin') {
            loginPromise = loginUser('647b77348af6c322511fed6c');
            redirectPath = "/hired";
        } else if (email === 'lythanhnhi@soict.hust.edu.vn' && password === '123456' && role === 'teacher') {
            loginPromise = loginUser('647b77348af6c322511fed78');
            redirectPath = "/profile";
        } else if (email === 'ngoclinh@sis.hust.edu.vn' && password === '123456' && role === 'tutor') {
            loginPromise = loginUser('647b77348af6c322511fed5d');
            redirectPath = "/profile";
        } else if (email === 'hoangphuong@sis.hust.edu.vn' && password === '123456' && role === 'student') {
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
            notify_failed('Invalid email, password or role. Please try again!');
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
            <Grid container component="main" sx={{ height: '100vh' }}>
                <Grid item xs={12} sm={8} md={12} component={Paper} elevation={6} square sx={{ height: '100%', flex: 1, width: '100%' }}>
                    <Box
                        sx={{
                            backgroundImage: `url('https://storage.googleapis.com/hust-files/2021-11-15/5807675312963584/background-new-page_.9m.jpeg')`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            height: '100%',
                            width: '100%',
                            position: 'absolute',
                        }}
                    >

                        {/* Popup */}
                        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
                            <Box sx={{ backgroundColor: '#9b0504', color: 'white' }}>
                                <DialogTitle>
                                    <Typography variant="h5"sx={{ fontWeight:'bold' }}>Login</Typography>
                                    <Divider sx={{ marginTop: 1, backgroundColor: 'white' }} />
                                </DialogTitle>
                                <DialogContent>
                                    <Typography variant="h7" align="center" sx={{ color: 'white', marginBottom: 2,fontWeight:'bold'}}>
                                        Đăng nhập bằng tài khoản Office365 (email trường)
                                    </Typography>
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
                                        InputLabelProps={{ style: { color: 'white' } }}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="password"
                                        label="Enter password"
                                        name="password"
                                        autoComplete="password"
                                        autoFocus
                                        type="password"
                                        value={password}
                                        onChange={handleChangePassword}
                                        InputLabelProps={{ style: { color: 'white' } }}
                                    />

                                    <FormControl component="fieldset" sx={{ mt: 2 }}>
                                        <FormLabel component="legend" sx={{color:'white',fontWeight:'bold'}}>Choose role:</FormLabel>
                                        <RadioGroup row aria-label="role" name="row-radio-buttons-group" value={role} onChange={handleRoleChange}>
                                            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                                            <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
                                            <FormControlLabel value="tutor" control={<Radio />} label="Tutor" />
                                            <FormControlLabel value="student" control={<Radio />} label="Student" />
                                        </RadioGroup>   
                                    </FormControl>
                                </DialogContent>
                                <DialogActions sx={{ justifyContent: 'center' }}>
                                    <Button onClick={handleClose} sx={{
                                        backgroundColor:'white',
                                        color:'var(--primary-color)',
                                        fontWeight:'bold'
                                    }}>
                                        Cancel
                                    </Button>
                                    {/* Thay đổi thành nút đăng nhập trong popup */}
                                    <MyAppBar type="submit" onClick={handleSubmit} variant="contained" sx={{ textTransform: 'none', ':hover': { backgroundColor: '#106510' },fontWeight:'bold' }}>
                                        Log In
                                    </MyAppBar>
                                </DialogActions>
                            </Box>
                        </Dialog>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
