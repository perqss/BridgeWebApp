import React, { useState, useEffect } from 'react';
import { Typography, Button, Container } from '@mui/material';
import  { FormBox, FormButton, FormTextField }   from '../components/MaterialComponentsCss';
import BridgeAppBar from '../components/BridgeAppBar';
import { useNavigate } from 'react-router-dom';


const SignIn = (props) => {
  const navigate = useNavigate();
  const inputProps = {
    style: {color: 'white', borderColor: 'white'},
    focused: {borderColor: 'white'}
  }
  const inputLabelProps = {
    style: {color: 'white'}
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const username = props.username;
    const password = props.password;
    const user = { username, password };
    localStorage.setItem('user', JSON.stringify(user));
    props.setUser(user);
  }

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/game-mode')
    }
  }, [props.user])

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
    {localStorage.getItem('user') ? '' : 
      <FormBox>
        <FormTextField
          variant='outlined'
          name='username'
          label='username'
          value={props.username}
          type='text'
          onChange={({ target }) => props.setUsername(target.value)}
          InputProps={inputProps}
          InputLabelProps={inputLabelProps}
        />
        <FormTextField
          variant='outlined'
          name='password'
          label='password'
          value={props.password}
          type='password'
          onChange={({ target }) => props.setPassword(target.value)}
          InputProps={inputProps}
          InputLabelProps={inputLabelProps}
        />
        <FormButton 
          onClick={handleSubmit}>
          Login
        </FormButton>
    </FormBox>
  }
    </div>
  );
};

export default SignIn;