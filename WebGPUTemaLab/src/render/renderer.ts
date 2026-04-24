import { keysPressed } from '../input/keyboard';
import { updatePhysics } from '../physics/gravity';
import { easyLevel, mediumLevel, hardLevel } from '../level/level';
import { updateObjectBuffer, updateCameraUniformBuffer } from '../gpu/buffer';
import { player } from '../game/player';
import { enemies } from '../game/enemy';
import { updateCamera, smoothCameraX, smoothOffset } from '../game/camera';
import type { GameObject } from '../core/gameObject';
import { gameUpdate } from '../game/gameUpdate';
import { currentLevel } from '../game/gameState';

let frameCount = 0;
const FIXED_TIMESTEP = 1 / 60;
let accumulator = 0;

export function renderFrame(
  device: GPUDevice,
  context: GPUCanvasContext,
  pipeline: GPURenderPipeline,
  positionBuffer: GPUBuffer,
  cameraBuffer: GPUBuffer,
  indexBuffer: GPUBuffer,
  uvBuffer: GPUBuffer,
  bindGroup: GPUBindGroup
) {
  frameCount++;
  accumulator += FIXED_TIMESTEP;

  gameUpdate();

  while (accumulator >= FIXED_TIMESTEP) {
    updatePhysics(player, keysPressed[' ']);
    accumulator -= FIXED_TIMESTEP;
  }

  updateCamera(player.x);

  if (frameCount % 60 === 0) {
    console.log(`Player: x=${player.x.toFixed(2)}, y=${player.y.toFixed(2)}, Camera: ${smoothCameraX.toFixed(2)}`);
  }

  const backgroundObject: GameObject = { x: 0, y: 0, width: 17, height: 2, type: 'background' };

  const getLevelObjects = () => {
    switch(currentLevel) {
      case 1: return easyLevel;
      case 2: return mediumLevel;
      case 3: return hardLevel;
      default: return easyLevel;
    }
  };

  const allObjects = [backgroundObject, player, ...enemies, ...getLevelObjects()];
  updateObjectBuffer(device, positionBuffer, allObjects);
  updateCameraUniformBuffer(device, cameraBuffer, smoothCameraX, smoothOffset);

  const encoder = device.createCommandEncoder();
  const pass = encoder.beginRenderPass({
    colorAttachments: [
      {
        view: context.getCurrentTexture().createView(),
        clearValue: { r: 0.1, g: 0.1, b: 0.1, a: 1 },
        loadOp: 'clear',
        storeOp: 'store',
      },
    ],
  });

  pass.setPipeline(pipeline);
  pass.setBindGroup(0, bindGroup);
  pass.setIndexBuffer(indexBuffer, 'uint32');
  pass.setVertexBuffer(0, uvBuffer);
  pass.drawIndexed(6, allObjects.length, 0, 0, 0);

  pass.end();
  const commandBuffer = encoder.finish();
  device.queue.submit([commandBuffer]);
}
