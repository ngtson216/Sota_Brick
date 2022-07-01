import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import { BsPerson } from 'react-icons/bs';
export default function Ava() {
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
                        <Avatar
                            alt="A"
                            sx={{ width: 30, height: 30 }}
                        />
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
                    <Avatar /> <b>Profile</b>
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
                            paddingBottom: '10px'
                        }}>
                            Account Manager
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
                            marginBottom: '200px',
                        }}>
                            Orders Manager
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