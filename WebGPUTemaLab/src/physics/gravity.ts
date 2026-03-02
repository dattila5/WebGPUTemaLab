export let velocityY = 0.0;
export let isJumping = false;

const GRAVITY = 0.0002;
const JUMP_FORCE = 0.015;
const GROUND_LEVEL = -0.85;
const MAX_FALL_SPEED = 0.03;

export function updatePhysics(squarePosition: { x: number; y: number }, isSpacePressed: boolean) {
    velocityY -= GRAVITY;
    velocityY = Math.max(velocityY, -MAX_FALL_SPEED);
    squarePosition.y += velocityY;

    if (squarePosition.y <= GROUND_LEVEL) {
        squarePosition.y = GROUND_LEVEL;
        velocityY = 0;
        isJumping = false;
    }

    if (isSpacePressed && !isJumping) {
        velocityY = JUMP_FORCE;
        isJumping = true;
    }
}

export { GRAVITY, JUMP_FORCE, GROUND_LEVEL, MAX_FALL_SPEED };
