import { BottomAxisBox, Size, TopAxisBox } from "./config";
import spriteSrc from "./images/sprite.png";
import { Coordinate } from "./movement";

export enum CanvasType {
  TEXT_0,
  TEXT_1,
  TEXT_2,
  TEXT_3,
  TEXT_4,
  TEXT_5,
  TEXT_6,
  TEXT_7,
  TEXT_8,
  TEXT_9,
  TEXT_H,
  TEXT_I,
  TEXT_GAME_OVER,

  RESTART,
  CLOUD,
  LAND,

  BIRD_WING_DOWN,
  BIRD_WING_UP,

  CACTUS_SMALL_1,
  CACTUS_SMALL_2,
  CACTUS_SMALL_3,
  CACTUS_BIG_1,
  CACTUS_BIG_2,
  CACTUS_BIG_3,

  MOON_1,
  MOON_2,
  MOON_3,
  MOON_4,
  MOON_5,
  MOON_6,
  MOON_7,
  MOON_8,

  STAR_1,
  STAR_2,
  STAR_3,

  DINO_STAND,
  DINO_JUMP_1,
  DINO_JUMP_2,
  DINO_RUN_1,
  DINO_RUN_2,
  DINO_CRASH_1,
  DINO_CRASH_2,
  DINO_DUCK_1,
  DINO_DUCK_2,
}

export const CHAR_WIDTH = 20;
export const CHAR_HEIGHT = 26;

