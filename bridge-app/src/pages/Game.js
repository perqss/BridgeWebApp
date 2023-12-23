import React, { useState, useRef } from 'react';
import GameBoard from '../components/GameBoard';
import { backgroundColor, lightBlue } from '../common/utils';
import { FormButton } from '../components/MaterialComponentsCss';
import { Paper, Button, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import SuitList from '../components/SuitList';
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

const fillWithCards = (cards, suit) => {
    for (let i = 1; i <= 7; ++i) {
        if (suit === Suit.Hearts) {
            cards.push(new Card(Suit.Hearts, i, 0x2660, Color.red));
        }
    }
}

const Game = () => {
  const [option, setOption] = useState();
  const [BAs, setBAs] = useState(['1 BA', '2 BA', '3 BA', '4 BA', '5 BA', '6 BA', '7 BA']);
  const [hearts, setHearts] = useState(['1 ♥', '2 ♥', '3 ♥', '4 ♥', '5 ♥', '6 ♥', '7 ♥']);
  const [diamonds, setDiamonds] = useState(['1 ♦', '2 ♦', '3 ♦', '4 ♦', '5 ♦', '6 ♦', '7 ♦']);
  const [clubs, setClubs] = useState(['1 ♣', '2 ♣', '3 ♣', '4 ♣', '5 ♣', '6 ♣', '7 ♣']);
  const [spades, setSpades] = useState(['1 ♠', '2 ♠', '3 ♠', '4 ♠', '5 ♠', '6 ♠' ,'7 ♠']);
  const players = ['S', 'W', 'N', 'E'];
  const [cardsS, setCardsS] = useState([]);
  const [cardsW, setCardsW] = useState([]);
  const [cardsN, setCardsN] = useState([]);
  const [cardsE, setCardsE] = useState([]);

  return (
    <div style={{display: 'flex', flexDirection: 'row', width: '100vw', height: '100vh', overflow: 'hidden'}}>
        <div id='GameContainer'>
            <GameBoard option={option} setOption={setOption}/>
        </div>
        <div style={{height: '100vh', width: '100vw', backgroundColor: backgroundColor, overflowY: 'scroll', display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <CustomPaper
                    divInside={
                        <SuitList
                            suits={BAs}
                            suitColor={'white'}
                        />
                    }
                />
                <CustomPaper
                    divInside={
                        <SuitList
                            suits={spades}
                            suitColor={'grey'}
                        />
                    }
                />
                <CustomPaper
                    divInside={
                        <SuitList
                            suits={hearts}
                            suitColor={'red'}
                        />
                    }
                />
                <CustomPaper
                    divInside={
                        <SuitList
                            suits={diamonds}
                            suitColor={'orange'}
                        />
                    }
                />
                <CustomPaper
                    divInside={
                        <SuitList
                            suits={clubs}
                            suitColor={lightBlue}
                        />
                    }
                />
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
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '50px'}}>
                <CustomPaper
                    divInside={
                        <SuitList
                            suits={spades}
                            suitColor={'grey'}
                            players
                            direction={'S'}
                        />
                    }
                />
                <CustomPaper
                    divInside={
                        <SuitList
                            suits={hearts}
                            suitColor={'red'}
                            players
                            direction={'W'}
                        />
                    }
                />
                <CustomPaper
                    divInside={
                        <SuitList
                            suits={diamonds}
                            suitColor={'orange'}
                            players
                            direction={'N'}
                        />
                    }
                />
                <CustomPaper
                    divInside={
                        <SuitList
                            suits={clubs}
                            suitColor={lightBlue}
                            players
                            direction={'E'}
                        />
                    }
                />
            </div>
        </div>
    </div>
  )
}

export default Game;