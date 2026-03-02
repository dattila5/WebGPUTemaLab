struct ObjectData {
    position: vec4<f32>,
};

struct CameraData {
    x: f32,
    offset: f32,
    _pad0: f32,
    _pad1: f32,
};

@group(0) @binding(0) var<storage, read> objects: array<ObjectData>;
@group(0) @binding(1) var<uniform> camera: CameraData;

@vertex
fn main(
    @builtin(vertex_index) vertex_index: u32,
    @builtin(instance_index) instance_index: u32
) -> @builtin(position) vec4<f32> {
    var pos = array<vec2<f32>, 4>(
        vec2<f32>(-0.5, -0.5),
        vec2<f32>( 0.5, -0.5),
        vec2<f32>( 0.5,  0.5),
        vec2<f32>(-0.5,  0.5)
    );

    var vertex = pos[vertex_index];
    let obj = objects[instance_index];

    vertex.x *= obj.position.z;
    vertex.y *= obj.position.w;
    vertex += obj.position.xy;

    vertex.x = vertex.x - camera.x - camera.offset;

    return vec4<f32>(vertex, 0.0, 1.0);
}
