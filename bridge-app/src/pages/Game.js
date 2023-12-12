import React from 'react';
import {Dealer} from '../common/deck/dealer'
import {CardView} from '../components/CardView'

import '../style/game/GameTopContainer.css'
import '../style/game/ContainerTop.css'
import '../style/game/ContainerMiddle.css'
import '../style/game/ContainerDown.css'

const dealer = new Dealer();
const hands = dealer.deal();

const Game = () => {
  console.log("Deal");
  console.log(hands.north);
  console.log(hands.south);
  console.log(hands.west);
  console.log(hands.west);
  console.log("----");

  const cardsSouth = hands.south.cards;
  const cardPlayedSouth = [];

  const [updatedCardsSouth, updateCardsSouth] = React.useState(cardsSouth);
  const [updatedCardsPlayedSouth, updateCardsPlayedSouth] = React.useState(cardPlayedSouth)  ;

  function handleRemove(id) {
    const newCardsPlayedSouth = updatedCardsSouth.filter((card) => card.id === id);
    const newCardsSouth = updatedCardsSouth.filter((card) => card.id !== id);
  
    updateCardsSouth(newCardsSouth);
    updateCardsPlayedSouth(newCardsPlayedSouth);
  }

  return (
    <div id="GameTopContainer">
      <div id="LeftSplit">
        <div id="ContainerTop">
          <div id="TopLeftCorner">
          </div>
          <div id="HandNorth">

          </div>
          <div id="TopRightCorner">
          </div>
        </div>
        <div id="ContainerMiddle">
          <div id="HandWest">

          </div>
          <div id="Table">
            <ul id="CardPlayedSouth">
              {updatedCardsPlayedSouth.map((card, index) => (
              <li key={index}>
              <CardView 
                id={card.id}
              />
              </li>))}
            </ul>
            <div id="AuctionRectangle">
                <div id="InnerAuctionRectangle">

                </div>
            </div>


          </div>
          <div id="HandEast">

          </div>
        </div>
        
        <div id="ContainerDown">
          <div id="DownLeftCorner">
          </div>
          <ul id="HandSouth">
            {updatedCardsSouth.map((card, index) => (
            <li 
              onClick={() => handleRemove(card.id)}
              key={index}
            >
            <CardView 
              id={card.id} 
            />
            </li>))}
          </ul>
          <div id="DownRightCorner">
          </div>
        </div>
      </div>
      <div id="RightSplit">
      </div>
    </div>
  )
};

export default Game;