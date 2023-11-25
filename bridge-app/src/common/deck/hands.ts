import {Hand} from './hand'
import {Card} from './card'

class Hands {
    north : Hand;
    south : Hand;
    east : Hand;
    west : Hand;

    constructor(cardsN : Array<Card>, cardsS : Array<Card>, cardsE : Array<Card>, cardsW : Array<Card>) {
        this.north = new Hand(cardsN);
        this.south = new Hand(cardsS);
        this.east = new Hand(cardsE);
        this.west = new Hand(cardsW);
    }
}

export {Hands}