import React from 'react';
import {Dealer} from '../common/deck/dealer'

const Game = () => {
  const dealer = new Dealer();
  const hands = dealer.deal();
  
  console.log("Deal")
  console.log(hands.north)
  console.log(hands.south)
  console.log(hands.west)
  console.log(hands.west)
  console.log("----");
  return (
    <div>
    <h2>Game will begin!</h2>
    </div>
  );
};

export default Game;