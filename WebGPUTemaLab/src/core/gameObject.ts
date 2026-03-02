export type GameObject = {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'player' | 'platform' | 'enemy' | 'spike';
  name?: string;
  isGrounded?: boolean;
  velocityY?: number;
};
