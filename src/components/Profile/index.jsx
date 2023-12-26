import ImageIcon from '@mui/icons-material/Image';
import AnimateHeight from 'react-animate-height';
import { genders, nationalities } from '../../constants/profile';
import { useState } from 'react';

const Profile = ({ formik, handleSelectNationality, nationHeight, setNationHeight, avatar }) => {
    const [preview, setPreview] = useState(null);
    const handleChangeAvatar = (e) => {
        if (!!e.target.files && e.target.files.length > 0) {
            const objectUrl = URL.createObjectURL(e.target.files[0]);
            setPreview(() => objectUrl);
        }
    };
    return (
        <div className="main-session profile-container">
            <form className="profile-form" onSubmit={formik.handleSubmit}>
                <div className="main-form">
                    <div className="left-side">
                        <div className="profile-form__item">
                            <label className="profile-form__label">Name</label>
                            <input
                                type="text"
                                name="name"
                                className="profile-form__input"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />
                            {/* <p className="profile-error-message">{formik.errors.name}</p> */}
                        </div>
                        <div className="profile-form__item">
                            <label className="profile-form__label">Gender</label>
                            <div className="profile-form__input--target">
                                {genders.map((gender) => (
                                    <div className="profile-form__input--radio" key={gender.id}>
                                        <input
                                            type="radio"
                                            name="gender"
                                            id={gender.id}
                                            value={gender.value}
                                            checked={formik.values.gender === gender.value}
                                            onChange={formik.handleChange}
                                        />
                                        <label htmlFor={gender.id}>{gender.label}</label>
                                    </div>
                                ))}
                            </div>
                            {/* <p className="profile-error-message">{formik.errors.gender}</p> */}
                        </div>
                        <div className="profile-form__item">
                            <label className="profile-form__label">Address</label>
                            <input
                                type="text"
                                name="address"
                                className="profile-form__input"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                            />
                            {/* <p className="profile-error-message">{formik.errors.address}</p> */}
                        </div>
                        <div className="profile-form__item">
                            <label className="profile-form__label">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                className="profile-form__input"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                            />
                            {/* <p className="profile-error-message">{formik.errors.phone}</p> */}
                        </div>
                        {/* <div className="profile-form__item profile-form__item--target"> */}
                        {/* <label className="profile-form__label">ニーズ</label>
                            {want_to.map((item) => (
                                <div className="profile-form__input--radio" key={item.id}>
                                    <input
                                        type="radio"
                                        name="want_to"
                                        id={item.id}
                                        value={item.value}
                                        checked={formik.values.want_to === item.value}
                                        onChange={formik.handleChange}
                                    />
                                    <label htmlFor={item.id}>{item.label}</label>
                                </div>
                            ))} */}

                        {/* <p className="profile-error-message">{formik.errors.target}</p> */}
                        {/* </div> */}
                        <div className="profile-form__item">
                            <label className="profile-form__label">Languages</label>
                            <input
                                type="text"
                                name="nationality"
                                className="profile-form__input"
                                value={formik.values.nationality}
                                readOnly
                                onClick={() => {
                                    setNationHeight(nationHeight === 0 ? 'auto' : 0);
                                }}
                            />
                            <AnimateHeight duration={300} height={nationHeight} className="animate-height--nationality">
                                <div className="select-nationality">
                                    {nationalities.map((item) => (
                                        <div
                                            className="select-nationality__item"
                                            key={item.id}
                                            onClick={() => {
                                                handleSelectNationality(item.id);
                                            }}
                                        >
                                            {item.value}
                                        </div>
                                    ))}
                                </div>
                            </AnimateHeight>
                            {/* <p className="profile-error-message">{formik.errors.nationality}</p> */}
                        </div>
                        <div className="pass-base">
                            <div className="profile-form__item">
                                <label className="profile-form__label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="profile-form__input"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                />
                                {/* <p className="profile-error-message">{formik.errors.password}</p> */}
                            </div>
                            <div className="profile-form__item">
                                <label className="profile-form__label">Confirm password</label>
                                <input type="password" name="password" className="profile-form__input" />
                                {/* <p className="profile-error-message">{formik.errors.password}</p> */}
                            </div>
                        </div>
                        <div className="profile-form__buttons">
                            <input type="submit" value="Save" className="profile-form__buttons--submit" />
                            <input type="reset" value="Cancel" className="profile-form__buttons--reset" />
                        </div>
                    </div>
                    <div className="right-side">
                        <div className="avatar-box">
                            <img src={!preview ? require('../img/avt.png') : preview} alt="" />
                        </div>
                        <input type="file" style={{ display: 'none' }} id="avatar" onChange={handleChangeAvatar} />
                        <label htmlFor="avatar" className="avatarRef">
                            Change avatar? Import here <ImageIcon />
                        </label>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Profile;
