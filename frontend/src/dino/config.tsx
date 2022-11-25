import { CanvasType } from "./drawer"
import { ColliderType } from "./collider"
import { PlayerState } from "./player"

export interface Size {
    width: number
    height: number
}

// TopAxisBox's top means y value from top to bottom is lower to larger.
// for individual CANVAS_BOX and COLLIDER_BOX: top is a value starting from object top
// for drawing canvas: top is a value starting from canvas top(ie: top of game view)
export interface TopAxisBox {
    left: number
    top: number
    width: number
    height: number
}

// BottomAxisBox's top means y value from bottom to top is lower to larger.
// for all object: top is a value starting from object bottom
export interface BottomAxisBox {
    left: number
    top: number
    width: number
    height: number
}

export const DEBUG = false

export const DAY_TIME_PERIOD = 20

export const GAME_SIZE: Size = { width: 1100, height: 250 }

export const HIGH_SCORE_BLINK = {
    scoreThreshold: 100,
    blinkPeriod: 500,
    blinkCount: 3
}

export const CAMERA = {
    pos: {x: 0, y: 0},
    spd: {x: 600, y: 0},
    acc: { x: 10, y: 0 },
}

export const DINO = {
    statusInfo: {
        [PlayerState.STAND]: {
            frames: [
                {
                    canvasType: CanvasType.DINO_STAND,
                    colliderType: ColliderType.NONE,
                }
            ],
            frameSeconds: 0.2,
        },
        [PlayerState.JUMP]: {
            frames: [
                {
                    canvasType: CanvasType.DINO_JUMP_1,
                    colliderType: ColliderType.DINO_JUMP_1,
                },
                {
                    canvasType: CanvasType.DINO_JUMP_2,
                    colliderType: ColliderType.DINO_JUMP_2,
                }
            ],
            frameSeconds: 0.4,
        },
        [PlayerState.RUN]: {
            frames: [
                {
                    canvasType: CanvasType.DINO_RUN_1,
                    colliderType: ColliderType.DINO_RUN_1,
                },
                {
                    canvasType: CanvasType.DINO_RUN_2,
                    colliderType: ColliderType.DINO_RUN_2,
                }
            ],
            frameSeconds: 0.1,
        },
        [PlayerState.CRASH]: {
            frames: [
                {
                    canvasType: CanvasType.DINO_CRASH_1,
                    colliderType: ColliderType.NONE,
                }
            ],
            frameSeconds: 0.2,
        },
        [PlayerState.DUCK]: {
            frames: [
                {
                    canvasType: CanvasType.DINO_DUCK_1,
                    colliderType: ColliderType.DINO_DUCK_1,
                },
                {
                    canvasType: CanvasType.DINO_DUCK_2,
                    colliderType: ColliderType.DINO_DUCK_2,
                }
            ],
            frameSeconds: 0.2,
        },
    },
    pos: {x: 10, y: 0},
    spd: {x: 600, y: 0},
    acc: { x: 10, y: 0 },
    
    jumpSpd: 1100,
    fallAcc: -3500,
    hardDropAcc: -15000,
}

export const BIRD = {
    minGap: 500,
    maxGap: 2000,
    frames: [
        {
            canvasType: CanvasType.BIRD_WING_UP,
            colliderType: ColliderType.BIRD_WING_UP,
        },
        {
            canvasType: CanvasType.BIRD_WING_DOWN,
            colliderType: ColliderType.BIRD_WING_DOWN,
        }
    ],
    frameSeconds: 0.2,
    pos: {x: GAME_SIZE.width, ys: [50, 75, 100]},
    spd: {x: -20, y: 0},
    acc: {x: 0, y: 0},
}

export const CACTUS = {
    minGap: 120,
    maxGap: 800,
    types: [
        {
            canvasType: CanvasType.CACTUS_SMALL_1,
            colliderType: ColliderType.CACTUS_SMALL_1,
        },
        {
            canvasType: CanvasType.CACTUS_SMALL_2,
            colliderType: ColliderType.CACTUS_SMALL_2,
        },
        {
            canvasType: CanvasType.CACTUS_SMALL_3,
            colliderType: ColliderType.CACTUS_SMALL_3,
        },
        {
            canvasType: CanvasType.CACTUS_BIG_1,
            colliderType: ColliderType.CACTUS_BIG_1,
        },
        {
            canvasType: CanvasType.CACTUS_BIG_2,
            colliderType: ColliderType.CACTUS_BIG_2,
        },
        {
            canvasType: CanvasType.CACTUS_BIG_3,
            colliderType: ColliderType.CACTUS_BIG_3,
        },
    ],
    pos: {x: GAME_SIZE.width, y: 0},
    spd: {x: 0, y: 0},
    acc: {x: 0, y: 0},
}

export const LAND = {
    canvasType: CanvasType.LAND,
    colliderType: ColliderType.NONE,
    pos: {x: 0, y: 0},
    spd: {x: 0, y: 0},
    acc: {x: 0, y: 0},
}

export const CLOUD = {
    minGap: 200,
    maxGap: 800,
    canvasType: CanvasType.CLOUD,
    colliderType: ColliderType.NONE,
    pos: {x: GAME_SIZE.width, y: { min: 150, max: 200 }},
    spd: { x: { min: 350, max: 400 }, y: 0}, // horizontal speed for parallax effect
    acc: {x: 0, y: 0},
}

export const STAR = {
    minGap: 200,
    maxGap: 800,
    frames: [
        {
            canvasType: CanvasType.STAR_1,
            colliderType: ColliderType.NONE,
        },
        {
            canvasType: CanvasType.STAR_2,
            colliderType: ColliderType.NONE,
        },
        {
            canvasType: CanvasType.STAR_3,
            colliderType: ColliderType.NONE,
        },
    ],
    frameSeconds: 0.5,
    pos: {x: GAME_SIZE.width, y: { min: 150, max: 200 }},
    spd: { x: 600, y: 0}, // horizontal speed for parallax effect
    acc: {x: 0, y: 0},
}

