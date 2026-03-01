// Vertex shader for rendering simple rectangles
layout(location = 0) in vec2 position;
layout(location = 1) in vec4 color;

layout(location = 0) out vec4 fragColor;

void main() {
    // Pass the color to the fragment shader
    fragColor = color;
    // Position the vertex
    gl_Position = vec4(position, 0.0, 1.0);
}

// Fragment shader for rendering simple rectangles
layout(location = 0) in vec4 fragColor;
layout(location = 0) out vec4 outColor;

void main() {
    // Set the output color
    outColor = fragColor;
}