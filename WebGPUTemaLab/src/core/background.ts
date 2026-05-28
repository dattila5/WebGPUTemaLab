import { GameObject } from './gameObject';

export class Background extends GameObject {

   /**
   * hatter konstruktor
   * @param x - x pozi
   * @param y - y pozi
   * @param width - szelesseg
   * @param height - magassag
   */
  constructor(x: number = 0, y: number = 0, width: number = 17, height: number = 2) {
    super(x, y, width, height, 'background');
  }

   /**
   * update metodus. jatekos es enemy frissitesre van
   */
  update(): void {}
}
