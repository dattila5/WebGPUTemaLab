export function createRenderPipeline(
  device: GPUDevice,
  canvasFormat: GPUTextureFormat,
  vertexShaderCode: string,
  fragmentShaderCode: string
): GPURenderPipeline {
  const vertexShaderModule = device.createShaderModule({
    code: vertexShaderCode,
  });

  const fragmentShaderModule = device.createShaderModule({
    code: fragmentShaderCode,
  });

  const bindGroupLayout = device.createBindGroupLayout({
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
        sampler: {
          type: 'filtering',
        },
      },
    ],
  });

  const pipelineLayout = device.createPipelineLayout({
    bindGroupLayouts: [bindGroupLayout],
  });

  return device.createRenderPipeline({
    layout: pipelineLayout,
    vertex: {
      module: vertexShaderModule,
      entryPoint: 'main',
      buffers: [
        {
          arrayStride: 8,
          attributes: [
            {
              shaderLocation: 0,
              offset: 0,
              format: 'float32x2',
            },
          ],
        },
      ],
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
