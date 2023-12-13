import React from 'react';
import { Typography, Button, Card, CardActionArea, CardActions} from '@mui/material'
import { backgroundColor, mainColor } from '../common/utils';
import { IoPeopleOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/MaterialComponentsCss';


const GameMode = () => {
  const gameModes = ['Singleplayer', 'Multiplayer'];
  const icons = [<IoPersonOutline fontSize={150} color='grey'/>, <IoPeopleOutline fontSize={150} color='grey'/>];
  const urls = ['/choose-tournament', '/game-mode'];
  const navigate = useNavigate();
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
        <Header
            text='Choose your game mode'
        />
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
                        onClick={() => navigate(urls[index])}
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