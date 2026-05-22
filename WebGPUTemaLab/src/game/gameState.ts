import { player } from '../game/player';
import { showLoseScreen, showWinScreen, showStartScreen } from '../game/ui'
import { didPlayerTouchSpike, didPlayerTouchEnemy } from '../physics/gravity'

export let isGameOver = false;
export let gameStarted = false;
export let currentLevel = 3;

export function nextLevel(): void {
  if (currentLevel < 3) {
    currentLevel++;
    startGame();
  }
  else {
    currentLevel = 1;
    gameReset();
  }
}

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
  if (player.x >= 7.5) {
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

export function gameReset(): void{
  player.x = -0.9;
  player.y = -0.52;
  isGameOver = true;
  gameStarted = false;
  showStartScreen();
}

export function isPlayerOutOfMap(): void {
  if (player.x <= -1.04) player.x = -1.04;
  if (player.x >= 7.7) player.x = 7.7;
}

export function setGameOver(state: boolean): void {
  isGameOver = state;
}
