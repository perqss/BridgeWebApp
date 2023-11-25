import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Welcome from './pages/Welcome';
import Game from './pages/Game'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Welcome/>}/>
        <Route path='/game' element={<Game/>}/>
      </Routes>
    </Router>
  );
}

export default App;