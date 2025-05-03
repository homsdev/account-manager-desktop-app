import React, {createContext, ReactNode, useContext, useReducer} from "react";
import {Account} from "../../types/model/Account";

type State = {
    accounts: undefined | Account[],
    currentAccount: undefined | Account,
}

type Action = {
    type: "SET_ACCOUNTS";
    accounts: Account[];
} | {
    type: "SET_CURRENT_ACCOUNT";
    currentAccount: Account;
} | {
    type: "CREATE_ACCOUNT";
    newAccount: Account;
}

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "SET_ACCOUNTS":
            return {...state, accounts: action.accounts}
        case "SET_CURRENT_ACCOUNT":
            return {...state, currentAccount: action.currentAccount}
        case "CREATE_ACCOUNT":
            return {...state, accounts: [...state.accounts, action.newAccount]}
        default:
            return state;
    }
}

type DataContextType = State & {
    dispatch: React.Dispatch<Action>;
}

type Props = {
    children: ReactNode;
}

const initialState: State = {accounts: [], currentAccount: undefined};

export const DataContext = createContext<DataContextType>({
    ...initialState,
    dispatch: () => {
        console.warn("No dispatch has been implemented.")
    }
});

export function DataProvider({children}: Props) {
    const [{accounts, currentAccount}, dispatch] = useReducer(reducer, initialState);

    return (
        <DataContext.Provider value={{
            accounts,
            currentAccount,
            dispatch
        }}>
            {children}
        </DataContext.Provider>
    )
}

export const useDataContext = () => useContext(DataContext);