const CANVAS_BOX: { [key in CanvasType]: TopAxisBox } = {
  [CanvasType.TEXT_0]: {
    left: 1294,
    top: 2,
    width: CHAR_WIDTH,
    height: CHAR_HEIGHT,
  },
  [CanvasType.TEXT_1]: {
    left: 1294 + 20 * 1,
    top: 2,
    width: CHAR_WIDTH,
    height: CHAR_HEIGHT,
  },
  [CanvasType.TEXT_2]: {
    left: 1294 + 20 * 2,
    top: 2,
    width: CHAR_WIDTH,
    height: CHAR_HEIGHT,
  },
  [CanvasType.TEXT_3]: {
    left: 1294 + 20 * 3,
    top: 2,
    width: CHAR_WIDTH,
    height: CHAR_HEIGHT,
  },
  [CanvasType.TEXT_4]: {
    left: 1294 + 20 * 4,
    top: 2,
    width: CHAR_WIDTH,
    height: CHAR_HEIGHT,
  },
  [CanvasType.TEXT_5]: {
    left: 1294 + 20 * 5,
    top: 2,
    width: CHAR_WIDTH,
    height: CHAR_HEIGHT,
  },
  [CanvasType.TEXT_6]: {
    left: 1294 + 20 * 6,
    top: 2,
    width: CHAR_WIDTH,
    height: CHAR_HEIGHT,
  },
  [CanvasType.TEXT_7]: {
    left: 1294 + 20 * 7,
    top: 2,
    width: CHAR_WIDTH,
    height: CHAR_HEIGHT,
  },
  [CanvasType.TEXT_8]: {
    left: 1294 + 20 * 8,
    top: 2,
    width: CHAR_WIDTH,
    height: CHAR_HEIGHT,
  },
  [CanvasType.TEXT_9]: {
    left: 1294 + 20 * 9,
    top: 2,
    width: CHAR_WIDTH,
    height: CHAR_HEIGHT,
  },
  [CanvasType.TEXT_H]: {
    left: 1294 + 20 * 10,
    top: 2,
    width: CHAR_WIDTH,
    height: CHAR_HEIGHT,
  },
  [CanvasType.TEXT_I]: {
    left: 1294 + 20 * 11,
    top: 2,
    width: CHAR_WIDTH,
    height: CHAR_HEIGHT,
  },
  [CanvasType.TEXT_GAME_OVER]: { left: 1294, top: 28, width: 382, height: 22 },

  [CanvasType.RESTART]: { left: 2, top: 2, width: 72, height: 64 },
  [CanvasType.CLOUD]: { left: 166, top: 2, width: 92, height: 28 },
  [CanvasType.LAND]: { left: 2, top: 104, width: 2400, height: 24 },

  [CanvasType.BIRD_WING_DOWN]: { left: 260, top: 2, width: 92, height: 80 },
  [CanvasType.BIRD_WING_UP]: { left: 260 + 92, top: 2, width: 92, height: 80 },

  [CanvasType.CACTUS_SMALL_1]: { left: 446, top: 2, width: 34, height: 70 },
  [CanvasType.CACTUS_SMALL_2]: {
    left: 446 + 34 * 1,
    top: 2,
    width: 34 * 2,
    height: 70,
  },
  [CanvasType.CACTUS_SMALL_3]: {
    left: 446 + 34 * 3,
    top: 2,
    width: 34 * 3,
    height: 70,
  },
  [CanvasType.CACTUS_BIG_1]: { left: 652, top: 2, width: 50, height: 100 },
  [CanvasType.CACTUS_BIG_2]: {
    left: 652 + 50 * 1,
    top: 2,
    width: 50 * 2,
    height: 100,
  },
  [CanvasType.CACTUS_BIG_3]: {
    left: 652 + 50 * 3,
    top: 2,
    width: 50 * 3,
    height: 100,
  },

  [CanvasType.MOON_1]: { left: 954, top: 2, width: 40, height: 80 },
  [CanvasType.MOON_2]: { left: 954 + 40 * 1, top: 2, width: 40, height: 80 },
  [CanvasType.MOON_3]: { left: 954 + 40 * 2, top: 2, width: 40, height: 80 },
  [CanvasType.MOON_4]: { left: 954 + 40 * 3, top: 2, width: 40, height: 80 },
  [CanvasType.MOON_5]: { left: 954 + 40 * 4, top: 2, width: 40, height: 80 },
  [CanvasType.MOON_6]: { left: 954 + 40 * 5, top: 2, width: 40, height: 80 },
  [CanvasType.MOON_7]: { left: 954 + 40 * 6, top: 2, width: 40, height: 80 },
  [CanvasType.MOON_8]: { left: 954 + 40 * 7, top: 2, width: 40, height: 80 },

  [CanvasType.STAR_1]: { left: 1276, top: 2, width: 18, height: 18 },
  [CanvasType.STAR_2]: { left: 1276, top: 2 + 18 * 1, width: 18, height: 18 },
  [CanvasType.STAR_3]: { left: 1276, top: 2 + 18 * 2, width: 18, height: 18 },

  [CanvasType.DINO_STAND]: { left: 76, top: 2, width: 88, height: 94 },
  [CanvasType.DINO_JUMP_1]: { left: 1678, top: 2, width: 88, height: 94 },
  [CanvasType.DINO_JUMP_2]: {
    left: 1678 + 88 * 1,
    top: 2,
    width: 88,
    height: 94,
  },
  [CanvasType.DINO_RUN_1]: {
    left: 1678 + 88 * 2,
    top: 2,
    width: 88,
    height: 94,
  },
  [CanvasType.DINO_RUN_2]: {
    left: 1678 + 88 * 3,
    top: 2,
    width: 88,
    height: 94,
  },
  [CanvasType.DINO_CRASH_1]: {
    left: 1678 + 88 * 4,
    top: 2,
    width: 88,
    height: 94,
  },
  [CanvasType.DINO_CRASH_2]: {
    left: 1678 + 88 * 5,
    top: 2,
    width: 88,
    height: 94,
  },
  [CanvasType.DINO_DUCK_1]: {
    left: 1678 + 88 * 6,
    top: 44,
    width: 118,
    height: 50,
  },
  [CanvasType.DINO_DUCK_2]: {
    left: 1678 + 88 * 6 + 118,
    top: 44,
    width: 118,
    height: 50,
  },
};
type CanvasImageSource =
  | HTMLOrSVGImageElement
  | HTMLVideoElement
  | HTMLCanvasElement
  | ImageBitmap;
const sprite = new Image();
sprite.src = String(spriteSrc);

