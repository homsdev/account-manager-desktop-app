import {createRoot} from 'react-dom/client';
import {AccountAPI} from "./types/AccountAPI";
import AccountPage from "./UI/account/AccountPage";

declare global {
    interface Window {
        accountAPI: AccountAPI;
    }
}

const root = createRoot(document.body);
root.render(
    <div>
        <AccountPage/>
    </div>
);