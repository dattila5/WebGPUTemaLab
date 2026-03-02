import type { GameObject } from '../core/gameObject';

export const level1: GameObject[] = [
    // START PLATFORM
    { x: -0.9, y: -0.85, width: 0.3, height: 0.1, type: 'platform', name: 'start' },

    // PLATFORM 1 (tüske nélkül egyelőre)
    { x: -0.3, y: -0.4, width: 0.3, height: 0.1, type: 'platform', name: 'platform1' },

    // PLATFORM 2
    { x: 0.1, y: 0.0, width: 0.3, height: 0.1, type: 'platform', name: 'platform2' },

    // MIDDLE PLATFORM (enemy később)
    { x: 0.5, y: -0.85, width: 0.4, height: 0.1, type: 'platform', name: 'middle' },

    // PLATFORM 3
    { x: 1.0, y: 0.3, width: 0.3, height: 0.1, type: 'platform', name: 'platform3' },

    // GOAL
    { x: 1.5, y: -0.85, width: 0.3, height: 0.1, type: 'platform', name: 'goal' },
];
