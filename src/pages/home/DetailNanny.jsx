import React, { useState } from 'react';
import styles from './ListNanny.module.scss';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, styled } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookingForm from '../../components/StaffDetailComponent/BookingForm';
import { BsEyeFill } from 'react-icons/bs'
import { nationalities } from '../../constants/profile';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../redux/selector';
import { handleRatingApi } from '../../api/rating.api';
import { offDualRingLoading, onDualRingLoading } from '../../redux/slices/loading.slice';
import CertificateModal from '../../components/StaffDetailComponent/CertificateModal';


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
    const [nanny, setNanny] = useState({
        ratings: [],
        user_language: [],
    });
    const { id } = useParams();
    const { userId } = useSelector(authSelector);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openLanguageDetail, setOpenLanguageDetail] = useState(false);
    const [openCookingDetail, setOpenCookingDetail] = useState(false);
    const [openChildcareDetail, setOpenChildcareDetail] = useState(false)
    const [currentSelectDeleteComment, setCurrentSelectDeleteComment] = useState(0);

    const [value, setValue] = useState(2);
    const [isBooking, setIsBooking] = useState(false);
    const [review, setReview] = useState('');
    // const [parent, enableAnimations] = useAutoAnimate(/* optional config */)

    const fetchData = async () => {
        const reponse = await fetch(
            'https://babybuddies-be-dev.onrender.com/api/v1/staffs/' + id,
        );
        const reponseJSON = await reponse.json();
        setNanny(reponseJSON.result);
    };

    React.useEffect(() => {
        fetchData();
        //eslint-disable-next-line
    }, []);

    function getNannyLanguages(nanny) {
        if (nanny) {
            return nanny.user_language.map(function (lang) {
                return lang.name;
            });
        }
    }
    var nannyLanguages = getNannyLanguages(nanny);
    var nannyLanguagesString = nannyLanguages ? nannyLanguages.join(', ') : '';

    const nannyLanguagesCer = () => {
        let certificate = [...nationalities]
            .filter(nationality => {
                // return [...nannyLanguages].some(language => language === nationality.value);
                return [...nannyLanguages].includes(nationality.value);
            })
            .map(element => (
                <img key={element.id}
                    className={styles.modalStaffDetailItemImg}
                    src={element.certificate}
                    alt=""
                />
            ))

        return certificate;
    };

    const nannyCookingCertificate = () => {
        return <img
            className={styles.modalStaffDetailItemImg}
            src={require("../../assets/img/cooking-certificate.jpg")}
            alt=''
        />
    }

    const nannyChildcareCertificate = () => {
        return <img
            className={styles.modalStaffDetailItemImg}
            src={require("../../assets/img/childcare-certificate.jpg")}
            alt=''
        />
    }

    // format số tiền 100000 => 100,000
    function formatNumber(number) {
        const formattedNumber = number?.toLocaleString('en-US');
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
        if (userId) {
            dispatch(onDualRingLoading());
            handleRatingApi(id, {
                star: value,
                review: review,
                userId: userId
            })
                .then(res => {
                    fetchData();
                    handleClose();
                    dispatch(offDualRingLoading());
                    notify('評価の追加に成功しました！');
                })
                .catch(err => {
                    handleClose();
                    dispatch(offDualRingLoading());
                    notify_failed('評価の追加に失敗しました！まず、このスタッフを予約する必要があります。');
                })
        } else {
            notify_failed('ログインしていないため、評価することはできません。');
        }
    }
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenLanguageDetail = () => setOpenLanguageDetail(true);
    const handleCloseLanguageDetail = () => setOpenLanguageDetail(false);
    const handleChangeCookingDetail = () => setOpenCookingDetail(!openCookingDetail);
    const handleChangeChildcareDetail = () => setOpenChildcareDetail(!openChildcareDetail);


    const handleOpenDelete = (id) => {
        console.log('select: ', id);
        setCurrentSelectDeleteComment(id);
        setOpenDelete(true)
    };

    const handleCloseDelete = () => {
        console.log('select: ', 0);
        setCurrentSelectDeleteComment(0);
        setOpenDelete(false)
    };

    //handleDelete
    const handleDeleteCMT = () => {
        console.log("Now delete comment: ", currentSelectDeleteComment);

        axios.delete(`https://babybuddies-be-dev.onrender.com/api/v1/ratings/${currentSelectDeleteComment}/delete`).then(() => {
            notify("コメントの削除に成功しました！");
            setOpenDelete(false);

            fetchData();
        });

    };

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

    const notify = (message) => toast.success(message, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });;

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

    return (
        <div
            className='main-session'
        >
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
                                    setIsBooking={setIsBooking}
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
                                <li className={styles.font24}>
                                    <span className={styles.dot}></span>

                                    {nanny.gender === 'male' ? '男' : '女'}
                                </li>
                            </ul>

                            <label className={styles.labelName}>Birthday</label>
                            <span className={styles.inputField}>
                                <p className={styles.inputFieldText}>{nanny.birthday}</p>
                            </span>

                            <label className={styles.labelName}>Address</label>
                            <span className={styles.inputField}>
                                <p className={styles.inputFieldText}>{nanny.address}</p>
                            </span>

                            <label className={styles.labelName}>
                                Experience
                                {/* <span
                                    className={styles.modalStaffDetailItemIcon}
                                    onClick={handleChangeCookingDetail}
                                > */}
                                    {/* <BsEyeFill /> */}
                                {/* </span> */}
                            </label>
                            <CertificateModal
                                isOpen={openCookingDetail}
                                onCloseModal={handleChangeCookingDetail}
                                renderData={nannyCookingCertificate()}
                            />
                            <span className={styles.inputField}>
                                <p className={styles.inputFieldText}>{nanny.cook_exp}</p>
                            </span>

                            {/* <label className={styles.labelName}>
                                子供の世話経験
                                <span
                                    className={styles.modalStaffDetailItemIcon}
                                    onClick={handleChangeChildcareDetail}
                                >
                                    <BsEyeFill />
                                </span>
                            </label> */}
                            <CertificateModal
                                isOpen={openChildcareDetail}
                                onCloseModal={handleChangeChildcareDetail}
                                renderData={nannyChildcareCertificate()}
                            />
                            {/* <span className={styles.inputField}>
                                <p className={styles.inputFieldText}>{nanny.care_exp}</p>
                            </span> */}

                            <label className={styles.labelName}>
                                Languages
                                <span
                                    className={styles.modalStaffDetailItemIcon}
                                    onClick={handleOpenLanguageDetail}
                                >
                                    {/* <BsEyeFill /> */}
                                </span>
                            </label>
                            <CertificateModal
                                isOpen={openLanguageDetail}
                                onCloseModal={handleCloseLanguageDetail}
                                renderData={nannyLanguagesCer()}
                            />
                            <span className={styles.inputField}>
                                <p className={styles.inputFieldText}>{nannyLanguagesString}</p>
                            </span>

                            {/* <label className={styles.labelName}>価格</label>
                            <span className={styles.staffPrice}> {formatNumber(nanny.salary)} VND/日</span> */}
                        </div>

                        <div className={styles.rightBox}>
                            <div className={styles.imgDiv}>
                                <img className={styles.staffImg} src={nanny.image_link} alt="" />
                            </div>
                            <div className={styles.starList}>
                                <Rating
                                    style={{ color: '#ffea00' }}
                                    name="read-only"
                                    value={calculateAverageRating(nanny.ratings)}
                                    readOnly
                                    precision={0.1}
                                    sx={{ fontSize: '58px' }}
                                />
                            </div>
                            <div className={styles.BookOrReport}>
                                <Box className={styles.BookOrReportButton}>
                                    <BookingButton
                                        variant="contained"
                                        sx={{ marginRight: '100px', width: '200px', fontWeight: 600 , color: 'black'}}
                                        onClick={() => {
                                            setIsBooking(true);
                                        }}
                                    >
                                        Booking
                                    </BookingButton>
                                    <FeedbackButton
                                        variant="contained"
                                        onClick={handleOpen}
                                        sx={{ width: '300px', fontWeight: 600 , color: 'black'}}
                                    >
                                        Report
                                    </FeedbackButton>
                                </Box>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                    closeAfterTransition
                                    sx={{
                                        zIndex: 1000
                                    }}
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
                                            フィードバック
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }} fontWeight="bold">
                                            星付け
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
                                                OK
                                            </MyButton>
                                            <MyButton onClick={handleClose}>キャンセル</MyButton>
                                        </Typography>
                                    </Box>
                                </Modal>
                            </div>
                        </div>
                    </div>

                    {/* <span className={styles.commentText}>コメント</span> */}
                    <div
                        // ref={parent}
                        className={styles.container3}
                    >
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
                                    コメントを削除しますか？
                                </Typography>
                                <Typography
                                    id="modal-modal-description"
                                    sx={{ mt: 2 }}
                                    fontWeight="semibold"
                                    textAlign={'center'}
                                >
                                    コメントを削除してもよろしいですか？
                                    削除した後は復元することはできません。
                                </Typography>

                                <Typography
                                    sx={{
                                        marginTop: '20px',
                                        alignItems: 'center',
                                        display: 'flex',
                                        justifyContent: 'space-evenly',
                                    }}
                                >
                                    <MyButton
                                        onClick={handleCloseDelete}
                                    >
                                        Cancel
                                    </MyButton>
                                    <MyButton
                                        onClick={() => handleDeleteCMT(1)}
                                    >
                                        Delete
                                    </MyButton>
                                </Typography>
                            </Box>
                        </Modal>
                        {/* {nanny &&
                            nanny.ratings.map((item, index) => (
                                <div key={index} className={styles.prevComment}>
                                    <div className={styles.close}>
                                        <span style={{ fontWeight: 'bold', marginLeft: '16px' }}>
                                            <span className={styles.commentUser}> {item.username ? item.username : 'Phan Dang Minh'} </span>
                                            {item.star}
                                            <span className={styles.greenStar2}>&#9733;</span>
                                        </span>
                                        {
                                            (item.user_id === userId) && (
                                                <span className={styles.delete} onClick={() => handleOpenDelete(item.id)}>
                                                    X
                                                </span>
                                            )
                                        }
                                    </div>
                                    <span className={styles.review}
                                    >
                                        {item.review}
                                    </span>
                                </div>
                            ))}{' '} */}
                    </div>
                </div>
            )}
        </div>
    );
}
