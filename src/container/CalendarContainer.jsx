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

    return data ? (
        <Calendar data={data} classes={dummyScheduleData.classes} schedule={dummyScheduleData.schedule} />
    ) : (
        <div>404</div>
    );
};

export default CalendarContainer;
