import { CollisionDetector } from './collision';
import type { BoundingBox } from './collision';
import { Player } from '../core/player';
import { Enemy } from '../core/enemy';
import { Platform } from '../core/platform';
import { GameState } from '../game/gameState';
import { InputManager } from '../input/keyboard';

export class PhysicsEngine {
  private static readonly GRAVITY = -0.00019;
  private static readonly JUMP_STRENGTH = 0.0115;

  private static didPlayerTouchSpike = false;
  private static didPlayerTouchEnemy = false;

  static getDidPlayerTouchSpike(): boolean {
    return this.didPlayerTouchSpike;
  }

  static getDidPlayerTouchEnemy(): boolean {
    return this.didPlayerTouchEnemy;
  }

  static update(
    player: Player,
    enemies: Enemy[],
    platforms: Platform[]
  ): void {
    this.didPlayerTouchSpike = false;
    this.didPlayerTouchEnemy = false;

    if (!GameState.gameStarted || GameState.isGameOver) return;

    if (player.vy === undefined) player.vy = 0;
    if (player.isGrounded === undefined) player.isGrounded = false;

    player.vy += this.GRAVITY;

    const isJumping = InputManager.isKeyPressed(' ');
    if (isJumping && player.isGrounded) {
      player.vy = this.JUMP_STRENGTH;
      player.isGrounded = false;
    }

    player.y += player.vy;
    player.isGrounded = false;

    this.checkPlatformCollisions(player, platforms);
    this.checkEnemyCollisions(player, enemies);
  }

  private static checkPlatformCollisions(player: Player, platforms: Platform[]): void {
    const playerBox = player.getBoundingBox(1);

    for (const platform of platforms) {
      if (platform.type === 'background') continue;

      let platformBox: BoundingBox;

      if (platform.type === 'spike') {
        platformBox = platform.getBoundingBox(2);
      } else {
        platformBox = platform.getBoundingBox(1);
      }

      if (!CollisionDetector.checkAABBCollision(playerBox, platformBox)) continue;

      if (platform.type === 'spike') {
        this.didPlayerTouchSpike = true;
        continue;
      }

      const side = CollisionDetector.getCollisionSide(playerBox, platformBox);

      switch (side) {
        case 'top':
          player.y = platformBox.top + player.height / 2;
          player.vy = 0;
          player.isGrounded = true;
          break;

        case 'bottom':
          player.y = platformBox.bottom - player.height / 2;
          player.vy = 0;
          break;

        case 'left':
          player.x = platformBox.left - player.width / 2;
          break;

        case 'right':
          player.x = platformBox.right + player.width / 2;
          break;
      }
    }
  }

  private static checkEnemyCollisions(player: Player, enemies: Enemy[]): void {
    const playerBox = player.getBoundingBox(1);

    enemies.forEach((enemy) => {
      const enemyBox = enemy.getBoundingBox(1);
      if (CollisionDetector.checkAABBCollision(playerBox, enemyBox)) {
        this.didPlayerTouchEnemy = true;
      }
    });
  }
}
