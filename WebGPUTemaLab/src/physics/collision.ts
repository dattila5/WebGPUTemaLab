import type { GameObject } from '../core/gameObject';

export function checkCollision(
  obj1: GameObject,
  obj2: GameObject
): boolean {
  return (
    obj1.x < obj2.x + obj2.width &&
    obj1.x + obj1.width > obj2.x &&
    obj1.y < obj2.y + obj2.height &&
    obj1.y + obj1.height > obj2.y
  );
}

function getCollisionSide(
  player: GameObject,
  platform: GameObject
): 'top' | 'bottom' | 'left' | 'right' | null {
  const overlapLeft = player.x + player.width - platform.x;
  const overlapRight = platform.x + platform.width - player.x;
  const overlapTop = player.y + player.height - platform.y;
  const overlapBottom = platform.y + platform.height - player.y;

  const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

  if (minOverlap === overlapTop && overlapTop < overlapBottom) {
    return 'top';
  }
  if (minOverlap === overlapBottom && overlapBottom < overlapTop) {
    return 'bottom';
  }
  if (minOverlap === overlapLeft && overlapLeft < overlapRight) {
    return 'left';
  }
  if (minOverlap === overlapRight && overlapRight < overlapLeft) {
    return 'right';
  }

  return null;
}

export function handlePlatformCollision(
  player: GameObject,
  platforms: GameObject[],
  velocity: { x: number; y: number }
): void {
  for (let platform of platforms) {
    if (checkCollision(player, platform)) {
      const side = getCollisionSide(player, platform);

      switch (side) {
        case 'top':
          player.y = platform.y - player.height;
          velocity.y = 0;
          player.isGrounded = true;
          break;

        case 'bottom':
          player.y = platform.y + platform.height;
          velocity.y = 0;
          break;

        case 'left':
          player.x = platform.x - player.width;
          velocity.x = 0;
          break;

        case 'right':
          player.x = platform.x + platform.width;
          velocity.x = 0;
          break;
      }
    }
  }
}

export function checkPlatformCollision(
  player: GameObject,
  platforms: GameObject[]
): GameObject | null {
  for (let platform of platforms) {
    if (checkCollision(player, platform)) {
      return platform;
    }
  }
  return null;
}
