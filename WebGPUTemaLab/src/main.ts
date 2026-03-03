import { initWebGPU } from './gpu/init';
import { createRenderPipeline } from './gpu/pipeline';
import { createPositionBuffer, createCameraUniformBuffer, createPositionBindGroup, createIndexBuffer } from './gpu/buffer';
import { initKeyboardInput } from './input/keyboard';
import { renderFrame } from './render/renderer';
import vertexShaderCode from './shaders/vertex.wgsl?raw';
import fragmentShaderCode from './shaders/fragment.wgsl?raw';
import { level1 } from './level/level';

async function main() {
  try {
    const { device, context, canvasFormat } = await initWebGPU();
    console.log('WebGPU initialized!');

    const pipeline = createRenderPipeline(device, canvasFormat, vertexShaderCode, fragmentShaderCode);
    console.log('Pipeline created!');

    const positionBuffer = createPositionBuffer(device, 1 + level1.length);
    const cameraBuffer = createCameraUniformBuffer(device);
    const indexBuffer = createIndexBuffer(device);
    const bindGroup = createPositionBindGroup(device, pipeline, positionBuffer, cameraBuffer);

    initKeyboardInput();

    function gameLoop() {
      renderFrame(device, context, pipeline, positionBuffer, cameraBuffer, indexBuffer, bindGroup);
      requestAnimationFrame(gameLoop);
    }

    gameLoop();

  } catch (error) {
    console.error('Error:', error);
  }
}

main();
