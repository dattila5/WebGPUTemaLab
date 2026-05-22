import { initWebGPU } from './gpu/init';
import { createRenderPipeline } from './gpu/pipeline';
import { createPositionBuffer, createCameraUniformBuffer, createPositionBindGroup, createIndexBuffer, createUVBuffer, loadTexture, createTextureSampler } from './gpu/buffer';
import { initKeyboardInput } from './input/keyboard';
import { renderFrame } from './render/renderer';
import vertexShaderCode from './shaders/vertex.wgsl?raw';
import fragmentShaderCode from './shaders/fragment.wgsl?raw';
import { easyLevel, mediumLevel, hardLevel } from './level/level';
import { easyLevelEnemies, mediumLevelEnemies, hardLevelEnemies } from './game/enemy';
import { currentLevel } from './game/gameState';

async function main() {
  try {
    const { device, context, canvasFormat } = await initWebGPU();
    console.log('WebGPU initialized!');

    const pipeline = createRenderPipeline(device, canvasFormat, vertexShaderCode, fragmentShaderCode);
    console.log('Pipeline created!');

    const textures = {
      1: await loadTexture(device, '/textures/atlas1.png'),
      2: await loadTexture(device, '/textures/atlas2.png'),
      3: await loadTexture(device, '/textures/atlas3.png'),
    };
    const sampler = createTextureSampler(device);
    console.log('Texture loaded!');

    const maxLevelLength = Math.max(easyLevel.length, mediumLevel.length, hardLevel.length);
    const maxEnemyLength = Math.max(easyLevelEnemies.length, mediumLevelEnemies.length, hardLevelEnemies.length);
    const positionBuffer = createPositionBuffer(device, 1 + 1 + maxEnemyLength + maxLevelLength);
    const cameraBuffer = createCameraUniformBuffer(device);
    const indexBuffer = createIndexBuffer(device);
    const uvBuffer = createUVBuffer(device);

    let bindGroup = createPositionBindGroup(device, pipeline, positionBuffer, cameraBuffer, textures[1], sampler);
    initKeyboardInput();

    function gameLoop() {
      const newTexture = textures[currentLevel as 1 | 2 | 3];
      bindGroup = createPositionBindGroup(device, pipeline, positionBuffer, cameraBuffer, newTexture, sampler);

      renderFrame(device, context, pipeline, positionBuffer, cameraBuffer, indexBuffer, uvBuffer, bindGroup);
      requestAnimationFrame(gameLoop);
    }

    gameLoop();

  } catch (error) {
    console.error('Error:', error);
  }
}

main();
