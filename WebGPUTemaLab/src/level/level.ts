import type { GameObject } from '../core/gameObject';

export const level1: GameObject[] = [
  { x: -0.9, y: -0.85, width: 1.5, height: 0.1, type: 'platform', name: 'start_main' },

  { x: -0.125, y: -0.8, width: 0.05, height: 0.2, type: 'platform', name: 'start_main_step_1' },
  { x: -0.075, y: -0.75, width: 0.05, height: 0.3, type: 'platform', name: 'start_main_step_2' },

  { x: 0.175, y: -0.5, width: 0.15, height: 0.1, type: 'platform', name: 'jump_between_steps_1' },

  { x: 0.425, y: -0.75, width: 0.05, height: 0.3, type: 'platform', name: 'main2_step_2' },
  { x: 0.475, y: -0.8, width: 0.05, height: 0.2, type: 'platform', name: 'main1_step_1' },

  { x: 1.25, y: -0.85, width: 1.5, height: 0.1, type: 'platform', name: 'main1' },

  { x: 0.8, y: -0.75, width: 0.05, height: 0.1, type: 'platform', name: 'moving_ai_box_1' },
  { x: 1.4, y: -0.75, width: 0.05, height: 0.1, type: 'platform', name: 'moving_ai_box_2' },

  { x: 2.15, y: -0.65, width: 0.15, height: 0.1, type: 'platform', name: 'pike_start_platform' },
  { x: 2.5, y: -0.55, width: 0.15, height: 0.1, type: 'platform', name: 'pike_end_platform' },
  { x: 2.75, y: -0.7, width: 0.15, height: 0.1, type: 'platform', name: 'pike_start_and_end_platform' },

  { x: 3.8, y: -0.85, width: 1.5, height: 0.1, type: 'platform', name: 'main2' },

  { x: 3.8, y: -0.65, width: 0.02, height: 0.3, type: 'platform', name: 'end_flag_pole' },
  { x: 3.8525, y: -0.5, width: 0.125, height: 0.075, type: 'platform', name: 'end_flag' },
];
