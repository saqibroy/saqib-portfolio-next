'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

const positions: [number, number, number][] = [
  [-4.6, 0.6, 0],
  [-2.8, 1.15, 0.2],
  [-1.1, 0.25, -0.1],
  [0.7, 0.9, 0.1],
  [2.55, 0, -0.15],
  [4.4, 0.65, 0],
];

const lensPaths = {
  Frontend: [0, 1, 2],
  'Full-stack': [0, 1, 2, 3, 5],
  'Applied AI': [0, 1, 2, 3, 4, 5],
} as const;

type Lens = keyof typeof lensPaths;

function Edge({ geometry, active }: { geometry: THREE.BufferGeometry; active: boolean }) {
  const object = useMemo(
    () =>
      new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({
          color: active ? '#46bdd0' : '#36515a',
          transparent: true,
          opacity: active ? 0.82 : 0.24,
        }),
      ),
    [active, geometry],
  );

  useEffect(() => () => {
    object.material.dispose();
  }, [object]);

  return <primitive object={object} />;
}

function Network({ activeStage, lens }: { activeStage: number; lens: Lens }) {
  const group = useRef<THREE.Group>(null);
  const packet = useRef<THREE.Mesh>(null);
  const path = lensPaths[lens] as readonly number[];

  const edgeGeometries = useMemo(
    () =>
      positions.slice(0, -1).map((position, index) =>
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(...position),
          new THREE.Vector3(...positions[index + 1]),
        ]),
      ),
    [],
  );

  useFrame(({ camera, clock }) => {
    const focus = positions[activeStage];
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, focus[0] * 0.12, 0.035);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 1.8 + focus[1] * 0.16, 0.035);
    camera.lookAt(0, 0.45, 0);
    if (group.current) group.current.rotation.y = Math.sin(clock.elapsedTime * 0.18) * 0.035;

    if (packet.current && activeStage < positions.length - 1) {
      const progress = (clock.elapsedTime * 0.22) % 1;
      const start = new THREE.Vector3(...positions[activeStage]);
      const end = new THREE.Vector3(...positions[activeStage + 1]);
      packet.current.position.lerpVectors(start, end, progress);
    }
  });

  return (
    <group ref={group}>
      {edgeGeometries.map((geometry, index) => {
        const active = path.includes(index) && path.includes(index + 1);
        return <Edge key={index} geometry={geometry} active={active} />;
      })}
      {positions.map((position, index) => {
        const active = path.includes(index);
        const selected = index === activeStage;
        return (
          <group key={index} position={position}>
            <mesh scale={selected ? 1.35 : active ? 1 : 0.82}>
              <icosahedronGeometry args={[0.22, 1]} />
              <meshStandardMaterial
                color={selected ? '#f3f7f8' : active ? '#46bdd0' : '#36515a'}
                emissive={selected ? '#46bdd0' : active ? '#007f9e' : '#081014'}
                emissiveIntensity={selected ? 1.5 : 0.58}
                roughness={0.4}
              />
            </mesh>
            {selected ? (
              <mesh scale={2.2}>
                <ringGeometry args={[0.2, 0.23, 48]} />
                <meshBasicMaterial color="#46bdd0" transparent opacity={0.42} side={THREE.DoubleSide} />
              </mesh>
            ) : null}
          </group>
        );
      })}
      <mesh ref={packet}>
        <sphereGeometry args={[0.075, 16, 16]} />
        <meshBasicMaterial color="#f3f7f8" />
      </mesh>
    </group>
  );
}

export function SystemTopologyCanvas({
  activeStage,
  lens,
  active,
}: {
  activeStage: number;
  lens: Lens;
  active: boolean;
}) {
  return (
    <Canvas
      aria-hidden="true"
      className="systems-lab-canvas"
      camera={{ position: [0, 1.8, 8.8], fov: 42 }}
      dpr={[1, 1.5]}
      frameloop={active ? 'always' : 'never'}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.65} />
      <pointLight position={[0, 4, 4]} intensity={18} color="#46bdd0" />
      <Network activeStage={activeStage} lens={lens} />
    </Canvas>
  );
}
