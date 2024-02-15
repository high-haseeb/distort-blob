"use client";
import { Environment, PresentationControls, ScrollControls, useScroll } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useMemo, useRef } from "react";
import fragmentShader from "@/shaders/fragmentShader.glsl";
import vertexShader from "@/shaders/vertexShader.glsl";
import { MathUtils } from "three";

const Scene = () => {
  return (
    <Suspense fallback={<div className="w-screen h-screen bg-black flex items-center justify-center text-white text-9xl">Loading..</div>}>
      <Canvas className="bg-[#181818]">
        <Environment preset="dawn" />
        <ambientLight />

        <ScrollControls horizontal pages={3}>
          <Blob />
        </ScrollControls>

      </Canvas>
    </Suspense>
  );
};

export default Scene;
const Blob = () => {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  const hover = useRef(false);

  const uniforms = useMemo(
    () => ({
      u_intensity: {
        value: 0.3,
      },
      u_time: {
        value: 0.0,
      },
    }),
    [],
  );

  const data = useScroll();
  useFrame((state) => {
    const { clock } = state;
    mesh.current.material.uniforms.u_time.value = 0.4 * clock.getElapsedTime();
    mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
      mesh.current.material.uniforms.u_intensity.value,
      data.range(0, 1/3),
      0.02,
    );
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]} scale={1} onPointerOver={() => (hover.current = true)} onPointerOut={() => (hover.current = false)}>
      <icosahedronGeometry args={[2, 20]} />
      <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={uniforms} wireframe={false} />
    </mesh>
  );
};
