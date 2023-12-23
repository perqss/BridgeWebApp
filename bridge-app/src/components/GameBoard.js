import React, { useEffect, useState } from 'react';
import * as Phaser from 'phaser';
import {Dealer} from '../common/deck/dealer';
import {CardView} from './CardView';
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

const GameBoard = (props) => {
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
    let countNS = 0;
    let countEW = 0;
    const width = window.innerWidth * 0.7;
    const height = window.innerHeight;
    console.log(props.option, 're render');

    gameScheduler.setLeadDirection(CardinalDirection.South)
    // const [updatedCardsSouth, updateCardsSouth] = useState(cardsSouth);
    // const [updatedCardsPlayedSouth, updateCardsPlayedSouth] = useState(cardPlayedSouth);
    // const [updatedCardsNorth, updateCardsNorth] = useState(cardsNorth);
    function processSpacePressed() {
        gameScheduler.processSpacePressed()
    }
    useEffect(() => {
        console.log(props.option);
        const config = {
            type: Phaser.AUTO,
            width: '70%',
            height: '100%',
            scene: {
                preload: preload,
                create: create,
            },
            transparent: true,
            parent: 'GameContainer',
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
        this.input.keyboard.on('keydown-' + 'SPACE', function (event) {
            const whoTookTrick = gameScheduler.processSpacePressed()

            if (whoTookTrick === CardinalDirection.East || whoTookTrick === CardinalDirection.West) {
                countEW += 1;
                counterEWText.setText(`EW: ${countEW}`);
            } else if (whoTookTrick === CardinalDirection.North || whoTookTrick === CardinalDirection.South) {
                countNS += 1;
                counterNSText.setText(`NS: ${countNS}`);
            }
        });
            
        const fontSize = height * 0.15;
        this.add.rectangle(width / 2, height / 2, width * 0.8, height * 0.6, 0x00ff00);
        this.add.rectangle(width / 2, 0, width * 0.8, height * 0.4, Phaser.Display.Color.GetColor(160, 170, 69));
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
        this.add.text(width * 0.447, height * 0.24, 'N');
        this.add.text(width * 0.48, height * 0.24, 'username');

        const southPlayer = this.add.rectangle(width * 0.5, height * 0.75, width * 0.1, height * 0.05, Phaser.Display.Color.GetColor(24, 24, 24));
        const south = this.add.rectangle(width * 0.45, height * 0.75, width * 0.02, height * 0.05, Phaser.Display.Color.GetColor(211, 10, 3));
        this.add.text(width * 0.447, height * 0.74, 'S');
        this.add.text(width * 0.48, height * 0.74, 'username');

        const westPlayer = this.add.rectangle(width * 0.15, height * 0.5, height * 0.05, width * 0.1, Phaser.Display.Color.GetColor(24, 24, 24));
        const west = this.add.rectangle(width * 0.15, height * 0.6, height * 0.05, width * 0.02, Phaser.Display.Color.GetColor(211, 10, 3));
        const westText = this.add.text(width * 0.145, height * 0.55, 'username');
        westText.angle = 270;
        const W = this.add.text(width * 0.145, height * 0.605, 'W');
        W.angle = 270;

        const eastPlayer = this.add.rectangle(width * 0.85, height * 0.5, height * 0.05, width * 0.1, Phaser.Display.Color.GetColor(24, 24, 24));
        const east = this.add.rectangle(width * 0.85, height * 0.6, height * 0.05, width * 0.02, Phaser.Display.Color.GetColor(211, 10, 3));
        const eastText = this.add.text(width * 0.855, height * 0.45, 'username');
        eastText.angle = 90;
        const E = this.add.text(width * 0.855, height * 0.595, 'E');
        E.angle = 90;

        const counterEWText = this.add.text(width * 0.8, height * 0.7, `EW: ${countEW}`, {
          font: `${fontSize / 7}px Arial`,
          color: 'orange',
        });

        const counterNSText = this.add.text(width * 0.17, height * 0.7, `NS: ${countNS}`, {
          font: `${fontSize / 7}px Arial`,
          color: 'orange',
        });

        const renderCardsNorth = (cards) => {
            cardsNorth.forEach((updatedCard, index) => {
                const spacing = width * 0.055;
                const card = this.add.text(0, 0, String.fromCodePoint(updatedCard.id), {
                    font: `${fontSize}px Arial`,
                    fill: updatedCard.color,
                    backgroundColor: '#ffffff',
                });
                card.setOrigin(0.5, 0.5);
                card.setInteractive();
                card.x = topLeft.x + topLeft.width / 2 + fontSize + index * spacing;
                card.y = height * 0.2 / 2;
                cardsComponentsNorth.push(card);
                card.on('pointerdown', () => {
                    if (gameScheduler.processPlayedCard(updatedCard, card, CardinalDirection.North)) {
                        playCard(this, card, updatedCard, width * 0.5, height * 0.4, index, spacing, 0, cardsComponentsNorth, 
                            cardsNorthIndices, topLeft.x + topLeft.width / 2 + fontSize, card.y)
                    };
                });
            })
        }
        renderCardsNorth(cardsNorth);
        cardsSouth.forEach((updatedCard, index) => {
            const spacing = width * 0.055;
            const card = this.add.text(0, 0, String.fromCodePoint(updatedCard.id), {
                font: `${fontSize}px Arial`,
                fill: updatedCard.color,
                backgroundColor: '#ffffff',
            });

            card.setOrigin(0.5, 0.5);
            card.setInteractive();
            card.x = topLeft.x + topLeft.width / 2 + fontSize + index * spacing;
            card.y = height * 0.9;
            cardsComponentsSouth.push(card);
            card.on('pointerdown', () => {
                if (gameScheduler.processPlayedCard(updatedCard, card, CardinalDirection.South))  {
                    playCard(this, card, updatedCard, width * 0.5, height * 0.6, index, spacing, 0, cardsComponentsSouth, 
                        cardsSouthIndices, topLeft.x + topLeft.width / 2 + fontSize, card.y);
                }
            });
        })

        cardsWest.forEach((updatedCard, index) => {
            const spacing = width * 0.033;
            const card = this.add.text(0, 0, String.fromCodePoint(cardBackId), {
                font: `${fontSize/ 1.5}px Arial`,
                fill: cardBackColor,
                backgroundColor: '#ffffff',
            });
            card.angle = 90;
            card.setOrigin(0.5, 0.5);
            card.setInteractive();
            card.x = topLeft.x + topLeft.width / 4;
            card.y = height * 0.08 + index * spacing;
            cardsComponentsWest.push(card);
            card.on('pointerdown', () => {
                if (gameScheduler.processPlayedCard(updatedCard, card, CardinalDirection.West)) {
                    playCard(this, card, updatedCard, width * 0.45, height * 0.5, index, 0, spacing, cardsComponentsWest,
                        cardsWestIndices, card.x, height * 0.08);
                }
            });
        })

        cardsEast.forEach((updatedCard, index) => {
            const spacing = width * 0.033;
            const card = this.add.text(0, 0, String.fromCodePoint(cardBackId), {
                font: `${fontSize/ 1.5}px Arial`,
                fill: cardBackColor,
                backgroundColor: '#ffffff',
            });
            card.angle = 90;
            card.setOrigin(0.5, 0.5);
            card.setInteractive();
            card.x = topRight.x - topRight.width / 4;
            card.y = height * 0.08 + index * spacing;
            cardsComponentsEast.push(card);
            card.on('pointerdown', () => {
                if (gameScheduler.processPlayedCard(updatedCard, card, CardinalDirection.East)) {
                    playCard(this, card, updatedCard, width * 0.55, height * 0.5, index, 0, spacing, cardsComponentsEast,
                        cardsEastIndices, card.x, height * 0.08);
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
            cardsComponents.splice(cardsIndices[index], 1);
            for (let i = index + 1; i < cardsIndices.length; i++) {
                cardsIndices[i] -= 1;
            }

            updateCardPositions(cardsComponents, oldX, xOffset, oldY, yOffset);
        }

        const playCard = (scene, card, cardInfo, newX, newY, index, xOffset, yOffset, cardsComponents, cardsIndices, oldX, oldY) => {
            // Use Tween to smoothly move the card to the new position
            card.setText(String.fromCodePoint(cardInfo.id))
            card.setStyle({
                font: `${fontSize}px Arial`,
                fill: cardInfo.color,
            });
            card.angle = 0;
            console.log(props.option)
            scene.tweens.add({
              targets: card,
              x: newX,
              y: newY,
              duration: 200, // adjust the duration as needed
              ease: 'Power2',
              onComplete: () => {
                card.setDepth(cardDepth++);
                const found = cardsComponents.find(cardComponent => cardComponent === card);
                if (found) {
                  handleRemove(index, xOffset, yOffset, cardsComponents, cardsIndices, oldX, oldY);
                }
              }
            });
        }
        }

        return () => {
          game.destroy(true);
        }
    }, []); 

    return <div id="phaser-game" />;
};

export default GameBoard;