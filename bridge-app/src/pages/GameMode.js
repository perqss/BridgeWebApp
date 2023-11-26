import React from 'react';
import BridgeAppBar from '../components/BridgeAppBar';
import { Typography, Button, Avatar, Paper } from '@mui/material'
import { mainColor } from '../common/utils';

const GameMode = () => {
  const gameModes = ['Singleplayer', 'Multiplayer'];
  return (
    <div
        style={{
            marginTop: '70px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}
    >
        <Typography
            variant='h5'
            color='white'
            sx={{
                marginBottom: '60px'
            }}
        >
            Choose your game mode
        </Typography>
        {gameModes.map((gameMode, index) => 
            <Paper
                sx={{
                    backgroundColor: mainColor,
                    marginTop: '20px',
                }}
            >
            <Button
                sx={{
                    fontSize: '30px',
                    color: 'white',
                    width: 300,
                }}
            >
                {gameMode}
            </Button>
        </Paper>
        )}
    </div>
  );
}

export default GameMode;