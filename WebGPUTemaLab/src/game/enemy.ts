import type { GameObject } from '../core/gameObject';
import { isGameOver, gameStarted } from '../game/gameState';

export interface Enemy extends GameObject {
  minX: number;
  maxX: number;
  stateNum: number;
}

export const enemies: Enemy[] = [
  {  x: 0.845, y: -0.55, width: 0.04, height: 0.1, type: 'enemy', minX: 0.845, maxX: 1.355, stateNum: 0 },
  { x: 3.195, y: -0.55, width: 0.04, height: 0.1, type: 'enemy', minX: 3.195, maxX: 3.505, stateNum: 0 },
  {  x: 5.495, y: -0.55, width: 0.04, height: 0.1, type: 'enemy', minX: 5.495, maxX: 5.805, stateNum: 0 },
]

const speed = 0.0015;

export function updateEnemyMovement(): void {
  if (isGameOver || !gameStarted) return;

  enemies.forEach((enemy) => {
    if (!enemy) return;

    enemy.x += (enemy.stateNum === 0 ? speed : -speed);

    if (enemy.x >= enemy.maxX) enemy.stateNum = 1;
    if (enemy.x <= enemy.minX) enemy.stateNum = 0;
  });
}
