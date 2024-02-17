
 vec3 rainbowColors[7];
        rainbowColors[0] = vec3(1.0, 0.0, 0.0); // Red
        rainbowColors[1] = vec3(1.0, 0.5, 0.0); // Orange
        rainbowColors[2] = vec3(1.0, 1.0, 0.0); // Yellow
        rainbowColors[3] = vec3(0.0, 1.0, 0.0); // Green
        rainbowColors[4] = vec3(0.0, 0.0, 1.0); // Blue
        rainbowColors[5] = vec3(0.3, 0.0, 0.51); // Indigo
        rainbowColors[6] = vec3(0.93, 0.51, 0.93); // Violet

 vec3 playfulColors[16];
        playfulColors[0] = vec3(1.0, 0.0, 1.0);      // Magenta
       playfulColors[1] = vec3(0.5, 0.5, 0.5);      // Gray
       playfulColors[2] = vec3(0.0, 1.0, 1.0);      // Cyan
       playfulColors[3] = vec3(1.0, 0.5, 0.5);     // Pink
       playfulColors[4] = vec3(0.5, 1.0, 0.5);     // Lime Green
       playfulColors[5] = vec3(0.0, 0.5, 0.5);     // Teal
       playfulColors[6] = vec3(0.5, 0.0, 0.5);     // Purple
       playfulColors[7] = vec3(0.9, 0.7, 0.1);     // Gold
       playfulColors[8] = vec3(0.6, 0.2, 0.2);     // Maroon
        playfulColors[9]  =vec3(1.0, 0.0, 0.0); // Red
        playfulColors[10] = vec3(1.0, 0.5, 0.0); // Orange
        playfulColors[11] = vec3(1.0, 1.0, 0.0); // Yellow
        playfulColors[12] = vec3(0.0, 1.0, 0.0); // Green
        playfulColors[13] = vec3(0.0, 0.0, 1.0); // Blue
        playfulColors[14] = vec3(0.3, 0.0, 0.51); // Indigo
        playfulColors[15] = vec3(0.93, 0.51, 0.93); // Violet

vec3 metallicColor1 = vec3(0.8, 0.8, 0.8); // Metallic color 1
vec3 metallicColor2 = vec3(0.7, 0.7, 0.7); // Metallic color 2

 // vec3 resultColor = mix4(rainbowColors[1], rainbowColors[5], rainbowColors[2], rainbowColors[3], vec2(vDisplacement, varUv.y));
 vec3 resultColor;
if (u_intensity < 2.0) {
    resultColor = mix(
        mix(playfulColors[3], playfulColors[4], vDisplacement),
        mix(playfulColors[7], playfulColors[6], vDisplacement),
        u_intensity / 2.0);
} else if (u_intensity < 4.0) {
    resultColor = mix(
        mix(playfulColors[7], playfulColors[6], vDisplacement),
        mix4(rainbowColors[1], rainbowColors[5], rainbowColors[2], rainbowColors[3], vec2(vDisplacement, varUv.y)),
        (u_intensity - 2.0) / 2.0);
} else if (u_intensity < 6.0) {
    resultColor = mix(
        mix4(rainbowColors[1], rainbowColors[5], rainbowColors[2], rainbowColors[3], vec2(vDisplacement, varUv.y)),
        mix(playfulColors[8], playfulColors[3], vDisplacement),
        (u_intensity - 4.0) / 2.0);
} else if (u_intensity < 8.0) {
    resultColor = mix(
        mix(playfulColors[8], playfulColors[3], vDisplacement),
        mix(playfulColors[9], playfulColors[10], vDisplacement),
        (u_intensity - 6.0) / 2.0);
} else if (u_intensity <= 10.0) {
    resultColor = mix(
        mix(playfulColors[9], playfulColors[10], vDisplacement),
        mix(metallicColor1, metallicColor2, vDisplacement),
        (u_intensity - 8.0) / 2.0);
} else if (u_intensity <= 12.0) {
    resultColor = mix(
        mix(metallicColor1, metallicColor2, vDisplacement),
        mix(metallicColor2, metallicColor1, vDisplacement),
        (u_intensity - 12.0) / 2.0);
}

    vec4 diffuseColor = vec4(resultColor, opacity );

