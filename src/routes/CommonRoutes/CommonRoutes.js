import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import About from "../../pages/About/About";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import Media from "../../pages/Media/Media";
import SignUp from "../../pages/SignUp/SignUp";
import PrivateRoute from "../PrivateRoutes/PrivateRoute";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/media',
                element: <PrivateRoute><Media></Media></PrivateRoute>
            },
            {
                path: '/about',
                element: <About></About>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
        ]
    }
])