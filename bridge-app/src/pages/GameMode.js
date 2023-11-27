import React from 'react';
import { Typography, Button, Card, CardActionArea, CardActions} from '@mui/material'
import { backgroundColor, mainColor } from '../common/utils';
import { IoPeopleOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";

const GameMode = () => {
  const gameModes = ['Singleplayer', 'Multiplayer'];
  const icons = [<IoPersonOutline fontSize={150} color='grey'/>, <IoPeopleOutline fontSize={150} color='grey'/>]
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
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                
            }}
        >
            {gameModes.map((gameMode, index) =>
                <Card
                    elevation={20}
                    key={index}
                    sx={{
                        backgroundColor: backgroundColor,
                        marginTop: '20px',
                        margin: 5,
                    }}
                >
                <CardActionArea>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        {icons[index]}
                    </div>
                    <CardActions>
                        <Typography
                            variant='h4'
                            sx={{
                                color: 'white',
                                width: 300,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {gameMode}
                        </Typography>
                    </CardActions>
                </CardActionArea>
            </Card>
            )}
        </div>
    </div>
  );
}

export default GameMode;