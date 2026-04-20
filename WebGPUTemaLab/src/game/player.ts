import type { GameObject } from '../core/gameObject';

export interface GameObjectWithVelocity extends GameObject {
    vy?: number;
    isGrounded?: boolean;
}

export const player: GameObjectWithVelocity = {
    x: -0.9,
    y: -0.35,
    width: 0.02,
    height: 0.2,
    type: 'player',
    vy: 0,
    isGrounded: false,
};

export function updatePlayerMovement(keysPressed: Record<string, boolean>): void {
    const speed = 0.002;
    if (keysPressed['a']) player.x -= speed;
    if (keysPressed['d']) player.x += speed;
}

export function didPlayerFallOut(): void{
  if(player.y <= -1.0){
    killPlayer();
  }
}

export function killPlayer(): void{
  player.x = -0.9;
  player.y = -0.35;
}

export function isPlayerOutOfMap(): void{
  if(player.x <= -1.04){
    player.x = -1.04;
  }
  if(player.x >= 4.465){
    player.x = 4.465;
  }
}
