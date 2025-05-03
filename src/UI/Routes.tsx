import {createHashRouter, RouterProvider} from "react-router";
import HomePage from "./HomePage";
import React from "react";
import AccountPage from "./account/AccountPage";
import MainHome from "./home/MainHome";

const router = createHashRouter([
    {
        path: "/",
        element: <HomePage/>,
        children: [
            {
                path: "/",
                element: <MainHome/>,
            },
            {
                path: "/accounts",
                element: <AccountPage/>
            }
        ]
    }
])

const Routes: React.FC = () => {
    return <RouterProvider router={router}/>;
}

export default Routes;
