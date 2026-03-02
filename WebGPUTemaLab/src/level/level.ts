import type { GameObject } from '../core/gameObject';

export const level1: GameObject[] = [
  { x: -0.9, y: -0.85, width: 0.3, height: 0.1, type: 'platform', name: 'start' },
  { x: -0.4, y: -0.5, width: 0.3, height: 0.1, type: 'platform', name: 'platform1' },
  { x: 0.1, y: -0.2, width: 0.3, height: 0.1, type: 'platform', name: 'platform2' },
  { x: 0.75, y: -0.6, width: 0.4, height: 0.1, type: 'platform', name: 'middle' },
  { x: 1.2, y: -0.3, width: 0.3, height: 0.1, type: 'platform', name: 'platform3' },
  { x: 1.5, y: -0.85, width: 0.3, height: 0.1, type: 'platform', name: 'goal' },
];
