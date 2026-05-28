import { GameObject } from './gameObject';
import { GameState } from '../game/gameState';

export class Enemy extends GameObject {
  minX: number;
  maxX: number;
  stateNum: number = 0;
  private speed: number = 0.0015;

   /**
   * enemy konstruktor
   * @param x - x pozi
   * @param y - y pozi
   * @param width - szelesseg
   * @param height - magassag
   * @param minX - bal hatar
   * @param maxX - jobb hatar
   */
  constructor(x: number, y: number, width: number, height: number, minX: number, maxX: number) {
    super(x, y, width, height, 'enemy');
    this.minX = minX;
    this.maxX = maxX;
  }

   /**
   * enemy mozgasanak a frissitese
   */
  update(): void {
    if (GameState.isGameOver || !GameState.gameStarted) return;

    this.x += this.stateNum === 0 ? this.speed : -this.speed;

    if (this.x >= this.maxX) this.stateNum = 1;
    if (this.x <= this.minX) this.stateNum = 0;
  }

   /**
   * enemy full reset
   */
  reset(): void {
    this.stateNum = 0;
  }
}
