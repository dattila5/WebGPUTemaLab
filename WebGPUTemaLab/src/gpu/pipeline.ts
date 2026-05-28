export class GPUPipelineManager {
  private device: GPUDevice;
  private pipeline: GPURenderPipeline;

  constructor(
    device: GPUDevice,
    canvasFormat: GPUTextureFormat,
    vertexShaderCode: string,
    fragmentShaderCode: string
  ) {
    this.device = device;
    this.pipeline = this.createRenderPipeline(canvasFormat, vertexShaderCode, fragmentShaderCode);
  }

  private createRenderPipeline(
    canvasFormat: GPUTextureFormat,
    vertexShaderCode: string,
    fragmentShaderCode: string
  ): GPURenderPipeline {
    const vertexShaderModule = this.device.createShaderModule({
      code: vertexShaderCode,
    });

    const fragmentShaderModule = this.device.createShaderModule({
      code: fragmentShaderCode,
    });

    const bindGroupLayout = this.device.createBindGroupLayout({
      entries: [
        {
          binding: 0,
          visibility: GPUShaderStage.VERTEX,
          buffer: { type: 'read-only-storage' },
        },
        {
          binding: 1,
          visibility: GPUShaderStage.VERTEX,
          buffer: { type: 'uniform' },
        },
        {
          binding: 2,
          visibility: GPUShaderStage.FRAGMENT,
          texture: {
            sampleType: 'float',
            viewDimension: '2d',
          },
        },
        {
          binding: 3,
          visibility: GPUShaderStage.FRAGMENT,
          sampler: { type: 'filtering' },
        },
      ],
    });

    const pipelineLayout = this.device.createPipelineLayout({
      bindGroupLayouts: [bindGroupLayout],
    });

    return this.device.createRenderPipeline({
      layout: pipelineLayout,
      vertex: {
        module: vertexShaderModule,
        entryPoint: 'main',
      },
      fragment: {
        module: fragmentShaderModule,
        entryPoint: 'main',
        targets: [{ format: canvasFormat }],
      },
      primitive: {
        topology: 'triangle-list',
      },
    });
  }

  getPipeline(): GPURenderPipeline {
    return this.pipeline;
  }
}
