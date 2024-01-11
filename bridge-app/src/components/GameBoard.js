import React, { useEffect, useState, useRef } from 'react';
import * as Phaser from 'phaser';
import {Dealer} from '../common/deck/dealer';
import {CardView} from './CardView';
import {Card} from '../common/deck/card';
import {Color} from '../common/deck/color';
import {GameScheduler} from '../common/deck/game_scheduler';
import { Player } from '../common/deck/player';
import { useNavigate } from 'react-router-dom';
import '../style/game/GameTopContainer.css';
import '../style/game/ContainerTop.css';
import '../style/game/ContainerMiddle.css';
import '../style/game/ContainerDown.css';
import { backgroundColor } from '../common/utils';
import { CardinalDirection } from '../common/deck/cardinal_directions';

const dealer = new Dealer();
const hands = dealer.deal();
const cardBackId = 0x1F0A0;
const cardBackColor = Color.black;
const cardOwner = new Map()
let firstCardPlayed = false;

const GameBoard = ({ setShowTailSpin, auctionWinner, gameScheduler }) => {
    let cardsSouth = hands.south.cards;
    let cardsNorth = hands.north.cards;
    let cardsEast = hands.east.cards;
    let cardsWest = hands.west.cards;
    let cardsNorthIndices = [...Array(13).keys()];
    let cardsSouthIndices = [...Array(13).keys()];
    let cardsEastIndices = [...Array(13).keys()];
    let cardsWestIndices = [...Array(13).keys()];
    let cardsComponentsNorth = [];
    let cardsComponentsSouth = [];
    let cardsComponentsEast = [];
    let cardsComponentsWest = [];
    let cardDepth = 0;
    let countNS = 0;
    let countEW = 0;
    const width = window.innerWidth * 0.7;
    const height = window.innerHeight;
    const navigate = useNavigate();

    gameScheduler.setCardOwner(cardOwner)
    let playerW = new Player(cardsWest, "west")
    let playerE = new Player(cardsEast, "east")
    let playerN = new Player(cardsNorth, "north")
    let playerS = new Player(cardsSouth, "south")
    gameScheduler.setPlayerW(playerW)
    gameScheduler.setPlayerE(playerE)
    gameScheduler.setPlayerN(playerN)
    gameScheduler.setPlayerS(playerS)


    function processSpacePressed() {
        gameScheduler.processSpacePressed()
    }

    useEffect(() => {
        setShowTailSpin(false);
        const config = {
            type: Phaser.AUTO,
            scene: {
                preload: preload,
                create: create,
                update: update,
            },
            scale: {
                mode: Phaser.Scale.FIT,
                width: window.innerWidth * 0.7,
                height: window.innerHeight,
                parent: 'GameContainer',
            },
            transparent: true,
        };

        const game = new Phaser.Game(config);

        function preload() {
        }

        function update() {
            const gameContainer = document.getElementById('GameContainer');
            gameContainer.style.width = '70%';
            gameContainer.style.height = '100%';
        }

        function create() {
            
        const fontSize = (height + width) * 0.05;
        this.add.rectangle(width / 2, height / 2, width * 0.8, height * 0.6, 0x00ff00);
        const topMiddle = this.add.rectangle(width / 2, 0, width * 0.8, height * 0.4, Phaser.Display.Color.GetColor(160, 170, 69));
        this.add.rectangle(width / 2, height, width * 0.8, height * 0.4, Phaser.Display.Color.GetColor(160, 170, 69));
        const topLeft = this.add.rectangle(0, 0, width * 0.2, height * 0.4, Phaser.Display.Color.GetColor(167, 105, 13));
        const topRight = this.add.rectangle(width, 0, width * 0.2, height * 0.4, Phaser.Display.Color.GetColor(167, 105, 13));
        const bottomLeft = this.add.rectangle(0, height, width * 0.2, height * 0.4, Phaser.Display.Color.GetColor(167, 105, 13));
        const Right = this.add.rectangle(width, height, width * 0.2, height * 0.4, Phaser.Display.Color.GetColor(167, 105, 13));
        const middleLeft = this.add.rectangle(width * 0.05, height * 0.5, width * 0.1, height * 0.6, Phaser.Display.Color.GetColor(160, 170, 69));
        const middleRight = this.add.rectangle(width * 0.95, height * 0.5, width * 0.1, height * 0.6, Phaser.Display.Color.GetColor(160, 170, 69));
        const middle = this.add.rectangle(width * 0.5, height * 0.5, width * 0.8, height * 0.6, 0x008000);
        const graphics = this.add.graphics();

        graphics.lineStyle(15, 0xffff00); // Line width and color
        graphics.strokeRect(width * 0.15, height * 0.25, width * 0.7, height * 0.5);
        const northPlayer = this.add.rectangle(width * 0.5, height * 0.25, width * 0.1, height * 0.05, Phaser.Display.Color.GetColor(24, 24, 24));
        const north = this.add.rectangle(width * 0.45, height * 0.25, width * 0.02, height * 0.05, Phaser.Display.Color.GetColor(211, 10, 3));
        this.add.text(width * 0.447, height * 0.24, 'N', {
            font: `${northPlayer.width / 7}px Arial`
        });
        this.add.text(width * 0.465, height * 0.24, 'nate', {
            font: `${north.width / 1.5}px Arial`
        });

        const southPlayer = this.add.rectangle(width * 0.5, height * 0.75, width * 0.1, height * 0.05, Phaser.Display.Color.GetColor(24, 24, 24));
        const south = this.add.rectangle(width * 0.45, height * 0.75, width * 0.02, height * 0.05, Phaser.Display.Color.GetColor(211, 10, 3));
        this.add.text(width * 0.447, height * 0.74, 'S', {
            font: `${south.width / 1.5}px Arial`
        });
        const southText = this.add.text(width * 0.465, height * 0.74, 'sam', {
            font: `${southPlayer.width / 7}px Arial`
        });
         
        let gameStarted = false

        let play;
        if (auctionWinner) {
            const playBackground = this.add.rectangle(width * 0.95, height * 0.95, width * 0.05, height * 0.05, Phaser.Display.Color.GetColor(211, 10, 3));
            play = this.add.text(width * 0.93, height * 0.94, 'PLAY', {
            font: `${southPlayer.width / 7}px Arial`
        });
        }

        play?.setInteractive()

        play?.on('pointerdown', () => {
            if (!gameStarted) {
                if (auctionWinner !== undefined) {
                    gameScheduler.playBotCard()
                    gameStarted = true;
                }
            } else {
                const whoTookTrick = gameScheduler.processSpacePressed();

                if (whoTookTrick === CardinalDirection.East || whoTookTrick === CardinalDirection.West) {
                    countEW += 1;
                    counterEWText.setText(`EW: ${countEW}`);
                } else if (whoTookTrick === CardinalDirection.North || whoTookTrick === CardinalDirection.South) {
                    countNS += 1;
                    counterNSText.setText(`NS: ${countNS}`);
                }
                
                if (countEW + countNS === 13) {
                    navigate('/tournaments/Tournament 1', {state: {counter: countEW}});
                }
                gameScheduler.playBotCard();
            }
        })

        const westPlayer = this.add.rectangle(width * 0.15, height * 0.5, width * 0.035, height * 0.15, Phaser.Display.Color.GetColor(24, 24, 24));
        const west = this.add.rectangle(width * 0.15, height * 0.58, width * 0.035, height * 0.03, Phaser.Display.Color.GetColor(211, 10, 3));
        const westText = this.add.text(width * 0.147, height * 0.5, 'werner', {
            font: `${westPlayer.height / 8}px Arial`
        });
        westText.setOrigin(0.5);
        westText.angle = 270;
        const W = this.add.text(width * 0.15, height * 0.58, 'W', {
            font: `${west.height / 2}px Arial`
        });
        W.setOrigin(0.5);
        W.angle = 270;

        const eastPlayer = this.add.rectangle(width * 0.85, height * 0.5, width * 0.035, height * 0.15, Phaser.Display.Color.GetColor(24, 24, 24));
        const east = this.add.rectangle(width * 0.85, height * 0.58, width * 0.035, height * 0.03, Phaser.Display.Color.GetColor(211, 10, 3));
        const eastText = this.add.text(width * 0.85, height * 0.5, 'edward', {
            font: `${eastPlayer.height / 8}px Arial`,
        });
        eastText.setOrigin(0.5);
        eastText.angle = 90;
        const E = this.add.text(width * 0.85, height * 0.58, 'E', {
            font: `${east.height / 2}px Arial`
        });
        E.setOrigin(0.5);
        E.angle = 90;

        const counterEWText = this.add.text(width * 0.78, height * 0.7, `EW: ${countEW}`, {
          font: `${fontSize / 7}px Arial`,
          color: 'orange',
        });

        const counterNSText = this.add.text(width * 0.18, height * 0.7, `NS: ${countNS}`, {
          font: `${fontSize / 7}px Arial`,
          color: 'orange',
        });

        // TODO: divide the rendering into functions
        cardsNorth.forEach((updatedCard, index) => {
            const spacing = topMiddle.width * 0.075;
            const card = this.add.text(0, 0, String.fromCodePoint(cardBackId), {
                font: `${topMiddle.height / 3}px Arial`,
                fill: cardBackColor,
                backgroundColor: '#ffffff',
            });
            card.setOrigin(0.5, 0.5);
            card.setInteractive();
            card.x = topLeft.x + topLeft.width / 2 + topMiddle.width * 0.05 + index * spacing;
            card.y = height * 0.2 / 2;
            cardsComponentsNorth.push(card);
            card.on('pointerdown', () => {
                if (auctionWinner !== undefined && gameScheduler.processPlayedCard(updatedCard, card, CardinalDirection.North)) {
                    playCard(this, card, updatedCard, width * 0.5, height * 0.4, index, spacing, 0, cardsComponentsNorth, cardsComponentsEast,
                        cardsNorthIndices, topLeft.x + topLeft.width / 2 + topMiddle.width * 0.05, card.y)
                };
            });

            cardOwner.set(updatedCard.id, card)
        })
        
        cardsSouth.forEach((updatedCard, index) => {
            const spacing = topMiddle.width * 0.075;
            const card = this.add.text(0, 0, String.fromCodePoint(updatedCard.id), {
                font: `${topMiddle.height / 3}px Arial`,
                fill: updatedCard.color,
                backgroundColor: '#ffffff',
            });

            card.setOrigin(0.5, 0.5);
            card.setInteractive();
            card.x = topLeft.x + topLeft.width / 2 + topMiddle.width * 0.05 + index * spacing;
            card.y = height * 0.9;
            cardsComponentsSouth.push(card);
            card.on('pointerdown', () => {
                if (auctionWinner !== undefined && gameScheduler.processPlayedCard(updatedCard, card, CardinalDirection.South))  {
                    playCard(this, card, updatedCard, width * 0.5, height * 0.6, index, spacing, 0, cardsComponentsSouth, cardsComponentsWest,
                        cardsSouthIndices, topLeft.x + topLeft.width / 2 + topMiddle.width * 0.05, card.y);
                }
            });
            cardOwner.set(updatedCard.id, card)
        })

        cardsWest.forEach((updatedCard, index) => {
            const spacing = middleRight.height * 0.1;
            const card = this.add.text(0, 0, String.fromCodePoint(cardBackId), {
                font: `${middleRight.width / 1.5}px Arial`,
                fill: cardBackColor,
                backgroundColor: '#ffffff',
            });
            card.angle = 90;
            card.setOrigin(0.5, 0.5);
            card.setInteractive();
            card.x = topLeft.x + topLeft.width / 4;
            card.y = height * 0.08 + index * spacing + middleRight.height / 10;
            cardsComponentsWest.push(card);
            card.on('pointerdown', () => {
                if (auctionWinner !== undefined && gameScheduler.processPlayedCard(updatedCard, card, CardinalDirection.West)) {
                    playCard(this, card, updatedCard, width * 0.45, height * 0.5, index, 0, spacing, cardsComponentsWest, cardsComponentsNorth,
                        cardsWestIndices, card.x, height * 0.08 + middleRight.height / 10);
                }
            });
            cardOwner.set(updatedCard.id, card)
        })

        cardsEast.forEach((updatedCard, index) => {
            const spacing = middleRight.height * 0.1;
            const card = this.add.text(0, 0, String.fromCodePoint(cardBackId), {
                font: `${middleRight.width / 1.5}px Arial`,
                fill: cardBackColor,
                backgroundColor: '#ffffff',
            });
            card.angle = 90;
            card.setOrigin(0.5, 0.5);
            card.setInteractive();
            card.x = topRight.x - topRight.width / 4;
            card.y = height * 0.08 + index * spacing + middleRight.height / 10;
            cardsComponentsEast.push(card);
            card.on('pointerdown', () => {
                if (auctionWinner !== undefined && gameScheduler.processPlayedCard(updatedCard, card, CardinalDirection.East)) {
                    playCard(this, card, updatedCard, width * 0.55, height * 0.5, index, 0, spacing, cardsComponentsEast, cardsComponentsNorth,
                        cardsEastIndices, card.x, height * 0.08 + middleRight.height / 10);
                }
            });
            cardOwner.set(updatedCard.id, card)
        })

        const updateCardPositions = (cardsArray, initialX, xOffset, initialY, yOffset) => {
            cardsArray.forEach((card, newIndex) => {
              const newX = initialX + newIndex * xOffset;
              const newY = initialY + newIndex * yOffset;
          
              // Use another tween to move the remaining cards to their new positions
              this.tweens.add({
                targets: card,
                x: newX,
                y: newY,
                duration: 200, // Adjust the duration as needed
                ease: 'Power2',
              });
            });
        };

        const revealCards = (cardsComponents) => {
            let cardInfo = []
            if (gameScheduler.current_direction === CardinalDirection.North) {
                cardInfo = cardsNorth
            } else if (gameScheduler.current_direction === CardinalDirection.East) {
                cardInfo = cardsEast
            } else if (gameScheduler.current_direction === CardinalDirection.West) {
                cardInfo = cardsWest
            } else {
                cardInfo = cardsNorth // so that if we have won bidding, we can see both N and S
            }

            cardsComponents.forEach((card, index) => {
                card.setText(String.fromCodePoint(cardInfo[index].id))
                card.setStyle({
                    font: `${fontSize}px Arial`,
                    fill: cardInfo[index].color,
                });
            })
        }

        const handleRemove = (index, xOffset, yOffset, cardsComponents, cardsIndices, oldX, oldY) => {
            cardsComponents.splice(cardsIndices[index], 1);
            for (let i = index + 1; i < cardsIndices.length; i++) {
                cardsIndices[i] -= 1;
            }

            updateCardPositions(cardsComponents, oldX, xOffset, oldY, yOffset);
        }

        const playCard = (scene, card, cardInfo, newX, newY, index, xOffset, yOffset, cardsComponents, nextCardsComponents, cardsIndices, oldX, oldY) => {
            // Use Tween to smoothly move the card to the new position
            card.setText(String.fromCodePoint(cardInfo.id))
            card.setStyle({
                font: `${fontSize}px Arial`,
                fill: cardInfo.color,
            });
            card.angle = 0;
            scene.tweens.add({
              targets: card,
              x: newX,
              y: newY,
              duration: 1000, // adjust the duration as needed
              ease: 'Power2',
              onComplete: () => {
                card.setDepth(cardDepth++);
                const found = cardsComponents.find(cardComponent => cardComponent === card);
                if (found) {
                  handleRemove(index, xOffset, yOffset, cardsComponents, cardsIndices, oldX, oldY);
                }

                if (!firstCardPlayed) {
                    revealCards(nextCardsComponents)
                    firstCardPlayed = true
                }

                gameScheduler.playBotCard()
              }
            });
        }
        }

        return () => {
          game.destroy(true);
        }
    }, [auctionWinner]); 

    return <div id="phaser-game" />;
};

export default GameBoard;