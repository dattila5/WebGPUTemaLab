import { initWebGPU } from './gpu/init';
import { createRenderPipeline } from './gpu/pipeline';
import { createPositionBuffer, createCameraUniformBuffer, createPositionBindGroup, createIndexBuffer, loadTexture, createTextureSampler } from './gpu/buffer';
import { renderFrame } from './render/renderer';
import vertexShaderCode from './shaders/vertex.wgsl?raw';
import fragmentShaderCode from './shaders/fragment.wgsl?raw';
import { GameState } from './game/gameState';
import { LevelManager } from './game/levelManager';
import { GameManager } from './game/gameManager';
import { UIManager } from './game/ui';
import { InputManager } from './input/keyboard';


async function main() {
  try {
    const { device, context, canvasFormat } = await initWebGPU();
    const pipeline = createRenderPipeline(device, canvasFormat, vertexShaderCode, fragmentShaderCode);
    const textures = {
      1: await loadTexture(device, '/textures/atlas1.png'),
      2: await loadTexture(device, '/textures/atlas2.png'),
      3: await loadTexture(device, '/textures/atlas3.png'),
    };
    const sampler = createTextureSampler(device);

    GameState.getInstance();
    GameState.initializeGameObjects();
    LevelManager.loadLevel();
    UIManager.initialize();
    InputManager.initialize();

    const maxLevelLength = LevelManager.getMaxPlatformLength();
    const maxEnemyLength = LevelManager.getMaxEnemyLength();
    const positionBuffer = createPositionBuffer(device, 1 + 1 + maxEnemyLength + maxLevelLength);
    const cameraBuffer = createCameraUniformBuffer(device);
    const indexBuffer = createIndexBuffer(device);

    let bindGroup = createPositionBindGroup(device, pipeline, positionBuffer, cameraBuffer, textures[1], sampler);

    function gameLoop() {
      GameManager.update();

      const newTexture = textures[GameState.currentLevel as 1 | 2 | 3];
      bindGroup = createPositionBindGroup(device, pipeline, positionBuffer, cameraBuffer, newTexture, sampler);

      renderFrame(device, context, pipeline, positionBuffer, cameraBuffer, indexBuffer, bindGroup);
      requestAnimationFrame(gameLoop);
    }

    gameLoop();

  } catch (error) {
    console.error('Error:', error);
  }
}

main();
