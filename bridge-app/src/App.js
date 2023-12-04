import React, {useState} from 'react';
import './App.css';
import {
  Routes,
  Route
} from 'react-router-dom';

import Game from './pages/Game'
import SignIn from './pages/SignIn';
import BridgeAppBar from './components/BridgeAppBar';
import GameMode from './pages/GameMode';
import Account from './pages/Account';
import Login from './components/Login';
import Signup from './components/Signup';

import 'bootstrap/dist/css/bootstrap.min.css'; 

import Service from './services/Service';

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const [error, setError] = React.useState('');

  const [count, setCount] = useState(0);

  async function login(user = null) {
    Service.login(user).then(response => {
      setToken(response.data.token); 
      setUser(user.username); 
      localStorage.setItem('token', response.data.token); 
      localStorage.setItem('user', user.username); 
      setError('');
    }).catch(e => {
      console.log('login', e);
      setError(e.toString()); 
    });
  }
  async function logout() { 
    setToken('');
    setUser(''); 
    localStorage.setItem('token', ''); 
    localStorage.setItem('user', '');

  }
  async function signup(user = null) {
    Service.signup(user).then(response => {
      setToken(response.data.token); 
      setUser(user.username); 
      localStorage.setItem('token', response.data.token); 
      localStorage.setItem('user', user.username);
    })
    .catch(e => {
      console.log(e);
      setError(e.toString()); 
    })
  }


  const TopBar = () => (
    <BridgeAppBar
      setUsername={setUsername}
      setPassword={setPassword}
      setUser={setUser}
      user={user}
     />
  )

  return (
    <div>
        <TopBar/>
        <div className="container mt-4"> 
          <Routes>
            <Route path='/game' element={<Game/>}/>
            <Route 
              path='/' 
              element={
                <div>
                  <SignIn
                    username={username}
                    password={password}
                    user={user}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    setUser={setUser}
                  />
                </div> 
              }
            />
            <Route
              path='/game-mode'
              element={
                <div>
                  <GameMode/>
                </div>
              }
            />
            <Route
              path='/account'
              element={
                <div>
                  <Account
                    count={count}
                    setCount={setCount}
                  />
                </div>
              }
            />
            <Route
              path='/login'
              element={
                  <Login login={login} />
              }
            />
            <Route
              path='/signup'
              element={
                  <Signup signup={signup} />
              }
            />
          </Routes>
        </div>
        <footer className="text-center text-lg-start \
          bg-light text-muted mt-4">
            <div className="text-center p-4">
              © Copyright - 
              <a target="_blank" 
                className="text-reset fw-bold text-decoration-none"
                href="">
              Jan Kowalski
              </a>
            </div>
        </footer>
      </div>
  );
}

export default App;