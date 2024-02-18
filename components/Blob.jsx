"use client";
import { Environment, ScrollControls, useScroll, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
import vertexPars from "@/shaders/vertex_pars.glsl";
import vertexMain from "@/shaders/vertex_main.glsl";
import fragmentPars from "@/shaders/fragment_pars.glsl";
import fragmentMain from "@/shaders/fragment_main.glsl";
import { MathUtils } from "three";

const NUM_PAGES = 24;
const Scene = () => {
  const [bgColor, setBgColor] = useState("#BFEA7C");
  return (
    <Suspense fallback={<div className="w-screen h-screen bg-black flex items-center justify-center text-white text-9xl">Loading..</div>}>
      <Canvas style={{ backgroundColor: bgColor }} className="transition-colors duration-1000">
        <Environment preset="city" />
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
    "#FDCF8A",
    "#7600F0",
    "#380B16",
    "#8FD8A5",
    "#536C9B",
    "#F186B7",
    "#657174",
    "#371B53",
    "#042A2A",
    "#FDB38A",
    "#99AAE6",
    "#523EA4",
    "#75BCC6",
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
    const scroll = data.range(0, 1) * NUM_PAGES;

    if (scroll <= 2 && scroll > 0) {
      setTexture("/media/03_gradient-secondary.1d6af076.png");
    } else if (scroll <= 4 && scroll > 2) {
      setRoughness(0.8);
      setMetallness(0.1);
      setClearCoat(0.1);
      setTexture("/media/02_gradient-primary-variation.b581b4bf.png");
    } else if (scroll <= 6 && scroll > 4) {
      setRoughness(0.3);
      setMetallness(0.1);
      setClearCoat(0.1);
      setTexture("/media/09_sunset-vibes.059f54a6.png");
    } else if (scroll <= 8 && scroll > 6) {
      setRoughness(0.3);
      setMetallness(0.7);
      setClearCoat(0.2);
      setTexture("/media/08_lucky-day.417fad6f.png");
    } else if (scroll <= 10 && scroll > 8) {
      setRoughness(0.8);
      setMetallness(0.1);
      setClearCoat(0.2);
      setTexture("/media/07_deep-ocean.4d28da9d.png");
    } else if (scroll <= 12 && scroll > 10) {
      setTexture("/media/06_cosmic-fusion.c57d060d.png");
    } else if (scroll <= 14 && scroll > 12) {
      setTexture("/media/05_gradient-alert.f5301ac2.png");
    } else if (scroll <= 16 && scroll > 14) {
      setRoughness(1);
      setMetallness(0.1);
      setClearCoat(0.0);
      setTexture("/media/04_gradient-error.7f52eea7.png");
    } else if (scroll <= 18 && scroll > 16) {
      setRoughness(0.8);
      setMetallness(0.1);
      setClearCoat(0.2);
      setTexture("/media/03_gradient-secondary.1d6af076.png");
    } else if (scroll <= 20 && scroll > 18) {

      setRoughness(0.4);
      setMetallness(0.8);
      setClearCoat(0.1);
      setTexture("/media/02_gradient-primary-variation.b581b4bf.png");
    } else if (scroll <= 22 && scroll > 20) {

      setRoughness(0.8);
      setMetallness(0.2);
      setClearCoat(0.1);
      setTexture("/media/09_sunset-vibes.059f54a6.png");
    } else if (scroll <= 24 && scroll > 22) {
      setTexture("/media/07_deep-ocean.4d28da9d.png");
    }
  });
  const [texturePath, setTexture] = useState("/media/03_gradient-secondary.1d6af076.png");
  let texture = useTexture(texturePath);
  const [metallness, setMetallness] = useState(0.1);
  const [roughness, setRoughness] = useState(0.8);
  const [clearCoat, setClearCoat] = useState(0.2);
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
        map={texture}
        metalness={metallness}
        roughness={roughness}
        clearcoat={clearCoat}
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
          shader.fragmentShader = shader.fragmentShader.replace(mainFragmentString,  fragmentMain);
          // console.log(shader.fragmentShader);
        }}
      />
    </mesh>
  );
};
