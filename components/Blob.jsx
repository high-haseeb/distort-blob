"use client";
import {
  Environment,
  MeshWobbleMaterial,
  PresentationControls,
  Stars,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer, Noise } from "@react-three/postprocessing";
import React, { useEffect, useRef } from "react";

const Blob = () => {
  return (
    <Canvas className="bg-black">
      <Stars />
      <Environment preset="dawn" />
      <PresentationControls>
        <Model />
      </PresentationControls>
    </Canvas>
  );
};

export default Blob;
const Model = () => {
  const ref = useRef();
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });
  return (
    <mesh
      scale={2}
      rotation={[0, 0, Math.PI / 3]}
      ref={(el) => (ref.current = el)}
    >
      <sphereGeometry />
      <MeshWobbleMaterial factor={30} speed={1} color={"pink"} />
    </mesh>
  );
};
