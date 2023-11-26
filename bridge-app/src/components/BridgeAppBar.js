import React, { useState, useRef, useEffect } from 'react';
import {AppBar, 
        MenuItem, 
        IconButton, 
        Paper, 
        MenuList, 
        Typography, 
        Popper, 
        Grow, 
        ClickAwayListener, 
        Divider, 
        Toolbar, 
        Box, 
        CssBaseline,
        Tooltip,
        Alert,
        Snackbar} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { mainColor } from '../common/utils';
import { GiCardAceHearts } from "react-icons/gi";
import { useNavigate } from "react-router-dom";


const BridgeAppBar = (props) => {
  const appBarColor = '#171616';
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [count, setCount] = useState();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const anchorRef = useRef(null);
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    setOpenProfileMenu(!openProfileMenu);
  }

  const handleProfileMenuClose = () => {
    setOpenProfileMenu(false);
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  }

  const handleLogout = () => {
    localStorage.clear();
    props.setUsername('');
    props.setPassword('');
    props.setUser('');
    setCount(count + 1);
  }

  const handleCardIconClick = () => {
    if (localStorage.getItem('user')) {
      navigate('/game-mode');
    } else {
      setOpenSnackbar(true);
    }
  }

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/');
    }
  }, [count])

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
                    onClick={handleCardIconClick}
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
                    open={openProfileMenu}
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
                        <ClickAwayListener onClickAway={handleProfileMenuClose}>
                          <MenuList
                            autoFocusItem={openProfileMenu}
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
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity='warning'
            variant='filled'
            sx={{
              width: '100%'
            }}
          >
            You need to log in or sign up first
          </Alert>
        </Snackbar>
    </Box>
  )
}

export default BridgeAppBar;