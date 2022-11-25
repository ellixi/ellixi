export interface Coordinate {
    x: number
    y: number
}

export interface IMovement {
    getPos(): Coordinate
    update(curTime: number): void
    
    reset(): void
}

export class Movement implements IMovement {
    private prevTime: number = 0
    private initPos: Coordinate
    private initSpd: Coordinate
    private initAcc: Coordinate

    constructor(
        protected pos: Coordinate,
        protected spd: Coordinate,
        protected acc: Coordinate) {
        this.initPos = Object.assign({}, pos)
        this.initSpd = Object.assign({}, spd)
        this.initAcc = Object.assign({}, acc)
    }
    
    reset(): void {        
        this.pos = Object.assign({}, this.initPos)
        this.spd = Object.assign({}, this.initSpd)
        this.acc = Object.assign({}, this.initAcc)
        this.prevTime = 0
    }

    getPos(): Coordinate {
        return this.pos
    }

    update(curTime: number): void {
        const delta = (curTime - this.prevTime) / 1000
        this.prevTime = curTime

        this.pos.x += this.spd.x * delta
        this.pos.y += this.spd.y * delta

        this.spd.x += this.acc.x * delta
        this.spd.y += this.acc.y * delta

        if (this.pos.y <= 0) {
            this.pos.y = 0
            this.spd.y = 0
            this.acc.y = 0
        }
    }
}