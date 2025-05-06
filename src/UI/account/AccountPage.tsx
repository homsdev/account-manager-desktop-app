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

enum submitAction {
    EDIT = "edit",
    CREATE = "create",
}

const AccountPage: React.FC = () => {

    const [modalActive, setModalActive] = useState(false);
    const [currentAction, setCurrentAction] = useState<submitAction>();
    const {accounts, currentAccount, dispatch} = useDataContext();

    async function saveData(e: FormEvent<HTMLFormElement>) {
        console.info("executing saveData");
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const accountData: Partial<Account> = {
            alias: formData.get('alias') as string,
            balance: parseFloat(formData.get('balance') as string),
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
                    return {...account, balance: updatedAccount.balance, alias: updatedAccount.alias};
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

    function onCreateButtonClick() {
        setModalActive(true);
        setCurrentAction(submitAction.CREATE);
    }

    return (
        <>
            <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
                {accounts.map((account) => (
                    <AccountCard key={account.accountId} accountId={account.accountId} alias={account.alias}
                                 balance={account.balance} onEditButtonClick={onEditButtonClick}/>
                ))}
            </Box>
            <Fab color="success" sx={{position: "fixed", bottom: 24, right: 24}}
                 onClick={() => onCreateButtonClick()}>
                <Add/>
            </Fab>
            <Modal open={modalActive}>
                <Box sx={{
                    width: "400px",
                    backgroundColor: "white",
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                    padding: 2,
                    borderRadius: 4,
                }}>
                    <Box component="form" sx={{display: "flex", flexDirection: "column", gap: 2}} onSubmit={saveData}>
                        <TextField sx={{flex: 1}} name='alias' type="text" label="Account alias"
                                   variant="filled"></TextField>
                        <TextField sx={{flex: 1}} name='balance' type="number" label="Balance"
                                   variant="filled"></TextField>
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

export default AccountPage;