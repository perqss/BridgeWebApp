import {Suit} from './suit'
import {Rank} from './rank'
import { backgroundColor } from '../utils';

class Card {
    suit: Suit;
    rank: Rank;
    id: Number;
    color: String;

    constructor(suit: Suit, rank: Rank, id: Number, color: String) {
        this.suit = suit;
        this.rank = rank;
        this.id = id;
        this.color = color;
    }

    equals(other: Card) {
        return this.suit === other.suit && this.rank === other.rank && this.id === other.id && this.color === other.color;
    }
}

class EmptyCard extends Card {
    constructor() {
        super(Suit.Empty, Rank.Empty, -1, backgroundColor);
    }

    equals(other: Card) {
        console.log(this, other);
        return this.suit === other.suit && this.rank === other.rank && this.id === other.id && this.color === other.color;
    }
}

export {Card, EmptyCard}