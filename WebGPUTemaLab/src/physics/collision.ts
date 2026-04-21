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
    bottom: playerBox.top - platformBox.bottom,
    left: playerBox.right - platformBox.left,
    right: playerBox.left - platformBox.right,
  };
}
