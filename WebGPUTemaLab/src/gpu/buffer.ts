// Pozíció buffer létrehozása
function createPositionBuffer(device: GPUDevice): GPUBuffer {
    const buffer = device.createBuffer({
        label: 'Square position buffer',
        size: 8,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        mappedAtCreation: true,
    });

    new Float32Array(buffer.getMappedRange()).set([0, 0]);
    buffer.unmap();

    return buffer;
}

// Bind group létrehozása
function createPositionBindGroup(
    device: GPUDevice,
    pipeline: GPURenderPipeline,
    positionBuffer: GPUBuffer
): GPUBindGroup {
    const bindGroup = device.createBindGroup({
        label: 'Position bind group',
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

    return bindGroup;
}

export { createPositionBuffer, createPositionBindGroup };
