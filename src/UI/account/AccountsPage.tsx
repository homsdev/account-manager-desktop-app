import React, {FormEvent, useState} from 'react';
import {useDataContext} from "../context/DataContext";

import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Fab from "@mui/material/Fab";
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import {Add} from '@mui/icons-material';


import AccountCard from "./AccountCard";
import {Account} from "../../types/model/Account";
import {useNavigate} from "react-router";
import {useTheme} from "@mui/material";


enum submitAction {
    EDIT = "edit",
    CREATE = "create",
}

const AccountsPage: React.FC = () => {

    const navigate = useNavigate();
    const [modalActive, setModalActive] = useState(false);
    const [currentAction, setCurrentAction] = useState<submitAction>();
    const {accounts, currentAccount, dispatch} = useDataContext();
    const theme = useTheme();

    async function saveData(e: FormEvent<HTMLFormElement>) {
        console.info("executing saveData");
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const accountData: Partial<Account> = {
            alias: (formData.get('alias') as string) || currentAccount.alias,
            balance: parseFloat(formData.get('balance') as string) || currentAccount.balance,
        }

        if (currentAction === submitAction.CREATE) {
            const createdAccount = await window.accountAPI.create(accountData as Account);
            if (createdAccount) {
                dispatch({
                    type: "CREATE_ACCOUNT",
                    newAccount: createdAccount,
                })
            }
        }

        if (currentAction === submitAction.EDIT) {
            const updatedAccount = await window.accountAPI.update(accountData as Account, currentAccount.accountId);
            const updatedAccounts = accounts.map(account => {
                if (account.accountId === currentAccount.accountId) {
                    return {
                        ...account,
                        balance: updatedAccount.balance,
                        alias: updatedAccount.alias,
                    };
                }
                return account;
            });

            dispatch({
                type: "SET_ACCOUNTS",
                accounts: updatedAccounts,
            })
        }

        setModalActive(false);
    }

    function toggleModal() {
        setModalActive(!modalActive);
    }

    function onEditButtonClick(selectedAccount: Account) {
        setModalActive(true);
        setCurrentAction(submitAction.EDIT);
        dispatch({
            type: "SET_CURRENT_ACCOUNT",
            currentAccount: selectedAccount,
        });
    }

    function onDeleteButtonClick(accountToDelete: Account) {
        console.log(accountToDelete);
        window.accountAPI.deleteById(accountToDelete.accountId)
            .then(res => dispatch({
                type: "SET_ACCOUNTS",
                accounts: accounts.filter(account => account.accountId !== accountToDelete.accountId),
            }))
            .catch(err => console.log(err));
    }

    function onDetailsButtonClick(accountDetails: Account) {
        console.info(`Executing Details for ${accountDetails.accountId}`);
        const accountId = accountDetails.accountId;
        dispatch({
            type: "SET_CURRENT_ACCOUNT",
            currentAccount: accountDetails,
        })
        navigate(`${accountId}`);
    }

    function onCreateButtonClick() {
        setModalActive(true);
        setCurrentAction(submitAction.CREATE);
    }


    return (
        <>
            <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
                {accounts.map((account) => (
                    <AccountCard key={account.accountId} accountId={account.accountId} alias={account.alias}
                                 balance={account.balance}
                                 onEditButtonClick={onEditButtonClick}
                                 onDeleteButtonClick={onDeleteButtonClick}
                                 onDetailsButtonClick={onDetailsButtonClick}
                    />
                ))}
            </Box>
            <Fab color="success" sx={{position: "fixed", bottom: 24, right: 24}}
                 onClick={() => onCreateButtonClick()}>
                <Add/>
            </Fab>
            <Modal open={modalActive}>
                <Box sx={{
                    backgroundColor: theme.palette.background.paper,
                    width: "400px",
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                    padding: 2,
                    borderRadius: 4,
                }}>
                    <Box component="form" sx={{display: "flex", flexDirection: "column", gap: 2}} onSubmit={saveData}>
                        <TextField sx={{flex: 1}} name='alias' type="text" label="Account alias"
                                   variant="filled" defaultValue={currentAccount?.alias || ""}></TextField>
                        <TextField sx={{flex: 1}} name='balance' type="number" label="Balance"
                                   variant="filled" defaultValue={currentAccount?.balance || 0}></TextField>
                        <Box sx={{
                            width: '50%',
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 2,
                            alignSelf: "flex-end"
                        }}>
                            <Button sx={{flex: 1}} type="submit" variant="contained">
                                Add
                            </Button>
                            <Button sx={{flex: 1}} variant="outlined"
                                    onClick={() => toggleModal()}>Cancel</Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default AccountsPage;