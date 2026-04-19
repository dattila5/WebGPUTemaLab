struct VertexOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) @interpolate(flat) object_type: u32,
    @location(1) uv: vec2<f32>,
};

fn hash(p: vec2<f32>) -> f32 {
    return fract(sin(dot(p, vec2<f32>(12.9898, 78.233))) * 43758.5453);
}

fn noise(p: vec2<f32>) -> f32 {
    let i = floor(p);
    let f = fract(p);
    let u = f * f * (3.0 - 2.0 * f);

    let a = hash(i);
    let b = hash(i + vec2<f32>(1.0, 0.0));
    let c = hash(i + vec2<f32>(0.0, 1.0));
    let d = hash(i + vec2<f32>(1.0, 1.0));

    let v0 = mix(a, b, u.x);
    let v1 = mix(c, d, u.x);
    return mix(v0, v1, u.y);
}

@fragment
fn main(input: VertexOutput) -> @location(0) vec4<f32> {
    var color = vec4<f32>(0.5, 0.5, 0.5, 1.0);

    if (input.object_type == 0u) {
        // Player - Minecraft Steve
        let px = input.uv.x;
        let py = input.uv.y;

        color = vec4<f32>(0.5, 0.5, 0.5, 1.0);

        if (py > 0.75) {
            color = vec4<f32>(1.0, 0.8, 0.6, 1.0);

            if (px > 0.29 && px < 0.42 && py > 0.82 && py < 0.90) {
                color = vec4<f32>(0.0, 0.0, 0.0, 1.0);
            }
            if (px > 0.58 && px < 0.72 && py > 0.82 && py < 0.90) {
                color = vec4<f32>(0.0, 0.0, 0.0, 1.0);
            }
        }
        else if (py > 0.4 && py <= 0.75) {
            color = vec4<f32>(0.2, 0.4, 0.8, 1.0);
        }
        else {
            color = vec4<f32>(0.4, 0.2, 0.1, 1.0);
            if (py < 0.1) {
                color = vec4<f32>(0.2, 0.1, 0.05, 1.0);
            }
        }
    }
    else if (input.object_type == 1u) {
        // Platform grass
        let n = noise(input.uv * 8.0);
        let base = vec4<f32>(0.05, 0.6, 0.0, 1.0);
        let detail = vec4<f32>(0.0, 0.5, 0.0, 1.0);
        color = mix(detail, base, n);

        let grass = step(0.7, noise(input.uv * 20.0 + vec2<f32>(100.0, 100.0)));
        color = mix(color, vec4<f32>(0.0, 0.4, 0.0, 1.0), grass * 0.4);
    }
    else if (input.object_type == 2u) {
        // Platform dirt
        let dirt_noise = noise(input.uv * 10.0);
        let base = mix(
            vec4<f32>(0.65, 0.375, 0.2, 1.0),
            vec4<f32>(0.6, 0.4, 0.25, 1.0),
            dirt_noise
        );

        let rocks = step(0.75, noise(input.uv * 20.0 + vec2<f32>(50.0, 50.0)));
        color = mix(base, vec4<f32>(0.3, 0.3, 0.3, 1.0), rocks * 0.4);
    }
    else if (input.object_type == 3u || input.object_type == 6u) {
        // Platform block + type 6
        let stone = noise(input.uv * 6.0);
        let cracks = step(0.85, noise(input.uv * 15.0));

        color = mix(
            vec4<f32>(0.5, 0.5, 0.55, 1.0),
            vec4<f32>(0.45, 0.45, 0.5, 1.0),
            stone
        );
        color = mix(color, vec4<f32>(0.2, 0.2, 0.2, 1.0), cracks * 0.4);
    }
    else if (input.object_type == 4u) {
        // Enemy
        let skin = noise(input.uv * 8.0);
        let spots = step(0.8, noise(input.uv * 12.0 + vec2<f32>(200.0, 200.0)));

        color = mix(
            vec4<f32>(0.2, 0.8, 0.2, 1.0),
            vec4<f32>(0.1, 0.6, 0.1, 1.0),
            skin
        );
        color = mix(color, vec4<f32>(0.3, 0.5, 0.1, 1.0), spots * 0.3);
    }
    else if (input.object_type == 5u) {
        // Spike
        let rust = noise(input.uv * 7.0);
        let ridges = step(0.9, noise(input.uv * 20.0));

        color = mix(
            vec4<f32>(0.4, 0.4, 0.4, 1.0),
            vec4<f32>(0.6, 0.4, 0.2, 1.0),
            rust
        );
        color = mix(color, vec4<f32>(0.2, 0.2, 0.2, 1.0), ridges * 0.5);
    }
    else {
        // Type 7 - Black & White checkerboard
        let check = i32(floor(input.uv.x * 4.0) + floor(input.uv.y * 4.0)) % 2;
        color = mix(
            vec4<f32>(0.0, 0.0, 0.0, 1.0),
            vec4<f32>(1.0, 1.0, 1.0, 1.0),
            f32(check)
        );
    }

    return color;
}
