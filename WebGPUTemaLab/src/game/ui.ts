import { startGame } from '../game/gameState';

export function showLoseScreen(): void {
  const loseScreen = document.getElementById('loseScreen');
  if (loseScreen) {
    loseScreen.classList.remove('hidden');
  }
}

export function showWinScreen(): void {
  const winScreen = document.getElementById('winScreen');
  if (winScreen) {
    winScreen.classList.remove('hidden');
  }
}

document.getElementById('continueBtn')?.addEventListener('click', () => {
  const winScreen = document.getElementById('winScreen');
  if (winScreen) {
    winScreen.classList.add('hidden');
  }
  startGame();
});

document.getElementById('tryAgainBtn')?.addEventListener('click', () => {
  const loseScreen = document.getElementById('loseScreen');
  if (loseScreen) {
    loseScreen.classList.add('hidden');
  }
  startGame();
});

document.getElementById('startBtn')?.addEventListener('click', () => {
  const startScreen = document.getElementById('startScreen');
  if (startScreen) {
    startScreen.classList.add('hidden');
  }
  startGame();
});
