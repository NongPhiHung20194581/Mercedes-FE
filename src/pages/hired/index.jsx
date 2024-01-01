import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Avatar, Box, Button, InputLabel, MenuItem, Select } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { bookingSelector } from '../../redux/selector';
import { setBooking } from '../../redux/slices/booking.slice';

const Status = {
    ALL: 'ALL',
    SUCCESS: 'Success',
    REJECT: 'Reject',
    WAITING: 'Waiting',
};

export default function Hired() {
    const { booking: bookings } = useSelector(bookingSelector);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [bookingsPerPage] = useState(5);
    const [filterStatus, setStatus] = useState(Status.ALL);
    const navigate = useNavigate();

    const totalPages =
        filterStatus === Status.ALL
            ? Math.ceil(bookings.length / bookingsPerPage)
            : Math.ceil(bookings.filter((b) => b.status === filterStatus).length / bookingsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const handleChangeStatus = (e) => {
        setCurrentPage(() => 1);
        setStatus(() => e.target.value);
    };

    const acceptBooking = (id) => {
        dispatch(setBooking(bookings.map((b) => (b.id === id ? { ...b, status: Status.SUCCESS } : b))));
    };

    const rejectBooking = (id) => {
        dispatch(setBooking(bookings.map((b) => (b.id === id ? { ...b, status: Status.REJECT } : b))));
    };

    const deleteBooking = (id) => {
        dispatch(setBooking(bookings.filter((b) => b.id !== id)));
    };

    return (
        <div className="main-session hired-container">
            <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                flexDirection={'column'}
                paddingBottom={'40px'}
            >
                <h1 style={{ textAlign: 'left', width: '80%', padding: '20px 0', fontSize: '40px' }}>
                    Booking management
                </h1>
                <div className="status-select">
                    <InputLabel id="demo-select-small-label">Status:</InputLabel>
                    <Select
                        labelId="select-status"
                        value={filterStatus}
                        onChange={handleChangeStatus}
                        defaultValue={Status.ALL}
                        size="small"
                    >
                        {Object.keys(Status).map((s) => (
                            <MenuItem key={s} value={Status[s]}>
                                {s}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                <TableContainer component={Paper} sx={{ width: '80%' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell width={400} sx={{ fontWeight: 600, fontSize: 18 }}>
                                    Staff
                                </TableCell>
                                <TableCell width={300} align="left" sx={{ fontWeight: 600, fontSize: 18 }}>
                                    Booked time
                                </TableCell>
                                <TableCell width={200} align="left" sx={{ fontWeight: 600, fontSize: 18 }}>
                                    Status
                                </TableCell>
                                <TableCell width={100} align="right" sx={{ fontWeight: 600, fontSize: 18 }}>
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookings
                                .filter((b) => (filterStatus === Status.ALL ? true : b.status === filterStatus))
                                .slice(indexOfFirstBooking, indexOfLastBooking)
                                .map(({ full_name, time, status, code, phone, image_link, id }) => (
                                    <TableRow key={id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            <Box display={'flex'}>
                                                <Avatar alt="Remy Sharp" src={image_link} />
                                                <Box marginLeft={'8px'} display={'flex'} flexDirection={'column'}>
                                                    <span>{full_name}</span>
                                                    <span style={{ color: '#B5B5C3' }}>{code + '-' + phone}</span>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="left">{time}</TableCell>
                                        <TableCell align="left">{status}</TableCell>
                                        <TableCell align="right">
                                            <div className="actions">
                                                <span
                                                    className="accept-icon"
                                                    onClick={
                                                        status === Status.WAITING
                                                            ? () => acceptBooking(id)
                                                            : () => {
                                                                  console.log(id);
                                                              }
                                                    }
                                                >
                                                    <CheckIcon
                                                        className={
                                                            status === Status.WAITING
                                                                ? 'hired-table__icon'
                                                                : 'hired-table__icon disabled-icon'
                                                        }
                                                    />
                                                </span>
                                                <span
                                                    className="reject-icon"
                                                    onClick={
                                                        status === Status.WAITING
                                                            ? () => rejectBooking(id)
                                                            : () => {
                                                                  console.log(id);
                                                              }
                                                    }
                                                >
                                                    <ClearIcon
                                                        className={
                                                            status === Status.WAITING
                                                                ? 'hired-table__icon'
                                                                : 'hired-table__icon disabled-icon'
                                                        }
                                                    />
                                                </span>
                                                <span
                                                    className="view-icon"
                                                    onClick={() => {
                                                        navigate(`/details/${'647b77348af6c322511fed5d'}`);
                                                    }}
                                                >
                                                    <RemoveRedEyeIcon className="hired-table__icon" />
                                                </span>
                                                <span className="delete-icon" onClick={() => deleteBooking(id)}>
                                                    <DeleteIcon className="hired-table__icon" />
                                                </span>
                                            </div>
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
