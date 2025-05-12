import React from "react";

import Avatar from "@mui/material/Avatar";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

type TransactionCardProps = {
    id?: string;
    amount: number;
    type: string;
    date: string;
    description: string;
}

const TransactionCard: React.FC<TransactionCardProps> = ({id, amount, type, date, description,}) => {
    return (
        <Card>
            <CardContent sx={{display: "flex", gap: 1, alignItems: "center"}}>
                <Box sx={{flex: .1}}>
                    <Avatar>{description.charAt(0)}</Avatar>
                </Box>
                <Box sx={{flex: 1}}>
                    <Typography variant="subtitle1" color="textPrimary">
                        <b>{description}</b>
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        ${amount}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default TransactionCard;