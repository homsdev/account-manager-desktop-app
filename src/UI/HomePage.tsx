import React, {useEffect} from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import {AccountBalanceWallet, HomeFilled} from "@mui/icons-material";
import {Link, Outlet} from "react-router";

import {useDataContext} from "./context/DataContext";
import SimpleInfoCard from "./components/SimpleInfoCard";

const drawerWidth = 250;

const HomePage: React.FC = () => {

    const {accounts, dispatch} = useDataContext();

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await window.accountAPI.getAll();
                if (!response) {
                    throw new Error('Response was not found');
                }
                dispatch({
                    type: "SET_ACCOUNTS",
                    accounts: response
                })
            } catch (err) {
                console.error(err);
            } finally {
                console.log("Accounts fetching accounts...");
            }
        };
        fetchAccounts();
    }, []);

    return (
        <Box sx={{display: 'flex', width: '100%'}}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                sx={{width: '100%'}}
                color="transparent"
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Permanent drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                anchor="left"
                sx={{
                    width: drawerWidth,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <Toolbar/>
                <Divider/>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/">
                            <ListItemIcon>
                                <HomeFilled/>
                            </ListItemIcon>
                            <ListItemText primary="Home"></ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="accounts">
                            <ListItemIcon>
                                <AccountBalanceWallet/>
                            </ListItemIcon>
                            <ListItemText primary="Accounts"></ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider/>
            </Drawer>
            <Box
                component="main"
                sx={{flexGrow: 1, backgroundColor: 'background.default', p: 3}}
            >
                <Toolbar/>
                <Box sx={{display: 'flex', justifyContent: 'flex-start', gap: 2}}>
                    <SimpleInfoCard title="Current Accounts:" subTitle={accounts.length.toString()}/>
                    <SimpleInfoCard title="Current balance:" subTitle="$50,000.00"/>
                    <SimpleInfoCard title="Current expenses:" subTitle="$3,520.50"/>
                </Box>
                <Divider sx={{marginTop: 2}}/>
                <Outlet/>
            </Box>
        </Box>
    )
}

export default HomePage;