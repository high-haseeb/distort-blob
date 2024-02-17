  
  varUv = uv;
  vec3 coords = normal;
  coords.y += u_time * 0.5; 
  coords.x += u_time * 0.5; 
  vec3 noisePattern = vec3(cnoise(coords));

  float pattern;
  if(u_intensity  < 2.0){
    pattern = mix(wave(coords.y), wave(noisePattern.y), u_intensity / 2.0 );
  } else if (u_intensity < 4.0) {
      pattern = mix(wave(noisePattern.y), cnoise(coords), (u_intensity - 2.0) / 2.0);
  } else if (u_intensity < 6.0) {
      pattern = mix(cnoise(coords),wave(coords.x + coords.y), (u_intensity - 4.0) / 2.0);
  } else if (u_intensity < 8.0) {
      pattern = mix(wave(coords.x + coords.y), wave(noisePattern.y + coords.y), (u_intensity - 6.0) / 2.0);
  } else if (u_intensity < 10.0) {
      pattern = mix(wave(noisePattern.y + coords.y), cnoise(coords * 1.3), (u_intensity - 8.0) / 2.0);
  } else if (u_intensity <= 12.0) {
      pattern = mix(cnoise(coords * 1.3), wave(coords.x + noisePattern.y), (u_intensity - 10.0) / 2.0);
  } 
  vDisplacement = pattern;
  vec3 newPosition = position + normal * pattern * 0.5; 
  transformed = newPosition;
