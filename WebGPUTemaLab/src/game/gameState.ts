import { player } from '../game/player';
import { showLoseScreen, showWinScreen } from '../game/ui'
import { didPlayerTouchSpike, didPlayerTouchEnemy } from '../physics/gravity'

export let isGameOver = false;
export let gameStarted = false;

export function didPlayerDied(): void {
  if (player.y <= -1.1 || didPlayerTouchSpike || didPlayerTouchEnemy) {
    showLoseScreen();
    gameOver();
  }
}

export function gameOver(): void {
  isGameOver = true;
}

export function didPlayerWin(): void {
  if (player.x >= 4.1) {
    showWinScreen();
    gameOver();
  }
}

export function startGame(): void {
  player.x = -0.9;
  player.y = -0.52;
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

export function setGameOver(state: boolean): void {
  isGameOver = state;
}