export interface IDrawer {
  getCanvasSize(): Size;
  setCanvasSize(size: Size): void;
  setCanvasRef(ref: any): void;

  clearCanvas(): void;
  setCanvas(darkMode: boolean, darkDensity: number): void;
  drawCanvas(type: CanvasType, bottom_left_pos: Coordinate): void;
  drawBoxes(boxes: BottomAxisBox[]): void;
  drawCanvasCenter(types: CanvasType[], heightSpacing?: number): void;
}

export function getCanvasWidth(type: CanvasType): number {
  return CANVAS_BOX[type].width;
}

export function getCanvasHeight(type: CanvasType): number {
  return CANVAS_BOX[type].height;
}

export class Drawer implements IDrawer {
  private canvasRef!: HTMLCanvasElement;

  constructor(private gameSize: Size) {}

  clearCanvas() {
    const canvas = this.canvasRef;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  setCanvasRef(ref: HTMLCanvasElement): void {
    this.canvasRef = ref;
  }

  setCanvas(darkMode: boolean, darkDensity: number) {
    const ctx = this.canvasRef.getContext("2d");
    if (!ctx) return;

    // canvasSize may be larger than gameSize, all sprite is only drawn within gameSize
    const { width: canvasWidth, height: canvasHeight } = this.canvasRef;
    const gameScale =
      Math.min(canvasWidth, canvasHeight * 4) / this.gameSize.width;

    ctx.filter = `invert(${darkDensity})`;
    if (darkMode) {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }
    ctx.scale(gameScale, gameScale);
  }

  getCanvasSize(): Size {
    const { width, height } = this.canvasRef;
    return { width, height };
  }

  setCanvasSize(size: Size) {
    this.canvasRef.width = size.width;
    this.canvasRef.height = size.height;
  }

  drawCanvas(type: CanvasType, bottom_left_pos: Coordinate) {
    const ctx = this.canvasRef.getContext("2d");
    if (!ctx) return;

    const { width: canvasWidth, height: canvasHeight } = this.canvasRef;
    const { width: gameWidth, height: gameHeight } = this.gameSize;
    const gameScale = Math.min(canvasWidth, canvasHeight * 4) / gameWidth;
    const paddingTop = Math.max(
      0,
      0.2 * (this.canvasRef.height - gameScale * gameHeight)
    );

    const { left, top, width, height } = CANVAS_BOX[type];
    const drawLeft = bottom_left_pos.x;
    // convert bottom axis to top axis
    const drawTop = paddingTop + gameHeight - height - bottom_left_pos.y;
    sprite.onload = () => {
      ctx.drawImage(
        sprite,
        left,
        top,
        width,
        height,
        drawLeft,
        drawTop,
        width,
        height
      );
    };
  }

  drawBoxes(boxes: BottomAxisBox[]) {
    const ctx = this.canvasRef.getContext("2d");
    if (!ctx) return;

    const { width: canvasWidth, height: canvasHeight } = this.canvasRef;
    const { width: gameWidth, height: gameHeight } = this.gameSize;
    const gameScale = Math.min(canvasWidth, canvasHeight * 4) / gameWidth;
    const paddingTop = Math.max(
      0,
      0.2 * (this.canvasRef.height - gameScale * gameHeight)
    );

    // convert bottom axis to top axis
    for (const { left, top, width, height } of boxes)
      ctx.strokeRect(left, paddingTop + gameHeight - top, width, height);
  }

  drawCanvasCenter(types: CanvasType[], heightSpacing: number = 40) {
    const { width: gameWidth, height: gameHeight } = this.gameSize;
    const totalHeight =
      types.reduce(
        (totalHeight, type) => totalHeight + CANVAS_BOX[type].height,
        0
      ) +
      heightSpacing * (types.length - 1);

    let bottom = (gameHeight - totalHeight) / 2;
    types.forEach((type) => {
      const { width, height } = CANVAS_BOX[type];
      const left = (gameWidth - width) / 2;
      this.drawCanvas(type, { x: left, y: bottom });
      bottom += height + heightSpacing;
    });
  }
}
