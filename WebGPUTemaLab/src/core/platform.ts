import { GameObject } from './gameObject';

export class Platform extends GameObject {
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    type: 'platform_grass' | 'platform_dirt' | 'platform_block' | 'spike' | 'flag_pole' | 'flag' | 'background'
  ) {
    super(x, y, width, height, type);
  }

  update(): void {
  }
}
