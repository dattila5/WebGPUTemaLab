@group(0) @binding(0) var<uniform> squarePos: vec2<f32>;

@vertex
fn main(@builtin(vertex_index) index: u32) -> @builtin(position) vec4<f32> {
    var pos = array<vec2<f32>, 4>(
        vec2<f32>(-0.05, -0.1),
        vec2<f32>( 0.05, -0.1),
        vec2<f32>(-0.05,  0.1),
        vec2<f32>( 0.05,  0.1)
    );

    let finalPos = pos[index] + squarePos;
    return vec4<f32>(finalPos, 0.0, 1.0);
}
