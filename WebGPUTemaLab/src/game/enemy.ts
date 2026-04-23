import type { GameObject } from '../core/gameObject';
import { isGameOver, gameStarted } from '../game/gameState';

export interface Enemy extends GameObject {
  name: string;
  minX: number;
  maxX: number;
  stateNum: number;
}

export const enemies: Enemy[] = [
  {
    name: "firstEnemy",
    x: 0.845,
    y: -0.55,
    width: 0.04,
    height: 0.1,
    type: 'enemy',
    minX: 0.845,
    maxX: 1.355,
    stateNum: 0
  }
]

const speed = 0.0015;

export function getEnemyByName(name: string): Enemy | undefined {
  return enemies.find((x) => x.name === name);
}

export function updateEnemyMovement(name: string): void {
  if (isGameOver || !gameStarted) return;

  const enemy = getEnemyByName(name);
  if (!enemy) return;

  enemy.x += (enemy.stateNum === 0 ? speed : -speed);

  if (enemy.x >= enemy.maxX) enemy.stateNum = 1;
  if (enemy.x <= enemy.minX) enemy.stateNum = 0;
}
