import {Hands} from './hands'
import {Deck} from './deck'

class Dealer {
    deal() {
        var newDeck = [...Deck];
        
        newDeck.sort(function() {
            return 0.5 - Math.random();
        })

        return new Hands(
            newDeck.slice(0, 13),
            newDeck.slice(13,26),
            newDeck.slice(26, 39),
            newDeck.slice(39, 52));
    }
}

export {Dealer}