import { startGame, nextLevel, currentLevel } from '../game/gameState';

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

export function changeButtonTextIfNeeded(): void{
  const btn = document.getElementById('continueBtn');
  if(btn == null) return;

  if(currentLevel == 3) btn.textContent = "End Game";
  else btn.textContent = "Continue";
}

screenButtons.forEach(({ buttonId, screenId, action }) => {
  document.getElementById(buttonId)?.addEventListener('click', () => {
    const screen = document.getElementById(screenId);
    if (screen) screen.classList.add('hidden');
    action();
  });
});
