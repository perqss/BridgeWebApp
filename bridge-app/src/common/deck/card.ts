import {Suit} from './suit'
import {Rank} from './rank'

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

export {Card}