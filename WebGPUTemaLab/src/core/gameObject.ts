export abstract class GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'player' | 'platform_grass' | 'platform_dirt' | 'platform_block' | 'enemy' | 'spike' | 'flag_pole' | 'flag' | 'background';

   /**
   * gameobject konstruktor
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
    type: GameObject['type']
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;
  }

   /**
   * abstract mozgas frissito metodus.
   * @param keysPressed - a jatekos altal lenyomott billentyu. opcionalis mivel cska playernel van.
   */
  abstract update(keysPressed?: Record<string, boolean>): void;

   /**
   * az objektum dobozanak szamitasa. collisionhoz kell
   * @param spikeNum - a tuskekhez oszto, mivel azoknak fele akkora a boxuk.
   * @returns objektum dobozat
   */
  getBoundingBox(spikeNum: number = 1) {
    return {
      top: this.y + (this.height / 2) / spikeNum,
      bottom: this.y - (this.height / 2) / spikeNum,
      left: this.x - (this.width / 2) / spikeNum,
      right: this.x + (this.width / 2) / spikeNum,
    };
  }
}
