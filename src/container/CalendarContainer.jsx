import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Calendar from '../components/Calendar';
import { authSelector, profileSelector } from '../redux/selector';
import { dummyScheduleData } from '../constants/dummy';
import { getProfileForUser } from '../api/profile.api';
import { useId } from 'react';
import { updateUserInfo } from '../redux/slices/auth.slice';
import { saveProfileInfo } from '../redux/slices/profile.slice';
import { toast } from 'react-toastify';

const CalendarContainer = () => {
    const { data } = useSelector(profileSelector);
    const { userId } = useSelector(authSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!data) {
            getProfileForUser(userId)
                .then((res) => {
                    const user_info = res.data.result;
                    dispatch(updateUserInfo({ fullName: user_info.name }));
                    dispatch(saveProfileInfo(user_info));
                })
                .catch((error) => {
                    toast.error(`Không thể lấy thông tin người dùng! 👻`, {
                        position: 'bottom-right',
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    });
                });
        }
    }, [data]);

    return data ? (
        <Calendar data={data} classes={dummyScheduleData.classes} schedule={dummyScheduleData.schedule} />
    ) : (
        <div>404</div>
    );
};

export default CalendarContainer;
