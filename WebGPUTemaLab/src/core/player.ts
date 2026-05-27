import { GameObject } from './gameObject';
import { GameState } from '../game/gameState';

export class Player extends GameObject {
  vy: number = 0;
  isGrounded: boolean = false;
  private speed: number = 0.001875;

  constructor(x: number = -0.9, y: number = -0.52) {
    super(x, y, 0.05, 0.15, 'player');
  }

  update(keysPressed: Record<string, boolean>): void {
    if (GameState.isGameOver || !GameState.gameStarted) return;

    if (keysPressed['a']) this.x -= this.speed;
    if (keysPressed['d']) this.x += this.speed;
  }

  jump(): void {
    if (this.isGrounded) {
      this.vy = 0.0115;
      this.isGrounded = false;
    }
  }

  reset(): void {
    this.x = -0.9;
    this.y = -0.52;
    this.vy = 0;
    this.isGrounded = false;
  }

  clampPosition(): void {
    if (this.x <= -1.04) this.x = -1.04;
    if (this.x >= 7.7) this.x = 7.7;
  }
}
