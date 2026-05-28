import { Enemy } from '../core/enemy';

 /**
 * elso map enemy
 */
export const easyLevelEnemies: Enemy[] = [
  new Enemy(2.995, -0.55, 0.04, 0.1, 2.995, 3.455),
];

 /**
 * masodik map enemy
 */
export const mediumLevelEnemies: Enemy[] = [
  new Enemy(0.845, -0.55, 0.04, 0.1, 0.845, 1.355),
  new Enemy(3.195, -0.55, 0.04, 0.1, 3.195, 3.505),
  new Enemy(5.495, -0.55, 0.04, 0.1, 5.495, 5.805),
];

 /**
 * harmadik map enemy
 */
export const hardLevelEnemies: Enemy[] = [
  new Enemy(0.32, -0.45, 0.04, 0.1, 0.32, 0.48),
  new Enemy(1.945, -0.55, 0.04, 0.1, 1.945, 2.455),
  new Enemy(3.845, -0.55, 0.04, 0.1, 3.845, 4.355),
  new Enemy(4.355, -0.55, 0.04, 0.1, 3.845, 4.355),
];
