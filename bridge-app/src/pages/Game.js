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
import { BiddingPair, BiddingState, getBiddingPair, getOppositeBiddingPair } from '../common/deck/bidding';
import { Bidder } from '../common/deck/bidder';
import { GameSchedulerType } from '../common/deck/game_scheduler_type';
const auctionScheduler = new GameScheduler(GameSchedulerType.Bid);
const gameScheduler = new GameScheduler(GameSchedulerType.Play);
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
            result.push(new Card(Suit.Clubs, i, 0x2663, Color.blue));
        } else if (suit === Suit.Diamonds) {
            result.push(new Card(Suit.Diamonds, i, 0x2666, Color.orange));
        } else if (suit === Suit.Spades) {
            result.push(new Card(Suit.Spades, i, 0x2660, Color.grey));
        } else if (suit === Suit.NoTrump) {
            result.push(new Card(Suit.NoTrump, i, 'NT', Color.white));
        }
    }
    setCards(result);
}

export const bottomButtonsText = ['PASS', 'X', 'XX'];

export const getSuitBidPriority = (suit) => {
    if (suit === Suit.Clubs) {
        return 0;
    }

    if (suit === Suit.Diamonds) {
        return 1;
    }

    if (suit === Suit.Hearts) {
        return 2;
    }

    if (suit === Suit.Spades) {
        return 3;
    }

    if (suit === Suit.NoTrump) {
        return 4;
    }
  }

