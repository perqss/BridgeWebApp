import React, {useState} from 'react';
import {Dealer} from '../common/deck/dealer';
import {CardView} from '../components/CardView';
import {Card} from '../common/deck/card';
import {Color} from '../common/deck/color';

import '../style/game/GameTopContainer.css';
import '../style/game/ContainerTop.css';
import '../style/game/ContainerMiddle.css';
import '../style/game/ContainerDown.css';
import { backgroundColor } from '../common/utils';

const dealer = new Dealer();
const hands = dealer.deal();
const cardBack = new Card(undefined, undefined, 0x1F0A0, Color.black);
const cardBacks = [];
for (let i = 0; i < 13; i++) {
  cardBacks.push(cardBack);
}

const Game = () => {
  console.log("Deal");
  console.log(hands.north);
  console.log(hands.south);
  console.log(hands.west);
  console.log(hands.west);
  console.log("----");

  const cardsSouth = hands.south.cards;
  const cardsNorth = hands.north.cards;
  const cardPlayedSouth = [];

  const [updatedCardsSouth, updateCardsSouth] = useState(cardsSouth);
  const [updatedCardsPlayedSouth, updateCardsPlayedSouth] = useState(cardPlayedSouth);
  const [updatedCardsNorth, updateCardsNorth] = useState(cardsNorth);

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
          <ul id="HandSouthNorth">
            {updatedCardsNorth.map((card, index) => (
              <li 
                onClick={() => handleRemove(card.id)}
                key={index}
              >
              <CardView 
                id={card.id}
                color={card.color} 
              />
              </li>))}
          </ul>
          <div id="TopRightCorner">
          </div>
        </div>
        <div id="ContainerMiddle">
          <div id="HandWest">
          {cardBacks.map((card, index) => (
                <li 
                  onClick={() => handleRemove(card.id)}
                  key={index}
                >
                <CardView 
                  id={card.id}
                  color={card.color}
                  rotate='rotate(90deg)'
                  marginTop='-40px'
                  fontSize='55px'
                />
                </li>))}
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
            <div id="TableRectangle">
              <div className='center'>
                <div 
                  id="VerticalPlaceHolder"
                >
                  <div id="InnerVerticalPlaceHolder">
                    N
                  </div>
                  <div id="VerticalPlaceHolderText">
                    username
                  </div>
                </div>
              </div>
              <div id="SidePlaceHolders">
                <div id="SidePlaceHolder">
                  <div id="InnerSidePlaceHolder">
                    W
                  </div>
                  <div id="SidePlaceHolderText">
                    username
                  </div>
                </div>
                <div 
                  id="SidePlaceHolder"
                  className="right"
                >
                  <div id="InnerSidePlaceHolder">
                    E
                  </div>
                  <div id="SidePlaceHolderText">
                    username
                  </div>
                </div>
              </div>
              <div className='center'>
                <div 
                  id="VerticalPlaceHolder"
                  className="bottom"
                >
                  <div id="InnerVerticalPlaceHolder">
                    S
                  </div>
                  <div id="VerticalPlaceHolderText">
                    username
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="HandEast">
          </div>
        </div>
        <div id="ContainerDown">
          <div id="DownLeftCorner">
          </div>
          <ul id="HandSouthNorth">
            {updatedCardsSouth.map((card, index) => (
            <li 
              onClick={() => handleRemove(card.id)}
              key={index}
            >
            <CardView 
              id={card.id}
              color={card.color} 
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