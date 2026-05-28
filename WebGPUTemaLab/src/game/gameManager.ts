import { GameState } from './gameState';
import { LevelManager } from './levelManager';
import { UIManager } from './ui';
import { InputManager } from '../input/keyboard';
import { PhysicsEngine } from '../physics/gravity';

export class GameManager {
   /**
   * jatek frissitese. framenkenti logika
   */
  static update(): void {
    const keysPressed = InputManager.getKeysPressed();

    GameState.player.update(keysPressed);
    GameState.enemies.forEach((enemy) => enemy.update());
    PhysicsEngine.update(GameState.player, GameState.enemies, LevelManager.getPlatforms());
    GameState.camera.update(GameState.player.x);

    if (GameState.didPlayerWin()) {
      GameState.gameOver();
      UIManager.showWinScreen();
    }

    if (GameState.didPlayerDie()) {
      GameState.gameOver();
      UIManager.showLoseScreen();
    }

    GameState.player.clampPosition();
  }
}
