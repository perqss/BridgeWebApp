import {Card} from './card'
import { CardinalDirection } from './cardinal_directions';

class GameScheduler {
    current_direction : CardinalDirection;

    constructor() {
        this.current_direction = CardinalDirection.None
    }

    setLeadDirection(direction : CardinalDirection) {
        this.current_direction = direction
    }

    getCurrentDirection() {
        return this.current_direction
    }

    setNextDirection() {
        this.current_direction = (this.current_direction + 1) % 4
    }

    processPlayedCard(card: Card, direction: CardinalDirection) {
        if (this.current_direction == direction) {
            this.setNextDirection();
        }
    }
}

export {GameScheduler}