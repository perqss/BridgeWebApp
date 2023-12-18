import React, {useState, useRef} from 'react';
import { Avatar, Button, Paper, Typography, Dialog, DialogTitle, Box, Snackbar, Alert} from '@mui/material';
import { FormButton, FormTextField, FormBox } from '../components/MaterialComponentsCss';
import { mainColor } from '../common/utils';
import { inputLabelProps, inputProps } from '../components/MaterialComponentsCss';
import { backgroundColor } from '../common/utils';
import { handleSnackbarClose } from '../common/functions';


const Account = (props) => {
    const [avatarImage, setAvatarImage] = useState(() => {
        // Try to get the avatar URL from local storage on component mount
        return localStorage.getItem('avatarURL') || null;
      });
    const [openChangePasswordForm, setOpenChangePasswordForm] = useState(false);
    const [values, setValues] = useState({
        oldPassword: '',
        newPasswordFirst: '',
        newPasswordSecond: '',
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarInfo, setSnackbarInfo] = useState({
        severity: 'error',
        message: '',
    });
    const onCloseSnackbar = (event, reason) => handleSnackbarClose(setOpenSnackbar, event, reason);

    const handleFileChange = (event) => {
      const file = event.target.files[0];
  
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatarImage(reader.result);
          localStorage.setItem('avatarURL', reader.result);
          props.setCount(props.count + 1);
        };
  
        reader.readAsDataURL(file);
      }
    };

    const handleChangePassword = () => {
        setOpenChangePasswordForm(true);
    }

    const checkNewPassword = (password) => {
        // implement some password checking logic in the future
        return !(password === '');
    }

    const handleSubmit = () => {
        const user = localStorage.getItem('user');
        if (values.newPasswordFirst !== values.newPasswordSecond) {
            setSnackbarInfo({severity: 'error', message: 'Passwords do not match'});
        } else if (!checkNewPassword(values.newPasswordFirst)) {
            setSnackbarInfo({severity: 'error', message: 'New password cannot be empty'});
        } else {
            const response = props.changePassword({ username: user, password: values.oldPassword,
                new_password: values.newPasswordFirst });
            setSnackbarInfo(props.error == '' ? {severity: 'success', message: 'Successfully changed the password'} :
                {severity: 'error', message: props.error});
            setOpenChangePasswordForm(false);
            // user.password = values.newPasswordFirst; 
            // localStorage.setItem('user', JSON.stringify(user));
        }
        setOpenSnackbar(true);
    }

    const handleInputChange = (e) => {
        let {name, value} = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    }
  
    return (
        <div
            style={{
                marginTop: '100px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <Dialog
                open={openChangePasswordForm}
                onClose={() => setOpenChangePasswordForm(false)}
                
            >   
                <Box
                    sx={{
                        backgroundColor: backgroundColor,
                        border: '3px solid',
                        borderColor: 'black'
                    }}
                >
                    <DialogTitle
                        sx={{
                            color: 'white'
                        }}
                    >
                        Change Password
                    </DialogTitle>
                    <FormBox
                    >
                        <FormTextField
                            variant='outlined'
                            name='oldPassword'
                            label='enter old password'
                            value={values.oldPassword}
                            type='password'
                            onChange={handleInputChange}
                            InputLabelProps={inputLabelProps}
                            InputProps={inputProps}
                        />
                    </FormBox>
                    <FormBox
                    >
                        <FormTextField
                            variant='outlined'
                            name='newPasswordFirst'
                            label='enter new password'
                            value={values.newPasswordFirst}
                            type='password'
                            onChange={handleInputChange}
                            InputLabelProps={inputLabelProps}
                            InputProps={inputProps}
                        />
                    </FormBox>
                    <FormBox
                    >
                        <FormTextField
                            variant='outlined'
                            name='newPasswordSecond'
                            label='enter new password again'
                            value={values.newPasswordSecond}
                            type='password'
                            onChange={handleInputChange}
                            InputLabelProps={inputLabelProps}
                            InputProps={inputProps}
                        />
                    </FormBox>
                    <FormButton
                        sx={{
                            width: '100%',
                            borderRadius: 0,
                        }}
                        onClick={handleSubmit}
                    >
                        Submit
                    </FormButton>
                </Box>
            </Dialog>
            <Avatar 
                alt="User Avatar" 
                src={avatarImage} 
                sx={{width: 300, 
                    height: 300, 
                    marginBottom: 2,}}
            />
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="avatar-upload-input"
              type="file"
              onChange={handleFileChange}
            />
            <Paper
                sx={{
                    marginTop: 1,
                    backgroundColor: mainColor,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 50,
                    width: 200,
                }}
            >
            {localStorage.getItem('user')}
            </Paper>
            <label 
                htmlFor="avatar-upload-input"
            >
                <FormButton 
                    component="span"
                    sx={{
                        width: 200,
                        height: 50
                    }}
                >
                 Upload Avatar
                </FormButton>
            </label>
            <FormButton
                sx={{
                    width: 200,
                    height: 50,
                }}
                onClick={handleChangePassword}
            >
                Change password
            </FormButton>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={onCloseSnackbar}
            >
                <Alert
                    onClose={onCloseSnackbar}
                    severity={snackbarInfo.severity}
                    variant='filled'
                    sx={{
                    width: '100%'
                    }}
                >
                    {snackbarInfo.message}
                </Alert>
            </Snackbar>
        </div>
    );
  };

export default Account;