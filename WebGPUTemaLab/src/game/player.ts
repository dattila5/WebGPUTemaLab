import type { GameObject } from '../core/gameObject';

export interface GameObjectWithVelocity extends GameObject {
    vy?: number;
    isGrounded?: boolean;
}

export const player: GameObjectWithVelocity = {
    x: -0.9,
    y: -0.35,
    width: 0.02,
    height: 0.1,
    type: 'player',
    vy: 0,
    isGrounded: false,
};

export function updatePlayerMovement(keysPressed: Record<string, boolean>): void {
    const speed = 0.002;
    if (keysPressed['a']) player.x -= speed;
    if (keysPressed['d']) player.x += speed;
}
