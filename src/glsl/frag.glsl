precision highp float;
varying vec2 vUv;
varying float vWave;
varying float t;
uniform sampler2D uTexture;

/*void main() {
    vec3 texture = texture2D(uTexture, vUv).rgb;
    gl_FragColor = vec4(texture, 1.);
}*/

/*void main() {
    float wave = vWave * 0.2;
    vec3 texture = texture2D(uTexture, vUv + wave).rgb;
    gl_FragColor = vec4(texture, 1.);
}*/

void main() {
    float wave = vWave * 0.5;
    // Split each texture color vector
    float r = texture2D(uTexture, vUv).r;
    float g = texture2D(uTexture, vUv + wave).g;
    float b = texture2D(uTexture, vUv).b;
    // Put them back together
    vec3 texture = vec3(r, g, b);
    gl_FragColor = vec4(texture, 1.);
}
