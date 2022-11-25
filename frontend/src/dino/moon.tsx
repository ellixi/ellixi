import { IBody } from "./body"
import { GAME_SIZE } from "./config"
import { Coordinate, Movement } from "./movement"
import { Obj } from "./obj"

export class MoonMovement extends Movement {

    updatePos(pos: Coordinate) {
        this.pos = pos
    }

    updateMoon(curTime: number, offX: number): void {
        super.update(curTime)

        if (this.pos.x <= offX) {
            this.pos.x += GAME_SIZE.width
        }
    }
}

export class MoonObj extends Obj {
    constructor(
        genBody: () => IBody,
        genMovement: () => MoonMovement) {
        super(genBody, genMovement)
    }

    updateMoon(curTime: number, offX: number): void {
        this.body.update(curTime);
        (this.movement as MoonMovement).updateMoon(curTime, offX)
    }
}