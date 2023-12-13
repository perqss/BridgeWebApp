import {Card} from './card'
import {PlayRestrictions} from './play_restrictions'

class Hand {
    cards : Array<Card>

    constructor(cards: Array<Card>) {
        this.cards = cards
        this.cards.sort(function (a, b) {
            if (a.suit < b.suit || (a.suit === b.suit && a.rank >= b.rank)) {
                return -1
            } else {
                return 1;
            }
        })
    }

    playCard(playRestrictions: PlayRestrictions) {
        // TODO: implement a reasonable card to play
        this.cards.pop();
    }
}

export {Hand};