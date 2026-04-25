struct VertexOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) @interpolate(flat) object_type: u32,
    @location(1) uv: vec2<f32>,
};

@group(0) @binding(2) var texture: texture_2d<f32>;
@group(0) @binding(3) var textureSampler: sampler;

@fragment
fn main(input: VertexOutput) -> @location(0) vec4<f32> {
    var uv = input.uv;
    uv.y = 1.0 - uv.y;

    let obj_type = input.object_type;
    let u_offset = f32(obj_type) / 9.0;
    let u_width = 1.0 / 9.0;

    var repeat_count = 9.0;

    if (obj_type == 1u) {
        repeat_count = 115.0;
    } else if(obj_type == 2u) {
        repeat_count = 150.0;
    } else if(obj_type == 3u) {
        repeat_count = 30.0;
    } else if(obj_type == 7u) {
        repeat_count = 9.0;
    } else if(obj_type == 8u) {
        repeat_count = 50.0;
    }

    let fracted = fract(uv.x * repeat_count);
    uv.x = u_offset + clamp(fracted, 0.001, 0.999) * u_width;

    var color = textureSample(texture, textureSampler, uv);
    if (color.a < 0.5) {
        discard;
    }

    return color;
}
