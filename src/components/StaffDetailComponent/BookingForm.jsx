import React, { useState } from 'react'
import Box from '@mui/material/Box';

import { Button } from '@mui/material';
import axios from 'axios';
import { motion } from "framer-motion"

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { offDualRingLoading, onDualRingLoading } from '../../redux/slices/loading.slice';
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2';
import { authSelector } from '../../redux/selector';
import { toast } from 'react-toastify';



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


const BookingForm = ({ nanny, setIsBooking, notify }) => {
    const dispatch = useDispatch();
    const currentUser = localStorage.getItem('userId');
    const [message, setMessage] = React.useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [total, setTotal] = useState(nanny.salary);
    const { userId } = useSelector(authSelector);

    const handleBooking = () => {
        if (!userId) {
            setIsBooking(false);
            toast.error("この機能を利用するにはログインしてください！", {
                position: "bottom-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        dispatch(onDualRingLoading());
        const formData = {
            staffId: nanny.id,
            endDay: startDate,
            message: message,
            total: total,
            startDay: endDate,
            userId: currentUser
        };

        axios.post('https://babybuddies-be-dev.onrender.com/api/v1/bookings/store', formData)
            .then(() => {
                setMessage('');
                setIsBooking(false);
                dispatch(offDualRingLoading())
                Swal.fire({
                    title: 'Success',
                    text: "予約に成功しました！",
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
            })
            .catch(err => {
                Swal.fire({
                    title: 'Failed',
                    text: "予約に失敗しました!",
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            })
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0, 0.71, 0.2, 1.01]
            }}
        >
            <Box
                width={'800px'}
                backgroundColor={'white'}
                borderRadius={'6px'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                padding={"20px 25px"}
            >
                <Box width={'100%'} className="form-container">
                    <h1 class="title">
                        予約確認
                    </h1>
                    <span class="subtitle">スタッフ名1</span>
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
                        <div style={{ width: '49%' }}>
                            <span class="subtitle">開始日</span>
                            <DatePicker
                                showIcon
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                className='datepicker'
                                startDate={startDate}
                                endDate={endDate}
                            />
                        </div>
                        <div style={{ width: '49%' }}>
                            <span class="subtitle">終了日</span>
                            <DatePicker
                                showIcon
                                selected={endDate}
                                onChange={(date) => {
                                    setEndDate(date)
                                    setTotal(dateCaculate(startDate, date) * nanny.salary)
                                    console.log('change', dateCaculate(startDate, endDate), startDate, endDate);
                                }}
                                className='datepicker'
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                            />
                        </div>
                    </div>
                    <span class="subtitle">合計</span>
                    <Box
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
                    </Box>
                    {/* <TextField
                                multiline
                                maxRows={4}
                                sx={{margin: '10px 0', width: '80%'}}
                            /> */}
                    <textarea
                        name="des"
                        id=""
                        cols="30"
                        rows="6"
                        placeholder="スタッフ・管理者にメッセージを送信したい場合は、ここで書いてください"
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                        }}
                        className='message-input'
                    ></textarea>
                    <Box display={'flex'} justifyContent={'space-around'} paddingBottom={'24px'}>
                        <Button
                            sx={{
                                backgroundColor: '#007320',
                                fontWeight: '600',
                                borderRadius: '15px',
                                width: '160px',
                                ':hover': { backgroundColor: 'rgb(135, 196, 120)' }
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
                            キャンセル
                        </Button>
                    </Box>
                </Box>
            </Box>
        </motion.div>
    )
}

export default BookingForm;