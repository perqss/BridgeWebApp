import {Suit} from './suit'
import {Rank} from './rank'

class Card {
    suit: Suit
    rank: Rank
    id: Number
    constructor(suit: Suit, rank: Rank, id: Number) {
        this.suit = suit
        this.rank = rank
        this.id = id
    }
}

export {Card}