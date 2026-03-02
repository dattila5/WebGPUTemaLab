@vertex
fn main(@builtin(vertex_index) vertex_index: u32) -> @builtin(position) vec4<f32> {
    // Teszt négyzet középen
    var pos = array<vec2<f32>, 4>(
        vec2<f32>(-0.2, -0.2),
        vec2<f32>( 0.2, -0.2),
        vec2<f32>( 0.2,  0.2),
        vec2<f32>(-0.2,  0.2)
    );

    return vec4<f32>(pos[vertex_index], 0.0, 1.0);
}
