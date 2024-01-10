import {Card} from './card'

class Player {
    cards : Array<Card>
    name : any
    constructor(cards: Array<Card>, name: any) {
        this.cards = cards
        this.name = name
    }

    play(cardsOnTable: any[]) {
        if (cardsOnTable.length === 0) {
            return this.cards.pop()
        }

        let played_suit = cardsOnTable[0].suit

        for (let i = 0; i < this.cards.length; i++) {
            let card = this.cards[i]
        
            if (card.suit === played_suit) {
                this.cards.splice(i, 1)
                return card
            }
        }

        return this.cards.pop()
    }

    playCardAsHuman(card: Card) {
        for (let i = 0; i < this.cards.length; i++) {
            if (this.cards[i].id === card.id) {
                this.cards.splice(i, 1)
                return
            }
        }
    }
}

export {Player}