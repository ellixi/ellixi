import { Coordinate, Movement } from "./movement"
import { Obj } from "./obj"
import { Body } from "./body"
import { CanvasType } from "./drawer"
import { ColliderType } from "./collider"
import { DINO, TopAxisBox } from "./config"
import { Key } from "./key_handler"

export enum PlayerState {
    STAND,
    JUMP,
    RUN,
    CRASH,
    DUCK,
}

export interface IPlayer {
    getColliderBoxes(): TopAxisBox[]
    getCanvasType(): CanvasType
    getPos(): Coordinate
    updatePlayer(curTime: number, keys: Set<Key>): void

    getState(): PlayerState
    
    enterState(state: PlayerState): void
    updateEvent(keys: Set<Key>): void
}

export class PlayerBody extends Body {
    updateBodyInfo(frames: Array<{ canvasType: CanvasType, colliderType: ColliderType }>) {
        this.frames = frames
        this.frameIdx = this.frameIdx % this.frames.length
    }
    updateFrameSeconds(frameSeconds: number) {
        this.frameSeconds = frameSeconds
    }
}

export class PlayerMovement extends Movement {

    updateSpdY(spd: number): void {
        this.spd.y = spd
    }

    updateAccY(acc: number): void {
        this.acc.y = acc
    }
    
    update(curTime: number): boolean {
        const prevY = this.getPos().y
        super.update(curTime)
        const curY = this.getPos().y

        const jumpCompleted = prevY > 0 && curY === 0
        return jumpCompleted
    }
}

export class Player extends Obj implements IPlayer {
    private state: PlayerState = PlayerState.STAND

    constructor(
        private jumpSpd: number,
        private fallAcc: number,
        private hardDropAcc: number,
        genBody: () => PlayerBody,
        genMovement: () => PlayerMovement) {
        super(genBody, genMovement)        
    }

    getState(): PlayerState {
        return this.state
    }

    reset(): void {
        super.reset()
        this.state = PlayerState.STAND
    }
    
    private updateState(state: PlayerState): void {
        const { frames, frameSeconds } = DINO.statusInfo[state]
        const body = this.body as PlayerBody

        this.state = state
        body.updateBodyInfo(frames)
        body.updateFrameSeconds(frameSeconds)
    }
    
    updateEvent(keys: Set<Key>): void {
        const movement = this.movement as PlayerMovement

        switch (this.state) {
            case PlayerState.STAND:
                if (keys.has(Key.UP)) {
                    this.updateState(PlayerState.JUMP)
                    movement.updateSpdY(this.jumpSpd)
                    movement.updateAccY(this.fallAcc)
                }
                break
            case PlayerState.RUN:
                if (keys.has(Key.DOWN)) {
                    this.updateState(PlayerState.DUCK)
                } else if (keys.has(Key.UP)) {
                    this.updateState(PlayerState.JUMP)
                    movement.updateSpdY(this.jumpSpd)
                    movement.updateAccY(this.fallAcc)
                }
                break
            case PlayerState.DUCK:
                if (!keys.has(Key.DOWN)) {
                    this.updateState(PlayerState.RUN)
                }
                break
            case PlayerState.JUMP:
                if (keys.has(Key.DOWN)) {
                    movement.updateAccY(this.hardDropAcc)
                }
                break
        }
    }
    
    enterState(state: PlayerState): void {
        switch (this.state) {
            case PlayerState.RUN:
                if (state === PlayerState.CRASH) {
                    this.updateState(state)
                }
                break
            case PlayerState.DUCK:
                if (state === PlayerState.CRASH) {
                    this.updateState(state)
                }
                break
            case PlayerState.JUMP:
                if (state === PlayerState.CRASH) {
                    this.updateState(state)
                }
                break
        }
    }
    
    leaveState(state: PlayerState, keys: Set<Key>): void {
        if (this.state !== state) {
            return
        }
        switch (state) {
            case PlayerState.JUMP:
                if (keys.has(Key.DOWN)) {
                    this.updateState(PlayerState.DUCK)
                } else {
                    this.updateState(PlayerState.RUN)
                }
                break
        }
    }

    updatePlayer(curTime: number, keys: Set<Key>): void {
        this.body.update(curTime)
        const jumpCompleted = (this.movement as PlayerMovement).update(curTime)
        jumpCompleted && this.leaveState(PlayerState.JUMP, keys)
    }
}