precision highp float;
varying vec2 vUv;
varying float vWave;
varying float t;
uniform float uTime;
#pragma glslify: snoise = require(glsl-noise/simplex/3d)

/*void main() {
    vUv = uv;

    vec3 pos = position;
    float noiseFreq = 1.;
    float noiseAmp = 0.15;

    vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);

    pos.z += snoise(noisePos) * noiseAmp;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}*/


void main() {
    vUv = uv;
    t = uTime;

    vec3 pos = position;
    float noiseFreq = 3.5;
    float noiseAmp = 0.05;
    vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
    pos.z += snoise(noisePos) * noiseAmp;
    vWave = pos.z; // Off it goes!

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}
