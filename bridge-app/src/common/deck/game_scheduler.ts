import {Card} from './card'
import { CardinalDirection } from './cardinal_directions';
import { Suit } from './suit';

const NumberOfPlayers = 4

class GameScheduler {
    current_direction : CardinalDirection;
    lead_direction: CardinalDirection;

    played_suit : Suit
    cards_played_in_trick : any[] = [] // TODO: card type????
    card_info_in_trick : Card[] = []

    constructor() {
        this.current_direction = CardinalDirection.None
        this.lead_direction = CardinalDirection.None

        this.played_suit = Suit.NoTrump
    }

    setLeadDirection(direction : CardinalDirection) {
        this.current_direction = direction
        this.lead_direction = direction
    }

    setTriumph(suit: Suit) {
        this.played_suit = suit;
    }

    getCurrentDirection() {
        return this.current_direction
    }

    setNextDirection() {
        this.current_direction = (this.current_direction + 1) % NumberOfPlayers
    }

    processPlayedCard(cardInfo: Card, card: any, direction: CardinalDirection) {
        if (this.current_direction === direction) {
            this.cards_played_in_trick.push(card)
            this.card_info_in_trick.push(cardInfo)

            if (this.cards_played_in_trick.length === NumberOfPlayers) {
                this.current_direction = CardinalDirection.Waiting
            } else {
                this.setNextDirection();
            }

            return true
        }

        return false
    }

    processAuction(direction: CardinalDirection) {
        if (this.current_direction === direction) {
            this.setNextDirection();
            return true;
        }
        return false;
    }

    processSpacePressed() {
        if (this.current_direction === CardinalDirection.Waiting) {
            let first_suit = this.card_info_in_trick[0].suit
            let indexMax = 0

            if (this.played_suit === Suit.NoTrump) {
                for (let i = 1; i < NumberOfPlayers; i++) {
                    if (this.card_info_in_trick[i].suit === first_suit) {
                        if (this.card_info_in_trick[i].rank > this.card_info_in_trick[0].rank) {
                            indexMax = i
                        }
                    }
                }
            } else {
                let suitedMax = -1
                for (let i = 0; i < NumberOfPlayers; i++) {
                    if (this.card_info_in_trick[i].suit === this.played_suit) {
                        if (suitedMax === -1 || this.card_info_in_trick[i].rank > this.card_info_in_trick[suitedMax].rank) {
                            suitedMax = i
                        }
                    }
                }

                if (suitedMax === -1) {
                    indexMax = 0
                    for (let i = 1; i < NumberOfPlayers; i++) {
                        if (this.card_info_in_trick[i].suit === first_suit) {
                            if (this.card_info_in_trick[i].rank > this.card_info_in_trick[0].rank) {
                                indexMax = i
                            }
                        }
                    }
                }
            }

            this.cards_played_in_trick.forEach((card) => {
                card.destroy();
            })

            this.cards_played_in_trick = []
            this.card_info_in_trick = []
            
            this.current_direction = (this.lead_direction + indexMax) % NumberOfPlayers
            this.lead_direction = this.current_direction

            return this.current_direction
        }
    }
}

export {GameScheduler}