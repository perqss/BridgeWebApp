class Player {
    cards : any[]
    name : any
    constructor(cards: any[], name: any) {
        this.cards = cards
        this.name = name
    }

    play(cardsOnTable: any[]) {
        console.log(cardsOnTable) // XD?
        console.log("playing, ", this.name)
        if (cardsOnTable.length === 0) {
            return this.cards.pop()
        }

        let played_suit = cardsOnTable[0].suit

        for (let i = 0; i < this.cards.length; i++) {
            let card = this.cards[i]
        
            if (card.suit === played_suit) {
                this.cards.splice(i, 1)
                console.log(this.cards.length)
                return card
            }
            console.log("proceed")
        }

        return this.cards.pop()
    }
}

export {Player}