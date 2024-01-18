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
        Snackbar,
        Avatar} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { mainColor } from '../common/utils';
import { GiCardAceHearts } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { handleSnackbarClose } from '../common/functions';
import AvatarComponent from './AvatarComponent';

const BridgeAppBar = (props) => {
  const appBarColor = '#171616';
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [count, setCount] = useState();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const onClose = (event, reason) => handleSnackbarClose(setOpenSnackbar, event, reason);

  const handleAvatarClick = () => {
    setOpenProfileMenu(!openProfileMenu);
  }

  const handleAccountClick = () => {
    if (localStorage.getItem('user')) {
      navigate('/account');
    } else {
      setOpenSnackbar(true);
    }
  }

  const handleProfileMenuClose = () => {
    setOpenProfileMenu(false);
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

  const handleSignUp = () => {
    navigate('/signup');
  }

  const handleUsernameDisplay = () => {
    const user = localStorage.getItem('user');
    if (user) {
      return user;
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
                    <AvatarComponent
                      src={localStorage.getItem('avatarURL')}
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
                            <MenuItem onClick={handleAccountClick}>My account</MenuItem>
                            {
                              localStorage.getItem('user') ? 
                              <MenuItem onClick={props.logout}>Log out</MenuItem> :
                              <>
                                <MenuItem onClick={handleSignIn}>Sign in</MenuItem>
                                <MenuItem onClick={handleSignUp}>Sign up</MenuItem>
                              </>
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
          onClose={onClose}
        >
          <Alert
            onClose={onClose}
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