"use client";
import {  ScrollControls, useScroll } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useRef, useState } from "react";
import vertexPars from "@/shaders/vertex_pars.glsl";
import vertexMain from "@/shaders/vertex_main.glsl";
import fragmentPars from "@/shaders/fragment_pars.glsl";
import fragmentMain from "@/shaders/fragment_main.glsl";
import fragmentColors from "@/shaders/fragment_colors.glsl";
import { MathUtils } from "three";

const NUM_PAGES = 24;
const Scene = () => {
  const [bgColor, setBgColor] = useState("#BFEA7C");
  return (
    <Suspense fallback={<div className="w-screen h-screen bg-black flex items-center justify-center text-white text-9xl">Loading..</div>}>
      <Canvas style={{ backgroundColor: bgColor }} className="transition-colors duration-1000">
        <directionalLight intensity={0.6} position={[2, 2, 2]} />
        <ambientLight color={"white"} intensity={0.5} />
        <directionalLight intensity={0.4} position={[10, 10, 10]} />
        <directionalLight intensity={0.4} position={[-10, -10, -10]} />
        <directionalLight intensity={0.4} position={[0, 10, 3]} color={"pink"} />
        <directionalLight intensity={0.3} position={[-3, 0, 0]} color={"violet"} />
        <ScrollControls horizontal pages={NUM_PAGES}>
          <Blob setBgColor={setBgColor} />
        </ScrollControls>
      </Canvas>
    </Suspense>
  );
};

//
export default Scene;
const Blob = ({ setBgColor }) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  const hover = useRef(false);

  const materialRef = useRef();
  const data = useScroll();

  const colors = [
    "#BFEA7C",
    "#1B1A55",
    "#FFE4C9",
    "#9F70FD",
    "#436850",
    "#F3B95F",
    "#416D19",
    "#9290C3",
    "#FF8911",
    "#BED1CF",
    "#FBFADA",
    "#416D19",
    "#6895D2",
  ];

  useFrame((state) => {
    const { clock } = state;
    if (!materialRef.current.userData.shader) return;
    setBgColor(colors[Math.floor((data.range(0, 1) * NUM_PAGES) / 2)]);
    // updating the uniforms
    materialRef.current.userData.shader.uniforms.u_time.value = 0.4 * clock.getElapsedTime();
    materialRef.current.userData.shader.uniforms.u_intensity.value = MathUtils.lerp(
      materialRef.current.userData.shader.uniforms.u_intensity.value,
      (data.range(0, 1) * NUM_PAGES) / 2,
      0.5,
    );
    mesh.current.rotation.x = data.range(0, 1) * Math.PI * 2;
    mesh.current.rotation.y = data.range(0, 1) * Math.PI * 2;
  });

  return (
    <mesh
      ref={mesh}
      position={[0, 0, 0]}
      scale={1}
      onPointerOver={() => (hover.current = true)}
      onPointerOut={() => (hover.current = false)}
      castShadow
    >
      <icosahedronGeometry args={[2, 100]} />
      <meshPhysicalMaterial
        ref={materialRef}
        metalness={0.1}
        roughness={0.8}
        clearcoat={0.2}
        onBeforeCompile={(shader) => {
          // setting up the uniforms
          materialRef.current.userData.shader = shader;
          shader.uniforms.u_time = { value: 0.0 };
          shader.uniforms.u_intensity = { value: 0.3 };

          // injecting vertex and fragment shaders
          const parseVertexString = `#include <displacementmap_pars_vertex>`;
          const mainVertexString = `#include <displacementmap_vertex>`;
          shader.vertexShader = shader.vertexShader.replace(parseVertexString, parseVertexString + vertexPars);
          shader.vertexShader = shader.vertexShader.replace(mainVertexString, mainVertexString + vertexMain);

          const parseFragmentString = `#include <bumpmap_pars_fragment>`;
          const mainFragmentString = `vec4 diffuseColor = vec4( diffuse, opacity );`;
          shader.fragmentShader = shader.fragmentShader.replace(parseFragmentString, parseFragmentString + fragmentPars);
          shader.fragmentShader = shader.fragmentShader.replace(mainFragmentString, fragmentColors + fragmentMain);
          console.log(shader.fragmentShader);
        }}
      />
    </mesh>
  );
};
