import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from './redux/selector';
import { useEffect } from 'react';
import { loginUser } from './api/auth.api';
import { updateUserInfo } from './redux/slices/auth.slice';
import DualRingLoading from './components/Loading/DualRingLoading';
import { saveProfileInfo } from './redux/slices/profile.slice';

function App() {
    const { userId } = useSelector(authSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if (userId) {
            loginUser(userId)
                .then(res => {
                    const { account_status, user_info, username } = res.data.result;
                    dispatch(updateUserInfo({ fullName: user_info.name, username, status: account_status }))
                    dispatch(saveProfileInfo(user_info));
                    //console.log(user_info);
                })
                .catch(err => {

                })
        }

        //eslint-disable-next-line
    }, [userId])

    return (
        <>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
            <DualRingLoading />
        </>
    );
}

export default App;
