import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Box, Button } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/selector';
import { useNavigate } from 'react-router';
import { getProfileForUser } from '../../api/profile.api';

export default function Hired() {
    const [bookings, setBookings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [bookingsPerPage] = useState(5); 
    const { userId } = useSelector(authSelector);
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            getProfileForUser(userId)
                .then((res) => {
                    const bookings = res.data.result.booking;
                    setBookings([...bookings]);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [userId]);

    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

    const totalPages = Math.ceil(bookings.length / bookingsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="main-session hired-container">
            <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                flexDirection={'column'}
                paddingBottom={'40px'}
            >
                <h1 style={{ textAlign: 'left', width: '80%', padding: '20px 0', fontSize: '40px' }}>予約管理</h1>
                <TableContainer component={Paper} sx={{ width: '80%' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell width={400} sx={{ fontWeight: 600, fontSize: 18 }}>
                                    Staff
                                </TableCell>
                                <TableCell width={300} align="left" sx={{ fontWeight: 600, fontSize: 18 }}>
                                    予約時間
                                </TableCell>
                                <TableCell width={200} align="left" sx={{ fontWeight: 600, fontSize: 18 }}>
                                    ステータス
                                </TableCell>
                                <TableCell width={100} align="right" sx={{ fontWeight: 600, fontSize: 18 }}>
                                    アクション
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentBookings.map((row) => (
                                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        <Box display={'flex'}>
                                            <Avatar alt="Remy Sharp" src={row.image_link} />
                                            <Box marginLeft={'8px'} display={'flex'} flexDirection={'column'}>
                                                <span>{row.full_name}</span>
                                                <span style={{ color: '#B5B5C3' }}>{row.code || 'CN' + row.phone}</span>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.start_day?.split('T')[0].replace(/-/g, '/')}-
                                        {row.end_day?.split('T')[0].replace(/-/g, '/')}
                                    </TableCell>
                                    <TableCell align="left">{row.status}</TableCell>
                                    <TableCell align="right">
                                        <span
                                            onClick={() => {
                                                navigate(`/details/${row.staff_id}`);
                                            }}
                                        >
                                            <RemoveRedEyeIcon className="hired-table__icon" />
                                        </span>
                                        <DeleteIcon className="hired-table__icon" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box display="flex" justifyContent="center" alignItems="center" marginTop={2}>
                    {pageNumbers.map((number) => (
                        <Button
                            key={number}
                            onClick={() => paginate(number)}
                            variant={number === currentPage ? 'contained' : 'outlined'}
                            color="primary"
                            style={{ margin: '0 5px' }}
                        >
                            {number}
                        </Button>
                    ))}
                </Box>
             
            </Box>
        </div>
    );
}
