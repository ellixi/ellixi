import { AudioType, IAudioPlayer } from "./audio";
import { CanvasType, CHAR_HEIGHT, CHAR_WIDTH, IDrawer } from "./drawer";
import { Size } from "./config";
import { Coordinate } from "./movement";

const charToCanvasType = new Map<string, CanvasType>([
  ["0", CanvasType.TEXT_0],
  ["1", CanvasType.TEXT_1],
  ["2", CanvasType.TEXT_2],
  ["3", CanvasType.TEXT_3],
  ["4", CanvasType.TEXT_4],
  ["5", CanvasType.TEXT_5],
  ["6", CanvasType.TEXT_6],
  ["7", CanvasType.TEXT_7],
  ["8", CanvasType.TEXT_8],
  ["9", CanvasType.TEXT_9],
  ["H", CanvasType.TEXT_H],
  ["I", CanvasType.TEXT_I],
]);

export enum State {
  NOT_START,
  PLAYING,
  GAME_OVER,
}

export interface IInfoHandler {
  saveHighScore(): void;
  update(audioPlayer: IAudioPlayer, offX: number): void;

  checkIsState(state: State): boolean;
  updateState(key: State): void;
  drawCanvas(drawer: IDrawer): void;

  reset(): void;
}

export class InfoHandler implements IInfoHandler {
  private highScore: number;
  private score: number = 0;
  private blinkScore: number = 0;
  private blinkStartTime: number = 0;
  private state: State = State.NOT_START;

  constructor(
    private highScoreBlink: {
      scoreThreshold: number;
      blinkPeriod: number;
      blinkCount: number;
    },
    private gameSize: Size
  ) {
    this.highScore = +(window.localStorage.getItem("highScore") || 0);
  }

  reset(): void {
    this.score = 0;
    this.blinkScore = 0;
    this.blinkStartTime = 0;
  }

  saveHighScore() {
    window.localStorage.setItem("highScore", String(this.highScore));
  }

  checkIsState(state: State): boolean {
    return this.state === state;
  }

  updateState(state: State) {
    switch (this.state) {
      case State.NOT_START:
        if (state === State.PLAYING) {
          this.state = state;
        }
        break;
      case State.PLAYING:
        if (state === State.GAME_OVER) {
          this.state = state;
        }
        break;
      case State.GAME_OVER:
        if (state === State.PLAYING) {
          this.state = state;
        }
        break;
    }
  }

  update(audioPlayer: IAudioPlayer, offX: number) {
    if (this.state !== State.PLAYING) {
      return;
    }

    const { scoreThreshold } = this.highScoreBlink;

    this.score = Math.round(offX / 50);
    if (this.score >= this.blinkScore + scoreThreshold) {
      this.blinkScore += scoreThreshold;
      this.blinkStartTime = new Date().getTime();

      audioPlayer.playSound(AudioType.HIGH_SCORE);
    }

    this.highScore = Math.max(this.score, this.highScore);
  }

  drawCanvas(drawer: IDrawer) {
    if (this.state === State.GAME_OVER) {
      drawer.drawCanvasCenter([CanvasType.RESTART, CanvasType.TEXT_GAME_OVER]);
    }

    const { width: gameWidth, height: gameHeight } = this.gameSize;
    const highScoreStr = String(this.highScore).padStart(5, "0");
    const text = `HI ${highScoreStr} ${this.getScoreText()}`;

    const pos: Coordinate = {
      x: gameWidth - text.length * CHAR_WIDTH - 20,
      y: gameHeight - CHAR_HEIGHT - 10,
    };
    this.drawText(drawer, text, pos);
  }

  getScoreText(): string {
    const { blinkPeriod, blinkCount } = this.highScoreBlink;
    const curCount = (new Date().getTime() - this.blinkStartTime) / blinkPeriod;

    // finish blinking
    if (curCount > blinkCount || this.state === State.GAME_OVER) {
      return String(this.score).padStart(5, "0");
    }

    // appear
    if (curCount % 1 < 0.5) return String(this.blinkScore).padStart(5, "0");

    // disappear
    return "     ";
  }

  drawText(drawer: IDrawer, text: string, bottom_left_pos: Coordinate) {
    Array.from(text).forEach((char) => {
      const type = charToCanvasType.get(char);
      if (type !== undefined) {
        drawer.drawCanvas(type, bottom_left_pos);
      }
      bottom_left_pos.x += CHAR_WIDTH;
    });
  }
}
