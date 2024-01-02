import React from 'react';
import { useSelector } from 'react-redux';
import Calendar from '../components/Calendar';
import { dummyScheduleData } from '../constants/dummy';
import { profileSelector } from '../redux/selector';

const CalendarContainer = () => {
    const { data } = useSelector(profileSelector);

    return data ? (
        <Calendar data={data} classes={dummyScheduleData.classes} schedule={dummyScheduleData.schedule} />
    ) : (
        <div>404</div>
    );
};

export default CalendarContainer;
