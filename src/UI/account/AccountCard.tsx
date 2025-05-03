import React from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";

import {Edit,} from "@mui/icons-material";

type AccountCardProps = {
    accountId: string;
    alias: string;
    balance: number;
}

const getRandomColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const AccountCard: React.FC<AccountCardProps> = ({accountId, balance, alias}) => {
    return (
        <Card key={accountId}>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: getRandomColor()}}>
                        {alias.charAt(0).toUpperCase()}
                    </Avatar>
                }
                action={
                    <IconButton>
                        <Edit/>
                    </IconButton>
                }
                title={alias.toUpperCase()}
                subheader={`$${balance}`}
            />
        </Card>
    )
}

export default AccountCard;