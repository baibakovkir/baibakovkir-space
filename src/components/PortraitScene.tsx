"use client";

import { useFrame } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { useRef, useState, useSyncExternalStore } from "react";
import * as THREE from "three";

function SceneContent({ motion }: { motion: boolean }) {
  const ring = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ring.current && motion) ring.current.rotation.z -= delta * 0.055;
  });

  return (
    <>
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 5, 6]} intensity={2.5} color="#d7ffe7" />
      <pointLight position={[-4, -1, 2]} intensity={1.7} color="#759dff" />
      <mesh ref={ring} position={[0.25, 0.03, -0.55]} rotation={[0.85, -0.3, -0.2]}>
        <torusGeometry args={[1.93, 0.008, 8, 180]} />
        <meshBasicMaterial color="#a6ffcb" transparent opacity={0.64} />
      </mesh>
      <Sparkles count={42} scale={[5.6, 6.7, 2.2]} size={1.5} speed={0.12} color="#d2ffdf" />
    </>
  );
}

export default function PortraitScene() {
  const motion = useSyncExternalStore(subscribeMotion, getMotionPreference, () => false);

  return (
    <div className="portrait-scene" aria-hidden="true">
      <div className="scene-label scene-label-top">K / 01 <span>PORTFOLIO</span></div>
      <div className="scene-label scene-label-bottom"><i /> FULL-STACK DEVELOPER</div>
      <div className="scene-orbit-note">BUILD · SHIP · IMPROVE</div>
      <CanvasScene motion={motion} />
    </div>
  );
}

function getMotionPreference() {
  return window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
}

function subscribeMotion(onStoreChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: no-preference)");
  query.addEventListener("change", onStoreChange);
  return () => query.removeEventListener("change", onStoreChange);
}

function CanvasScene({ motion }: { motion: boolean }) {
  const [supported] = useState(() => typeof window !== "undefined" && (() => {
    try {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("webgl2") || canvas.getContext("webgl");
      context?.getExtension("WEBGL_lose_context")?.loseContext();
      return Boolean(context);
    } catch {
      return false;
    }
  })());

  if (!supported) {
    return null;
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 35 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
    >
      <SceneContent motion={motion} />
    </Canvas>
  );
}
