uniform float u_intensity;
uniform float u_time;

varying vec2 vUv;
varying float vDisplacement;

void main() {
  float distort = 2.0 * vDisplacement * u_intensity;
  vec3 baseColor = vec3(abs(vUv - vec2(0.5)) * 2.0, 0.5);
  vec3 color;
  if (u_intensity > 0.5) {
    color = mix(baseColor * vec3(1.0, 1.0, 0.0), baseColor * vec3(1.0, 0.0, 1.0), (u_intensity - 0.5) * 2.0);
  } else {
    color = mix(baseColor * vec3(1.0, 0.0, 1.0), baseColor * vec3(1.0, 1.0, 0.0), u_intensity * 2.0);
  }
  gl_FragColor = vec4(color * (1.0 - distort), 1.0);
}
