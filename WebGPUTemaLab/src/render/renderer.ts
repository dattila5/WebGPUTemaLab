import { easyLevel, mediumLevel, hardLevel } from '../level/level';
import { updateObjectBuffer, updateCameraUniformBuffer } from '../gpu/buffer';
import { player } from '../game/player';
import { easyLevelEnemies, mediumLevelEnemies, hardLevelEnemies } from '../game/enemy';
import { smoothCameraX, smoothOffset } from '../game/camera';
import type { GameObject } from '../core/gameObject';
import { gameUpdate } from '../game/gameUpdate';
import { currentLevel } from '../game/gameState';

export function renderFrame(
  device: GPUDevice,
  context: GPUCanvasContext,
  pipeline: GPURenderPipeline,
  positionBuffer: GPUBuffer,
  cameraBuffer: GPUBuffer,
  indexBuffer: GPUBuffer,
  bindGroup: GPUBindGroup
) {
  gameUpdate();
  const backgroundObject: GameObject = { x: 0, y: 0, width: 17, height: 2, type: 'background' };

  const getLevelObjects = () => {
    switch(currentLevel) {
      case 1: return easyLevel;
      case 2: return mediumLevel;
      case 3: return hardLevel;
      default: return easyLevel;
    }
  };

  const getEnemyObjects = () =>{
    switch(currentLevel){
      case 1: return easyLevelEnemies;
      case 2: return mediumLevelEnemies;
      case 3: return hardLevelEnemies;
      default: return easyLevelEnemies;
    }
  }

  const allObjects = [backgroundObject, player, ...getEnemyObjects(), ...getLevelObjects()];
  updateObjectBuffer(device, positionBuffer, allObjects);
  updateCameraUniformBuffer(device, cameraBuffer, smoothCameraX, smoothOffset);

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
