struct VertexOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) @interpolate(flat) object_type: u32,
};

@fragment
fn main(input: VertexOutput) -> @location(0) vec4<f32> {
    if (input.object_type == 0u) {
        return vec4<f32>(1.0, 0.0, 0.0, 1.0);  // Piros - player
    } else if (input.object_type == 1u) {
        return vec4<f32>(0.0, 0.8, 0.0, 1.0);  // Zöld - platform_grass
    } else if (input.object_type == 2u) {
        return vec4<f32>(0.6, 0.4, 0.2, 1.0);  // Barna - platform_dirt
    } else if (input.object_type == 3u) {
        return vec4<f32>(1.0, 0.6, 0.0, 1.0);  // Narancs - platform_block
    } else {
        return vec4<f32>(0.5, 0.5, 0.5, 1.0);  // Szürke - default
    }
}