const Game = () => {
  const [card, setCard] = useState();
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
  const [clickedSuitRank, setClickedSuitRank] = useState([getSuitBidPriority(Suit.Clubs), 0]);
  const [showTailSpin, setShowTailSpin] = useState(true);
  const passCount = useRef(0);
  const lastCard = useRef();
  const [biddingState, setBiddingState] = useState(BiddingState.None);
  const [pairWithLastSignificantBid, setPairWithLastSignificantBid] = useState(BiddingPair.None);
  const [auctionWinner, setAuctionWinner] = useState();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const cards = [clubs, diamonds, hearts, spades, NTs];
  const setCards = [setClubs, setDiamonds, setHearts, setSpades, setNTs];
  const playerCards = [cardsS, cardsW, cardsN, cardsE];
  const setPlayerCards = [setCardsS, setCardsW, setCardsN, setCardsE];
  const directions = ['S', 'W', 'N', 'E'];
  const bottomButtonsColors = ['green', 'red', lightBlue];
  const bottomButtonIds = ['btnPass', 'btnX', 'btnXx'];

  const getAllValidCards = () => {
    const cardsToChooseFrom = [];
    for (let i = 0; i < cards.length; ++i) {
        for (let j = 0; j < cards[i].length; j++) {
            if (cards[i][j].color !== backgroundColor) {
                cardsToChooseFrom.push(cards[i][j]);
            }
        }
    }
    return cardsToChooseFrom;
  }

  const chooseCardForBot = (card) => {
    // add normal non-disabled cards
    const cardsToChooseFrom = getAllValidCards();
    // add pass, x or xx if they're not disabled
    for (let i = 0; i < bottomButtonIds.length; ++i) {
        let buttonElement = document.getElementById(bottomButtonIds[i]);
        const isDisabled = buttonElement?.disabled;
        if (!isDisabled) {
            const newCard = new Card(bottomButtonsText[i], undefined, undefined, bottomButtonsColors[i]);
            cardsToChooseFrom.push(newCard);
        }
    }

    const randomCard = cardsToChooseFrom[Math.floor(Math.random() * cardsToChooseFrom.length)];
    if (randomCard) {
        if (randomCard.id) { // for normal cards
            modifyBiddingStateOnNormalCardClicked();
            hideCardsBelowRank(randomCard);
        } else { // for pass, x, xx
            modifyBiddingStateOnBottomButtonsClick(card.suit);
        }
        setCard(randomCard); // calls setCardAtScheduledDirection(card)
    }
  }

  useEffect(() => {
    if (card) {
        setCardAtScheduledDirection(card);
    }
  }, [card])

  const setAucitonEnd = () => {
    // player who first plays card after bidding is finished is the one to the left from the auction winner
    gameScheduler.setLeadDirection((auctionScheduler.lead_direction + 1) % 4);
    gameScheduler.setNShouldPlayAsBot(getBiddingPair(gameScheduler.getCurrentDirection()) === BiddingPair.NS);
    setAuctionWinner(lastCard.current);
    gameScheduler.played_suit = lastCard.current.suit;
    setShowSnackbar(true);
    setShowTailSpin(true);
  }

  // TODO: Implement bot strategies during auction
  const setCardAtScheduledDirection = (card) => {
    if (card.suit === bottomButtonsText[0]) {
        passCount.current++;
    } else {
        passCount.current = 0;
    }
    if (!bottomButtonsText.includes(card.suit)) {
        // let's use auctionScheduler's lead direction as future auction winner (player)
        auctionScheduler.setLeadDirection(auctionScheduler.current_direction)
        lastCard.current = card;
    }
    const setFunc = setPlayerCards[auctionScheduler.current_direction];
    setFunc((prevCards) => [...prevCards, card]);
    console.log(auctionScheduler.getCurrentDirection())
    // TODO: Change conditions for the auction winner (they're probably not right)
    if (passCount.current === 3 || getAllValidCards().length === 0) {
        setAucitonEnd();
        return;
    }

    auctionScheduler.setNextDirection();
    if (auctionScheduler.getCurrentDirection() !== CardinalDirection.South) {
        chooseCardForBot(card);
    }
  }

  const handleBottomButtonsClick = (cardText, index) => {
    modifyBiddingStateOnBottomButtonsClick(cardText, index)
    const card = new Card(cardText, undefined, undefined, bottomButtonsColors[index]);
    setCardAtScheduledDirection(card);
  }

  const modifyBiddingStateOnBottomButtonsClick = (cardText, index) => {
    if (cardText === bottomButtonsText [1]) {
        setBiddingState(BiddingState.Rekontrable);
        setPairWithLastSignificantBid(getBiddingPair(auctionScheduler.getCurrentDirection()));
    } else if (cardText === bottomButtonsText [2]) {
        setBiddingState(BiddingState.None);
        setPairWithLastSignificantBid(getBiddingPair(auctionScheduler.getCurrentDirection()));
    }

  }

  const modifyBiddingStateOnNormalCardClicked = () => {
    setBiddingState(BiddingState.Kontrable);
    setPairWithLastSignificantBid(getBiddingPair(auctionScheduler.getCurrentDirection()));
  }

  function deepCopy(arr) {
    return arr.map(element => Array.isArray(element) ? deepCopy(element) : {...element});
  }

  const hideCardsBelowRank = (card) => {
    setClickedSuitRank([card.suit, card.rank]);
    const bound = card.rank - 1
    const cardsClone = deepCopy(cards);
    for (let i = 0; i < cards.length; ++i) {
        for (let j = 0; j < bound; ++j) {
            cardsClone[i][j].color = backgroundColor;
        }

        if (getSuitBidPriority(card.suit) >= i) {
            cardsClone[i][bound].color = backgroundColor;
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

  const parseBidWinner = (id) => {
    if (id === 'NT') {
        return 'NT'
    } else {
        return String.fromCodePoint(id)
    }
  }


  const bidderW = new Bidder(handleBottomButtonsClick)
  const bidderE = new Bidder(handleBottomButtonsClick)
  const bidderN = new Bidder(handleBottomButtonsClick)

  auctionScheduler.setPlayerW(bidderW)
  auctionScheduler.setPlayerE(bidderE)
  auctionScheduler.setPlayerN(bidderN)

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
            <GameBoard setShowTailSpin={setShowTailSpin} auctionWinner={auctionWinner} gameScheduler={gameScheduler}/>
        </div>
        <div style={{height: '100vh', width: '30vw', backgroundColor: backgroundColor, overflowY: 'scroll', display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                {cards.map((cardsSuit, index) => 
                    <CustomPaper
                        key={index}
                        divInside={
                            <AuctionCardList
                                cards={cardsSuit}
                                modifyBiddingState={modifyBiddingStateOnNormalCardClicked}
                                setCardAtScheduledDirection={setCardAtScheduledDirection}
                                hideCardsBelowRank={hideCardsBelowRank}
                                clickedSuitRank={clickedSuitRank}
                                auctionWinner={auctionWinner}
                               // handleOnClick={handleOnClickNormalCard}
                            />
                        }
                    />
                )}
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
                {bottomButtonsText.map((buttonText, index) => 
                    <Button
                        id={bottomButtonIds[index]}
                        key={index}
                        sx={{backgroundColor: bottomButtonsColors[index], color: 'white', margin: 0.5}}
                        onClick={() => handleBottomButtonsClick(buttonText, index)}
                        disabled={! ((auctionWinner === undefined)
                            && ((buttonText === bottomButtonsText [0])
                             || (buttonText === bottomButtonsText [1]
                             && getOppositeBiddingPair(auctionScheduler.getCurrentDirection()) === pairWithLastSignificantBid
                             && biddingState === BiddingState.Kontrable)
                             || (buttonText === bottomButtonsText [2]
                             && getOppositeBiddingPair(auctionScheduler.getCurrentDirection()) === pairWithLastSignificantBid
                             && biddingState === BiddingState.Rekontrable)  
                            ))}
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
                    {`${auctionWinner.rank} ` + parseBidWinner(auctionWinner.id)}
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