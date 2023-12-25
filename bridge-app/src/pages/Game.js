import React, { useState, useEffect, useRef } from 'react';
import GameBoard from '../components/GameBoard';
import { backgroundColor, lightBlue } from '../common/utils';
import { FormButton } from '../components/MaterialComponentsCss';
import { Paper, Button, Snackbar, Alert, Typography} from '@mui/material';
import AuctionCardList from '../components/AuctionCardList';
import { Suit } from '../common/deck/suit';
import { Card } from '../common/deck/card';
import { Rank } from '../common/deck/rank';
import { Color } from '../common/deck/color';
import { CardinalDirection } from '../common/deck/cardinal_directions';
import { GameScheduler } from '../common/deck/game_scheduler';
import { TailSpin } from 'react-loader-spinner';

const auctionScheduler = new GameScheduler();
auctionScheduler.setLeadDirection(CardinalDirection.South);

const CustomPaper = ({ divInside }) => {
    return (
        <Paper
            elevation={5}
            sx={{backgroundColor: backgroundColor, margin: 0.5}}
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

export const bottomButtonsText = ['PASS', 'X', 'XX'];

const Game = () => {
  const [NTs, setNTs] = useState([]);
  const [hearts, setHearts] = useState([]);
  const [diamonds, setDiamonds] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [spades, setSpades] = useState([]);
  const players = ['S', 'W', 'N', 'E'];
  const [cardsS, setCardsS] = useState([]);
  const [cardsW, setCardsW] = useState([]);
  const [cardsN, setCardsN] = useState([]);
  const [cardsE, setCardsE] = useState([]);
  const [clickedRank, setClickedRank] = useState();
  const [showTailSpin, setShowTailSpin] = useState(true);
  const passCount = useRef(0);
  const lastCard = useRef();
  const [auctionWinner, setAuctionWinner] = useState();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const cards = [NTs, hearts, diamonds, clubs, spades];
  const setCards = [setNTs, setHearts, setDiamonds, setClubs, setSpades];
  const playerCards = [cardsS, cardsW, cardsN, cardsE];
  const setPlayerCards = [setCardsS, setCardsW, setCardsN, setCardsE];
  const directions = ['S', 'W', 'N', 'E'];
  const bottomButtonsColors = ['green', 'red', lightBlue];

  // TODO: Implement bot strategies during auction
  const setCardAtScheduledDirection = (card) => {
    if (card.suit === bottomButtonsText[0]) {
        passCount.current++;
    } else {
        passCount.current = 0;
        lastCard.current = card;
    }

    // TODO: Change conditions for the auction winner (they're probably not right)
    if (passCount.current === 3) {
        setAuctionWinner(lastCard.current);
        setShowSnackbar(true);
    }

    if (card.rank === 7) {
        setAuctionWinner(card);
        setShowSnackbar(true);
    }

    const setFunc = setPlayerCards[auctionScheduler.current_direction];
    auctionScheduler.setNextDirection();
    setFunc((prevCards) => [...prevCards, card]);
  }

  const handleBottomButtonsClick = (cardText, index) => {
    const card = new Card(cardText, undefined, undefined, bottomButtonsColors[index]);
    setCardAtScheduledDirection(card);
  }

  function deepCopy(arr) {
    return arr.map(element => Array.isArray(element) ? deepCopy(element) : {...element});
  }

  const hideCardsBelowRank = (rank) => {
    setClickedRank(rank);
    const cardsClone = deepCopy(cards);
    for (let i = 0; i < cards.length; ++i) {
        for (let j = 0; j < rank; ++j) {
            cardsClone[i][j].color = backgroundColor;
        }
        const setFunc = setCards[i];
        setFunc(cardsClone[i]);
    }
  }

  useEffect(() => {
    fillWithCards(setHearts, Suit.Hearts);
    fillWithCards(setDiamonds, Suit.Diamonds);
    fillWithCards(setSpades, Suit.Spades);
    fillWithCards(setClubs, Suit.Clubs);
    fillWithCards(setNTs, Suit.NoTrump);
  }, [])

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowSnackbar(false);
  };

  const parseCurrentDirection = () => {
    if (auctionScheduler.current_direction === CardinalDirection.South) {
        return 'S';
    } else if (auctionScheduler.current_direction === CardinalDirection.North) {
        return 'N';
    } else if (auctionScheduler.current_direction === CardinalDirection.East) {
        return 'E';
    } else if (auctionScheduler.current_direction === CardinalDirection.West) {
        return 'W';
    }
  }

  return (
    <div style={{display: 'flex', flexDirection: 'row', width: '100vw', height: '100vh', overflow: 'hidden'}}>
        <div>
            <Snackbar
                open={showSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                sx={{ height: "1%" }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity='success'
                    variant='filled'
                >
                    <Typography>
                        {'End of the auction'}
                    </Typography>
                </Alert>
            </Snackbar>
        </div>
        {showTailSpin && <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '40vw'}}>
                            <TailSpin/>
                        </div>}
        <div id='GameContainer'>
            <GameBoard setShowTailSpin={setShowTailSpin} auctionWinner={auctionWinner}/>
        </div>
        <div style={{height: '100vh', width: '30vw', backgroundColor: backgroundColor, overflowY: 'scroll', display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                {cards.map((cardsSuit, index) => 
                    <CustomPaper
                        key={index}
                        divInside={
                            <AuctionCardList
                                cards={cardsSuit}
                                setCardAtScheduledDirection={setCardAtScheduledDirection}
                                hideCardsBelowRank={hideCardsBelowRank}
                                clickedRank={clickedRank}
                                auctionWinner={auctionWinner}
                            />
                        }
                    />
                )}
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
                {bottomButtonsText.map((buttonText, index) => 
                    <Button
                        key={index}
                        sx={{backgroundColor: bottomButtonsColors[index], color: 'white', margin: 0.5}}
                        onClick={() => handleBottomButtonsClick(buttonText, index)}
                    >
                        {buttonText}
                    </Button>
                )}
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
            {auctionWinner && <Typography
                className='center'
                variant='h6'
                sx={{marginTop: 2, color: 'white'}}
            >
                <div>
                    {'Bid: '}
                </div>
                <div style={{color: auctionWinner.color, marginLeft: 5}}>
                    {`${auctionWinner.rank} ${String.fromCodePoint(auctionWinner.id)}`}
                </div>
                <div style={{marginLeft: 5}}>
                    {parseCurrentDirection()}
                </div>
            </Typography>}
        </div>
    </div>
  )
}

export default Game;