import { keysPressed } from '../input/keyboard';
import { updatePlayerMovement } from './player';
import { updateEnemyMovement } from './enemy';
import { didPlayerDied, didPlayerWin, isPlayerOutOfMap } from './gameState';
import { changeButtonTextIfNeeded } from '../game/ui';

export function gameUpdate(): void {
  changeButtonTextIfNeeded()
  didPlayerDied();
  isPlayerOutOfMap();
  didPlayerWin();
  updateEnemyMovement();
  updatePlayerMovement(keysPressed);
}
