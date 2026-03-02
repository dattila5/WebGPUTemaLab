import type { GameObject } from '../core/gameObject';

export interface GameObjectWithVelocity extends GameObject {
    vy?: number;
    isGrounded?: boolean;
}

export const player: GameObjectWithVelocity = {
    x: -0.9,
    y: -0.80,
    width: 0.08,
    height: 0.08,
    type: 'player',
    vy: 0,
    isGrounded: false,
};

export function updatePlayerMovement(keysPressed: Record<string, boolean>): void {
    const speed = 0.0045;
    if (keysPressed['a']) player.x -= speed;
    if (keysPressed['d']) player.x += speed;
}
