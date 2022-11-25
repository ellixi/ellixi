import { CanvasType } from "./drawer"
import { ColliderType } from "./collider"

export interface IBody {
    getColliderType(): ColliderType
    getCanvasType(): CanvasType
    update(curTime: number): void

    reset(): void
}

export class Body implements IBody {
    protected frameIdx: number = 0
    private prevTime: number = 0

    constructor(
        protected frames: Array<{ canvasType: CanvasType, colliderType: ColliderType }>,
        protected frameSeconds: number) {
    }

    reset(): void {
        this.frameIdx = 0
        this.prevTime = 0
    }    

    update(curTime: number): void {
        const delta = (curTime - this.prevTime) / 1000
        if (delta >= this.frameSeconds) {
            this.prevTime = curTime
            this.frameIdx = (this.frameIdx + 1) % this.frames.length
        }
    }

    getColliderType(): ColliderType {
        return this.frames[this.frameIdx].colliderType
    }

    getCanvasType(): CanvasType {
        return this.frames[this.frameIdx].canvasType
    }
}

export class StaticBody implements IBody {

    constructor(
        protected canvasType: CanvasType,
        protected colliderType: ColliderType) {
    }

    reset(): void {}    

    update(curTime: number): void {}

    getColliderType(): ColliderType {
        return this.colliderType
    }

    getCanvasType(): CanvasType {
        return this.canvasType
    }
}
