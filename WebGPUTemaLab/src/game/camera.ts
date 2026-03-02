export let smoothCameraX = -0.9;
export let smoothOffset = 0.85;

export function updateCamera(playerX: number): void {
    let targetCameraX: number;
    let targetOffset: number;

    if (playerX < -0.15) {
        targetCameraX = -0.9;
        targetOffset = 0.85;
    } else {
        targetCameraX = playerX;
        targetOffset = 0.0;
    }

    smoothCameraX += (targetCameraX - smoothCameraX) * 0.01;
    smoothOffset += (targetOffset - smoothOffset) * 0.008;
}
