import type { GameObject } from '../core/gameObject';
import { level1 } from '../level/level';

const GRAVITY = -0.0002;
const JUMP_STRENGTH = 0.015;

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

  for (let platform of level1) {
    const playerTop = player.y + player.height / 2;
    const playerBottom = player.y - player.height / 2;
    const playerLeft = player.x - player.width / 2;
    const playerRight = player.x + player.width / 2;

    const platformTop = platform.y + platform.height / 2;
    const platformBottom = platform.y - platform.height / 2;
    const platformLeft = platform.x - platform.width / 2;
    const platformRight = platform.x + platform.width / 2;

    const collidingX = playerRight > platformLeft && playerLeft < platformRight;
    const collidingY = playerTop > platformBottom && playerBottom < platformTop;

    if (!collidingX || !collidingY) continue;

    const overlapTop = playerBottom - platformTop;
    const overlapBottom = platformBottom - playerTop;
    const overlapLeft = playerRight - platformLeft;
    const overlapRight = platformRight - playerLeft;

    const minOverlap = Math.min(
      Math.abs(overlapTop),
      Math.abs(overlapBottom),
      Math.abs(overlapLeft),
      Math.abs(overlapRight)
    );

    if (minOverlap === Math.abs(overlapTop) && overlapTop < 0 && player.vy <= 0) {
      player.y = platformTop + player.height / 2;
      player.vy = 0;
      player.isGrounded = true;
      break;
    }

    if (minOverlap === Math.abs(overlapBottom) && overlapBottom < 0 && player.vy > 0) {
      player.y = platformBottom - player.height / 2;
      player.vy = 0;
      break;
    }

    if (minOverlap === Math.abs(overlapLeft) && overlapLeft > 0) {
      player.x = platformLeft - player.width / 2;
      break;
    }

    if (minOverlap === Math.abs(overlapRight) && overlapRight > 0) {
      player.x = platformRight + player.width / 2;
      break;
    }
  }

  if (player.y < -2.0) {
    player.y = 1.0;
  }
}
