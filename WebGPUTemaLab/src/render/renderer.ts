import type { GameObject } from '../core/gameObject';
import { keysPressed } from '../input/keyboard';
import { updatePhysics } from '../physics/gravity';
import { level1 } from '../level/level';

let player: GameObject = {
    x: -0.9,
    y: -0.7,
    width: 0.08,
    height: 0.08,
    type: 'player',
};

function renderFrame(
    device: GPUDevice,
    context: GPUCanvasContext,
    pipeline: GPURenderPipeline,
    positionBuffer: GPUBuffer,
    bindGroup: GPUBindGroup
) {
    const speed = 0.0045;

    if (keysPressed['a']) player.x -= speed;
    if (keysPressed['d']) player.x += speed;

    updatePhysics(player, keysPressed[' ']);

    // GPU rajzolás
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
    pass.draw(4);  // Egy négyzet rajzolása

    pass.end();
    const commandBuffer = encoder.finish();
    device.queue.submit([commandBuffer]);
}

export { renderFrame };
