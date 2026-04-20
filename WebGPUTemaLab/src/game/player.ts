import type { GameObject } from '../core/gameObject';
import { getGameStarted  } from '../physics/gravity';

export interface GameObjectWithVelocity extends GameObject {
  vy?: number;
  isGrounded?: boolean;
  isGameOver: boolean;
}

export const player: GameObjectWithVelocity = {
  x: -0.9,
  y: -0.35,
  width: 0.02,
  height: 0.2,
  type: 'player',
  vy: 0,
  isGrounded: false,
  isGameOver: false
};

export function updatePlayerMovement(keysPressed: Record<string, boolean>): void {
  if (player.isGameOver || !getGameStarted()) return;
  const speed = 0.002;
  if (keysPressed['a']) player.x -= speed;
  if (keysPressed['d']) player.x += speed;
}

export function didPlayerFallOut(): void {
  if (player.y <= -1.1) {
    const loseScreen = document.getElementById('loseScreen');
    if (loseScreen) {
      loseScreen.classList.remove('hidden');
    }
    player.isGameOver = true;
  }
}

export function startGame(): void {
  player.x = -0.9;
  player.y = -0.35;
  player.isGameOver = false;
}

export function isPlayerOutOfMap(): void {
  if (player.x <= -1.04) {
    player.x = -1.04;
  }
  if (player.x >= 4.465) {
    player.x = 4.465;
  }
}

export function didPlayerWin(): void {
  if (player.x >= 4.1) {
    const winScreen = document.getElementById('winScreen');
    if (winScreen) {
      winScreen.classList.remove('hidden');
    }
    player.isGameOver = true;
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
