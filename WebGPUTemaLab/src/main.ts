import { initWebGPU } from './gpu/init';
import { createRenderPipeline } from './gpu/pipeline';
import { createPositionBuffer, createCameraUniformBuffer, createPositionBindGroup, createIndexBuffer, createUVBuffer, loadTexture, createTextureSampler } from './gpu/buffer';
import { initKeyboardInput } from './input/keyboard';
import { renderFrame } from './render/renderer';
import vertexShaderCode from './shaders/vertex.wgsl?raw';
import fragmentShaderCode from './shaders/fragment.wgsl?raw';
import { easyLevel } from './level/level';
import { enemies } from './game/enemy';
import { currentLevel } from './game/gameState';

async function main() {
  try {
    const { device, context, canvasFormat } = await initWebGPU();
    console.log('WebGPU initialized!');

    const pipeline = createRenderPipeline(device, canvasFormat, vertexShaderCode, fragmentShaderCode);
    console.log('Pipeline created!');

    const texture = await loadTexture(device, `/textures/atlas${currentLevel}.png`);
    const sampler = createTextureSampler(device);
    console.log('Texture loaded!');

    const positionBuffer = createPositionBuffer(device, 1 + 1 + enemies.length + easyLevel.length);
    const cameraBuffer = createCameraUniformBuffer(device);
    const indexBuffer = createIndexBuffer(device);
    const uvBuffer = createUVBuffer(device);

    const bindGroup = createPositionBindGroup(device, pipeline, positionBuffer, cameraBuffer, texture, sampler);
    initKeyboardInput();

    function gameLoop() {
      renderFrame(device, context, pipeline, positionBuffer, cameraBuffer, indexBuffer, uvBuffer, bindGroup);
      requestAnimationFrame(gameLoop);
    }

    gameLoop();

  } catch (error) {
    console.error('Error:', error);
  }
}

main();
