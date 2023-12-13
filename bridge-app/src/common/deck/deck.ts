import {Card} from './card'
import {Suit} from './suit'
import {Rank} from './rank'
import { Color } from './color'

const Deck: Array<Card> = [
    new Card(Suit.Spades, Rank.Two, 0x1F0A2, Color.black),
    new Card(Suit.Spades, Rank.Three, 0x1F0A3, Color.black),
    new Card(Suit.Spades, Rank.Four, 0x1F0A4, Color.black),
    new Card(Suit.Spades, Rank.Five, 0x1F0A5, Color.black),
    new Card(Suit.Spades, Rank.Six, 0x1F0A6, Color.black),
    new Card(Suit.Spades, Rank.Seven, 0x1F0A7, Color.black),
    new Card(Suit.Spades, Rank.Eight, 0x1F0A8, Color.black),
    new Card(Suit.Spades, Rank.Nine, 0x1F0A9, Color.black),
    new Card(Suit.Spades, Rank.Ten, 0x1F0AA, Color.black),
    new Card(Suit.Spades, Rank.Jack, 0x1F0AB, Color.black),
    new Card(Suit.Spades, Rank.Queen, 0x1F0AD, Color.black),
    new Card(Suit.Spades, Rank.King, 0x1F0AE, Color.black),
    new Card(Suit.Spades, Rank.Ace, 0x1F0A1, Color.black),

    new Card(Suit.Hearts, Rank.Two, 0x1F0B2, Color.red),
    new Card(Suit.Hearts, Rank.Three, 0x1F0B3, Color.red),
    new Card(Suit.Hearts, Rank.Four, 0x1F0B4, Color.red),
    new Card(Suit.Hearts, Rank.Five, 0x1F0B5, Color.red),
    new Card(Suit.Hearts, Rank.Six, 0x1F0B6, Color.red),
    new Card(Suit.Hearts, Rank.Seven, 0x1F0B7, Color.red),
    new Card(Suit.Hearts, Rank.Eight, 0x1F0B8, Color.red),
    new Card(Suit.Hearts, Rank.Nine, 0x1F0B9, Color.red),
    new Card(Suit.Hearts, Rank.Ten, 0x1F0BA, Color.red),
    new Card(Suit.Hearts, Rank.Jack, 0x1F0BB, Color.red),
    new Card(Suit.Hearts, Rank.Queen, 0x1F0BD, Color.red),
    new Card(Suit.Hearts, Rank.King, 0x1F0BE, Color.red),
    new Card(Suit.Hearts, Rank.Ace, 0x1F0B1, Color.red),

    new Card(Suit.Diamonds, Rank.Two, 0x1F0C2, Color.red),
    new Card(Suit.Diamonds, Rank.Three, 0x1F0C3, Color.red),
    new Card(Suit.Diamonds, Rank.Four, 0x1F0C4, Color.red),
    new Card(Suit.Diamonds, Rank.Five, 0x1F0C5, Color.red),
    new Card(Suit.Diamonds, Rank.Six, 0x1F0C6, Color.red),
    new Card(Suit.Diamonds, Rank.Seven, 0x1F0C7, Color.red),
    new Card(Suit.Diamonds, Rank.Eight, 0x1F0C8, Color.red),
    new Card(Suit.Diamonds, Rank.Nine, 0x1F0C9, Color.red),
    new Card(Suit.Diamonds, Rank.Ten, 0x1F0CA, Color.red),
    new Card(Suit.Diamonds, Rank.Jack, 0x1F0CB, Color.red),
    new Card(Suit.Diamonds, Rank.Queen, 0x1F0CD, Color.red),
    new Card(Suit.Diamonds, Rank.King, 0x1F0CE, Color.red),
    new Card(Suit.Diamonds, Rank.Ace, 0x1F0C1, Color.red),

    new Card(Suit.Clubs, Rank.Two, 0x1F0D2, Color.black),
    new Card(Suit.Clubs, Rank.Three, 0x1F0D3, Color.black),
    new Card(Suit.Clubs, Rank.Four, 0x1F0D4, Color.black),
    new Card(Suit.Clubs, Rank.Five, 0x1F0D5, Color.black),
    new Card(Suit.Clubs, Rank.Six, 0x1F0D6, Color.black),
    new Card(Suit.Clubs, Rank.Seven, 0x1F0D7, Color.black),
    new Card(Suit.Clubs, Rank.Eight, 0x1F0D8, Color.black),
    new Card(Suit.Clubs, Rank.Nine, 0x1F0D9, Color.black),
    new Card(Suit.Clubs, Rank.Ten, 0x1F0DA, Color.black),
    new Card(Suit.Clubs, Rank.Jack, 0x1F0DB, Color.black),
    new Card(Suit.Clubs, Rank.Queen, 0x1F0DD, Color.black),
    new Card(Suit.Clubs, Rank.King, 0x1F0DE, Color.black),
    new Card(Suit.Clubs, Rank.Ace, 0x1F0D1, Color.black),
]

export {Deck}