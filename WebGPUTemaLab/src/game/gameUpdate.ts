import { keysPressed } from '../input/keyboard';
import { updatePlayerMovement } from './player';
import { updateEnemyMovement } from './enemy';
import { didPlayerDied, didPlayerWin, isPlayerOutOfMap } from './gameState';
import { changeButtonTextIfNeeded } from '../game/ui';
import { updatePhysics } from '../physics/gravity';
import { updateCamera } from '../game/camera';
import { player } from '../game/player';

export function gameUpdate(): void {
  changeButtonTextIfNeeded()
  didPlayerDied();
  isPlayerOutOfMap();
  didPlayerWin();
  updateEnemyMovement();
  updatePlayerMovement(keysPressed);
  updatePhysics(player, keysPressed[' ']);
  updateCamera(player.x);
}
