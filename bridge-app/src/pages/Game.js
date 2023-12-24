import React, { useState, useEffect } from 'react';
import GameBoard from '../components/GameBoard';
import { backgroundColor, lightBlue } from '../common/utils';
import { FormButton } from '../components/MaterialComponentsCss';
import { Paper, Button, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import AuctionCardList from '../components/AuctionCardList';
import { Suit } from '../common/deck/suit';
import { Card } from '../common/deck/card';
import { Rank } from '../common/deck/rank';
import { Color } from '../common/deck/color';

const CustomPaper = ({ divInside }) => {
    return (
        <Paper
            elevation={5}
            sx={{backgroundColor: backgroundColor}}
        >
            {divInside}
        </Paper>
    )
}

const fillWithCards = (setCards, suit) => {
    const result = [];
    for (let i = 1; i <= 7; ++i) {
        if (suit === Suit.Hearts) {
            result.push(new Card(Suit.Hearts, i, 0x2665, Color.red));
        } else if (suit === Suit.Clubs) {
            result.push(new Card(Suit.Clubs, i, 0x2663, lightBlue));
        } else if (suit === Suit.Diamonds) {
            result.push(new Card(Suit.Diamonds, i, 0x2666, 'orange'));
        } else if (suit === Suit.Spades) {
            result.push(new Card(Suit.Spades, i, 0x2660, 'grey'));
        } else if (suit === Suit.NoTrump) {
            result.push(new Card(Suit.NoTrump, i, 'NT', 'white'));
        }
    }
    setCards(result);
}

const Game = () => {
  const [NTs, setNTs] = useState([]);
  const [hearts, setHearts] = useState([]);
  const [diamonds, setDiamonds] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [spades, setSpades] = useState([]);
  const players = ['S', 'W', 'N', 'E'];
  const [cardsS, setCardsS] = useState([new Card()]);
  const [cardsW, setCardsW] = useState([new Card()]);
  const [cardsN, setCardsN] = useState([new Card()]);
  const [cardsE, setCardsE] = useState([new Card()]);
  const cards = [NTs, hearts, diamonds, clubs, spades];
  const setCards = [setNTs, setHearts, setDiamonds, setClubs, setSpades];
  const playerCards = [cardsS, cardsW, cardsN, cardsE];
  const setPlayerCards = [setCardsS, setCardsW, setCardsN, setCardsE];
  const directions = ['S', 'W', 'N', 'E'];

  useEffect(() => {
    fillWithCards(setHearts, Suit.Hearts);
    fillWithCards(setDiamonds, Suit.Diamonds);
    fillWithCards(setSpades, Suit.Spades);
    fillWithCards(setClubs, Suit.Clubs);
    fillWithCards(setNTs, Suit.NoTrump);
  }, [])

  return (
    <div style={{display: 'flex', flexDirection: 'row', width: '100vw', height: '100vh', overflow: 'hidden'}}>
        <div id='GameContainer'>
            <GameBoard/>
        </div>
        <div style={{height: '100vh', width: '100vw', backgroundColor: backgroundColor, overflowY: 'scroll', display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                {cards.map((cardsSuit, index) => 
                    <CustomPaper
                        key={index}
                        divInside={
                            <AuctionCardList
                                cards={cardsSuit}
                                suit={cards[index]}
                                setSuit={setCards[index]}
                                cardsS={cardsS}
                                setCardsS={setCardsS}
                                cardsN={cardsN}
                                setCardsN={setCardsN}
                                cardsW={cardsW}
                                setCardsW={setCardsW}
                                cardsE={cardsE}
                                setCardsE={setCardsE}
                            />
                        }
                    />
                )}
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
                <Button sx={{backgroundColor: 'green', color: 'white'}}>
                    Pass
                </Button>
                <Button sx={{backgroundColor: 'red', color: 'white'}}>
                    X
                </Button>
                <Button sx={{backgroundColor: lightBlue, color: 'white'}}>
                    XX
                </Button>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'start', marginTop: '50px'}}>
                {playerCards.map((playerCard, index) => 
                    <CustomPaper
                        key={index}
                        divInside={
                            <AuctionCardList
                                cards={playerCard}
                                players
                                direction={directions[index]}  
                            />
                        }
                    />
                )}
            </div>
        </div>
    </div>
  )
}

export default Game;