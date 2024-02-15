"use client";
import { Environment, MeshWobbleMaterial, PresentationControls, Stars, Sphere } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useMemo, useEffect, useRef } from "react";
import fragmentShader from "@/shaders/fragmentShader.glsl";
import vertexShader from "@/shaders/vertexShader.glsl";
import { MathUtils } from "three";

const Scene = () => {
  return (
    <Suspense fallback={<div className="w-screen h-screen bg-black flex items-center justify-center text-white text-9xl">Loading..</div>}>
      <Canvas className="bg-black">
        <Environment preset="dawn" />
        <ambientLight />
        <PresentationControls>
          <Blob />
        </PresentationControls>
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

  useFrame((state) => {
    const { clock } = state;
    mesh.current.material.uniforms.u_time.value = 0.4 * clock.getElapsedTime();

    mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
      mesh.current.material.uniforms.u_intensity.value,
      hover.current ? 0.85 : 0.15,
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
