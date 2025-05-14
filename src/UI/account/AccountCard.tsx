import React from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Tooltip from '@mui/material/Tooltip';

import {Edit, Delete, NavigateNext} from "@mui/icons-material";
import {Account} from "../../types/model/Account";

type AccountCardProps = {
    accountId: string;
    alias: string;
    balance: number;
    onEditButtonClick: (account: Account) => void;
    onDeleteButtonClick: (account: Account) => void;
    onDetailsButtonClick: (account: Account) => void;
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
                                                     onDeleteButtonClick,
                                                     onDetailsButtonClick,
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
                        <Tooltip title="Editar">
                            <IconButton
                                onClick={() => onEditButtonClick({accountId, balance, alias})}>
                                <Edit/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                            <IconButton
                                color="error"
                                onClick={() => onDeleteButtonClick({accountId, balance, alias})}>
                                <Delete/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Detalles">
                            <IconButton
                                color="info"
                                onClick={() => onDetailsButtonClick({accountId, balance, alias})}>
                                <NavigateNext/>
                            </IconButton>
                        </Tooltip>
                    </>
                }
                title={alias.toUpperCase()}
                subheader={formatBalance(balance)}
            />
        </Card>
    )
}

export default AccountCard;