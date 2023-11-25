import {Suit} from './suit'
import {Rank} from './rank'

class Card {
    suit: Suit
    rank: Rank
    constructor(suit: Suit, rank: Rank) {
        this.suit = suit
        this.rank = rank
    }
}

export {Card}