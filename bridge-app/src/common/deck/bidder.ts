class Bidder {
    pass: any
    constructor(pass: any) {
        this.pass = pass
    }

    play() {
        this.pass('PASS', 0);
    }
}

export {Bidder}