import React, { useEffect, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTE } from '../../../constants/routes';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/slices/auth.slice';
import { clearProfile } from '../../../redux/slices/profile.slice';
import { profileSelector } from '../../../redux/selector';

const DropDownMenu = ({ height, setHeight }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = useSelector(profileSelector);
    var targetObject = {
        name: '',
        nationality: '',
        phone: '',
        gender: '',
        address: '',
        want_to: '',
        password: '',
        role: 0,
    };
    targetObject = Object.assign({}, data.data);
    //console.log('new >>>', targetObject);

    return (
        <AnimateHeight className="dropdown-menu" height={height} duration={250}>
            <Link className="dropdown-menu__item" to={ROUTE.PROFILE} onClick={setHeight}>
                Profile
            </Link>

            {targetObject.role == 3 ? (
                <Link className="dropdown-menu__item" to={ROUTE.HIRED} onClick={setHeight}>
                    Manage bookings
                </Link>
            ) : (
                <Link className="dropdown-menu__item" to={ROUTE.CALENDAR} onClick={setHeight}>
                    Calendar
                </Link>
            )}

            <div
                className="dropdown-menu__item"
                onClick={() => {
                    dispatch(logout());
                    dispatch(clearProfile());
                    setHeight();
                    navigate('/');
                }}
            >
                Log out
            </div>
        </AnimateHeight>
    );
};

export default DropDownMenu;
