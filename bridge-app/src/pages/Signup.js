import React, { useEffect, useState } from 'react';
import  { FormBox, FormButton, FormTextField }   from '../components/MaterialComponentsCss';
import { useNavigate } from 'react-router-dom';
import { inputLabelProps, inputProps } from '../components/MaterialComponentsCss';


const Signup = (props) => {

  const navigate = useNavigate();

  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 

  const onChangeUsername = e => {
    const username = e.target.value;
    setUsername(username); 
  }

  const onChangePassword = e => { 
    const password = e.target.value;
    setPassword(password); 
  }

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/game-mode')
    }
  }, [props.user])

  const signup = () => {
	props.signup({ username: username, password: password });
	navigate("/");
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
    {localStorage.getItem('user') ? '' : 
      <FormBox>
        <FormTextField
          variant='outlined'
          name='username'
          label='username'
          value={username}
          type='text'
          onChange={onChangeUsername}
          InputProps={inputProps}
          InputLabelProps={inputLabelProps}
        />
        <FormTextField
          variant='outlined'
          name='password'
          label='password'
          value={password}
          type='password'
          onChange={onChangePassword}
          InputProps={inputProps}
          InputLabelProps={inputLabelProps}
        />
        <FormButton 
          onClick={signup}>
          Signup
        </FormButton>
    </FormBox>
  }
    </div>
  );
};

export default Signup;