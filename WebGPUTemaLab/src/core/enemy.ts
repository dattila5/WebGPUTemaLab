import { GameObject } from './gameObject';
import { GameState } from '../game/gameState';

export class Enemy extends GameObject {
  minX: number;
  maxX: number;
  stateNum: number = 0;
  private speed: number = 0.0015;

  constructor(x: number, y: number, width: number, height: number, minX: number, maxX: number) {
    super(x, y, width, height, 'enemy');
    this.minX = minX;
    this.maxX = maxX;
  }

  update(): void {
    if (GameState.isGameOver || !GameState.gameStarted) return;

    this.x += this.stateNum === 0 ? this.speed : -this.speed;

    if (this.x >= this.maxX) this.stateNum = 1;
    if (this.x <= this.minX) this.stateNum = 0;
  }

  reset(): void {
    this.stateNum = 0;
  }
}
