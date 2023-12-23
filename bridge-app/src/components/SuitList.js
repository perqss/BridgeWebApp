import React from 'react';
import { Paper, Button, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';

const SuitList = ({ suits, suitColor, players, direction }) => {
    
  return (
    <List>
        {players ? 
            <div>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white'}}>
                    {direction}
                </div>
                <Divider sx={{background: 'white', height: 1}}/> 
            </div>
        : ''}
        {suits.map((suit, index) => 
            <ListItem 
                disablePadding
                disableGutters
                key={index}
            >
                <ListItemButton>
                    <ListItemText 
                        primary={suit}
                        primaryTypographyProps={{color: suitColor}}
                    />
                </ListItemButton>
            </ListItem>
        )}
    </List>
  );
}

export default SuitList;