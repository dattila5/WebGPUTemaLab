async function initWebGPU() {
  if (!navigator.gpu) {
    throw Error("WebGPU not supported.");
  }

  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) {
    throw Error("Couldn't request WebGPU adapter.");
  }

  const device = await adapter.requestDevice();

  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  if (!canvas) {
    throw new Error('Canvas element not found');
  }

  const context = canvas.getContext('webgpu') as GPUCanvasContext;
  if (!context) {
    throw new Error('WebGPU context not supported');
  }

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const canvasFormat = navigator.gpu!.getPreferredCanvasFormat();
  context.configure({
    device,
    format: canvasFormat,
  });

  return { device, context, canvasFormat };
}

export { initWebGPU };
