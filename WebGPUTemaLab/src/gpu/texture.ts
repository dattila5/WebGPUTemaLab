export class GPUTextureManager {
  private device: GPUDevice;

  constructor(device: GPUDevice) {
    this.device = device;
  }

  async loadTexture(imagePath: string): Promise<GPUTexture> {
    const response = await fetch(imagePath);
    const blob = await response.blob();
    const bitmap = await createImageBitmap(blob);

    const texture = this.device.createTexture({
      size: [bitmap.width, bitmap.height],
      format: 'rgba8unorm',
      usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST |  GPUTextureUsage.RENDER_ATTACHMENT,
    });

    this.device.queue.copyExternalImageToTexture(
      { source: bitmap },
      { texture: texture },
      [bitmap.width, bitmap.height]
    );
    return texture;
  }

  createTextureSampler(): GPUSampler {
    return this.device.createSampler({
      magFilter: 'nearest',
      minFilter: 'nearest',
      addressModeU: 'repeat',
      addressModeV: 'repeat',
    });
  }

  createPositionBindGroup(
    pipeline: GPURenderPipeline,
    positionBuffer: GPUBuffer,
    cameraBuffer: GPUBuffer,
    texture: GPUTexture,
    sampler: GPUSampler
  ): GPUBindGroup {
    return this.device.createBindGroup({
      layout: pipeline.getBindGroupLayout(0),
      entries: [
        {
          binding: 0,
          resource: { buffer: positionBuffer },
        },
        {
          binding: 1,
          resource: { buffer: cameraBuffer },
        },
        {
          binding: 2,
          resource: texture.createView(),
        },
        {
          binding: 3,
          resource: sampler,
        },
      ],
    });
  }
}
