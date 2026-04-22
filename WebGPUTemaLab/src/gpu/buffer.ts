import type { GameObject } from '../core/gameObject';

export function createIndexBuffer(device: GPUDevice): GPUBuffer {
  const indices = new Uint32Array([0, 1, 2, 2, 3, 0]);

  const buffer = device.createBuffer({
    size: indices.byteLength,
    usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
    mappedAtCreation: true,
  });

  new Uint32Array(buffer.getMappedRange()).set(indices);
  buffer.unmap();

  return buffer;
}

export function createUVBuffer(device: GPUDevice): GPUBuffer {
  const uvCoords = new Float32Array([
    0.0, 1.0,
    1.0, 1.0,
    1.0, 0.0,
    0.0, 0.0,
  ]);

  const buffer = device.createBuffer({
    size: uvCoords.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    mappedAtCreation: true,
  });

  new Float32Array(buffer.getMappedRange()).set(uvCoords);
  buffer.unmap();

  return buffer;
}

export function createPositionBuffer(device: GPUDevice, objectCount: number): GPUBuffer {
  const bufferSize = objectCount * 32;

  return device.createBuffer({
    size: bufferSize,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    mappedAtCreation: false,
  });
}

export async function loadTexture(device: GPUDevice, imagePath: string): Promise<GPUTexture> {
  const response = await fetch(imagePath);
  const blob = await response.blob();
  const bitmap = await createImageBitmap(blob);

  const texture = device.createTexture({
    size: [bitmap.width, bitmap.height],
    format: 'rgba8unorm',
    usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT,
  });

  device.queue.copyExternalImageToTexture(
    { source: bitmap },
    { texture: texture },
    [bitmap.width, bitmap.height]
  );

  return texture;
}

export function createTextureSampler(device: GPUDevice): GPUSampler {
  return device.createSampler({
    magFilter: 'nearest',
    minFilter: 'nearest',
    addressModeU: 'repeat',
    addressModeV: 'repeat',
  });
}

export function createPositionBindGroup(
  device: GPUDevice,
  pipeline: GPURenderPipeline,
  positionBuffer: GPUBuffer,
  cameraBuffer: GPUBuffer,
  texture: GPUTexture,
  sampler: GPUSampler
): GPUBindGroup {
  return device.createBindGroup({
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

export function updateObjectBuffer(
  device: GPUDevice,
  buffer: GPUBuffer,
  objects: GameObject[]
): void {
  const data = new Float32Array(objects.length * 8);

  for (let i = 0; i < objects.length; i++) {
    const obj = objects[i];
    data[i * 8 + 0] = obj.x;
    data[i * 8 + 1] = obj.y;
    data[i * 8 + 2] = obj.width;
    data[i * 8 + 3] = obj.height;

    let typeCode = 0;
    if (obj.type === 'player') typeCode = 0;
    else if (obj.type === 'platform_grass') typeCode = 1;
    else if (obj.type === 'platform_dirt') typeCode = 2;
    else if (obj.type === 'platform_block') typeCode = 3;
    else if (obj.type === 'enemy') typeCode = 4;
    else if (obj.type === 'spike') typeCode = 5;
    else if (obj.type === 'flag_pole') typeCode = 6;
    else if (obj.type === 'flag') typeCode = 7;
    else if (obj.type === 'background') typeCode = 8;

    data[i * 8 + 4] = typeCode;
  }

  device.queue.writeBuffer(buffer, 0, data);
}

export function createCameraUniformBuffer(device: GPUDevice): GPUBuffer {
  return device.createBuffer({
    size: 16,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    mappedAtCreation: false,
  });
}

export function updateCameraUniformBuffer(
  device: GPUDevice,
  buffer: GPUBuffer,
  cameraX: number,
  offset: number
): void {
  const data = new Float32Array([cameraX, offset, 0, 0]);
  device.queue.writeBuffer(buffer, 0, data);
}
