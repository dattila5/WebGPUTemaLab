struct VertexOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) @interpolate(flat) instance_id: u32,
};

@fragment
fn main(input: VertexOutput) -> @location(0) vec4<f32> {
    if (input.instance_id == 0u) {
        return vec4<f32>(1.0, 0.0, 0.0, 1.0);  // Piros player
    } else {
        return vec4<f32>(0.5, 0.5, 0.5, 1.0);  // Szürke platformok
    }
}
