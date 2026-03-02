import { initWebGPU } from './gpu/init';
import { createRenderPipeline } from './gpu/pipeline';
import { createPositionBuffer, createPositionBindGroup } from './gpu/buffer';
import { initKeyboardInput } from './input/keyboard';
import { renderFrame } from './render/renderer';
import vertexShaderCode from './shaders/vertex.wgsl?raw';
import fragmentShaderCode from './shaders/fragment.wgsl?raw';

async function main() {
    try {
        const { device, context, canvasFormat } = await initWebGPU();
        console.log('WebGPU initialized!');

        const pipeline = createRenderPipeline(device, canvasFormat, vertexShaderCode, fragmentShaderCode);
        console.log('Pipeline created!');

        const positionBuffer = createPositionBuffer(device);
        const bindGroup = createPositionBindGroup(device, pipeline, positionBuffer);

        initKeyboardInput();

        function gameLoop() {
            renderFrame(device, context, pipeline, positionBuffer, bindGroup);
            requestAnimationFrame(gameLoop);
        }

        gameLoop();

    } catch (error) {
        console.error('Error:', error);
    }
}

main();
