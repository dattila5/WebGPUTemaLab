import type { GameObject } from '../core/gameObject';
import { isGameOver, gameStarted } from '../game/gameState';

export interface GameObjectWithVelocity extends GameObject {
  vy?: number;
  isGrounded?: boolean;
}

export const player: GameObjectWithVelocity = {
  x: -0.9,
  y: -0.35,
  width: 0.04,
  height: 0.2,
  type: 'player',
  vy: 0,
  isGrounded: false,
};

export function updatePlayerMovement(keysPressed: Record<string, boolean>): void {
  if (isGameOver || !gameStarted) return;
  const speed = 0.002;
  if (keysPressed['a']) player.x -= speed;
  if (keysPressed['d']) player.x += speed;
}
