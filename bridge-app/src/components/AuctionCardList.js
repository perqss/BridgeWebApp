import React from 'react';
import { Paper, Button, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';
import { Suit } from '../common/deck/suit';
import { CardinalDirection } from '../common/deck/cardinal_directions';
import { GameScheduler } from '../common/deck/game_scheduler';
import { Card } from '../common/deck/card';

const auctionScheduler = new GameScheduler();
auctionScheduler.setLeadDirection(CardinalDirection.South);

const AuctionCardList = ({ cards, suit, setCardsS, setCardsN, setCardsW, setCardsE, players, direction }) => {

  
  const renderCardText = (card) => {
    if (card.suit === undefined) {
        return '';
    }
    if (card.suit === Suit.NoTrump) {
        return `${card.rank} ${card.id}`;
    } else {
        return `${card.rank} ${String.fromCodePoint(card.id)}`;
    }
  }

  const handleOnClick = (card) => {
    if (!players) {
        const emptyCard = new Card();
        if (auctionScheduler.processAuction(CardinalDirection.South)) {
            setCardsS((prevCards) => [...prevCards, card]);
        } else if (auctionScheduler.processAuction(CardinalDirection.West)) {
            setCardsW((prevCards) => [...prevCards, card]);
        } else if (auctionScheduler.processAuction(CardinalDirection.North)) {
            setCardsN((prevCards) => [...prevCards, card]);
        } else if (auctionScheduler.processAuction(CardinalDirection.East)) {
            setCardsE((prevCards) => [...prevCards, card]);
        }
    }
  }
    
  return (
    <List>
        {players ? 
            <div>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white',}}>
                    {direction}
                </div>
                <Divider sx={{background: 'white', height: 1}}/> 
            </div>
        : ''}
        {cards.map((card, index) => 
            <ListItem 
                disablePadding
                disableGutters
                key={index}
                sx={{}}
            >
                <ListItemButton
                    onClick={() => handleOnClick(card)}
                >
                    <ListItemText 
                        primary={renderCardText(card)}
                        primaryTypographyProps={{color: card.color}}
                    />
                </ListItemButton>
            </ListItem>
        )}
    </List>
  );
}

export default AuctionCardList;