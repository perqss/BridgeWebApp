import React, { useState, useRef } from 'react';
import {AppBar, MenuItem, IconButton, Paper, MenuList, ListItemText, ListItemIcon, Typography, Popper, Grow, ClickAwayListener, Divider} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { mainColor } from '../common/utils';

const BridgeAppBar = (props) => {
  const appBarColor = '#171616';
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleAvatarClick = () => {
    setOpen(!open);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleLogout = () => {
    props.setUsername('');
    props.setPassword('');
    localStorage.clear();
  }

  const handleUsernameDisplay = () => {
    //JSON.parse(localStorage.getItem('user')).username
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user).username;
    } else {
    return 'Not logged in'
    }
  }

  console.log()
  return (
    <div>
        <AppBar position='fixed' sx={{
                display: 'flex', 
                flexDirection: 'row',
                backgroundColor: mainColor
            }}>
              <IconButton 
                sx={{
                  marginLeft: 'auto',
                }}
                onClick={handleAvatarClick}
                ref={anchorRef}
              >
                <AccountCircleIcon 
                  sx={{
                    fontSize: 50,
                    color: 'black'
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
                        <MenuItem >Profile</MenuItem>
                        <MenuItem >My account</MenuItem>
                        {
                          localStorage.getItem('user') ? 
                          <MenuItem onClick={handleLogout}>Logout</MenuItem> :
                          ''
                        }
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
                )}
              </Popper>
              </IconButton>
        </AppBar>
    </div>
  )
}

export default BridgeAppBar;