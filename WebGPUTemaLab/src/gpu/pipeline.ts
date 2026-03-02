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
