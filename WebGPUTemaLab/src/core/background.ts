import { GameObject } from './gameObject';

export class Background extends GameObject {
  constructor(x: number = 0, y: number = 0, width: number = 17, height: number = 2) {
    super(x, y, width, height, 'background');
  }

  update(): void {}
}
