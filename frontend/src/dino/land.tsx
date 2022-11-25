import { IDrawer } from "./drawer"
import { TopAxisBox } from "./config"
import { IObj } from "./obj"
import { ISpawner } from "./spawner"

export class LandSpawner implements ISpawner {
    private objs: IObj[]

    constructor(
        private genObj: (offX: number) => IObj) {
        const leftObj = this.genObj(0)
        const rightObj = this.genObj(leftObj.getRightPosX())
        this.objs = [leftObj, rightObj]
    }

    reset(): void {        
        const leftObj = this.genObj(0)
        const rightObj = this.genObj(leftObj.getRightPosX())
        this.objs = [leftObj, rightObj]
    }

    update(curTime: number, offX: number): void {
        this.objs.forEach(obj => obj.update(curTime))
        if (this.objs[0].getRightPosX() < offX) {
            const leftObj = this.genObj(offX)
            const rightObj = this.genObj(leftObj.getRightPosX())
            this.objs = [leftObj, rightObj]
        }
    }
    
    drawCanvas(drawer: IDrawer, offX: number) {
        this.objs.forEach((obj) => {
            const { x, y } = obj.getPos()
            drawer.drawCanvas(obj.getCanvasType(), { x: x - offX, y: y })
        })
    }

    drawColliderBoxes(drawer: IDrawer, offX: number) { }
    
    getColliderBoxes(): TopAxisBox[] {
        return this.objs.reduce((boxes, obj) =>
            boxes.concat(obj.getColliderBoxes()), [] as TopAxisBox[]
        )
    }
}
