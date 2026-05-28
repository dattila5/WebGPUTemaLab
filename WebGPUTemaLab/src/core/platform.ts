import { GameObject } from './gameObject';

export class Platform extends GameObject {

   /**
   * platform konstruktor
   * @param x - x pozi
   * @param y - y pozi
   * @param width - szelesseg
   * @param height - magassag
   * @param type - tipus
   */
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    type: 'platform_grass' | 'platform_dirt' | 'platform_block' | 'spike' | 'flag_pole' | 'flag' | 'background'
  ) {
    super(x, y, width, height, type);
  }

   /**
   * mozgas frissito metod. platformnal nem csinal semmit, mert az nem mozog
   */
  update(): void {
  }
}
