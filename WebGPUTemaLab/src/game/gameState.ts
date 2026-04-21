import { player } from '../game/player';
import { showLoseScreen, showWinScreen } from '../game/ui'

export let isGameOver = false;
export let gameStarted = false;

export function didPlayerFallOut(): void {
  if (player.y <= -1.1) {
    showLoseScreen();
    isGameOver = true;
  }
}

export function didPlayerWin(): void {
  if (player.x >= 4.1) {
    showWinScreen();
    isGameOver = true;
  }
}

export function startGame(): void {
  player.x = -0.9;
  player.y = -0.35;
  isGameOver = false;
  gameStarted = true;
}

export function isPlayerOutOfMap(): void {
  if (player.x <= -1.04) {
    player.x = -1.04;
  }
  if (player.x >= 4.465) {
    player.x = 4.465;
  }
}
