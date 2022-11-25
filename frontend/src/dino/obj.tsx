import { IBody } from "./body"
import { CanvasType, getCanvasHeight, getCanvasWidth } from "./drawer"
import { getColliderBoxes } from "./collider"
import { BottomAxisBox } from "./config"
import { Coordinate, IMovement } from "./movement"

export interface IObj {
    getColliderBoxes(): BottomAxisBox[]
    getCanvasType(): CanvasType
    getPos(): Coordinate
    getRightPosX(): number
    update(curTime: number): void
}

export class Obj implements IObj {
    protected body: IBody
    protected movement: IMovement

    constructor(
        genBody: () => IBody,
        genMovement: () => IMovement) {
        this.body = genBody()
        this.movement = genMovement()
    }
    
    reset(): void {
        this.body.reset()
        this.movement.reset()
    }    

    getColliderBoxes(): BottomAxisBox[] {
        const { x: left, y: bottom } = this.movement.getPos()
        // convert top axis to bottom axis 
        // because we dont know the actual top value from canvas
        return getColliderBoxes(this.body.getColliderType()).map(box => ({
            left: left + box.left,
            top: bottom + getCanvasHeight(this.body.getCanvasType()) - box.top,
            width: box.width,
            height: box.height,
        }))
    }

    getCanvasType(): CanvasType {
        return this.body.getCanvasType()
    }

    getPos(): Coordinate {
        return this.movement.getPos()
    }

    getRightPosX(): number {
        return this.movement.getPos().x + getCanvasWidth(this.body.getCanvasType())
    }

    update(curTime: number): void {
        this.body.update(curTime)
        this.movement.update(curTime)
    }
}