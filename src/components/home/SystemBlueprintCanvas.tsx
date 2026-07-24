"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const requestCurve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-3.2, 0.48, 0.05),
  new THREE.Vector3(-2.15, 0.72, 0.38),
  new THREE.Vector3(-0.75, 0.48, 0.28),
  new THREE.Vector3(0.15, 0.4, 0.18),
  new THREE.Vector3(1.75, 0.65, 0.32),
  new THREE.Vector3(3.15, 0.46, 0.05),
]);

const responseCurve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(3.15, -0.16, 0.05),
  new THREE.Vector3(1.85, -0.5, 0.4),
  new THREE.Vector3(0.3, -0.44, 0.25),
  new THREE.Vector3(-1.25, -0.32, 0.38),
  new THREE.Vector3(-2.25, -0.08, 0.2),
  new THREE.Vector3(-3.2, -0.08, 0.05),
]);

function FlowLine({
  curve,
  color,
  opacity,
}: {
  curve: THREE.CatmullRomCurve3;
  color: string;
  opacity: number;
}) {
  const geometry = useMemo(
    () => new THREE.TubeGeometry(curve, 80, 0.022, 8, false),
    [curve],
  );

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

function ContractDocument() {
  const lineWidths = [0.95, 0.72, 1.08, 0.84];

  return (
    <group position={[-3.15, 0.15, 0]}>
      <mesh>
        <boxGeometry args={[1.55, 2.18, 0.16]} />
        <meshBasicMaterial color="#dcebed" />
      </mesh>
      <mesh position={[-0.43, 0.78, 0.1]}>
        <boxGeometry args={[0.5, 0.1, 0.04]} />
        <meshBasicMaterial color="#0081a7" />
      </mesh>
      {lineWidths.map((width, index) => {
        return (
          <mesh
            key={width}
            name={`contract-line-${index}`}
            userData={{ width, index }}
            position={[-0.58 + (width * 0.08) / 2, 0.36 - index * 0.33, 0.11]}
            scale={[0.08, 1, 1]}
          >
            <boxGeometry args={[width, 0.055, 0.035]} />
            <meshBasicMaterial color={index === 2 ? "#00afb9" : "#49656f"} />
          </mesh>
        );
      })}
      <mesh position={[0.44, -0.82, 0.11]}>
        <boxGeometry args={[0.44, 0.18, 0.04]} />
        <meshBasicMaterial color="#0081a7" />
      </mesh>
    </group>
  );
}

function ApplicationBoundary() {
  return (
    <group position={[0, 0.16, 0.05]}>
      <mesh name="service-shell">
        <boxGeometry args={[1.35, 1.9, 0.42]} />
        <meshBasicMaterial
          color="#0081a7"
          transparent
          opacity={0.32}
        />
      </mesh>
      <mesh position={[0, 0, 0.23]}>
        <boxGeometry args={[1.02, 1.57, 0.04]} />
        <meshBasicMaterial color="#08232f" />
      </mesh>
      {[-0.42, 0, 0.42].map((y, index) => (
        <mesh
          key={y}
          name={`service-slit-${index}`}
          position={[0, y, 0.28]}
        >
          <boxGeometry args={[0.62 + index * 0.1, 0.075, 0.04]} />
          <meshBasicMaterial
            color="#31515d"
          />
        </mesh>
      ))}
      <mesh position={[-0.69, 0, 0]}>
        <boxGeometry args={[0.055, 1.9, 0.48]} />
        <meshBasicMaterial color="#00afb9" />
      </mesh>
    </group>
  );
}

function RetrievalStack() {
  return (
    <group position={[3.05, 0.1, 0]}>
      {[0, 1, 2, 3].map((index) => {
        return (
          <mesh
            key={index}
            name={`retrieval-plate-${index}`}
            userData={{ index }}
            position={[0, 0.16, -index * 0.16]}
            rotation={[0, -0.16 + index * 0.035, 0]}
          >
            <boxGeometry args={[1.5, 1.85, 0.1]} />
            <meshBasicMaterial
              color={index === 0 ? "#4d908e" : "#173e49"}
              transparent
              opacity={0.8 - index * 0.1}
            />
          </mesh>
        );
      })}
      {[
        [-0.4, 0.55],
        [0.1, 0.32],
        [-0.25, -0.08],
        [0.38, -0.32],
        [-0.42, -0.58],
      ].map(([x, y], index) => (
        <mesh
          key={index}
          name={`retrieval-node-${index}`}
          userData={{ index }}
          position={[x, y, 0.16]}
        >
          <sphereGeometry args={[0.055, 10, 10]} />
          <meshBasicMaterial
            color="#77949d"
          />
        </mesh>
      ))}
    </group>
  );
}

function QualityRail() {
  return (
    <group position={[0, -1.42, -0.1]}>
      <mesh>
        <boxGeometry args={[7.1, 0.075, 0.16]} />
        <meshBasicMaterial color="#173e49" />
      </mesh>
      <mesh
        name="quality-progress"
        position={[-3.515, 0, 0.09]}
        scale={[0.01, 1, 1]}
      >
        <boxGeometry args={[7.1, 0.08, 0.04]} />
        <meshBasicMaterial color="#0081a7" />
      </mesh>
      {[-2.7, -0.9, 0.9, 2.7].map((x, index) => (
        <mesh
          key={x}
          name={`quality-node-${index}`}
          userData={{ index }}
          position={[x, 0, 0.14]}
        >
          <boxGeometry args={[0.14, 0.14, 0.12]} />
          <meshBasicMaterial
            color="#31515d"
          />
        </mesh>
      ))}
    </group>
  );
}

function FlowScene({
  replayToken,
  active,
}: {
  replayToken: number;
  active: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const requestPacket = useRef<THREE.Mesh>(null);
  const responsePacket = useRef<THREE.Mesh>(null);
  const start = useRef(0);
  const complete = useRef(false);
  const { invalidate } = useThree();

  useEffect(() => {
    start.current = performance.now();
    complete.current = false;
    if (active) invalidate();
  }, [active, invalidate, replayToken]);

  useFrame((state) => {
    if (!group.current) return;

    const pointerRotation = state.pointer.x * 0.055;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      pointerRotation,
      active ? 0.04 : 0.18,
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -0.1 + state.pointer.y * 0.025,
      active ? 0.04 : 0.18,
    );

    if (!active || complete.current) return;

    const nextProgress = Math.min((performance.now() - start.current) / 7200, 1);
    const requestProgress = THREE.MathUtils.clamp(
      (nextProgress - 0.08) / 0.48,
      0,
      1,
    );
    const responseProgress = THREE.MathUtils.clamp(
      (nextProgress - 0.58) / 0.36,
      0,
      1,
    );
    const serviceActivity = THREE.MathUtils.clamp(
      (nextProgress - 0.25) / 0.22,
      0,
      1,
    );
    const retrievalActivity = THREE.MathUtils.clamp(
      (nextProgress - 0.45) / 0.2,
      0,
      1,
    );

    if (requestPacket.current) {
      requestPacket.current.visible = requestProgress > 0 && requestProgress < 1;
      requestCurve.getPoint(requestProgress, requestPacket.current.position);
      const pulse = 0.8 + Math.sin(nextProgress * Math.PI * 18) * 0.18;
      requestPacket.current.scale.setScalar(pulse);
    }

    if (responsePacket.current) {
      responsePacket.current.visible = responseProgress > 0 && responseProgress < 1;
      responseCurve.getPoint(responseProgress, responsePacket.current.position);
    }

    if (group.current) {
      for (let index = 0; index < 4; index += 1) {
        const line = group.current.getObjectByName(
          `contract-line-${index}`,
        ) as THREE.Mesh | undefined;
        if (line) {
          const width = line.userData.width as number;
          const reveal = THREE.MathUtils.clamp(
            responseProgress * 1.7 - index * 0.16,
            0.08,
            1,
          );
          line.scale.x = reveal;
          line.position.x = -0.58 + (width * reveal) / 2;
        }

        const serviceSlit = group.current.getObjectByName(
          `service-slit-${index}`,
        ) as THREE.Mesh | undefined;
        if (serviceSlit) {
          const material = serviceSlit.material as THREE.MeshBasicMaterial;
          material.color.set(
            requestProgress > 0.3 + index * 0.08 ? "#00afb9" : "#31515d",
          );
        }

        const plate = group.current.getObjectByName(
          `retrieval-plate-${index}`,
        );
        if (plate) {
          plate.position.x = index * 0.13 * retrievalActivity;
          plate.position.y = 0.16 + index * 0.07 * retrievalActivity;
        }

        const retrievalNode = group.current.getObjectByName(
          `retrieval-node-${index}`,
        ) as THREE.Mesh | undefined;
        if (retrievalNode) {
          const material = retrievalNode.material as THREE.MeshBasicMaterial;
          material.color.set(
            retrievalActivity > index * 0.12 ? "#00afb9" : "#77949d",
          );
        }

        const qualityNode = group.current.getObjectByName(
          `quality-node-${index}`,
        ) as THREE.Mesh | undefined;
        if (qualityNode) {
          const material = qualityNode.material as THREE.MeshBasicMaterial;
          material.color.set(
            nextProgress > index * 0.22 ? "#00afb9" : "#31515d",
          );
        }
      }

      const serviceShell = group.current.getObjectByName(
        "service-shell",
      ) as THREE.Mesh | undefined;
      if (serviceShell) {
        (serviceShell.material as THREE.MeshBasicMaterial).opacity =
          0.32 + serviceActivity * 0.38;
      }

      const qualityProgress = group.current.getObjectByName(
        "quality-progress",
      );
      if (qualityProgress) {
        qualityProgress.scale.x = Math.max(nextProgress, 0.01);
        qualityProgress.position.x = -3.55 + 3.55 * nextProgress;
      }
    }

    complete.current = nextProgress >= 1;
    if (!complete.current) invalidate();
  });

  return (
    <group ref={group} rotation={[-0.1, 0, 0]}>
      <ContractDocument />
      <ApplicationBoundary />
      <RetrievalStack />
      <FlowLine curve={requestCurve} color="#4d908e" opacity={0.9} />
      <FlowLine curve={responseCurve} color="#00afb9" opacity={0.72} />
      <QualityRail />

      <mesh ref={requestPacket} visible={false}>
        <boxGeometry args={[0.18, 0.18, 0.18]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh ref={responsePacket} visible={false}>
        <octahedronGeometry args={[0.16, 0]} />
        <meshBasicMaterial color="#00afb9" />
      </mesh>
    </group>
  );
}

export function SystemBlueprintCanvas({
  replayToken,
  active,
}: {
  replayToken: number;
  active: boolean;
}) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <Canvas
        frameloop="demand"
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.15, 8.1], fov: 35 }}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "low-power",
        }}
      >
        <FlowScene replayToken={replayToken} active={active} />
      </Canvas>
    </div>
  );
}
