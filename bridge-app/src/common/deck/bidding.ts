import { CardinalDirection } from "./cardinal_directions"

enum BiddingPair {
    NS,
    WE,
    None
}

enum BiddingState {
    Kontrable,
    Rekontrable,
    None
}

const getBiddingPair = (direction: CardinalDirection) => {
    if (direction === CardinalDirection.North || direction === CardinalDirection.South) {
        return BiddingPair.NS
    }

    return BiddingPair.WE
}

const getOppositeBiddingPair = (direction: CardinalDirection) => {
    if (direction === CardinalDirection.North || direction === CardinalDirection.South) {
        return BiddingPair.WE
    }

    return BiddingPair.NS
}


export {BiddingPair, BiddingState, getBiddingPair, getOppositeBiddingPair}