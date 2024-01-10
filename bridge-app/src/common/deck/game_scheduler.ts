import {Card} from './card'
import { CardinalDirection } from './cardinal_directions';
import { Suit } from './suit';
import { Bidder } from './bidder';
import { GameSchedulerType } from './game_scheduler_type';

const NumberOfPlayers = 4

class GameScheduler {
    type : GameSchedulerType // TODO: to remove when playing bots are implemented
    current_direction : CardinalDirection;
    lead_direction: CardinalDirection;

    played_suit : Suit
    cards_played_in_trick : any[] = [] // TODO: card type????
    card_info_in_trick : Card[] = []
    cardsNorth : any[] = []
    cardsSouth : any[] = []
    cardsEast : any[] = []
    cardsWest : any[] = []
    playerW : any
    playerE : any
    playerN : any
    playerS : any
    cardOwner: any
    shouldNPlayAsBot : Boolean

    constructor(schedulerType : GameSchedulerType) {
        this.type = schedulerType
        this.current_direction = CardinalDirection.None
        this.lead_direction = CardinalDirection.None

        this.played_suit = Suit.NoTrump
        this.playerW = null
        this.playerE = null
        this.playerN = null
        this.playerS = null
        this.shouldNPlayAsBot = false
    }

    setLeadDirection(direction : CardinalDirection) {
        this.current_direction = direction
        this.lead_direction = direction
    }

    setTriumph(suit: Suit) {
        this.played_suit = suit;
    }

    getCurrentDirection() {
        return this.current_direction
    }

    setNextDirection() {
        this.current_direction = (this.current_direction + 1) % NumberOfPlayers
    
        if (this.type === GameSchedulerType.Play) { // TODO: to remove if play() works fine for playing bots
            return
        }

        if (this.current_direction === CardinalDirection.West) {
            this.playerW.play()

            return
        }

        if (this.current_direction === CardinalDirection.East) {
            this.playerE.play()

            return
        }

        if (this.current_direction === CardinalDirection.North) {
            this.playerN.play()

            return
        }
    }

    setPlayerW(player : any) {
        this.playerW = player
    }

    setPlayerE(player : any) {
        this.playerE = player
    }

    setPlayerN(player : any) {
        this.playerN = player
    }

    setPlayerS(player : any) {
        this.playerS = player
    }

    setCardOwner(cardOwner: any) {
        this.cardOwner = cardOwner
    }

    setNShouldPlayAsBot(shouldNPlayAsBot : Boolean) {
        this.shouldNPlayAsBot = shouldNPlayAsBot
    }

    processPlayedCard(cardInfo: Card, card: any, direction: CardinalDirection) {
        if (this.current_direction === direction) {
            if (this.card_info_in_trick.length > 0) {
                let playedSuitByFirstPlayer =  this.card_info_in_trick[0].suit

                if (cardInfo.suit !== playedSuitByFirstPlayer) {
                    let playerCards = this.getCurrentPlayer().cards

                    for (let i = 0; i < playerCards.length; i++) {
                        console.log("card ", playerCards[i].id)
                        if (playerCards [i].suit === playedSuitByFirstPlayer) {
                            return false
                        }
                    }
                }
            }

            this.cards_played_in_trick.push(card)

            this.card_info_in_trick.push(cardInfo)

            if (this.cards_played_in_trick.length === NumberOfPlayers) {
                this.current_direction = CardinalDirection.Waiting
            } else {
                this.setNextDirection();
            }

            return true
        }

        return false
    }

    processAuction(direction: CardinalDirection) {
        if (this.current_direction === direction) {
            this.setNextDirection();
            return true;
        }
        return false;
    }

    processSpacePressed() {
        if (this.type === GameSchedulerType.Bid) {
            return
        }

        if (this.current_direction === CardinalDirection.Waiting) {
            let first_suit = this.card_info_in_trick[0].suit
            let indexMax = 0

            if (this.played_suit === Suit.NoTrump) {
                for (let i = 1; i < NumberOfPlayers; i++) {
                    if (this.card_info_in_trick[i].suit === first_suit) {
                        if (this.card_info_in_trick[i].rank > this.card_info_in_trick[0].rank) {
                            indexMax = i
                        }
                    }
                }
            } else {
                let suitedMax = -1
                for (let i = 0; i < NumberOfPlayers; i++) {
                    if (this.card_info_in_trick[i].suit === this.played_suit) {
                        if (suitedMax === -1 || this.card_info_in_trick[i].rank > this.card_info_in_trick[suitedMax].rank) {
                            suitedMax = i
                        }
                    }
                }

                if (suitedMax === -1) {
                    indexMax = 0
                    for (let i = 1; i < NumberOfPlayers; i++) {
                        if (this.card_info_in_trick[i].suit === first_suit) {
                            if (this.card_info_in_trick[i].rank > this.card_info_in_trick[0].rank) {
                                indexMax = i
                            }
                        }
                    }
                }
            }

            this.cards_played_in_trick.forEach((card) => {
                card.destroy();
            })

            this.cards_played_in_trick = []
            this.card_info_in_trick = []
            
            this.current_direction = (this.lead_direction + indexMax) % NumberOfPlayers
            this.lead_direction = this.current_direction

            return this.current_direction
        }
    }

    setCards(cardsNorth: any[], cardsSouth: any[], cardsEast: any[], cardsWest: any[]) {
        this.cardsNorth = cardsNorth;
        this.cardsSouth = cardsSouth;
        this.cardsEast = cardsEast;
        this.cardsWest = cardsWest;
    }

    getCards(direction: CardinalDirection) {
        if (direction === CardinalDirection.North) {
            return this.cardsNorth
        }

        if (direction === CardinalDirection.South) {
            return this.cardsSouth
        }

        if (direction === CardinalDirection.East) {
            return this.cardsEast
        }

        if (direction === CardinalDirection.West) {
            return this.cardsWest
        }

        return []
    }

    playBotCard()
    {
        console.log(this.current_direction)
        if (this.current_direction === CardinalDirection.West) {
            let cardPlayed = this.playerW.play(this.card_info_in_trick)
            if (cardPlayed === undefined) {
                console.log("game ended")
                return
            }

            this.cardOwner.get(cardPlayed.id).listeners('pointerdown')[0]()

            return
        }

        if (this.current_direction === CardinalDirection.North && this.shouldNPlayAsBot) {
            let cardPlayed = this.playerN.play(this.card_info_in_trick)
            console.log(this.card_info_in_trick)
            if (cardPlayed === undefined) {
                console.log("game ended")
                return
            }

            this.cardOwner.get(cardPlayed.id).listeners('pointerdown')[0]()
            
            return
        }

        if (this.current_direction === CardinalDirection.East) {
            let cardPlayed = this.playerE.play(this.card_info_in_trick)
            if (cardPlayed === undefined) {
                console.log("game ended")
                return
            }

            this.cardOwner.get(cardPlayed.id).listeners('pointerdown')[0]()

            return
        }
    }

    getCurrentPlayer() {
        if (this.current_direction === CardinalDirection.North) {
            return this.playerN
        }

        if (this.current_direction === CardinalDirection.South) {
            return this.playerS
        }

        if (this.current_direction === CardinalDirection.East) {
            return this.playerE
        }

        if (this.current_direction === CardinalDirection.West) {
            return this.playerW
        }
    }
}

export {GameScheduler}