import {createHashRouter, RouterProvider} from "react-router";
import HomePage from "./HomePage";
import React from "react";
import AccountsPage from "./account/AccountsPage";
import AccountPage from "./account/AccountPage";
import MainHome from "./home/MainHome";

const router = createHashRouter([
    {
        path: "/",
        element: <HomePage/>,
        children: [
            {
                index: true,
                element: <MainHome/>,
            },
            {
                path: "accounts",
                element: <AccountsPage/>,
            },
            {
                path: "accounts/:accountId",
                element: <AccountPage/>,
            }
        ]
    }
])

const Routes: React.FC = () => {
    return <RouterProvider router={router}/>;
}

export default Routes;
