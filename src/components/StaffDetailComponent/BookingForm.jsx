import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';

import { Button, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { offDualRingLoading, onDualRingLoading } from '../../redux/slices/loading.slice';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { authSelector } from '../../redux/selector';
import { toast } from 'react-toastify';
import { dummyBookingData, dummyScheduleData } from '../../constants/dummy';
import { setBooking } from '../../redux/slices/booking.slice';

function formatNumber(number) {
    const formattedNumber = number?.toLocaleString('en-US');
    return formattedNumber;
}

function dateCaculate(date1, date2) {
    let Difference_In_Time = date2.getTime() - date1.getTime();
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    console.log(Difference_In_Time, Difference_In_Days, parseInt(Difference_In_Days.toFixed() + 1));
    return parseInt(Difference_In_Days.toFixed()) + 1;
}

function getBookingTime(time, weekday) {
    let day = 'MON';
    switch (weekday) {
        case 3:
            day = 'TUE';
            break;
        case 4:
            day = 'WED';
            break;
        case 5:
            day = 'THU';
            break;
        case 6:
            day = 'FRI';
            break;
        case 7:
            day = 'SAT';
            break;
        default:
            break;
    }
    return `${time}, ${day}`;
}

const BookingForm = ({ nanny, setIsBooking, notify }) => {
    const dispatch = useDispatch();
    const [message, setMessage] = React.useState('');
    const [subject, setSubject] = useState(null);
    const [schedule, setSchedule] = useState(null);
    const { userId } = useSelector(authSelector);
    console.log(nanny);

    const handleBooking = () => {
        if (!userId) {
            setIsBooking(false);
            toast.error('Please login to use this feature!', {
                position: 'bottom-right',
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            return;
        }

        if (!subject || !schedule) {
            toast.error('Please choose a subject', {
                position: 'bottom-right',
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            return;
        }

        const bookingsCache = localStorage.getItem('booking');
        const bookings = !!bookingsCache ? JSON.parse(bookingsCache) : dummyBookingData;
        const updateBooking = [
            ...bookings,
            {
                full_name: nanny.full_name,
                time: getBookingTime(schedule.duration, schedule.weekdays),
                status: 'Waiting',
                code: 'VN',
                phone: nanny.phone,
                id: nanny.id,
                created_at: new Date().valueOf(),
            },
        ];
        dispatch(setBooking(updateBooking));

        toast.success('Create request successfully', {
            position: 'bottom-right',
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
        setIsBooking(false);
    };

    const handleChangeClass = (e) => {
        setSubject(() => dummyScheduleData.classes.find((c) => c.classId === e.target.value));
    };

    useEffect(() => {
        setSchedule(() => dummyScheduleData.schedule.find((s) => s.classId === subject?.classId) ?? null);
    }, [subject]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0, 0.71, 0.2, 1.01],
            }}
        >
            <Box
                width={'800px'}
                backgroundColor={'white'}
                borderRadius={'6px'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                padding={'20px 25px'}
            >
                <Box width={'100%'} className="form-container">
                    <h1 class="title">Booking Confirmation</h1>
                    <span class="subtitle">Staff Name</span>
                    <Box
                        sx={{
                            backgroundColor: '#d6d6d6',
                            fontSize: '20px',
                            borderRadius: '6px',
                            padding: '10px',
                            paddingLeft: '12px',
                        }}
                    >
                        {nanny.full_name}
                    </Box>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div
                            style={{
                                width: '100%',
                                display: 'grid',
                                gridTemplateColumns: '60px auto',
                                alignItems: 'center',
                                gap: '3px',
                                marginTop: '10px',
                            }}
                        >
                            <InputLabel
                                id="demo-select-small-label"
                                style={{ fontSize: '20px', color: '#007320', fontWeight: 'semibold !important' }}
                            >
                                Class:
                            </InputLabel>
                            <Select
                                labelId="select-status"
                                value={subject?.classId}
                                onChange={handleChangeClass}
                                size="small"
                            >
                                {dummyScheduleData.classes.map(({ classId, className }) => (
                                    <MenuItem key={classId} value={classId}>
                                        {className}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ width: '30%' }}>
                            <span class="subtitle">Weekday</span>
                            <Box
                                sx={{
                                    backgroundColor: '#d6d6d6',
                                    fontSize: '16px',
                                    borderRadius: '6px',
                                    padding: '10px',
                                    paddingLeft: '12px',
                                }}
                            >
                                {schedule?.weekdays ?? 'Please choose a subject'}
                            </Box>
                        </div>
                        <div style={{ width: '30%' }}>
                            <span class="subtitle">Time</span>
                            <Box
                                sx={{
                                    backgroundColor: '#d6d6d6',
                                    fontSize: '16px',
                                    borderRadius: '6px',
                                    padding: '10px',
                                    paddingLeft: '12px',
                                }}
                            >
                                {schedule?.duration ?? 'Please choose a subject'}
                            </Box>
                        </div>
                        <div style={{ width: '30%' }}>
                            <span class="subtitle">Weeks</span>
                            <Box
                                sx={{
                                    backgroundColor: '#d6d6d6',
                                    fontSize: '16px',
                                    borderRadius: '6px',
                                    padding: '10px',
                                    paddingLeft: '12px',
                                }}
                            >
                                {schedule?.weeks ?? 'Please choose a subject'}
                            </Box>
                        </div>
                    </div>
                    {/* <span class="subtitle">合計</span> */}
                    {/* <Box
                        sx={{
                            width: '49%',
                            backgroundColor: '#d6d6d6',
                            fontSize: '20px',
                            borderRadius: '6px',
                            padding: '10px',
                            paddingLeft: '12px',
                            marginBottom: '18px',
                        }}
                    >
                        {formatNumber(total)} VND
                    </Box> */}
                    {/* <TextField
                                multiline
                                maxRows={4}
                                sx={{margin: '10px 0', width: '80%'}}
                            /> */}
                    <br />
                    <textarea
                        name="des"
                        id=""
                        cols="30"
                        rows="6"
                        placeholder="If you would like to send a message to staff/administrators, please write here"
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                        }}
                        className="message-input"
                    ></textarea>
                    <Box display={'flex'} justifyContent={'space-around'} paddingBottom={'24px'}>
                        <Button
                            sx={{
                                backgroundColor: '#007320',
                                fontWeight: '600',
                                borderRadius: '15px',
                                width: '160px',
                                ':hover': { backgroundColor: 'rgb(135, 196, 120)' },
                            }}
                            variant="contained"
                            onClick={handleBooking}
                        >
                            Ok
                        </Button>
                        <Button
                            sx={{
                                backgroundColor: '#E5E5E5',
                                fontWeight: '600',
                                color: '#007320',
                                borderRadius: '15px',
                                width: '160px',
                            }}
                            variant="outline"
                            onClick={() => {
                                setMessage('');
                                setIsBooking(false);
                            }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Box>
        </motion.div>
    );
};

export default BookingForm;
