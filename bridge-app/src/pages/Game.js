import React, { useEffect, useState } from 'react';
import * as Phaser from 'phaser';
import {Dealer} from '../common/deck/dealer';
import {CardView} from '../components/CardView';
import {Card} from '../common/deck/card';
import {Color} from '../common/deck/color';
import {GameScheduler} from '../common/deck/game_scheduler';

import '../style/game/GameTopContainer.css';
import '../style/game/ContainerTop.css';
import '../style/game/ContainerMiddle.css';
import '../style/game/ContainerDown.css';
import { backgroundColor } from '../common/utils';
import { CardinalDirection } from '../common/deck/cardinal_directions';

const dealer = new Dealer();
const hands = dealer.deal();
const gameScheduler = new GameScheduler();
const cardBackId = 0x1F0A0;
const cardBackColor = Color.black;

const Game = () => {
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
    let cardPlayedSouth = [];
    let cardDepth = 0;

    gameScheduler.setLeadDirection(CardinalDirection.South)
    // const [updatedCardsSouth, updateCardsSouth] = useState(cardsSouth);
    // const [updatedCardsPlayedSouth, updateCardsPlayedSouth] = useState(cardPlayedSouth);
    // const [updatedCardsNorth, updateCardsNorth] = useState(cardsNorth);

    useEffect(() => {
        const config = {
        type: Phaser.AUTO,
        width: '100%',
        height: '100%',
        scene: {
            preload: preload,
            create: create,
        },
        transparent: true,
        parent: 'MainContainer',
        };

        const game = new Phaser.Game(config);

        function preload() {
        // No need to preload anything in this case
        }

        function create() {
        // const cardsSouth = this.add.group();
        // const cardsNorth = this.add.group();
        // const cardsEast = this.add.group();
        // const cardsWest = this.add.group();
        
        const fontSize = window.innerHeight * 0.15;
        this.add.rectangle(window.innerWidth / 2, window.innerHeight / 2, window.innerWidth * 0.8, window.innerHeight * 0.6, 0x00ff00);
        this.add.rectangle(window.innerWidth / 2, 0, window.innerWidth * 0.8, window.innerHeight * 0.4, Phaser.Display.Color.GetColor(160, 170, 69));
        this.add.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth * 0.8, window.innerHeight * 0.4, Phaser.Display.Color.GetColor(160, 170, 69));
        const topLeft = this.add.rectangle(0, 0, window.innerWidth * 0.2, window.innerHeight * 0.4, Phaser.Display.Color.GetColor(167, 105, 13));
        const topRight = this.add.rectangle(window.innerWidth, 0, window.innerWidth * 0.2, window.innerHeight * 0.4, Phaser.Display.Color.GetColor(167, 105, 13));
        const bottomLeft = this.add.rectangle(0, window.innerHeight, window.innerWidth * 0.2, window.innerHeight * 0.4, Phaser.Display.Color.GetColor(167, 105, 13));
        const Right = this.add.rectangle(window.innerWidth, window.innerHeight, window.innerWidth * 0.2, window.innerHeight * 0.4, Phaser.Display.Color.GetColor(167, 105, 13));
        const middleLeft = this.add.rectangle(window.innerWidth * 0.05, window.innerHeight * 0.5, window.innerWidth * 0.1, window.innerHeight * 0.6, Phaser.Display.Color.GetColor(160, 170, 69));
        const middleRight = this.add.rectangle(window.innerWidth * 0.95, window.innerHeight * 0.5, window.innerWidth * 0.1, window.innerHeight * 0.6, Phaser.Display.Color.GetColor(160, 170, 69));
        const middle = this.add.rectangle(window.innerWidth * 0.5, window.innerHeight * 0.5, window.innerWidth * 0.8, window.innerHeight * 0.6, 0x008000);
        const graphics = this.add.graphics();

        graphics.lineStyle(15, 0xffff00); // Line width and color
        graphics.strokeRect(window.innerWidth * 0.15, window.innerHeight * 0.25, window.innerWidth * 0.7, window.innerHeight * 0.5);
        const northPlayer = this.add.rectangle(window.innerWidth * 0.5, window.innerHeight * 0.25, window.innerWidth * 0.1, window.innerHeight * 0.05, Phaser.Display.Color.GetColor(24, 24, 24));
        const north = this.add.rectangle(window.innerWidth * 0.45, window.innerHeight * 0.25, window.innerWidth * 0.02, window.innerHeight * 0.05, Phaser.Display.Color.GetColor(211, 10, 3));
        this.add.text(window.innerWidth * 0.447, window.innerHeight * 0.24, 'N');
        this.add.text(window.innerWidth * 0.48, window.innerHeight * 0.24, 'username');

        const southPlayer = this.add.rectangle(window.innerWidth * 0.5, window.innerHeight * 0.75, window.innerWidth * 0.1, window.innerHeight * 0.05, Phaser.Display.Color.GetColor(24, 24, 24));
        const south = this.add.rectangle(window.innerWidth * 0.45, window.innerHeight * 0.75, window.innerWidth * 0.02, window.innerHeight * 0.05, Phaser.Display.Color.GetColor(211, 10, 3));
        this.add.text(window.innerWidth * 0.447, window.innerHeight * 0.74, 'S');
        this.add.text(window.innerWidth * 0.48, window.innerHeight * 0.74, 'username');

        const westPlayer = this.add.rectangle(window.innerWidth * 0.15, window.innerHeight * 0.5, window.innerHeight * 0.05, window.innerWidth * 0.1, Phaser.Display.Color.GetColor(24, 24, 24));
        const west = this.add.rectangle(window.innerWidth * 0.15, window.innerHeight * 0.6, window.innerHeight * 0.05, window.innerWidth * 0.02, Phaser.Display.Color.GetColor(211, 10, 3));
        const westText = this.add.text(window.innerWidth * 0.145, window.innerHeight * 0.55, 'username');
        westText.angle = 270;
        const W = this.add.text(window.innerWidth * 0.145, window.innerHeight * 0.605, 'W');
        W.angle = 270;

        const eastPlayer = this.add.rectangle(window.innerWidth * 0.85, window.innerHeight * 0.5, window.innerHeight * 0.05, window.innerWidth * 0.1, Phaser.Display.Color.GetColor(24, 24, 24));
        const east = this.add.rectangle(window.innerWidth * 0.85, window.innerHeight * 0.6, window.innerHeight * 0.05, window.innerWidth * 0.02, Phaser.Display.Color.GetColor(211, 10, 3));
        const eastText = this.add.text(window.innerWidth * 0.855, window.innerHeight * 0.45, 'username');
        eastText.angle = 90;
        const E = this.add.text(window.innerWidth * 0.855, window.innerHeight * 0.595, 'E');
        E.angle = 90;

        const renderCardsNorth = (cards) => {
            cardsNorth.forEach((updatedCard, index) => {
                const spacing = window.innerWidth * 0.055;
                const card = this.add.text(0, 0, String.fromCodePoint(updatedCard.id), {
                    font: `${fontSize}px Arial`,
                    fill: updatedCard.color,
                    backgroundColor: '#ffffff',
                });
                card.setOrigin(0.5, 0.5);
                card.setInteractive();
                card.x = topLeft.x + topLeft.width / 2 + fontSize + index * spacing;
                card.y = window.innerHeight * 0.2 / 2;
                cardsComponentsNorth.push(card);
                card.on('pointerdown', () => {
                    if (gameScheduler.getCurrentDirection() === CardinalDirection.North) {
                        playCard(this, card, updatedCard, window.innerWidth * 0.5, window.innerHeight * 0.4, index, spacing, 0, cardsComponentsNorth, 
                            cardsNorthIndices, topLeft.x + topLeft.width / 2 + fontSize, card.y)
                        gameScheduler.setNextDirection();
                    };
                });
            })
        }
        renderCardsNorth(cardsNorth);
        cardsSouth.forEach((updatedCard, index) => {
            const spacing = window.innerWidth * 0.055;
            const card = this.add.text(0, 0, String.fromCodePoint(updatedCard.id), {
                font: `${fontSize}px Arial`,
                fill: updatedCard.color,
                backgroundColor: '#ffffff',
            });

            card.setOrigin(0.5, 0.5);
            card.setInteractive();
            card.x = topLeft.x + topLeft.width / 2 + fontSize + index * spacing;
            card.y = window.innerHeight * 0.9;
            cardsComponentsSouth.push(card);
            card.on('pointerdown', () => {
                if (gameScheduler.getCurrentDirection() === CardinalDirection.South) {
                    playCard(this, card, updatedCard, window.innerWidth * 0.5, window.innerHeight * 0.6, index, spacing, 0, cardsComponentsSouth, 
                        cardsSouthIndices, topLeft.x + topLeft.width / 2 + fontSize, card.y);
                    gameScheduler.setNextDirection();
                    console.log(gameScheduler.getCurrentDirection());
                }
            });
        })

        cardsWest.forEach((updatedCard, index) => {
            const spacing = window.innerWidth * 0.033;
            const card = this.add.text(0, 0, String.fromCodePoint(cardBackId), {
                font: `${fontSize/ 1.5}px Arial`,
                fill: cardBackColor,
                backgroundColor: '#ffffff',
            });
            card.angle = 90;
            card.setOrigin(0.5, 0.5);
            card.setInteractive();
            card.x = topLeft.x + topLeft.width / 4;
            card.y = window.innerHeight * 0.08 + index * spacing;
            cardsComponentsWest.push(card);
            card.on('pointerdown', () => {
                if (gameScheduler.getCurrentDirection() === CardinalDirection.West) {
                    playCard(this, card, updatedCard, window.innerWidth * 0.45, window.innerHeight * 0.5, index, 0, spacing, cardsComponentsWest,
                        cardsWestIndices, card.x, window.innerHeight * 0.08);
                    gameScheduler.setNextDirection();
                    console.log(gameScheduler.getCurrentDirection());
                }
            });
        })

        cardsEast.forEach((updatedCard, index) => {
            const spacing = window.innerWidth * 0.033;
            const card = this.add.text(0, 0, String.fromCodePoint(cardBackId), {
                font: `${fontSize/ 1.5}px Arial`,
                fill: cardBackColor,
                backgroundColor: '#ffffff',
            });
            card.angle = 90;
            card.setOrigin(0.5, 0.5);
            card.setInteractive();
            card.x = topRight.x - topRight.width / 4;
            card.y = window.innerHeight * 0.08 + index * spacing;
            cardsComponentsEast.push(card);
            card.on('pointerdown', () => {
                if (gameScheduler.getCurrentDirection() === CardinalDirection.East) {
                    playCard(this, card, updatedCard, window.innerWidth * 0.55, window.innerHeight * 0.5, index, 0, spacing, cardsComponentsEast,
                        cardsEastIndices, card.x, window.innerHeight * 0.08);
                    gameScheduler.setNextDirection();
                }
            });
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

        const handleRemove = (index, xOffset, yOffset, cardsComponents, cardsIndices, oldX, oldY) => {
            console.log(cardsComponents)
            cardsComponents.splice(cardsIndices[index], 1);
            for (let i = index + 1; i < cardsIndices.length; i++) {
                cardsIndices[i] -= 1;
            }

            updateCardPositions(cardsComponents, oldX, xOffset, oldY, yOffset);
        }

        const playCard = (scene, card, cardInfo, newX, newY, index, xOffset, yOffset, cardsComponents, cardsIndices, oldX, oldY) => {
            // Use Tween to smoothly move the card to the new position
            console.log(cardsComponents, cardsIndices)
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
              duration: 200, // adjust the duration as needed
              ease: 'Power2',
              onComplete: () => {
                card.setDepth(cardDepth++);
                handleRemove(index, xOffset, yOffset, cardsComponents, cardsIndices, oldX, oldY);
              }
            });
            
        }
        }

        return () => {
          game.destroy(true);
        }
    }, []); // Empty dependency array to ensure the effect runs only once

    return <div id="phaser-game" />;
};

export default Game;