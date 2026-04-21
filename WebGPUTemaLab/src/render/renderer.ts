import { keysPressed } from '../input/keyboard';
import { updatePhysics } from '../physics/gravity';
import { level1 } from '../level/level';
import { updateObjectBuffer, updateCameraUniformBuffer } from '../gpu/buffer';
import { player, updatePlayerMovement } from '../game/player';
import { updateCamera, smoothCameraX, smoothOffset } from '../game/camera';
import type { GameObject } from '../core/gameObject';
import { didPlayerFallOut, didPlayerWin, isPlayerOutOfMap, didPlayerDiedDueToSpike } from '../game/gameState';

let frameCount = 0;
const FIXED_TIMESTEP = 1 / 60;
let accumulator = 0;

function renderFrame(
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

    didPlayerDiedDueToSpike();
    didPlayerFallOut();
    isPlayerOutOfMap();
    didPlayerWin();
    updatePlayerMovement(keysPressed);

    while (accumulator >= FIXED_TIMESTEP) {
        updatePhysics(player, keysPressed[' ']);
        accumulator -= FIXED_TIMESTEP;
    }

    updateCamera(player.x);

    if (frameCount % 60 === 0) {
        console.log(`Player: x=${player.x.toFixed(2)}, y=${player.y.toFixed(2)}, Camera: ${smoothCameraX.toFixed(2)}`);
    }

    const backgroundObject: GameObject = {
      x: 0, y: 0, width: 10, height: 2,
      type: 'background', name: 'bg'
    };

    const allObjects = [backgroundObject, player, ...level1];
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

export { renderFrame };
