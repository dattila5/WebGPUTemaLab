import { initWebGPU } from './gpu/init';
import { GPUPipelineManager } from './gpu/pipeline';
import { GPUBufferManager } from './gpu/buffer';
import { GPUTextureManager } from './gpu/texture';
import { Renderer } from './render/renderer';
import vertexShaderCode from './shaders/vertex.wgsl?raw';
import fragmentShaderCode from './shaders/fragment.wgsl?raw';
import { GameState } from './game/gameState';
import { LevelManager } from './game/levelManager';
import { UIManager } from './game/ui';
import { InputManager } from './input/keyboard';


async function main() {
  try {
    const { device, context, canvasFormat } = await initWebGPU();
    const bufferManager = new GPUBufferManager(device);
    const textureManager = new GPUTextureManager(device);
    const pipelineManager = new GPUPipelineManager(device, canvasFormat, vertexShaderCode, fragmentShaderCode);
    const pipeline = pipelineManager.getPipeline();
    const renderer = new Renderer(device, context, pipeline, bufferManager);
    const textures = {
      1: await textureManager.loadTexture('/textures/atlas1.png'),
      2: await textureManager.loadTexture('/textures/atlas2.png'),
      3: await textureManager.loadTexture('/textures/atlas3.png'),
    };
    const sampler = textureManager.createTextureSampler();

    GameState.getInstance();
    GameState.initializeGameObjects();
    LevelManager.loadLevel();
    UIManager.initialize();
    InputManager.initialize();

    const maxLevelLength = LevelManager.getMaxPlatformLength();
    const maxEnemyLength = LevelManager.getMaxEnemyLength();
    const positionBuffer = bufferManager.createPositionBuffer(1 + 1 + maxEnemyLength + maxLevelLength);
    const cameraBuffer = bufferManager.createCameraUniformBuffer();
    const indexBuffer = bufferManager.createIndexBuffer();

    let bindGroup = textureManager.createPositionBindGroup(pipeline, positionBuffer, cameraBuffer, textures[1], sampler);

    function gameLoop() {
      const newTexture = textures[GameState.currentLevel as 1 | 2 | 3];
      bindGroup = textureManager.createPositionBindGroup(pipeline, positionBuffer, cameraBuffer, newTexture, sampler);

      renderer.renderFrame(positionBuffer, cameraBuffer, indexBuffer, bindGroup);
      requestAnimationFrame(gameLoop);
    }

    gameLoop();

  } catch (error) {
    console.error('Error:', error);
  }
}

main();
