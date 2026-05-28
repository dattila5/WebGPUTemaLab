import type { GameObject } from '../core/gameObject';

export class GPUBufferManager {
  private device: GPUDevice;

  constructor(device: GPUDevice) {
    this.device = device;
  }

  createIndexBuffer(): GPUBuffer {
    const indices = new Uint32Array([0, 1, 2, 2, 3, 0]);

    const buffer = this.device.createBuffer({
      size: indices.byteLength,
      usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
      mappedAtCreation: true,
    });

    new Uint32Array(buffer.getMappedRange()).set(indices);
    buffer.unmap();

    return buffer;
  }

  createPositionBuffer(objectCount: number): GPUBuffer {
    const bufferSize = objectCount * 32;

    return this.device.createBuffer({
      size: bufferSize,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
      mappedAtCreation: false,
    });
  }

  createCameraUniformBuffer(): GPUBuffer {
    return this.device.createBuffer({
      size: 16,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      mappedAtCreation: false,
    });
  }

  updateObjectBuffer(buffer: GPUBuffer, objects: GameObject[]): void {
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

    this.device.queue.writeBuffer(buffer, 0, data);
  }

  updateCameraUniformBuffer(buffer: GPUBuffer, cameraX: number, offset: number): void {
    const data = new Float32Array([cameraX, offset, 0, 0]);
    this.device.queue.writeBuffer(buffer, 0, data);
  }
}
