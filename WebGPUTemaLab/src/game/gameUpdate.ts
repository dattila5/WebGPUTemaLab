import { keysPressed } from '../input/keyboard';
import { updatePlayerMovement } from './player';
import { enemies, updateEnemyMovement } from './enemy';
import { didPlayerDied, didPlayerWin, isPlayerOutOfMap } from './gameState';

export function gameUpdate(): void {
  didPlayerDied();
  isPlayerOutOfMap();
  didPlayerWin();
  enemies.forEach((x) => {
    updateEnemyMovement(x.name);
  });
  updatePlayerMovement(keysPressed);
}
