import type { GameObject } from '../core/gameObject';

export interface BoundingBox {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export function getBoundingBox(obj: GameObject): BoundingBox {
  return {
    top: obj.y + obj.height / 2,
    bottom: obj.y - obj.height / 2,
    left: obj.x - obj.width / 2,
    right: obj.x + obj.width / 2,
  };
}

export function checkAABBCollision(box1: BoundingBox, box2: BoundingBox): boolean {
  return (
    box1.right > box2.left &&
    box1.left < box2.right &&
    box1.top > box2.bottom &&
    box1.bottom < box2.top
  );
}

export function calculateOverlap(playerBox: BoundingBox, platformBox: BoundingBox) {
  return {
    top: playerBox.bottom - platformBox.top,
    bottom: platformBox.bottom - playerBox.top,
    left: playerBox.right - platformBox.left,
    right: platformBox.right - playerBox.left,
  };
}

export function getCollisionSide(
  overlap: ReturnType<typeof calculateOverlap>
): 'top' | 'bottom' | 'left' | 'right' {
  const minOverlap = Math.min(
    Math.abs(overlap.top),
    Math.abs(overlap.bottom),
    Math.abs(overlap.left),
    Math.abs(overlap.right)
  );

  if (minOverlap === Math.abs(overlap.top)) return 'top';
  if (minOverlap === Math.abs(overlap.bottom)) return 'bottom';
  if (minOverlap === Math.abs(overlap.left)) return 'left';
  return 'right';
}

export function shouldResolveCollision(
  side: string,
  overlap: ReturnType<typeof calculateOverlap>,
  playerVy: number
): boolean {
  switch (side) {
    case 'top':
      return overlap.top < 0 && playerVy <= 0;
    case 'bottom':
      return overlap.bottom < 0 && playerVy > 0;
    case 'left':
    case 'right':
      return overlap[side as 'left' | 'right'] > 0;
    default:
      return false;
  }
}
