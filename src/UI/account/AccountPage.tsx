import React, {FormEvent, useState} from "react";
import {useParams} from "react-router";

import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";

import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';

import {useDataContext} from "../context/DataContext";
import TransactionCard from "../transactions/TransactionCard";
import {useTheme} from "@mui/material";
import {Transaction} from "../../types/model/Transaction";

import days from "dayjs";

type Params = {
    accountId: string;
}

const dummyTransactions = [{
    "id": 1,
    "amount": 43141.06,
    "type": "EXPENSE",
    "date": "11-03-2025",
    "description": "Ground Turkey"
}, {
    "id": 2,
    "amount": 7520.35,
    "type": "EXPENSE",
    "date": "22-06-2024",
    "description": "Electric Food Slicer"
}, {
    "id": 3,
    "amount": 37470.62,
    "type": "EXPENSE",
    "date": "22-03-2025",
    "description": "Stylish Combat Boots"
}, {
    "id": 4,
    "amount": 20229.52,
    "type": "EXPENSE",
    "date": "23-03-2025",
    "description": "Banana Chips"
}, {
    "id": 5,
    "amount": 37949.46,
    "type": "EXPENSE",
    "date": "20-07-2024",
    "description": "Kids' Crafting Station"
}, {
    "id": 6,
    "amount": 33762.73,
    "type": "EXPENSE",
    "date": "20-04-2025",
    "description": "Fire Roasted Salsa"
}, {
    "id": 7,
    "amount": 25702.39,
    "type": "EXPENSE",
    "date": "21-08-2024",
    "description": "Puzzle 3D Model Kit"
}, {
    "id": 8,
    "amount": 36019.74,
    "type": "EXPENSE",
    "date": "20-03-2025",
    "description": "Sweet Potato Tots"
}, {
    "id": 9,
    "amount": 20200.26,
    "type": "EXPENSE",
    "date": "31-01-2025",
    "description": "Electric Pressure Washer"
}, {
    "id": 10,
    "amount": 21867.35,
    "type": "EXPENSE",
    "date": "26-06-2024",
    "description": "Weighted Jump Rope"
}];

const AccountPage: React.FC = () => {

    const [modalActive, setModalActive] = useState<boolean>(false);
    const {accountId} = useParams<Params>();
    const {currentAccount} = useDataContext();
    const theme = useTheme();

    async function saveTransaction(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newTransaction = {
            amount: parseFloat(formData.get("amount") as string),
            type: formData.get("type"),
            date: formData.get("date"),
            description: formData.get("description"),
        } as Transaction;
        console.log(newTransaction);
        const res = await window.transactionAPI.create(accountId, newTransaction);
        console.log(res);
        setModalActive(false);
    }

    return (
        <Container>
            <Box>
                <Typography variant="h3">{currentAccount.alias}</Typography>
                <Box sx={{display: "flex", gap: "10px", marginTop: "10px", marginBottom: "10px"}}>
                    <Card sx={{flex: 1}}>
                        <CardContent>
                            <Box>
                                <Typography variant="body1">Current Balance</Typography>
                                <Typography variant="body2" color="textSecondary">$299.00</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                    <Card sx={{flex: 1}}>
                        <CardContent>
                            <Box>
                                <Typography variant="body1">Month Income</Typography>
                                <Typography variant="body2" color="textSecondary">$299.00</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                    <Card sx={{flex: 1}}>
                        <CardContent>
                            <Box>
                                <Typography variant="body1">Month Expense</Typography>
                                <Typography variant="body2" color="textSecondary">$299.00</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
            <Box>
                <Typography variant="h6">Recent Transactions</Typography>
            </Box>
            <Box sx={{display: "flex", gap: "10px"}}>
                <Box sx={{display: "flex", flex: 1, flexDirection: "column", gap: "10px"}}>
                    {dummyTransactions.map((transaction, index) => (
                        <TransactionCard
                            key={transaction.id}
                            amount={transaction.amount}
                            type={transaction.type}
                            date={transaction.date}
                            description={transaction.description}/>
                    ))}
                </Box>
                <Box sx={{flex: 1}}>
                    <TextField fullWidth variant="filled" label="Search"/>
                    <Button sx={{marginTop: 2}} variant="contained" fullWidth
                            onClick={() => setModalActive(true)}
                    >Add expense</Button>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar focusedView="month" view="month"/>
                    </LocalizationProvider>
                </Box>
            </Box>

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
                    <Box component="form" sx={{display: "flex", flexDirection: "column", gap: 2}}
                         onSubmit={saveTransaction}>
                        <TextField sx={{flex: 1}} name='description' type="text" label="Transaction Description"
                                   variant="filled"></TextField>
                        <TextField sx={{flex: 1}} name='amount' type="number" label="Amount"
                                   variant="filled"></TextField>
                        <TextField sx={{flex: 1}} name='date' type="date" label="Date"
                                   variant="filled" defaultValue={days().format("YYYY-MM-DD")}></TextField>
                        <FormControl variant="filled" sx={{flexGrow: 1}}>
                            <InputLabel id="type-label">Type</InputLabel>
                            <Select name="type" labelId="type-label" label="Type">
                                <MenuItem value="EXPENSE">Expense</MenuItem>
                                <MenuItem value="INCOME">Income</MenuItem>
                            </Select>
                        </FormControl>
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
                                    onClick={() => setModalActive(false)}>Cancel</Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Container>

    );
}

export default AccountPage;