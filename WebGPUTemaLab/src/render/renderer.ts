import { squarePosition, keysPressed } from '../input/keyboard';
import { updatePhysics } from '../physics/gravity';  // ← ÚJ IMPORT!

// Frame rajzolása
function renderFrame(
    device: GPUDevice,
    context: GPUCanvasContext,
    pipeline: GPURenderPipeline,
    positionBuffer: GPUBuffer,
    bindGroup: GPUBindGroup
) {
    const speed = 0.0045;

    if (keysPressed.a) squarePosition.x -= speed;
    if (keysPressed.d) squarePosition.x += speed;

    updatePhysics(squarePosition, keysPressed[' ']);  // ← ÚJ!

    device.queue.writeBuffer(
        positionBuffer,
        0,
        new Float32Array([squarePosition.x, squarePosition.y])
    );

    const encoder = device.createCommandEncoder();
    const pass = encoder.beginRenderPass({
        colorAttachments: [
            {
                view: context.getCurrentTexture().createView(),
                clearValue: { r: 0, g: 0, b: 0, a: 1 },
                loadOp: 'clear',
                storeOp: 'store',
            },
        ],
    });

    pass.setPipeline(pipeline);
    pass.setBindGroup(0, bindGroup);
    pass.draw(4);
    pass.end();

    const commandBuffer = encoder.finish();
    device.queue.submit([commandBuffer]);
}

export { renderFrame };
