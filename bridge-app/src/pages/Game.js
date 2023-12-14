import React, { useEffect, useState } from 'react';
import * as Phaser from 'phaser';
import {Dealer} from '../common/deck/dealer';
import {CardView} from '../components/CardView';
import {Card} from '../common/deck/card';
import {Color} from '../common/deck/color';

import '../style/game/GameTopContainer.css';
import '../style/game/ContainerTop.css';
import '../style/game/ContainerMiddle.css';
import '../style/game/ContainerDown.css';
import { backgroundColor } from '../common/utils';

const dealer = new Dealer();
const hands = dealer.deal();
const cardBack = new Card(undefined, undefined, 0x1F0A0, Color.black);
const cardBacks = [];
for (let i = 0; i < 13; i++) {
  cardBacks.push(cardBack);
}


const Game = () => {
    const cardsSouth = hands.south.cards;
    const cardsNorth = hands.north.cards;
    const cardPlayedSouth = [];

    const [updatedCardsSouth, updateCardsSouth] = useState(cardsSouth);
    const [updatedCardsPlayedSouth, updateCardsPlayedSouth] = useState(cardPlayedSouth);
    const [updatedCardsNorth, updateCardsNorth] = useState(cardsNorth);

    useEffect(() => {
        const config = {
        type: Phaser.AUTO,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        scene: {
            preload: preload,
            create: create,
        },
        transparent: true,
        parent: 'Table',
        };

        const game = new Phaser.Game(config);

        function preload() {
        // No need to preload anything in this case
        }

        function create() {
        const cardsSouth = this.add.group();
        const cardsNorth = this.add.group();
        
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

        updatedCardsNorth.forEach((updatedCard, index) => {
            const x = 50 + index * 120;
            const y = 100;
            const spacing = window.innerWidth * 0.055;

            const card = this.add.text(0, 0, String.fromCodePoint(updatedCard.id), {
                font: `${fontSize}px Arial`,
                fill: updatedCard.color,
            });

            card.setOrigin(0.5, 0.5);
            card.setInteractive();
            card.on('pointerdown', () => {
                flipCard(this, card);
            });
            card.x = topLeft.x + topLeft.width / 2 + fontSize + index * spacing;
            card.y = window.innerHeight * 0.15 / 2;
            cardsNorth.add(card);
        })

        updatedCardsSouth.forEach((updatedCard, index) => {
            const x = 50 + index * 120;
            const y = 100;
            const spacing = window.innerWidth * 0.055;
            console.log(spacing)
            const card = this.add.text(0, 0, String.fromCodePoint(updatedCard.id), {
                font: `${fontSize}px Arial`,
                fill: updatedCard.color,
            });

            card.setOrigin(0.5, 0.5);
            card.setInteractive();
            card.on('pointerdown', () => {
                flipCard(this, card);
            });
            card.x = topLeft.x + topLeft.width / 2 + fontSize + index * spacing;
            card.y = window.innerHeight * 0.9;
            cardsSouth.add(card);
        })

        function flipCard(scene, card) {
            // Your flip logic here
            const newX = 500/* set the new x-coordinate */;
            const newY = 500/* set the new y-coordinate */;
          
            // Use Tween to smoothly move the card to the new position
            scene.tweens.add({
              targets: card,
              x: newX,
              y: newY,
              duration: 500, // adjust the duration as needed
              ease: 'Power2',
            });
        }
        }
    }, []); // Empty dependency array to ensure the effect runs only once

    return <div id="phaser-game" />;
};

export default Game;