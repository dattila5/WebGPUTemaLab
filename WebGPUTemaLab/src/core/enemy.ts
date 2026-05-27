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

// export const easyLevelEnemies: Enemy[] = [
//   { x: 2.995, y: -0.55, width: 0.04, height: 0.1, type: 'enemy', minX: 2.995, maxX: 3.455, stateNum: 0 },
// ]

// export const mediumLevelEnemies: Enemy[] = [
//   { x: 0.845, y: -0.55, width: 0.04, height: 0.1, type: 'enemy', minX: 0.845, maxX: 1.355, stateNum: 0 },
//   { x: 3.195, y: -0.55, width: 0.04, height: 0.1, type: 'enemy', minX: 3.195, maxX: 3.505, stateNum: 0 },
//   { x: 5.495, y: -0.55, width: 0.04, height: 0.1, type: 'enemy', minX: 5.495, maxX: 5.805, stateNum: 0 },
// ]

// export const hardLevelEnemies: Enemy[] = [
//   { x: 0.32, y: -0.45, width: 0.04, height: 0.1, type: 'enemy', minX: 0.32, maxX: 0.48, stateNum: 0 },
//   { x: 1.945, y: -0.55, width: 0.04, height: 0.1, type: 'enemy', minX: 1.945, maxX: 2.455, stateNum: 0 },
//   { x: 3.845, y: -0.55, width: 0.04, height: 0.1, type: 'enemy', minX: 3.845, maxX: 4.355, stateNum: 0 },
//   { x: 4.355, y: -0.55, width: 0.04, height: 0.1, type: 'enemy', minX: 3.845, maxX: 4.355, stateNum: 1 },
// ]

// const speed = 0.0015;

// export function updateEnemyMovement(): void {
//   if (isGameOver || !gameStarted) return;

//   let enemies: Enemy[] = [];

//   if (currentLevel === 1) enemies = easyLevelEnemies;
//   if (currentLevel === 2) enemies = mediumLevelEnemies;
//   if (currentLevel === 3) enemies = hardLevelEnemies;

//   enemies.forEach((enemy) => {
//     if (!enemy) return;

//     enemy.x += (enemy.stateNum === 0 ? speed : -speed);

//     if (enemy.x >= enemy.maxX) enemy.stateNum = 1;
//     if (enemy.x <= enemy.minX) enemy.stateNum = 0;
//   });
// }
