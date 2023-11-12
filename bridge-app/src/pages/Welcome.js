import React, { useState, useEffect } from 'react';
import { Typography, Button, Container } from '@mui/material';
import  { FormBox, FormButton, FormTextField }   from '../components/MaterialComponentsCss';
import BridgeAppBar from '../components/BridgeAppBar';

const Welcome = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    const user = { username, password };
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));

  }

console.log(user)
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
    <BridgeAppBar
      setUsername={setUsername} 
      setPassword={setPassword}
      />
    {localStorage.getItem('user') ? '' : 
      <FormBox>
        <FormTextField
          variant='outlined'
          name='username'
          label='username'
          value={username}
          type='text'
          onChange={({ target }) => setUsername(target.value)}
        />
        <FormTextField
          variant='outlined'
          name='password'
          label='password'
          value={password}
          type='password'
          onChange={({ target }) => setPassword(target.value)}
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

export default Welcome;