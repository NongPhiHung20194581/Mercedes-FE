import React from 'react';
import styles from './ListNanny.module.scss';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, styled } from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookingForm from '../../components/HomeComponent/BookingForm';
import { useAutoAnimate } from '@formkit/auto-animate/react'


const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const styleDelete = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function DetailNanny() {
    const [nannys, setNannys] = React.useState([]);
    const { id } = useParams();
    var isLogin = localStorage.getItem('isLogin');

    const [open, setOpen] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);

    const [value, setValue] = React.useState(2);
    const [isBooking, setIsBooking] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [review, setReview] = React.useState('');
    const [parent, enableAnimations] = useAutoAnimate(/* optional config */)

    // Lấy giá trị ngày hôm nay
    let today = new Date();
    console.log(today);

    // Lấy giá trị ngày mai
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    console.log(tomorrow);

    React.useEffect(() => {
        const fetchData = async () => {
            const reponse = await fetch(
                'https://babybuddies-be-dev.onrender.com/api/v1/home?fbclid=IwAR0YWt_3e9gKOT4E6uDFFe5aQl4lZ6GMheji7DLbuXTORu1V2j5x8JUrDQQ',
            );
            const reponseJSON = await reponse.json();
            setNannys(reponseJSON.result.staffs);
        };
        fetchData();
    }, []);

    const nanny = nannys.find((nanny) => nanny.id === id);
    console.log(nanny);

    function getNannyLanguages(nanny) {
        if (nanny) {
            return nanny.user_language.map(function (lang) {
                return lang.name;
            });
        }
    }
    var nannyLanguages = getNannyLanguages(nanny);
    var nannyLanguagesString = nannyLanguages ? nannyLanguages.join(', ') : '';

    // format số tiền 100000 => 100,000
    function formatNumber(number) {
        const formattedNumber = number.toLocaleString('en-US');
        return formattedNumber;
    }

    function calculateAverageRating(reviews) {
        var totalStars = 0;
        var totalReviews = reviews.length;

        for (var i = 0; i < totalReviews; i++) {
            totalStars += reviews[i].star;
        }

        var averageRating = totalStars / totalReviews;
        if (totalReviews === 0) return 0;
        else return averageRating;
    }

    function FeedBack() {
        console.log(value);
        console.log(review);
        const url = 'https://babybuddies-be-dev.onrender.com/api/v1/ratings/staff/' + id;
        console.log(url);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                star: value,
                review: review,
            }),
        }).then(() => {
            //load lai phan danh gia cua nanny sau khi post
            const fetchData = async () => {
                const reponse = await fetch(
                    'https://babybuddies-be-dev.onrender.com/api/v1/home?fbclid=IwAR0YWt_3e9gKOT4E6uDFFe5aQl4lZ6GMheji7DLbuXTORu1V2j5x8JUrDQQ',
                );
                const reponseJSON = await reponse.json();
                setNannys(reponseJSON.result.staffs);
            };
            fetchData();
            //dong modal
            handleClose();
        });
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);

    const BookingButton = styled(Button)({
        backgroundColor: '#007320',
        fontSize: '24px',
        margin: 5,
        width: '200px',
        height: '40px',
        textTransform: 'none',
        color: '#ffffff',
        '&:hover': {
            backgroundColor: '#339966',
            color: '#000000',
        },
    });

    const FeedbackButton = styled(Button)({
        backgroundColor: 'red',
        margin: 5,
        fontSize: '24px',
        width: '200px',
        height: '40px',
        textTransform: 'none',
        color: '#ffffff',
        '&:hover': {
            backgroundColor: '#e64747',
            color: '#000000',
        },
    });

    const MyButton = styled(Button)({
        backgroundColor: '#c1bebe',
        color: '#000000',
        borderRadius: '20px',
        paddingLeft: '30px',
        paddingRight: '30px',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#bfbaba',
        },
    });

    const BookingModalStyle = {
        display: 'flex',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000
    }

    const blue = {
        100: '#DAECFF',
        200: '#b6daff',
        400: '#3399FF',
        500: '#007FFF',
        600: '#0072E5',
        900: '#003A75',
    };

    const grey = {
        50: '#f6f8fa',
        100: '#eaeef2',
        200: '#d0d7de',
        300: '#afb8c1',
        400: '#8c959f',
        500: '#6e7781',
        600: '#57606a',
        700: '#424a53',
        800: '#32383f',
        900: '#24292f',
    };

    const StyledTextarea = styled(TextareaAutosize)(
        ({ theme }) => `
        width: 770px;
        font-family: IBM Plex Sans, sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 12px;
        border-radius: 12px;
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
      
        &:hover {
          border-color: ${blue[400]};
        }
      
        &:focus {
          border-color: ${blue[400]};
          box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
        }
      
        // firefox
        &:focus-visible {
          outline: 0;
        }
      `,
    );



    //handleDelete
    const handleDeleteCMT = async (id) => {
        await fetch(`https://babybuddies-be-dev.onrender.com/api/v1/ratings`, { method: 'DELETE' });
        setNannys(nanny.filter((nanny) => nanny.id !== id));
        setOpenDelete(true);
    };

    const notify = () => toast("Booking Success!");

    return (
        <div ref={parent} className='main-session staff-detail-container'>
            <ToastContainer />
            {/* {nanny && isLogin && ( */}
            {nanny && (
                <div>
                    {
                        isBooking && (
                            <div
                                style={BookingModalStyle}
                            >
                                <BookingForm
                                    nanny={nanny}
                                    setisbooking={setIsBooking}
                                    notify={notify}
                                >
                                </BookingForm>
                            </div>
                        )
                    }


                    <div className={styles.container1}>
                        <div className={styles.leftBox}>
                            <label className={styles.labelName}>Name</label>
                            <span className={styles.inputField}>
                                <p className={styles.inputFieldText}>{nanny.full_name}</p>
                            </span>

                            <label className={styles.labelName}>Gender</label>
                            <ul>
                                <li className={styles.font24}>{nanny.gender}</li>
                            </ul>

                            <label className={styles.labelName}>Birthday</label>
                            <span className={styles.inputField}>
                                <p className={styles.inputFieldText}>{nanny.birthday}</p>
                            </span>

                            <label className={styles.labelName}>Address</label>
                            <span className={styles.inputField}>
                                <p className={styles.inputFieldText}>{nanny.address}</p>
                            </span>

                            <label className={styles.labelName}>Experience of Cooking</label>
                            <span className={styles.inputField}>
                                <p className={styles.inputFieldText}>{nanny.cook_exp} of experience</p>
                            </span>

                            <label className={styles.labelName}>Experience of Child Care</label>
                            <span className={styles.inputField}>
                                <p className={styles.inputFieldText}>{nanny.care_exp} of experience</p>
                            </span>

                            <label className={styles.labelName}>Languages</label>
                            <span className={styles.inputField}>
                                <p className={styles.inputFieldText}>{nannyLanguagesString}</p>
                            </span>

                            <label className={styles.labelName}>Price</label>
                            <span className={styles.staffPrice}> {formatNumber(nanny.salary)} VND/day</span>
                        </div>

                        <div className={styles.rightBox}>
                            <div className={styles.imgDiv}>
                                <img className={styles.staffImg} src={nanny.image_link} alt="" />
                            </div>
                            <div className={styles.starList}>
                                <Rating
                                    style={{ color: '#0d520d' }}
                                    name="read-only"
                                    value={calculateAverageRating(nanny.rating)}
                                    readOnly
                                    precision={0.1}
                                    sx={{ fontSize: '58px' }}
                                />
                            </div>
                            <div className={styles.BookOrReport}>
                                <Box sx={{ marginLeft: '150px' }}>
                                    <BookingButton
                                        variant="contained"
                                        sx={{ marginRight: '100px' }}
                                        onClick={() => {
                                            setIsBooking(true);
                                        }}
                                    >
                                        Booking
                                    </BookingButton>
                                    <FeedbackButton variant="contained" onClick={handleOpen}>
                                        Feedback
                                    </FeedbackButton>
                                </Box>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    {/* Modal Feedback */}
                                    <Box sx={style} borderRadius={5} border="1px solid">
                                        <Typography
                                            id="modal-modal-title"
                                            variant="h6"
                                            component="h2"
                                            fontWeight="bold"
                                            fontSize="28px"
                                        >
                                            Feedback
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }} fontWeight="bold">
                                            Rating :
                                        </Typography>
                                        <Typography sx={{ marginLeft: 8 }}>
                                            <Rating
                                                sx={{ color: '#4d4dff' }}
                                                size="large"
                                                name="simple-controlled"
                                                value={value}
                                                onChange={(event, newValue) => {
                                                    setValue(newValue);
                                                }}
                                            />
                                        </Typography>

                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            <textarea
                                                style={{
                                                    width: '90%',
                                                    height: '100px',
                                                    borderRadius: '20px',
                                                    padding: '25px',
                                                    marginLeft: '15px',
                                                }}
                                                aria-label="empty textarea"
                                                placeholder="Write comment"
                                                minRows={3}
                                                value={review}
                                                onChange={(e) => setReview(e.target.value)}
                                            />
                                        </Typography>

                                        <Typography
                                            sx={{
                                                marginTop: '20px',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                display: 'flex',
                                            }}
                                        >
                                            <MyButton onClick={FeedBack} sx={{ marginRight: '25px' }}>
                                                Submit
                                            </MyButton>
                                            <MyButton onClick={handleClose}>Cancel</MyButton>
                                        </Typography>
                                    </Box>
                                </Modal>
                            </div>
                        </div>
                    </div>

                    <span className={styles.commentText}>previous comment</span>
                    <div className={styles.container3}>
                        {nanny &&
                            nanny.rating.map((item, index) => (
                                <div key={index} className={styles.prevComment}>
                                    <div className={styles.close}>
                                        <span style={{ fontWeight: 'bold', marginLeft: '16px' }}>
                                            {item.star}
                                            <span className={styles.greenStar2}>&#9733;</span>
                                        </span>
                                        <span className={styles.delete} onClick={handleOpenDelete}>
                                            X
                                        </span>
                                        <Modal
                                            open={openDelete}
                                            onClose={handleCloseDelete}
                                            aria-labelledby="modal-modal-title1"
                                            aria-describedby="modal-modal-description1"
                                        >
                                            {/* Modal delete */}
                                            <Box sx={styleDelete} borderRadius={5} border="1px solid">
                                                <Typography
                                                    id="modal-modal-title1"
                                                    variant="h6"
                                                    component="h2"
                                                    fontWeight="bold"
                                                    fontSize="28px"
                                                    textAlign={'center'}
                                                >
                                                    Delete Comment?
                                                </Typography>
                                                <Typography
                                                    id="modal-modal-description"
                                                    sx={{ mt: 2 }}
                                                    fontWeight="bold"
                                                    textAlign={'center'}
                                                >
                                                    Are you sure want to delete the comment ? Once deleted, it the
                                                    comment? Once deleteed, it cannot be restored.
                                                </Typography>

                                                <Typography
                                                    sx={{
                                                        marginTop: '20px',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        display: 'flex',
                                                    }}
                                                >
                                                    <Typography>
                                                        <MyButton onClick={handleCloseDelete}>Cancel</MyButton>
                                                        <MyButton
                                                            sx={{ marginRight: '5px' }}
                                                        // onClick={() => handleDeleteCustomer(nanny.id)}
                                                        >
                                                            Delete
                                                        </MyButton>
                                                    </Typography>
                                                </Typography>
                                            </Box>
                                        </Modal>
                                    </div>
                                    <br />
                                    <span
                                        style={{
                                            marginLeft: '16px',
                                            display: 'block',
                                            marginBottom: '12px',
                                        }}
                                    >
                                        {item.review}
                                    </span>
                                </div>
                            ))}{' '}
                    </div>
                </div>
            )}
        </div>
    );
}
