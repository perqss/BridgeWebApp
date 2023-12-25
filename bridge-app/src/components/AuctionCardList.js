import React from 'react';
import { Paper, Button, List, ListItem, ListItemButton, ListItemText, Divider, Typography } from '@mui/material';
import { Suit } from '../common/deck/suit';
import { CardinalDirection } from '../common/deck/cardinal_directions';
import { GameScheduler } from '../common/deck/game_scheduler';
import { Card } from '../common/deck/card';
import { bottomButtonsText } from '../pages/Game';
import { CustomListItemButton } from './MaterialComponentsCss';
import { CustomListItemText } from './MaterialComponentsCss';


const styles = theme => ({
    disabledButton: {
     color: 'white'
    }
  });


const AuctionCardList = ({ cards, players, direction, setCardAtScheduledDirection, hideCardsBelowRank, clickedRank }) => {

  const renderCardText = (card) => {
    if (bottomButtonsText.includes(card.suit)) {
        return card.suit;
    } else if (card.suit === undefined) {
        return '';
    } else if (card.suit === Suit.NoTrump) {
        return `${card.rank} ${card.id}`;
    } else {
        return `${card.rank} ${String.fromCodePoint(card.id)}`;
    }
  }

  const handleOnClick = (card) => {
    if (!players) {
        setCardAtScheduledDirection(card);
        hideCardsBelowRank(card.rank);
    }
  }

  const isDisabled = (index) => index + 1 <= clickedRank || players;
    
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
                        primary={renderCardText(card)}
                        primaryTypographyProps={{color: card.color, variant: 'h6', align: 'center'}}
                    />
                :
                <ListItemButton
                    onClick={() => handleOnClick(card)}
                    disabled={isDisabled(index)}
                >
                    <ListItemText 
                        primary={renderCardText(card)}
                        primaryTypographyProps={{color: card.color}}
                    />
                </ListItemButton>}
            </ListItem>
        )}
    </List>
  );
}

export default AuctionCardList;