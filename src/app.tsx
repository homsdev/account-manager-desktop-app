import React from 'react';
import {createRoot} from 'react-dom/client';
import {AccountAPI} from "./types/AccountAPI";
import Routes from "./UI/Routes";
import {StyledEngineProvider} from "@mui/material";
import {DataProvider} from "./UI/context/DataContext";

declare global {
    interface Window {
        accountAPI: AccountAPI;
    }
}

const root = createRoot(document.body);
root.render(
    <React.StrictMode>
        <DataProvider>
            <StyledEngineProvider injectFirst>
                <Routes/>
            </StyledEngineProvider>
        </DataProvider>
    </React.StrictMode>
);