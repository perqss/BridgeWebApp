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
}

export {Card}