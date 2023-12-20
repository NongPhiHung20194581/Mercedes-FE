import DefaultLayout from '../layout/defaultLayout/DefaultLayout';
import RegisterLayout from '../layout/registerLayout/RegisterLayout';
import DetailNanny from '../pages/home/DetailNanny';
import Login from '../pages/login/Login';
import SignUp from '../pages/signUp/SignUp';
import Hired from '../pages/hired';
import HomePage from '../pages/home/HomePage';
import { ROUTE } from '../constants/routes';
import Layout from '../components/Layout';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import NotFoundPage from '../pages/404/NotFoundPage';
import ProfilePage from '../pages/profile/ProfilePage';

import HustPage from '../pages/hust/Hust';
import Hust from '../pages/hust/Hust';

export const publicRoutes = [
    { path: ROUTE.LAYOUT, element: HomePage, layout: RegisterLayout },
    { path: ROUTE.LOGIN, element: Login, layout: RegisterLayout },
    { path: ROUTE.SIGNUP, element: SignUp, layout: RegisterLayout },
    { path: ROUTE.LOGOUT, element: Login },
    { path: ROUTE.HOME, element: HomePage, layout: DefaultLayout },
    { path: ROUTE.NANNY_DETAIL, element: DetailNanny, layout: DefaultLayout },
    { path: ROUTE.PROFILE, element: ProfilePage, layout: DefaultLayout },
    { path: ROUTE.HIRED, element: Hired, layout: DefaultLayout },
    {path: ROUTE.HUST,element:Hust,layout:DefaultLayout}
];

export const routes = [
    {
        path: ROUTE.LAYOUT,
        element: <Layout />,
        isPrivate: false,
        children: [
            { path: ROUTE.HOME, element: <HomePage /> },
            { path: ROUTE.LOGIN, element: <Login /> },
            { path: ROUTE.SIGNUP, element: <SignUp /> },
            { path: ROUTE.NANNY_DETAIL, element: <DetailNanny /> },
            
        ]
    },
    {
        path: ROUTE.LAYOUT,
        element: <Layout />,
        isPrivate: true,
        children: [
            { path: ROUTE.PROFILE, element: <ProfilePage /> },
            { path: ROUTE.HIRED, element: <Hired /> },
        ]
    },
    {
        path: "*",
        is404: true,
        element: <NotFoundPage />
    },
    {
        path:"hust",
        element:<Hust/>,
        
    }


].map(route => {

    if (route.isPrivate) {
        return {
            ...route,
            element: <PrivateRoute>{route.element}</PrivateRoute>
        }
    }

    return {
        ...route,
        element: <PublicRoute>{route.element}</PublicRoute>
    }
})