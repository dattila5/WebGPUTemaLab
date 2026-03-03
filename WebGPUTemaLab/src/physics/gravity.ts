import type { GameObject } from '../core/gameObject';
import { level1 } from '../level/level';
import { getBoundingBox, checkAABBCollision, calculateOverlap, getCollisionSide, shouldResolveCollision, } from './collision';

const GRAVITY = -0.0002;
const JUMP_STRENGTH = 0.012;

interface GameObjectWithVelocity extends GameObject {
  vy?: number;
  isGrounded?: boolean;
}

export function updatePhysics(
  player: GameObjectWithVelocity,
  isJumping: boolean
): void {
  if (player.vy === undefined) {
    player.vy = 0;
  }
  if (player.isGrounded === undefined) {
    player.isGrounded = false;
  }

  player.vy += GRAVITY;

  if (isJumping && player.isGrounded) {
    player.vy = JUMP_STRENGTH;
    player.isGrounded = false;
  }

  player.y += player.vy;
  player.isGrounded = false;

  const playerBox = getBoundingBox(player);

  for (let platform of level1) {
    const platformBox = getBoundingBox(platform);

    if (!checkAABBCollision(playerBox, platformBox)) continue;

    const overlap = calculateOverlap(playerBox, platformBox);
    const side = getCollisionSide(overlap);

    if (!shouldResolveCollision(side, overlap, player.vy)) continue;

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

    break;
  }

  if (player.y < -2.0) {
    player.y = 1.0;
  }
}
