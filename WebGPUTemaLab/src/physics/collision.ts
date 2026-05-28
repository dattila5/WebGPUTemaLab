export interface BoundingBox {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export class CollisionDetector {

   /**
   * aabb collision megallapitasa
   * @param box1 - elso objektum doboza
   * @param box2 - masodik objektum doboza
   * @returns logikai valtozot, van-e utkozes vagy nincs
   */
  static checkAABBCollision(box1: BoundingBox, box2: BoundingBox): boolean {
    return (
      box1.right > box2.left &&
      box1.left < box2.right &&
      box1.top > box2.bottom &&
      box1.bottom < box2.top
    );
  }

   /**
   * utkozes oldalanak lekerese
   * @param playerBox - jatekos doboza
   * @param platformBox - platform doboza
   * @returns az utkozes oldalat
   */
  static getCollisionSide(playerBox: BoundingBox, platformBox: BoundingBox): 'top' | 'bottom' | 'left' | 'right' {
    const overlap = this.calculateOverlap(playerBox, platformBox);

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

   /**
   * atfedes mertekenek megallpitasa
   * @param playerBox - jatekos doboza
   * @param platformBox - platform doboza
   * @returns minden oldal atfedesenek a merteke
   */
  private static calculateOverlap(playerBox: BoundingBox, platformBox: BoundingBox) {
    return {
      top: playerBox.bottom - platformBox.top,
      bottom: playerBox.top - platformBox.bottom,
      left: playerBox.right - platformBox.left,
      right: playerBox.left - platformBox.right,
    };
  }
}
