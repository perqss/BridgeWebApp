import React from 'react';
import {Dealer} from '../common/deck/dealer'
import {CardView} from '../components/CardView'

import '../style/Hand.css'
import { Card } from '@mui/material';

const dealer = new Dealer();
const hands = dealer.deal();

const Game = () => {
  console.log("Deal")
  console.log(hands.north)
  console.log(hands.south)
  console.log(hands.west)
  console.log(hands.west)
  console.log("----");

  const cardsSouth = hands.south.cards
  const [updatedCardsSouth, updateCardsSouth] = React.useState(cardsSouth)
  
  const cardPlayedSouth = []
  
  function handleRemove(id) {
    const newCardsSouth = updatedCardsSouth.filter((card) => card.id !== id);
    updateCardsSouth(newCardsSouth)
  }

  return (
    <ul className='Hand'>
      {updatedCardsSouth.map((card) => (
        <li onClick={() => handleRemove(card.id)}>
        <CardView id={card.id} />
        </li>))}
    </ul>
  )
};

export default Game;