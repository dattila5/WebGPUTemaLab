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
  const absTop = Math.abs(overlap.top);
  const absBottom = Math.abs(overlap.bottom);
  const absLeft = Math.abs(overlap.left);
  const absRight = Math.abs(overlap.right);
  const minSide = Math.min(absLeft, absRight);
  const minVertical = Math.min(absTop, absBottom);

  if (minSide < minVertical * 0.3) {
    return absLeft < absRight ? 'left' : 'right';
  }

  return absTop < absBottom ? 'top' : 'bottom';
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
      return overlap.left > 0;
    case 'right':
      return overlap.right > 0;
    default:
      return false;
  }
}
