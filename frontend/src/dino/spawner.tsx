import { IDrawer } from "./drawer"
import { BottomAxisBox } from "./config"
import { IObj } from "./obj"
import { randInt } from "./utils"

export interface ISpawner {
    getColliderBoxes(): BottomAxisBox[]
    drawCanvas(drawer: IDrawer, offX: number): void
    drawColliderBoxes(drawer: IDrawer, offX: number): void
    update(curTime: number, offX: number): void

    reset(): void
}

export class Spawner implements ISpawner {
    private objs: IObj[] = []

    constructor(
        private minGap: number,
        private maxGap: number,
        private genObj: (offX: number) => IObj) {
    }

    reset() {
        this.objs = []
    }

    update(curTime: number, offX: number): void {
        if (this.objs.length < 5) {
            const spawnOffX = this.objs.length ? Math.max(this.objs[this.objs.length - 1].getRightPosX(), offX) : offX
            const gap = randInt(this.minGap, this.maxGap)
            this.objs.push(this.genObj(spawnOffX + gap))
        }

        this.objs.forEach(obj => obj.update(curTime))
        this.objs = this.objs.filter(obj => obj.getRightPosX() > offX)
    }

    drawCanvas(drawer: IDrawer, offX: number) {
        this.objs.forEach((obj) => {
            const { x, y } = obj.getPos()
            drawer.drawCanvas(obj.getCanvasType(), { x: x - offX, y: y })
        })
    }

    drawColliderBoxes(drawer: IDrawer, offX: number) {
        this.objs.forEach((obj) => {
            drawer.drawBoxes(obj.getColliderBoxes().map(box => ({
                left: box.left - offX,
                top: box.top,
                width: box.width,
                height: box.height,
            })))
        })
    }

    getColliderBoxes(): BottomAxisBox[] {
        return this.objs.reduce((boxes, obj) =>
            boxes.concat(obj.getColliderBoxes()), [] as BottomAxisBox[]
        )
    }

}
