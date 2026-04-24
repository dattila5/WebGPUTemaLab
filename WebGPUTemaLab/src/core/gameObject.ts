export type GameObject = {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'player' | 'platform_grass' | 'platform_dirt' | 'platform_block' | 'enemy' | 'spike' | 'flag_pole' | 'flag' | 'background';
};
