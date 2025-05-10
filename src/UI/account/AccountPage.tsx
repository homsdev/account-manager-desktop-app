import React from "react";
import {useParams} from "react-router";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import {useDataContext} from "../context/DataContext";


type Params = {
    accountId: string;
}

const AccountPage: React.FC = () => {
    const {accountId} = useParams<Params>();
    const {currentAccount} = useDataContext();

    function handleClick() {
        console.log(accountId);
    }

    return (
        <Container>
            <Box>
                <Typography variant="h3">{currentAccount.alias}</Typography>
                <Typography variant="h4">Balance: ${currentAccount.balance}</Typography>
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
            <Box sx={{display: "flex", gap: "10px"}}>
                <Box sx={{display: "flex", flexGrow: 1, flexDirection: "column", gap: "10px"}}>
                    <Card sx={{flex: 1}}>
                        <CardContent>
                            <Box>
                                <Typography variant="body1">Month Expense</Typography>
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
                    <Card sx={{flex: 1}}>
                        <CardContent>
                            <Box>
                                <Typography variant="body1">Month Expense</Typography>
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
                <Box sx={{flexGrow: 1}}>
                    Here goes the calendar
                </Box>
            </Box>
        </Container>

    );
}

export default AccountPage;