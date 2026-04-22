import type { GameObject } from '../core/gameObject';
import { isGameOver, gameStarted } from '../game/gameState';

export const enemy: GameObject = {
  x: 0.845,
  y: -0.55,
  width: 0.04,
  height: 0.1,
  type: 'enemy'
}

let switchNum = 0;
const speed = 0.0015;
const minX = 0.845;
const maxX = 1.355;

export function updateEnemyMovement(): void {
  if (isGameOver || !gameStarted) return;

  if(switchNum % 2 == 0){
    enemy.x += speed;
    if(enemy.x >= maxX) switchNum++;
  } else {
    enemy.x -= speed;
    if(enemy.x <= minX) switchNum++;
  }
}
