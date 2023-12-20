import React from 'react';
import GameBoard from '../components/GameBoard';

const Game = () => {

  return (
    <div style={{width: '100vw', height: '100vh', display: 'flex'}}>
      <GameBoard/>
      <div id='GamePanel'/>
      <div>
        Panel
      </div>
    </div>
  )
};

export default Game;