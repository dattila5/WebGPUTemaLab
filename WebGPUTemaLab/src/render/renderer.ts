import { GPUBufferManager } from '../gpu/buffer';
import { GameState } from '../game/gameState';
import { LevelManager } from '../game/levelManager';
import { Background } from '../core/background';
import { GameManager } from '../game/gameManager';

export class Renderer {
  private device: GPUDevice;
  private context: GPUCanvasContext;
  private pipeline: GPURenderPipeline;
  private bufferManager: GPUBufferManager;

   /**
   * renderer konstruktora
   * @param device - gpu eszkoz
   * @param context - rendereles cel
   * @param pipeline - pipeline
   * @param bufferManager - buffer menedzselo
   */
  constructor(
    device: GPUDevice,
    context: GPUCanvasContext,
    pipeline: GPURenderPipeline,
    bufferManager: GPUBufferManager
  ) {
    this.device = device;
    this.context = context;
    this.pipeline = pipeline;
    this.bufferManager = bufferManager;
  }

   /**
   * egy frame renderelese
   * @param positionBuffer - pozicio buffer
   * @param cameraBuffer - kamera buffer
   * @param indexBuffer - index buffer
   * @param bindGroup - bindgroup
   */
  renderFrame(
    positionBuffer: GPUBuffer,
    cameraBuffer: GPUBuffer,
    indexBuffer: GPUBuffer,
    bindGroup: GPUBindGroup
  ): void {

    GameManager.update();

    const backgroundObject = new Background();
    const platformObjects = LevelManager.getPlatforms();

    const allObjects = [backgroundObject, GameState.player, ...GameState.enemies, ...platformObjects];

    this.bufferManager.updateObjectBuffer(positionBuffer, allObjects);
    this.bufferManager.updateCameraUniformBuffer(cameraBuffer, GameState.camera.x, GameState.camera.offset);

    const encoder = this.device.createCommandEncoder();
    const pass = encoder.beginRenderPass({
      colorAttachments: [
        {
          view: this.context.getCurrentTexture().createView(),
          loadOp: 'clear',
          storeOp: 'store',
        },
      ],
    });

    pass.setPipeline(this.pipeline);
    pass.setBindGroup(0, bindGroup);
    pass.setIndexBuffer(indexBuffer, 'uint32');
    pass.drawIndexed(6, allObjects.length, 0, 0, 0);
    pass.end();
    const commandBuffer = encoder.finish();
    this.device.queue.submit([commandBuffer]);
  }
}
