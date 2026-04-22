import type { GameObject } from '../core/gameObject';
import { level1 } from '../level/level';
import { getBoundingBox, checkAABBCollision, calculateOverlap } from './collision';
import { isGameOver, gameStarted } from '../game/gameState';
import { enemy } from '../game/enemy'

const GRAVITY = -0.0002;
const JUMP_STRENGTH = 0.0115;

export let didPlayerTouchSpike = false;
export let didPlayerTouchEnemy = false;

interface GameObjectWithVelocity extends GameObject {
  vy?: number;
  isGrounded?: boolean;
}

export function updatePhysics(
  player: GameObjectWithVelocity,
  isJumping: boolean
): void {

  didPlayerTouchSpike = false;
  didPlayerTouchEnemy = false;

  if (!gameStarted || isGameOver) return;

  if (player.vy === undefined) player.vy = 0;
  if (player.isGrounded === undefined) player.isGrounded = false;

  player.vy += GRAVITY;

  if (isJumping && player.isGrounded) {
    player.vy = JUMP_STRENGTH;
    player.isGrounded = false;
  }

  player.y += player.vy;

  player.isGrounded = false;

  for (const platform of level1) {
    if (platform.type === 'background') continue;

    const playerBox = getBoundingBox(player);
    let platformBox = null;

    if(platform.type === 'spike') platformBox = getBoundingBox(platform, 2);
    else platformBox = getBoundingBox(platform);

    if (!checkAABBCollision(playerBox, platformBox)) continue;

    if (platform.type === 'spike') {
      didPlayerTouchSpike = true;
      continue;
    }
    if(platform.type === 'enemy'){
      didPlayerTouchEnemy = true;
      continue;
    }

    const overlap = calculateOverlap(playerBox, platformBox);

    const absTop = Math.abs(overlap.top);
    const absBottom = Math.abs(overlap.bottom);
    const absLeft = Math.abs(overlap.left);
    const absRight = Math.abs(overlap.right);

    let min = absTop;
    let side: 'top' | 'bottom' | 'left' | 'right' = 'top';

    if (absBottom < min) {
      min = absBottom;
      side = 'bottom';
    }
    if (absLeft < min) {
      min = absLeft;
      side = 'left';
    }
    if (absRight < min) {
      min = absRight;
      side = 'right';
    }

    switch (side) {
      case 'top':
        player.y = platformBox.top + player.height / 2;
        player.vy = 0;
        player.isGrounded = true;
        break;

      case 'bottom':
        player.y = platformBox.bottom - player.height / 2;
        player.vy = 0;
        break;

      case 'left':
        player.x = platformBox.left - player.width / 2;
        break;

      case 'right':
        player.x = platformBox.right + player.width / 2;
        break;
    }
  }

    const playerBox = getBoundingBox(player);
    const platformBox = getBoundingBox(enemy);

    if (checkAABBCollision(playerBox, platformBox)){
      didPlayerTouchEnemy = true;
    };
}
