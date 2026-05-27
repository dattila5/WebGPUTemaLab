import type { GameObject } from '../core/gameObject';

export interface BoundingBox {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export function getBoundingBox(obj: GameObject, spikeNum: number = 1): BoundingBox {
  return {
    top: obj.y + (obj.height / 2) / spikeNum,
    bottom: obj.y - (obj.height / 2) / spikeNum,
    left: obj.x - (obj.width / 2) / spikeNum,
    right: obj.x + (obj.width / 2) / spikeNum,
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

function calculateOverlap(playerBox: BoundingBox, platformBox: BoundingBox) {
  return {
    top: playerBox.bottom - platformBox.top,
    bottom: playerBox.top - platformBox.bottom,
    left: playerBox.right - platformBox.left,
    right: playerBox.left - platformBox.right,
  };
}

export function getMinSide(playerBox: BoundingBox, platformBox: BoundingBox){
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

    return side;
}
