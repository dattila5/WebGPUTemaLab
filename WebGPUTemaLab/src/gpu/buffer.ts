export function createPositionBuffer(device: GPUDevice): GPUBuffer {
    // Dummy buffer, nem használjuk egyelőre
    return device.createBuffer({
        size: 16,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });
}

export function createPositionBindGroup(
    device: GPUDevice,
    pipeline: GPURenderPipeline,
    positionBuffer: GPUBuffer
): GPUBindGroup {
    // Empty bind group (az 'auto' layout miatt működik)
    return device.createBindGroup({
        layout: pipeline.getBindGroupLayout(0),
        entries: [
            {
                binding: 0,
                resource: {
                    buffer: positionBuffer,
                },
            },
        ],
    });
}
