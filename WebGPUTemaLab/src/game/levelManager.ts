import { Platform } from '../core/platform';
import { Enemy } from '../core/enemy';
import { GameState } from './gameState';
import { easyLevel, mediumLevel, hardLevel } from '../level/level';
import { easyLevelEnemies, mediumLevelEnemies, hardLevelEnemies } from '../level/enemies';

export class LevelManager {
  private static platformsByLevel = {
    1: easyLevel,
    2: mediumLevel,
    3: hardLevel,
  };

  private static readonly enemiesByLevel = {
    1: easyLevelEnemies,
    2: mediumLevelEnemies,
    3: hardLevelEnemies,
  };

   /**
   * leghosszabb ellenfel listanak a szamat adja vissza
   * @returns leghosszabb ellenfel lista szamaval
   */
  static getMaxEnemyLength(): number {
    return Math.max(
      this.enemiesByLevel[1].length,
      this.enemiesByLevel[2].length,
      this.enemiesByLevel[3].length
    );
  }

   /**
   * leghosszabb platform listanak a szamat adja vissza
   * @returns leghosszabb platfrom lista szamaval
   */
  static getMaxPlatformLength(): number {
    return Math.max(
      this.platformsByLevel[1].length,
      this.platformsByLevel[2].length,
      this.platformsByLevel[3].length
    );
  }

   /**
   * platformok lekerese
   * @returns aktualis szint platformjai
   */
  static getPlatforms(): Platform[] {
    const levelNum = GameState.currentLevel as 1 | 2 | 3;
    return this.platformsByLevel[levelNum] || [];
  }

   /**
   * ellenfelek lekerese
   * @returns aktualis szint ellenfelei
   */
  static getEnemies(): Enemy[] {
    const levelNum = GameState.currentLevel as 1 | 2 | 3;
    return this.enemiesByLevel[levelNum] || [];
  }

   /**
   * palya betoltese. enemyk lekerese
   */
  static loadLevel(): void {
    GameState.enemies = this.getEnemies();
  }
}
