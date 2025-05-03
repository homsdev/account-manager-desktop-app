import React from "react";
import {Box, Card, CardContent, Typography} from "@mui/material";

type SimpleInfoCardProps = {
    title: string;
    subTitle: string;
}

const SimpleInfoCard: React.FC<SimpleInfoCardProps> = ({title, subTitle}: SimpleInfoCardProps) => {
    return (
        <Box sx={{flex: "1"}}>
            <Card>
                <CardContent>
                    <Typography variant="subtitle1" color="textPrimary">
                        <b>{title}</b>
                    </Typography>
                    <Typography variant="body1" color="textSecondary">{subTitle}</Typography>
                </CardContent>
            </Card>
        </Box>
    )
}

export default SimpleInfoCard;