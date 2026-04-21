struct ObjectData {
    position: vec4<f32>,
    object_type: f32,
    shape_type: f32,
};

struct CameraData {
    x: f32,
    offset: f32,
    _pad0: f32,
    _pad1: f32,
};

struct VertexOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) @interpolate(flat) object_type: u32,
    @location(1) uv: vec2<f32>,
};

@group(0) @binding(0) var<storage, read> objects: array<ObjectData>;
@group(0) @binding(1) var<uniform> camera: CameraData;

@vertex
fn main(
    @builtin(vertex_index) vertex_index: u32,
    @builtin(instance_index) instance_index: u32
) -> VertexOutput {
    let obj = objects[instance_index];
    let obj_type = u32(obj.object_type);
    let shape_type = u32(obj.shape_type);

    var vertex: vec2<f32>;
    var uv: vec2<f32>;

    if (shape_type == 1u) {
        var pos = array<vec2<f32>, 3>(
            vec2<f32>( 0.0,  0.5),
            vec2<f32>(-0.5, -0.5),
            vec2<f32>( 0.5, -0.5)
        );
        vertex = pos[vertex_index];
        uv = pos[vertex_index] + vec2<f32>(0.5, 0.5);
    } else {
        var pos = array<vec2<f32>, 4>(
            vec2<f32>(-0.5, -0.5),
            vec2<f32>( 0.5, -0.5),
            vec2<f32>( 0.5,  0.5),
            vec2<f32>(-0.5,  0.5)
        );
        vertex = pos[vertex_index];
        uv = pos[vertex_index] + vec2<f32>(0.5);
    }

    vertex.x *= obj.position.z;
    vertex.y *= obj.position.w;
    vertex += obj.position.xy;

    vertex.x = vertex.x - camera.x - camera.offset;

    let u_offset = f32(obj_type) / 9.0;
    let u_width = 1.0 / 9.0;

    uv.x = u_offset + (uv.x * u_width);
    uv.y = uv.y;

    return VertexOutput(
        vec4<f32>(vertex, 0.0, 1.0),
        obj_type,
        uv
    );
}
