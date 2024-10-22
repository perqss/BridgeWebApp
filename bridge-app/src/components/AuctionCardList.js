import React, { useState, useEffect } from 'react';
import { Paper, Button, List, ListItem, ListItemButton, ListItemText, Divider, Typography } from '@mui/material';
import { Suit } from '../common/deck/suit';
import { CardinalDirection } from '../common/deck/cardinal_directions';
import { GameScheduler } from '../common/deck/game_scheduler';
import { Card, EmptyCard } from '../common/deck/card';
import { Color } from '../common/deck/color';
import { bottomButtonsText, getSuitBidPriority } from '../pages/Game';
import { backgroundColor } from '../common/utils';


const AuctionCardList = ({ cards, players, direction, modifyBiddingState, setCardAtScheduledDirection, 
    hideCardsBelowRank, clickedSuitRank, auctionWinner }) => {

  const [card, setCard] = useState();
  const renderCardText = (card, index) => {
    const emptyCard = new EmptyCard();
    const noTrumpCardEmpty = new Card(Suit.NoTrump, card.rank, 'NT', backgroundColor);
    const noTrumpCardWhite = new Card(Suit.NoTrump, card.rank, 'NT', Color.white);
    
    if (bottomButtonsText.includes(card.suit)) {
        return card.suit;
    } else if (emptyCard.equals(card)) { // Value Object pattern
        return '';
    } else if (noTrumpCardEmpty.equals(card) || noTrumpCardWhite.equals(card)) {
        return `${card.rank} ${card.id}`;
    } else {
        return `${card.rank} ${String.fromCodePoint(card.id)}`;
    }
  }

  const handleOnClick = (card) => {
    if (!players && auctionWinner === undefined) {
        modifyBiddingState();
        hideCardsBelowRank(card);
        setCard(card);
    }
  }

  useEffect(() => {
    if (card) {
        setCardAtScheduledDirection(card);
    }
  }, [card])

  const isDisabled = (index, suit) => {
    return (index + 1 < clickedSuitRank[1]|| (index + 1 === clickedSuitRank[1] && 
        getSuitBidPriority(suit) <= getSuitBidPriority(clickedSuitRank[0])))|| players || auctionWinner !== undefined;
  }
    
  return (
    <List>
        {players ? 
            <div>
                <Typography 
                    variant='h5'
                    style={{display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white'}}
                >
                    {direction}
                </Typography>
                <Divider sx={{background: 'white', height: 1}}/> 
            </div>
        : ''}
        {cards.map((card, index) => 
            <ListItem 
                disablePadding
                disableGutters
                key={index}
            >
                {players ? 
                    <ListItemText 
                        primary={renderCardText(card, index)}
                        primaryTypographyProps={{color: card.color, variant: 'h6', align: 'center'}}
                    />
                :
                <ListItemButton
                    onClick={() => handleOnClick(card)}
                    disabled={isDisabled(index, card.suit)}
                >
                    <ListItemText 
                        primary={renderCardText(card, index)}
                        primaryTypographyProps={{color: card.color}}
                    />
                </ListItemButton>}
            </ListItem>
        )}
    </List>
  );
}

export default AuctionCardList;