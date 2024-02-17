
vec3 resultColor = color[4];
if (u_intensity < 2.0) {
    resultColor = mix( color[0], color[1], u_intensity / 2.0);
} else if (u_intensity < 4.0) {
    resultColor = mix( color[1], color[2], (u_intensity - 2.0) / 2.0);
} else if (u_intensity < 6.0) {
    resultColor = mix( color[2], color[3], (u_intensity - 4.0) / 2.0);
} else if (u_intensity < 8.0) {
    resultColor = mix( color[3], color[4], (u_intensity - 6.0) / 2.0);
} else if (u_intensity <= 10.0) {
    resultColor = mix( color[4], color[5], (u_intensity - 8.0) / 2.0);
} else if (u_intensity <= 12.0) {
    resultColor = mix( color[5], color[1], (u_intensity - 10.0) / 2.0);
}
vec4 diffuseColor = vec4(resultColor, opacity );

