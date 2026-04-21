import type { GameObject } from '../core/gameObject';

export const level1: GameObject[] = [
  { x: -0.9, y: -0.65, width: 1.7, height: 0.1, type: 'platform_grass', shape: 'quad', name: 'start_main_grass' },

  { x: -0.9, y: -0.875, width: 1.7, height: 0.35, type: 'platform_dirt', shape: 'quad', name: 'main_dirt_1' },

  { x: -0.1, y: -0.55, width: 0.1, height: 0.1, type: 'platform_block', shape: 'quad', name: 'start_main_step_1' },
  { x: -0.075, y: -0.45, width: 0.05, height: 0.1, type: 'platform_block', shape: 'quad', name: 'start_main_step_2' },

  { x: 0.175, y: -0.3, width: 0.15, height: 0.1, type: 'platform_block', shape: 'quad', name: 'jump_between_steps_1' },

  { x: 0.425, y: -0.45, width: 0.05, height: 0.1, type: 'platform_block', shape: 'quad', name: 'main2_step_2' },
  { x: 0.45, y: -0.55, width: 0.1, height: 0.1, type: 'platform_block', shape: 'quad', name: 'main1_step_1' },

  { x: 1.2, y: -0.65, width: 1.6, height: 0.1, type: 'platform_grass', shape: 'quad', name: 'main2' },
  { x: 1.2, y: -0.875, width: 1.6, height: 0.35, type: 'platform_dirt', shape: 'quad', name: 'main2' },

  { x: 0.8, y: -0.55, width: 0.05, height: 0.1, type: 'platform_block', shape: 'quad', name: 'moving_ai_box_1' },
  { x: 1.4, y: -0.55, width: 0.05, height: 0.1, type: 'platform_block', shape: 'quad', name: 'moving_ai_box_2' },

  { x: 2.15, y: -0.45, width: 0.15, height: 0.1, type: 'platform_block', shape: 'quad', name: 'spike_start_platform' },
  { x: 2.095, y: -0.3682, width: 0.04, height: 0.06, type: 'spike', shape: 'triangle', name: 'spiked1' },

  { x: 2.5, y: -0.35, width: 0.15, height: 0.1, type: 'platform_block', shape: 'quad', name: 'spike_end_platform' },
  { x: 2.555, y: -0.2687, width: 0.04, height: 0.06, type: 'spike', shape: 'triangle', name: 'spiked2' },

  { x: 2.75, y: -0.5, width: 0.2, height: 0.1, type: 'platform_block', shape: 'quad', name: 'spike_start_and_end_platform' },
  { x: 2.67, y: -0.4195, width: 0.04, height: 0.06, type: 'spike',  shape: 'triangle', name: 'spiked3' },
  { x: 2.83, y: -0.4195, width: 0.04, height: 0.06, type: 'spike', shape: 'triangle', name: 'spiked4' },

  { x: 3.75, y: -0.65, width: 1.5, height: 0.1, type: 'platform_grass', shape: 'quad', name: 'main3' },
  { x: 3.75, y: -0.875, width: 1.5, height: 0.35, type: 'platform_dirt', shape: 'quad', name: 'main3' },

  { x: 3.8025, y: -0.3, width: 0.125, height: 0.075, type: 'flag', shape: 'quad', name: 'end_flag' },
  { x: 3.745, y: -0.4325, width: 0.01, height: 0.335, type: 'flag_pole', shape: 'quad', name: 'end_flag_pole' },
];
