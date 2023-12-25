import React, { useEffect, useState } from 'react';
import Profile from '../components/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, profileSelector } from '../redux/selector';
import { useFormik } from 'formik';
import { offDualRingLoading, onDualRingLoading } from '../redux/slices/loading.slice';
import { validateProfile } from '../validation';
import { updateProfileUserApi } from '../api/profile.api';
import Swal from 'sweetalert2';
import { updateUserInfo } from '../redux/slices/auth.slice';
import { nationalities } from '../constants/nationality';
import { changeIsUpdate, saveProfileInfo } from '../redux/slices/profile.slice';
import { useNavigate } from 'react-router-dom';

const ProfileContainer = () => {
    const { userId, avatar } = useSelector(authSelector);
    const { data } = useSelector(profileSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [nationHeight, setNationHeight] = useState(0);

    const formik = useFormik({
        initialValues: {
            name: '',
            nationality: '',
            phone: '',
            gender: '',
            address: '',
            want_to: '',
            password: '',
        },
        validationSchema: validateProfile,
        onSubmit: (values) => {
            dispatch(onDualRingLoading());
            if (userId) {
                const form = {
                    userInfo: {
                        address: values.address,
                        gender: values.gender,
                        name: values.name,
                        nationality: values.nationality,
                        phone: values.phone,
                        wantTo: values.want_to,
                    },
                    password: values.password,
                };

                if (form.password.trim().length < 1) {
                    delete form['password'];
                }

                updateProfileUserApi(userId, form)
                    .then((res) => {
                        const { user_info } = res.data.result;
                        dispatch(updateUserInfo({ fullName: user_info.name }));
                        dispatch(saveProfileInfo(user_info));
                        dispatch(offDualRingLoading());
                        setMessage((message) => message + 'success');

                        Swal.fire({
                            title: 'Success',
                            text: 'プロフィールの更新に成功しました！',
                            icon: 'success',
                            confirmButtonText: 'Home Page',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                dispatch(changeIsUpdate(true));
                                navigate('/');
                            }
                        });
                    })
                    .catch((err) => {
                        dispatch(offDualRingLoading());
                        console.log(err);
                    });
            }
        },
    });

    const handleSelectNationality = (nationality_id) => {
        const nationality = nationalities.find((item) => item.id === nationality_id);
        if (nationality) {
            formik.setFieldValue('nationality', nationality.value);
            setNationHeight(0);
        }
    };

    useEffect(() => {
        const user_info = data;
        const formData = { ...formik.values };
        for (const key in user_info) {
            if (Object.hasOwnProperty.call(formData, key)) {
                formData[key] = user_info[key];
            }
        }
        formik.setValues(formData);
        //eslint-disable-next-line
    }, [message, data]);

    return (
        <Profile
            formik={formik}
            handleSelectNationality={handleSelectNationality}
            nationHeight={nationHeight}
            setNationHeight={setNationHeight}
            avatar={avatar}
        />
    );
};

export default ProfileContainer;
