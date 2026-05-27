import { Player } from '../core/player';
import { Enemy } from '../core/enemy';
import { Camera } from './camera';
import { PhysicsEngine } from '../physics/gravity';
import { LevelManager } from './levelManager'
import { UIManager } from './ui'

export class GameState {
  private static instance: GameState;
  static isGameOver = false;
  static gameStarted = false;
  static currentLevel = 1;
  static player: Player;
  static enemies: Enemy[] = [];
  static camera: Camera = new Camera();

  private constructor() { }

  static getInstance(): GameState {
    if (!GameState.instance) {
      GameState.instance = new GameState();
    }
    return GameState.instance;
  }

  static initializeGameObjects(): void {
    GameState.player = new Player(-0.9, -0.52);
    GameState.enemies = [];
  }

  static nextLevel(): void {
    if (GameState.currentLevel < 3) {
      GameState.currentLevel++;
      LevelManager.loadLevel();
      GameState.startGame();
    } else {
      GameState.currentLevel = 1;
      LevelManager.loadLevel();
      GameState.gameReset();
    }
  }

  static startGame(): void {
    GameState.player.reset();
    GameState.camera.reset();
    GameState.isGameOver = false;
    GameState.gameStarted = true;
  }

  static gameOver(): void {
    GameState.isGameOver = true;
  }

  static gameReset(): void {
    GameState.player.reset();
    GameState.isGameOver = true;
    GameState.gameStarted = false;
    GameState.camera.reset();
    UIManager.showStartScreen();
  }

  static didPlayerWin(): boolean {
    return GameState.player.x >= 7.5;
  }

  static didPlayerDie(): boolean {
    return (
      GameState.player.y <= -1.1 ||
      PhysicsEngine.getDidPlayerTouchSpike() ||
      PhysicsEngine.getDidPlayerTouchEnemy()
    );
  }
}
