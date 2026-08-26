"use client";

import { useRef } from "react";
import type { MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type CursorTarget = {
  /** Normalized -1..1 relative to the hero section center */
  x: number;
  y: number;
  /** Whether the pointer is inside the hero section */
  active: boolean;
};

const PARTICLE_COUNT = 850;

// Particle positions are static per session and don't depend on props or
// state, so we generate them once at module scope. Keeps the component pure
// (React 19 purity lint) and avoids recomputing the Float32Array on render.
const PARTICLE_POSITIONS = (() => {
  const arr = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    arr[i * 3] = (Math.random() - 0.5) * 16;
    arr[i * 3 + 1] = (Math.random() - 0.5) * 9;
    arr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
  }
  return arr;
})();

function ParticleField({ cursor }: { cursor: MutableRefObject<CursorTarget> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const c = cursor.current;

    // Blend a gentle idle drift with a cursor-driven target rotation,
    // using THREE.MathUtils.damp for a smooth, 60fps-friendly easing.
    const steerY = c.x * 0.7;
    const steerX = c.y * 0.45;

    if (pointsRef.current) {
      pointsRef.current.rotation.y = THREE.MathUtils.damp(
        pointsRef.current.rotation.y,
        Math.sin(t * 0.05) * 0.25 + steerY,
        3,
        delta
      );
      pointsRef.current.rotation.x = THREE.MathUtils.damp(
        pointsRef.current.rotation.x,
        Math.cos(t * 0.05) * 0.15 + steerX,
        3,
        delta
      );
    }

    if (wireRef.current) {
      wireRef.current.rotation.y = THREE.MathUtils.damp(
        wireRef.current.rotation.y,
        t * 0.12 + steerY * 1.5,
        3,
        delta
      );
      wireRef.current.rotation.x = THREE.MathUtils.damp(
        wireRef.current.rotation.x,
        Math.sin(t * 0.2) * 0.12 + steerX * 1.2,
        3,
        delta
      );
    }
  });

  return (
    <>
      {/* Ambient particle cloud */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[PARTICLE_POSITIONS, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#22c55e"
          transparent
          opacity={0.5}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Slow-rotating wireframe accent */}
      <mesh ref={wireRef} position={[0, 0, -2]}>
        <icosahedronGeometry args={[1.9, 1]} />
        <meshBasicMaterial
          color="#2dd4bf"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>
    </>
  );
}

export default function HeroCanvas({ cursor }: { cursor: MutableRefObject<CursorTarget> }) {
  return (
    <Canvas
      className="pointer-events-none"
      style={{ width: "100%", height: "100%", background: "transparent" }}
      camera={{ position: [0, 0, 6], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
    >
      <ParticleField cursor={cursor} />
    </Canvas>
  );
}