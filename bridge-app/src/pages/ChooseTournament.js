import React from 'react';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ChooseTournament = () => {
  const tournaments = ['Tournament 1', 'Tournament 2', 'Tournament 3', 'Tournament 4', 'Tournament 5', 'Tournament 6', 'Tournament 7', 'Tournament 8', 'Tournament 9', 'Tournament 10'];
  const navigate = useNavigate();
  return (
    <List sx={{marginTop: '60px'}}>
        {tournaments.map((tournament, index) => 
            <ListItemButton
                key={index}
                onClick={() => navigate(`/tournaments/${tournament}`)}
            >
                <ListItemText
                    primary={`${tournament}`}
                    primaryTypographyProps={{color: 'white', fontSize: '20px'}}
                />
            </ListItemButton>
        )}
    </List>
  );
}

export default ChooseTournament;