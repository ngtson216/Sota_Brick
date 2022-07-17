import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Avatar } from 'antd';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import jwtDecode from 'jwt-decode';

export default function Ava() {
    const decoded = jwtDecode(sessionStorage.getItem('token'));
    const url = "http://localhost:8080/api/v1/users/" + decoded.id
    const [items, setItems] = useState()
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", sessionStorage.getItem('token'));
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => setItems(result))
            .catch(error => console.log('error', error));
    }, [])
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const LogOut = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('role');
        window.location.href = '/'
    }
    const Profile = () => {
        window.location.href = '/Profile'
    }
    const AccountManagement = () => {
        window.location.href = '/UserManager'
    }
    const StockManager = () => {
        window.location.href = '/StockManager'
    }
    const Order = () => {
        window.location.href = '/Order'
    }
    const ROG = () => {
        window.location.href = '/Report-On-Gender'
    }
    const ROR = () => {
        window.location.href = '/Report-On-Revenue'
    }
    const ROQ = () => {
        window.location.href = '/Report-On-Number-Of-Product-Sold'
    }
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <div>
                            <Avatar
                                src='https://joeschmoe.io/api/v1/random'
                                alt="Avatar"
                                style={{
                                    borderStyle: 'solid',
                                    borderWidth: '1px',
                                    borderColor: 'black'
                                }}
                            />
                        </div>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 5px 10px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        bgcolor: '#E4E8EF',
                        border: '5px',
                        borderColor: '#9C8F6F',
                        '& .MuiAvatar-root': {
                            width: 30,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                            bgcolor: 'black'
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 16,
                            width: 10,
                            height: 10,
                            bgcolor: '#E4E8EF',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={Profile} style={{
                    paddingBottom: '10px',

                }}>
                    <Avatar
                        src='https://joeschmoe.io/api/v1/random'
                        alt="Avatar"
                        style={{
                            marginRight: '10px',
                            backgroundColor: 'white'
                        }}
                    /> <b>{items?.data?.name}</b>
                </MenuItem>
                {sessionStorage.getItem("role") === "customer" ?
                    <>
                        <MenuItem onClick={Profile} style={{
                            paddingRight: '60px',
                            paddingLeft: '30px',
                            paddingBottom: '10px',
                            width: '200px',
                        }}>
                            Profile
                        </MenuItem>
                        <MenuItem onClick={Order} style={{
                            paddingRight: '60px',
                            paddingLeft: '30px',
                            paddingBottom: '10px',
                            marginBottom: '200px',
                        }}>
                            Orders
                        </MenuItem>
                    </>
                    : null}

                {sessionStorage.getItem("role") === "admin" ?
                    <>
                        <MenuItem onClick={Profile} style={{
                            paddingRight: '60px',
                            paddingLeft: '30px',
                            paddingBottom: '10px',
                        }}>
                            Profile
                        </MenuItem>
                        <MenuItem onClick={AccountManagement} style={{
                            paddingRight: '60px',
                            paddingLeft: '30px',
                            paddingBottom: '10px',
                            marginBottom: '200px',
                        }}>
                            Account Manager
                        </MenuItem>
                    </>
                    : null}

                {sessionStorage.getItem("role") === "seller" ?
                    <>
                        <MenuItem onClick={Profile} style={{
                            paddingRight: '60px',
                            paddingLeft: '30px',
                            paddingBottom: '10px',
                        }}>
                            Profile
                        </MenuItem>
                        <MenuItem onClick={StockManager} style={{
                            paddingRight: '60px',
                            paddingLeft: '30px',
                            paddingBottom: '10px'
                        }}>
                            Stock Manager
                        </MenuItem>
                        <MenuItem onClick={Order} style={{
                            paddingRight: '60px',
                            paddingLeft: '30px',
                            paddingBottom: '10px',
                        }}>
                            Orders Manager
                        </MenuItem>
                        <MenuItem onClick={ROG} style={{
                            paddingRight: '60px',
                            paddingLeft: '30px',
                            paddingBottom: '10px',
                        }}>
                            Report On Gender
                        </MenuItem>
                        <MenuItem onClick={ROR} style={{
                            paddingRight: '60px',
                            paddingLeft: '30px',
                            paddingBottom: '10px',
                        }}>
                            Report On Revenue
                        </MenuItem>
                        <MenuItem onClick={ROQ} style={{
                            paddingRight: '60px',
                            paddingLeft: '30px',
                            paddingBottom: '10px',
                            marginBottom: '80px',
                        }}>
                            Report On Quantity
                        </MenuItem>
                    </>
                    : null}
                <Divider />
                <MenuItem onClick={LogOut}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}