import React, {useState} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Game from './pages/Game'
import SignIn from './pages/SignIn';
import BridgeAppBar from './components/BridgeAppBar';
import GameMode from './pages/GameMode';
import Account from './pages/Account';
import ChooseTournament from './pages/ChooseTournament';
import Tournament from './pages/Tournament';

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [count, setCount] = useState(0);


  const TopBar = () => (
    <BridgeAppBar
      setUsername={setUsername}
      setPassword={setPassword}
      setUser={setUser}
      user={user}
     />
  )

  return (
    <Router>
      <Routes>

        <Route path='/game' element={<Game/>}/>
        <Route 
          path='/' 
          element={
            <div>
              <TopBar/>
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
              />
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
    </Router>
  );
}

export default App;