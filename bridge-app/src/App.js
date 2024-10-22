import React, {useState} from 'react';
import './App.css';
import {
  Routes,
  Route
} from 'react-router-dom';

import Game from './pages/Game'
import SignIn from './pages/SignIn';
import Signup from './pages/Signup';
import BridgeAppBar from './components/BridgeAppBar';
import GameMode from './pages/GameMode';
import Account from './pages/Account';
import ChooseTournament from './pages/ChooseTournament';
import Tournament from './pages/Tournament';

import Service from './services/Service';

import { BottomNavigation } from '@mui/material';


function App() {

  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const [error, setError] = React.useState('');

  const [count, setCount] = useState(0);

  async function login(user = null) {
    Service.login(user).then(response => {
      setToken(response.data.token); 
      setUser(user);
      localStorage.setItem('token', response.data.token); 
      localStorage.setItem('user', user.username);
      localStorage.setItem('id', response.data.id);
      setError('');
    }).catch(e => {
      console.log('login', e);
      setError(e.toString()); 
    });
  }
  async function changePassword(user = null) {
      Service.changePassword(user).then(response => {
        setError('');
      }).catch(e => {
        console.log('change password', e);
        setError(e.response.data.error);
      });
  }
  async function logout() { 
    setToken('');
    setUser(''); 
    localStorage.setItem('token', ''); 
    localStorage.setItem('user', '');
    localStorage.setItem('id', '');
    setCount(count - 1);
  }
  async function signup(user = null) {
    Service.signup(user).then(response => {
      setToken(response.data.token); 
      setUser(user);
      localStorage.setItem('token', response.data.token); 
      localStorage.setItem('user', user.username);
      localStorage.setItem('id', response.data.id);
    })
    .catch(e => {
      console.log("signup", e);
      setError(e.toString()); 
    })
  }


  const TopBar = () => (
    <BridgeAppBar
      setUser={setUser}
      user={user}
      logout={logout}
     />
  )

  return (
    <div>
        <div className="container mt-4"> 
          <Routes>
            <Route path='/game' element={<Game/>}/>
            <Route 
              path='/' 
              element={
                <div>
                  <TopBar/>
                  <SignIn
                    user={user}
                    login={login}
                  />
                  <BottomNavigation className="text-center text-lg-start bg-light text-muted mt-4">
                    <div className="text-center p-4">
                      © Copyright &nbsp;
                      <a target="_blank" 
                        href="">
                        Jan Kowalski
                      </a>
                    </div>
                  </BottomNavigation>
                </div> 
                
              }
            />
            <Route
              path='/game-mode'
              element={
                <div>
                  <TopBar/>
                  <GameMode/>
                </div>
              }
            />
            <Route
              path='/account'
              element={
                <div>
                  <TopBar/>
                  <Account
                    count={count}
                    setCount={setCount}
                    changePassword={changePassword}
                    error={error}
                  />
                </div>
              }
            />
            <Route
              path='/signup'
              element={
                <div>
                  <TopBar/>
                  <Signup signup={signup} />
                </div>
                  
              }
            />
            <Route
              path='/choose-tournament'
              element={
                <div>
                  <TopBar/>
                  <ChooseTournament/>
                </div>
              }
            />
            <Route
              path='/tournaments/:tournamentName'
              element={
                <div>
                  <TopBar/>
                  <Tournament/>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
  );
}

export default App;