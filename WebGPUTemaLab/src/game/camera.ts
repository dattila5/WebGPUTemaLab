export class Camera {
  private smoothCameraX: number = -0.9;
  private smoothOffset: number = 0.85;

  private readonly minCameraX: number = -0.9;
  private readonly maxCameraX: number = 5.85;
  private readonly playerFollowThreshold: number = 0.15;
  private readonly cameraLerpSpeed: number = 0.01;
  private readonly offsetLerpSpeed: number = 0.008;

  get x(): number {
    return this.smoothCameraX;
  }

  get offset(): number {
    return this.smoothOffset;
  }

  update(playerX: number): void {
    let targetCameraX: number;
    let targetOffset: number;

    if (playerX < -this.playerFollowThreshold) {
      targetCameraX = this.minCameraX;
      targetOffset = 0.85;
    } else if (playerX > 6.6) {
      targetCameraX = this.maxCameraX;
      targetOffset = 0.85;
    } else {
      targetCameraX = playerX;
      targetOffset = 0.0;
    }

    this.smoothCameraX += (targetCameraX - this.smoothCameraX) * this.cameraLerpSpeed;
    this.smoothOffset += (targetOffset - this.smoothOffset) * this.offsetLerpSpeed;
  }

  reset(): void {
    this.smoothCameraX = -0.9;
    this.smoothOffset = 0.85;
  }
}
