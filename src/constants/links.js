import { ROUTE } from "./routes";

export const links = [
    {
        name: 'Login',
        title: 'login',
        path: ROUTE.LOGIN,
        isLogin: false,
        className: 'nav-link-login button-48'
    },
    {
        name: 'Sign up',
        title: 'register',
        path: ROUTE.SIGNUP,
        isLogin: false,
        className: 'nav-link-signup button-48'
    },
    {
        name: 'Profile',
        title: 'profile',
        path: ROUTE.PROFILE,
        isLogin: true,
        className: 'nav-link-profile'
    },
]

export const link1 = [
    {
        name: 'Đăng nhập',
        title: 'login',
        path: ROUTE.LOGIN,
        isLogin: false,
        className: 'nav-link-login button-48'
    },
    // {
    //     name: 'Sign up',
    //     title: 'register',
    //     path: ROUTE.SIGNUP,
    //     isLogin: false,
    //     className: 'nav-link-signup button-48'
    // }
]

export const link2 = [
    {
        name: 'Profile',
        title: 'profile',
        path: ROUTE.PROFILE,
        isLogin: true,
        className: 'nav-link-profile'
    },
]