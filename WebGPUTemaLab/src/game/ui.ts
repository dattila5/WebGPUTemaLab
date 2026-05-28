import { GameState } from './gameState';

export class UIManager {
  private static screenButtons = [
    { buttonId: 'continueBtn', screenId: 'winScreen', action: () => GameState.nextLevel() },
    { buttonId: 'tryAgainAfterWinBtn', screenId: 'winScreen', action: () => GameState.startGame() },
    { buttonId: 'tryAgainBtn', screenId: 'loseScreen', action: () => GameState.startGame() },
    { buttonId: 'startBtn', screenId: 'startScreen', action: () => GameState.startGame() },
  ];

   /**
   * gombok incializasa.
   */
  static initialize(): void {
    this.attachButtonListeners();
  }

   /**
   * kepernyo lathatora allitasa
   */
  static setScreenVisible(screenId: string): void {
    const screen = document.getElementById(screenId);
    if (screen) screen.classList.remove('hidden');
  }

   /**
   * kepernyo elrejtese
   */
  static setScreenHidden(screenId: string): void {
    const screen = document.getElementById(screenId);
    if (screen) screen.classList.add('hidden');
  }

   /**
   * vesztes kepernyo megjelenitese
   */
  static showLoseScreen(): void {
    this.setScreenVisible('loseScreen');
  }
   /**
   * gyoztes kepernyo megjelenitese
   */
  static showWinScreen(): void {
    this.setScreenVisible('winScreen');
    this.changeButtonTextIfNeeded();
  }

   /**
   * start kepernyo megjelenitese
   */
  static showStartScreen(): void {
    this.setScreenVisible('startScreen');
  }

   /**
   * gomb szovegenek atvaltoztatasa ha kivittuk a jatekot
   */
  private static changeButtonTextIfNeeded(): void {
    const btn = document.getElementById('continueBtn');
    if (!btn) return;

    if (GameState.currentLevel === 3) {
      btn.textContent = 'End Game';
    } else {
      btn.textContent = 'Continue';
    }
  }

   /**
   * gombokhoz click event kotes
   */
  private static attachButtonListeners(): void {
    this.screenButtons.forEach(({ buttonId, screenId, action }) => {
      const button = document.getElementById(buttonId);
      if (!button) return;

      button.addEventListener('click', () => {
        this.setScreenHidden(screenId);
        action();
      });
    });
  }
}
