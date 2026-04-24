import { startGame, nextLevel } from '../game/gameState';

const screenButtons = [
  { buttonId: 'continueBtn', screenId: 'winScreen', action: nextLevel },
  { buttonId: 'tryAgainAfterWinBtn', screenId: 'winScreen', action: startGame },
  { buttonId: 'tryAgainBtn', screenId: 'loseScreen', action: startGame },
  { buttonId: 'startBtn', screenId: 'startScreen', action: startGame },
];

export function setScreenVisible(screenId: string): void{
  const screen = document.getElementById(screenId);
  if (screen) screen.classList.remove('hidden');
}

export function showLoseScreen(): void {
  setScreenVisible('loseScreen')
}

export function showWinScreen(): void {
  setScreenVisible('winScreen')
}

export function showStartScreen(): void{
  setScreenVisible('startScreen');
}

screenButtons.forEach(({ buttonId, screenId, action }) => {
  document.getElementById(buttonId)?.addEventListener('click', () => {
    const screen = document.getElementById(screenId);
    if (screen) screen.classList.add('hidden');
    action();
  });
});
