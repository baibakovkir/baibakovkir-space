"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { useRef, useState, useSyncExternalStore } from "react";
import * as THREE from "three";
import { Model } from "./Satelite";

const ORBIT_RADIUS = 1.93;

function Planet({
  position,
  radius,
  color,
}: {
  position: [number, number, number];
  radius: number;
  color: string;
}) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color={color} roughness={0.82} metalness={0.08} />
    </mesh>
  );
}

function Robot() {
  return (
    <group rotation={[0.12, 0.1, -0.28]} scale={0.22}>
      {/* Голова с визором и боковыми сенсорами. */}
      <mesh position={[0, 0.66, 0]} scale={[0.58, 0.42, 0.42]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#bfc9c2" metalness={0.62} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.67, 0.43]} scale={[0.4, 0.13, 0.035]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#8dffd0" />
      </mesh>
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 0.64, 0.68, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.16, 0.16, 0.12, 16]} />
          <meshStandardMaterial color="#718078" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
      <mesh position={[0, 1.18, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.32, 8]} />
        <meshStandardMaterial color="#98a69e" metalness={0.7} />
      </mesh>
      <mesh position={[0, 1.37, 0]}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshBasicMaterial color="#ff9c71" />
      </mesh>

      {/* Корпус, диагностическая панель и реактивный стабилизатор. */}
      <mesh scale={[0.48, 0.58, 0.34]}>
        <cylinderGeometry args={[0.75, 1, 1.3, 8]} />
        <meshStandardMaterial color="#909c95" metalness={0.52} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.02, 0.36]} scale={[0.28, 0.3, 0.035]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#1b2723" metalness={0.4} />
      </mesh>
      {[-0.12, 0, 0.12].map((x, index) => (
        <mesh key={x} position={[x, 0.07, 0.405]}>
          <sphereGeometry args={[0.035, 10, 10]} />
          <meshBasicMaterial color={index === 1 ? "#ff9c71" : "#8dffd0"} />
        </mesh>
      ))}
      <mesh position={[0, -0.67, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.36, 0.045, 8, 32]} />
        <meshBasicMaterial color="#8dffd0" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

function SceneContent({ motion }: { motion: boolean }) {
  const orbitRef = useRef<THREE.Group>(null);
  const satelliteRef = useRef<THREE.Group>(null);
  const robotRef = useRef<THREE.Group>(null);
  const asteroidRef = useRef<THREE.Group>(null);
  const sunRef = useRef<THREE.Group>(null);
  const scanBeamRef = useRef<THREE.Mesh>(null);
  const scanMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const scanPulseRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (motion) {
      if (orbitRef.current) orbitRef.current.rotation.z += delta * 0.19;

      if (satelliteRef.current) {
        satelliteRef.current.rotation.y = THREE.MathUtils.lerp(
          satelliteRef.current.rotation.y,
          t * 0.28 + pointer.x * 0.22,
          0.04,
        );
        satelliteRef.current.rotation.x = Math.sin(t * 0.7) * 0.1 - pointer.y * 0.12;
        satelliteRef.current.rotation.z = Math.cos(t * 0.45) * 0.06;
      }

      if (robotRef.current) {
        robotRef.current.position.y = 1.65 + Math.sin(t * 0.8) * 0.1;
        robotRef.current.rotation.y = Math.sin(t * 0.45) * 0.2;
      }

      if (asteroidRef.current) asteroidRef.current.rotation.z -= delta * 0.045;

      if (sunRef.current) {
        const pulse = 1 + Math.sin(t * 1.8) * 0.035;
        sunRef.current.scale.setScalar(pulse);
        sunRef.current.rotation.z += delta * 0.035;
      }

      if (scanBeamRef.current && scanMaterialRef.current) {
        const scan = (Math.sin(t * 3.2) + 1) / 2;
        scanBeamRef.current.scale.x = 0.82 + scan * 0.28;
        scanBeamRef.current.scale.z = 0.82 + scan * 0.28;
        scanMaterialRef.current.opacity = 0.08 + scan * 0.12;
      }

      if (scanPulseRef.current) {
        const pulse = 0.75 + ((t * 0.7) % 1) * 0.7;
        scanPulseRef.current.scale.setScalar(pulse);
        const material = scanPulseRef.current.material as THREE.MeshBasicMaterial;
        material.opacity = 1.25 - pulse;
      }
    }
  });

  return (
    <>
      <ambientLight intensity={1.1} />
      {/* Немного сместим свет, чтобы солнечные панели спутника давали красивые блики */}
      <directionalLight position={[4, 5, 4]} intensity={2.8} color="#d7ffe7" />
      <pointLight position={[-4, -2, 3]} intensity={2.0} color="#759dff" />

      {/* Центральный узел системы — солнце с мягко пульсирующей короной. */}
      <group ref={sunRef} position={[0.25, 0.03, -0.55]}>
        <pointLight intensity={8} distance={5} decay={2} color="#ffc76f" />
        <mesh>
          <sphereGeometry args={[0.43, 32, 32]} />
          <meshStandardMaterial color="#ffb75d" emissive="#ff7b32" emissiveIntensity={2.2} roughness={0.72} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.56, 24, 24]} />
          <meshBasicMaterial color="#ffc86d" transparent opacity={0.13} depthWrite={false} />
        </mesh>
        <mesh ref={scanPulseRef} rotation={[0.85, -0.3, -0.2]}>
          <torusGeometry args={[0.62, 0.012, 8, 64]} />
          <meshBasicMaterial color="#a6ffcb" transparent opacity={0.5} depthWrite={false} />
        </mesh>
      </group>

      <Planet position={[-2.5, 1.7, -2.2]} radius={0.48} color="#587a9d" />
      <group position={[2.45, -1.55, -2.1]} rotation={[0.95, 0.1, 0.25]}>
        <Planet position={[0, 0, 0]} radius={0.36} color="#b88c62" />
        <mesh>
          <torusGeometry args={[0.58, 0.035, 8, 64]} />
          <meshBasicMaterial color="#e1c49c" transparent opacity={0.68} />
        </mesh>
      </group>

      <group ref={asteroidRef} position={[0, 0, -1.6]} rotation={[0.4, 0.1, 0]}>
        {[
          [-2.8, -0.65, 0.03, 0.12],
          [-2.35, -1.25, -0.2, 0.08],
          [2.75, 0.55, 0.1, 0.1],
          [2.2, 1.45, -0.15, 0.07],
          [1.45, -2.2, 0, 0.09],
        ].map(([x, y, z, size], index) => (
          <mesh key={index} position={[x, y, z]} rotation={[x, y, index * 0.7]} scale={[1.4, 0.8, 1]}>
            <dodecahedronGeometry args={[size, 0]} />
            <meshStandardMaterial color="#788078" roughness={1} />
          </mesh>
        ))}
      </group>

      {/* Главная орбитальная группа */}
      <group
        position={[0.25, 0.03, -0.55]}
        rotation={[0.85, -0.3, -0.2]}
      >
        {/* Кольцо орбиты */}
        <mesh>
          <torusGeometry args={[ORBIT_RADIUS, 0.008, 8, 180]} />
          <meshBasicMaterial color="#a6ffcb" transparent opacity={0.64} />
        </mesh>

        {/* Вращение этой группы перемещает спутник точно по линии орбиты. */}
        <group ref={orbitRef} rotation={[0, 0, 2.65]}>
          <group ref={satelliteRef} position={[ORBIT_RADIUS, 0, 0]}>
            <Model scale={0.1} />
            {/* Камера спутника сканирует центральный объект. */}
            <mesh ref={scanBeamRef} position={[-0.7, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
              <coneGeometry args={[0.42, 1.4, 32, 1, true]} />
              <meshBasicMaterial
                ref={scanMaterialRef}
                color="#8dffd0"
                transparent
                opacity={0.14}
                depthWrite={false}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        </group>
      </group>

      <group ref={robotRef} position={[2.35, 1.65, -1.1]}>
        <Robot />
      </group>

      <Sparkles count={90} scale={[6.2, 7.2, 3.2]} size={1.15} speed={motion ? 0.15 : 0} color="#d2ffdf" />
      <Sparkles count={28} scale={[5.4, 6.4, 1.4]} size={2.1} speed={motion ? 0.08 : 0} color="#88aaff" />
    </>
  );
}

export default function PortraitScene() {
  const motion = useSyncExternalStore(subscribeMotion, getMotionPreference, () => false);

  return (
    <div className="portrait-scene" aria-hidden="true">
      <div className="scene-label scene-label-top">K / 01 <span>PORTFOLIO</span></div>
      <div className="scene-label scene-label-bottom"><i /> FULL-STACK DEVELOPER</div>
      <div className="scene-orbit-note">СИСТЕМЫ · КОТОРЫЕ · РАБОТАЮТ</div>
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
