import React, {FormEvent, useState} from 'react';
import {useDataContext} from "../context/DataContext";

import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Fab from "@mui/material/Fab";
import FormControl from "@mui/material/FormControl";
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import {Add} from '@mui/icons-material';

import AccountCard from "./AccountCard";
import {Account} from "../../types/model/Account";

const AccountPage: React.FC = () => {

    const [modalActive, setModalActive] = useState(false);
    const {accounts, dispatch} = useDataContext();

    function toggleModal() {
        setModalActive(!modalActive);
    }

    async function saveData(e: FormEvent<HTMLFormElement>) {
        console.info("executing saveData");
        e.preventDefault();
        const newAccountData = new FormData(e.currentTarget);
        const accountData = {
            alias: newAccountData.get('alias'),
            balance: parseFloat(newAccountData.get('balance') as string),
        } as Account;
        const createdAccount = await window.accountAPI.create(accountData);
        if (createdAccount) {
            dispatch({
                type: "CREATE_ACCOUNT",
                newAccount: createdAccount,
            })
        }
        setModalActive(false);
    }

    return (
        <>
            <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
                {accounts.map((account) => (
                    <AccountCard key={account.accountId} accountId={account.accountId} alias={account.alias}
                                 balance={account.balance}/>
                ))}
            </Box>
            <Fab color="success" sx={{position: "fixed", bottom: 24, right: 24}} onClick={toggleModal}>
                <Add/>
            </Fab>
            <Modal open={modalActive}>
                <Box sx={{
                    width: "400px",
                    bgcolor: "white",
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
                                    onClick={toggleModal}>Cancel</Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default AccountPage;