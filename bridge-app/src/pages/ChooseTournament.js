import React, { useState, useEffect } from 'react';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Service from '../services/Service';


const ChooseTournament = () => {
  const [tournaments, setTournaments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await Service.getTournaments();
        setTournaments(response.data);
      } catch (e) {
        console.error('Error fetching tournaments:', e);
      }
    };

    fetchTournaments();
  }, []);

  return (
      <List sx={{ marginTop: '60px' }}>
        {tournaments.map(tournament =>
            <ListItemButton
                key={tournament.id}
                onClick={() => {navigate(`/tournaments/${tournament.id}`,
                    { state: { tournamentName: tournament.name,
                            tournamentId: tournament.id } });
                    }
                }
            >
              <ListItemText
                  primary={tournament.name}
                  primaryTypographyProps={{ color: 'white', fontSize: '20px' }}
              />
            </ListItemButton>
        )}
      </List>
  );
}

export default ChooseTournament;


