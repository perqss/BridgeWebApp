import React, { useState, useRef, useEffect } from 'react';
import {AppBar, 
        MenuItem, 
        IconButton, 
        Paper, 
        MenuList, 
        ListItemText, 
        ListItemIcon, 
        Typography, 
        Popper, 
        Grow, 
        ClickAwayListener, 
        Divider, 
        Toolbar, 
        Box, 
        CssBaseline,
        Tooltip} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { mainColor } from '../common/utils';
import { FaSign, FaSignInAlt } from "react-icons/fa";
import { GiCardAceHearts } from "react-icons/gi";
import { useNavigate } from "react-router-dom";


const BridgeAppBar = (props) => {
  const appBarColor = '#171616';
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState();
  const anchorRef = useRef(null);
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    setOpen(!open);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleLogout = () => {
    localStorage.clear();
    props.setUsername('');
    props.setPassword('');
    props.setUser('');
  }

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/');
    }
  }, [user])

  const handleSignIn = () => {
    navigate('/');
  }

  const handleUsernameDisplay = () => {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user).username;
    } else {
    return 'Not logged in'
    }
  }

  return (
    <Box sx={{display: 'flex'}}>
        <AppBar position='fixed' sx={{
                backgroundColor: mainColor,
                height: '60px'
            }}>
            <CssBaseline/>
            <Toolbar>
              <Typography
                variant='h5'
                component="div"
                style={{
                  margin: 15,
                  flexGrow: 1,
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                Bridge App
              </Typography>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Tooltip title='Start playing'>
                  <IconButton
                    onClick={() => navigate('/game-mode')}
                    sx={{
                      color: 'white'
                    }}
                  >
                    <GiCardAceHearts
                      fontSize='40px'
                    />
                  </IconButton>

                </Tooltip>
                <Tooltip title='Account'>
                  <IconButton 
                    onClick={handleAvatarClick}
                    ref={anchorRef}
                  >
                    <AccountCircleIcon 
                      sx={{
                        fontSize: '45px',
                        color: 'white',
                      }}
                    />
                  <Popper
                    open={open}
                    placement='bottom-start'
                    transition
                    anchorEl={anchorRef.current}
                  >
                    {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === 'bottom-start' ? 'left top' : 'left bottom',
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            autoFocusItem={open}
                          >
                            <Typography sx={{marginLeft: 1}}>{handleUsernameDisplay()}</Typography>
                            <Divider/>
                            <MenuItem >My account</MenuItem>
                            {
                              localStorage.getItem('user') ? 
                              <MenuItem onClick={handleLogout}>Logout</MenuItem> :
                              <MenuItem onClick={handleSignIn}>Sign in</MenuItem>
                            }
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                    )}
                  </Popper>
                  </IconButton>
                  </Tooltip>
                </Box>
              </Toolbar>
        </AppBar>
    </Box>
  )
}

export default BridgeAppBar;