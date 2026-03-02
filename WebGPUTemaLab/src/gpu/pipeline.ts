function createRenderPipeline(
    device: GPUDevice,
    canvasFormat: GPUTextureFormat,
    vertexCode: string,
    fragmentCode: string
): GPURenderPipeline {

    const vertexShaderModule = device.createShaderModule({
        code: vertexCode,
    });

    const fragmentShaderModule = device.createShaderModule({
        code: fragmentCode,
    });

    const pipeline = device.createRenderPipeline({
        label: 'Square render pipeline',
        layout: 'auto',
        vertex: {
            module: vertexShaderModule,
            entryPoint: 'main',
        },
        fragment: {
            module: fragmentShaderModule,
            entryPoint: 'main',
            targets: [
                {
                    format: canvasFormat,
                },
            ],
        },
        primitive: {
            topology: 'triangle-strip',
        },
    });

    return pipeline;
}

export { createRenderPipeline };