export const MOON = {
    frames: [
        {
            canvasType: CanvasType.MOON_1,
            colliderType: ColliderType.NONE,
        },
        {
            canvasType: CanvasType.MOON_2,
            colliderType: ColliderType.NONE,
        },
        {
            canvasType: CanvasType.MOON_3,
            colliderType: ColliderType.NONE,
        },
        {
            canvasType: CanvasType.MOON_4,
            colliderType: ColliderType.NONE,
        },
        {
            canvasType: CanvasType.MOON_5,
            colliderType: ColliderType.NONE,
        },
        {
            canvasType: CanvasType.MOON_6,
            colliderType: ColliderType.NONE,
        },
        {
            canvasType: CanvasType.MOON_7,
            colliderType: ColliderType.NONE,
        },
        {
            canvasType: CanvasType.MOON_8,
            colliderType: ColliderType.NONE,
        },
    ],
    frameSeconds: 20,
    pos: {x: GAME_SIZE.width, y: 120},
    spd: {x: 600, y: 0}, // horizontal speed for parallax effect
    acc: {x: 0, y: 0},
}

// Trex.config = {
//     DROP_VELOCITY: -5,
//     GRAVITY: 0.6,
//     HEIGHT: 47,
//     HEIGHT_DUCK: 25,
//     INIITAL_JUMP_VELOCITY: -10,
//     INTRO_DURATION: 1500,
//     MAX_JUMP_HEIGHT: 30,
//     MIN_JUMP_HEIGHT: 30,
//     SPEED_DROP_COEFFICIENT: 3,
//     SPRITE_WIDTH: 262,
//     START_X_POS: 50,
//     WIDTH: 44,
//     WIDTH_DUCK: 59
// };


// Trex.animFrames = {
//     WAITING: {
//         frames: [44, 0],
//         msPerFrame: 1000 / 3
//     },
//     RUNNING: {
//         frames: [88, 132],
//         msPerFrame: 1000 / 12
//     },
//     CRASHED: {
//         frames: [220],
//         msPerFrame: 1000 / 60
//     },
//     JUMPING: {
//         frames: [0],
//         msPerFrame: 1000 / 60
//     },
//     DUCKING: {
//         frames: [264, 323],
//         msPerFrame: 1000 / 8
//     }
// };


// Obstacle.types = [
//     {
//         type: 'CACTUS_SMALL',
//         width: 17,
//         height: 35,
//         yPos: 105,
//         multipleSpeed: 4,
//         minGap: 120,
//         minSpeed: 0,
//         collisionBoxes: [
//             new CollisionBox(0, 7, 5, 27),
//             new CollisionBox(4, 0, 6, 34),
//             new CollisionBox(10, 4, 7, 14)
//         ]
//     },
//     {
//         type: 'CACTUS_LARGE',
//         width: 25,
//         height: 50,
//         yPos: 90,
//         multipleSpeed: 7,
//         minGap: 120,
//         minSpeed: 0,
//         collisionBoxes: [
//             new CollisionBox(0, 12, 7, 38),
//             new CollisionBox(8, 0, 7, 49),
//             new CollisionBox(13, 10, 10, 38)
//         ]
//     },
//     {
//         type: 'PTERODACTYL',
//         width: 46,
//         height: 40,
//         yPos: [100, 75, 50], // Variable height.
//         yPosMobile: [100, 50], // Variable height mobile.
//         multipleSpeed: 999,
//         minSpeed: 8.5,
//         minGap: 150,
//         collisionBoxes: [
//             new CollisionBox(15, 15, 16, 5),
//             new CollisionBox(18, 21, 24, 6),
//             new CollisionBox(2, 14, 4, 3),
//             new CollisionBox(6, 10, 4, 7),
//             new CollisionBox(10, 8, 6, 9)
//         ],
//         numFrames: 2,
//         frameRate: 1000 / 6,
//         speedOffset: .8
//     }


//     GameOverPanel.dimensions = {
//         TEXT_X: 0,
//         TEXT_Y: 13,
//         TEXT_WIDTH: 191,
//         TEXT_HEIGHT: 11,
//         RESTART_WIDTH: 36,
//         RESTART_HEIGHT: 32
//     };

//     Cloud.config = {
//         HEIGHT: 14,
//         MAX_CLOUD_GAP: 400,
//         MAX_SKY_LEVEL: 30,
//         MIN_CLOUD_GAP: 100,
//         MIN_SKY_LEVEL: 71,
//         WIDTH: 46
//     };


//     Horizon.config = {
//         BG_CLOUD_SPEED: 0.2,
//         BUMPY_THRESHOLD: .3,
//         CLOUD_FREQUENCY: .5,
//         HORIZON_HEIGHT: 16,
//         MAX_CLOUDS: 6
//     };

//     HorizonLine.dimensions = {
//         WIDTH: 600,
//         HEIGHT: 12,
//         YPOS: 127
//     };

    
//     NightMode.config = {
//         FADE_SPEED: 0.035,
//         HEIGHT: 40,
//         MOON_SPEED: 0.25,
//         NUM_STARS: 2,
//         STAR_SIZE: 9,
//         STAR_SPEED: 0.3,
//         STAR_MAX_Y: 70,
//         WIDTH: 20
//     };

    
//     DistanceMeter.dimensions = {
//         WIDTH: 10,
//         HEIGHT: 13,
//         DEST_WIDTH: 11
//     };
