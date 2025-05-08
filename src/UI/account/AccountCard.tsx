import React from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";

import {Edit, Delete} from "@mui/icons-material";
import {Account} from "../../types/model/Account";

type AccountCardProps = {
    accountId: string;
    alias: string;
    balance: number;
    onEditButtonClick: (account: Account) => void;
    onDeleteButtonClick: (account: Account) => void;
}

const getRandomColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const AccountCard: React.FC<AccountCardProps> = ({
                                                     accountId,
                                                     balance,
                                                     alias,
                                                     onEditButtonClick,
                                                     onDeleteButtonClick
                                                 }) => {
    function formatBalance(quantity: number) {
        return Intl.NumberFormat("es-MX",
            {style: "currency", currency: "MXN"}).format(quantity);
    }

    return (
        <Card key={accountId}>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: getRandomColor()}}>
                        {alias.charAt(0).toUpperCase()}
                    </Avatar>
                }
                action={
                    <>
                        <IconButton
                            onClick={() => onEditButtonClick({accountId, balance, alias})}>
                            <Edit/>
                        </IconButton>
                        <IconButton
                            color="error"
                            onClick={() => onDeleteButtonClick({accountId, balance, alias})}>
                            <Delete/>
                        </IconButton>
                    </>
                }
                title={alias.toUpperCase()}
                subheader={formatBalance(balance)}
            />
        </Card>
    )
}

export default AccountCard;