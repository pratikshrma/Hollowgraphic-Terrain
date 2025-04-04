varying float vElevation;
uniform sampler2D uTexture;

void main() {
    vec4 textureColor = texture2D(uTexture, vec2(0.0, vElevation * -20.0));
    // float elevation = vElevation + 0.5;
    // float alpha = mod(vElevation * 10.0, 1.0);
    // alpha = step(0.95, alpha);
    // gl_FragColor = vec4(elevation, elevation, elevation, alpha);
    gl_FragColor = textureColor * 0.9;
}