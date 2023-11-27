import {Card} from './card'
import {PlayRestrictions} from './play_restrictions'

class Hand {
    cards : Array<Card>

    constructor(cards: Array<Card>) {
        this.cards = cards
    }

    playCard(playRestrictions: PlayRestrictions) {
        // TODO: implement a reasonable card to play
        this.cards.pop();
    }
}

export {Hand};