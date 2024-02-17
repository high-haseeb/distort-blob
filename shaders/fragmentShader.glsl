uniform float u_intensity;
uniform float u_time;

varying vec2 vUv;
varying float vDisplacement;
varying vec3 vNormal;

void main() {

gl_FragColor = linearToOutputTexel( gl_FragColor );
  // gl_FragColor = vec4(vec3(vDisplacement), 1.0);
}
