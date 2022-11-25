import { TopAxisBox, BottomAxisBox } from "./config"

export enum ColliderType {
    NONE,

    BIRD_WING_DOWN,
    BIRD_WING_UP,

    CACTUS_SMALL_1,
    CACTUS_SMALL_2,
    CACTUS_SMALL_3,
    CACTUS_BIG_1,
    CACTUS_BIG_2,
    CACTUS_BIG_3,

    DINO_JUMP_1,
    DINO_JUMP_2,
    DINO_RUN_1,
    DINO_RUN_2,
    DINO_DUCK_1,
    DINO_DUCK_2,
}

const COLLIDER_BOX: { [key in ColliderType]: Array<TopAxisBox> } = {
    [ColliderType.NONE]: [],

    [ColliderType.BIRD_WING_DOWN]: [
        { left: 30, top: 30, width: 32, height: 10 },
        { left: 36, top: 42, width: 48, height: 12 },
        { left: 4, top: 28, width: 8, height: 6 },
        { left: 12, top: 20, width: 8, height: 14 },
        { left: 20, top: 16, width: 12, height: 18 },
    ],
    [ColliderType.BIRD_WING_UP]: [
        { left: 30, top: 30, width: 32, height: 10 },
        { left: 36, top: 42, width: 48, height: 12 },
        { left: 4, top: 28, width: 8, height: 6 },
        { left: 12, top: 20, width: 8, height: 14 },
        { left: 20, top: 16, width: 12, height: 18 },
    ],

    [ColliderType.CACTUS_SMALL_1]: [
        { left: 0, top: 14, width: 10, height: 54 },
        { left: 8, top: 0, width: 12, height: 68 },
        { left: 20, top: 8, width: 14, height: 28 }
    ],
    [ColliderType.CACTUS_SMALL_2]: [
        { left: 0, top: 14, width: 10, height: 54 },
        { left: 8, top: 0, width: 12 + 34, height: 68 },
        { left: 20 + 34, top: 8, width: 14, height: 28 }
    ],
    [ColliderType.CACTUS_SMALL_3]: [
        { left: 0, top: 14, width: 10, height: 54 },
        { left: 8, top: 0, width: 12 + 34 * 2, height: 68 },
        { left: 20 + 34 * 2, top: 8, width: 14, height: 28 }
    ],
    [ColliderType.CACTUS_BIG_1]: [
        { left: 0, top: 24, width: 14, height: 76 },
        { left: 16, top: 0, width: 14, height: 98 },
        { left: 26, top: 20, width: 20, height: 77 }
    ],
    [ColliderType.CACTUS_BIG_2]: [
        { left: 0, top: 24, width: 14, height: 76 },
        { left: 16, top: 0, width: 14 + 50, height: 98 },
        { left: 26 + 50, top: 20, width: 20, height: 76 }
    ],
    [ColliderType.CACTUS_BIG_3]: [
        { left: 0, top: 24, width: 14, height: 76 },
        { left: 16, top: 0, width: 14 + 50 * 2, height: 98 },
        { left: 26 + 50 * 2, top: 20, width: 20, height: 76 }
    ],

    [ColliderType.DINO_JUMP_1]: [
        { left: 44, top: 4, width: 34, height: 32 },
        { left: 2, top: 36, width: 60, height: 18 },
        { left: 20, top: 70, width: 28, height: 16 },
        { left: 2, top: 48, width: 58, height: 10 },
        { left: 10, top: 60, width: 42, height: 8 },
        { left: 18, top: 68, width: 30, height: 8 },
    ],
    [ColliderType.DINO_JUMP_2]: [
        { left: 44, top: 4, width: 34, height: 32 },
        { left: 2, top: 36, width: 60, height: 18 },
        { left: 20, top: 70, width: 28, height: 16 },
        { left: 2, top: 48, width: 58, height: 10 },
        { left: 10, top: 60, width: 42, height: 8 },
        { left: 18, top: 68, width: 30, height: 8 },
    ],
    [ColliderType.DINO_RUN_1]: [
        { left: 44, top: 4, width: 34, height: 32 },
        { left: 2, top: 36, width: 60, height: 18 },
        { left: 20, top: 70, width: 28, height: 16 },
        { left: 2, top: 48, width: 58, height: 10 },
        { left: 10, top: 60, width: 42, height: 8 },
        { left: 18, top: 68, width: 30, height: 8 },
    ],
    [ColliderType.DINO_RUN_2]: [
        { left: 44, top: 4, width: 34, height: 32 },
        { left: 2, top: 36, width: 60, height: 18 },
        { left: 20, top: 70, width: 28, height: 16 },
        { left: 2, top: 48, width: 58, height: 10 },
        { left: 10, top: 60, width: 42, height: 8 },
        { left: 18, top: 68, width: 30, height: 8 },
    ],
    [ColliderType.DINO_DUCK_1]: [
        { left: 2, top: 0, width: 110, height: 50 },
    ],
    [ColliderType.DINO_DUCK_2]: [
        { left: 2, top: 0, width: 110, height: 50 },
    ],
}

export function getColliderBoxes(type: ColliderType): TopAxisBox[] {
    return COLLIDER_BOX[type]
}

export function hasCollided(boxesA: BottomAxisBox[], boxesB: BottomAxisBox[]): boolean {
    for (const { left: l1, top: t1, width: w1, height: h1 } of boxesA) {
        const r1 = l1 + w1
        const b1 = t1 - h1
        for (const { left: l2, top: t2, width: w2, height: h2 } of boxesB) {
            const r2 = l2 + w2
            const b2 = t2 - h2

            const x_intercepted = (l1 < l2 && r1 > l2) || (l2 < l1 && l1 < r2)
            const y_intercepted = (t1 > t2 && b1 < t2) || (t2 > t1 && t1 > b2)
            if (x_intercepted && y_intercepted)
                return true
        }
    }

    return false
}