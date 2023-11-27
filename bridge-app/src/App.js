import React, {useState} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import SignIn from './pages/SignIn';
import BridgeAppBar from './components/BridgeAppBar';
import GameMode from './pages/GameMode';
import Account from './pages/Account';

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
      </Routes>
    </Router>
  );
}

export default App;