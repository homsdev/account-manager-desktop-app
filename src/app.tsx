import React from 'react';
import {createRoot} from 'react-dom/client';
import {AccountAPI} from "./types/api/AccountAPI";
import Routes from "./UI/Routes";
import {StyledEngineProvider, ThemeProvider} from "@mui/material";
import {DataProvider} from "./UI/context/DataContext";
import darkTheme from "./UI/themes//DarkTheme";
import {TransactionAPI} from "./types/api/TransactionAPI";

declare global {
    interface Window {
        accountAPI: AccountAPI;
        transactionAPI: TransactionAPI;
    }
}

const root = createRoot(document.body);
root.render(
    <React.StrictMode>
        <ThemeProvider theme={darkTheme}>
            <DataProvider>
                <StyledEngineProvider injectFirst>
                    <Routes/>
                </StyledEngineProvider>
            </DataProvider>
        </ThemeProvider>
    </React.StrictMode>
);