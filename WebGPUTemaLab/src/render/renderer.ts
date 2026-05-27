import { updateObjectBuffer, updateCameraUniformBuffer } from '../gpu/buffer';
import { GameState } from '../game/gameState';
import { LevelManager } from '../game/levelManager';
import { Background } from '../core/background';

export function renderFrame(
  device: GPUDevice,
  context: GPUCanvasContext,
  pipeline: GPURenderPipeline,
  positionBuffer: GPUBuffer,
  cameraBuffer: GPUBuffer,
  indexBuffer: GPUBuffer,
  bindGroup: GPUBindGroup
) {
  const backgroundObject = new Background();
  const platformObjects = LevelManager.getPlatforms();

  const allObjects = [backgroundObject, GameState.player, ...GameState.enemies, ...platformObjects];
  updateObjectBuffer(device, positionBuffer, allObjects);
  updateCameraUniformBuffer(device, cameraBuffer, GameState.camera.x, GameState.camera.offset);

  const encoder = device.createCommandEncoder();
  const pass = encoder.beginRenderPass({
    colorAttachments: [
      {
        view: context.getCurrentTexture().createView(),
        loadOp: 'clear',
        storeOp: 'store',
      },
    ],
  });

  pass.setPipeline(pipeline);
  pass.setBindGroup(0, bindGroup);
  pass.setIndexBuffer(indexBuffer, 'uint32');
  pass.drawIndexed(6, allObjects.length, 0, 0, 0);

  pass.end();
  const commandBuffer = encoder.finish();
  device.queue.submit([commandBuffer]);
}
