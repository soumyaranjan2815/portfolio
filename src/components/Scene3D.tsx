import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Particles() {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
      const r = 3 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);
  useFrame((_, d) => {
    if (ref.current) {
      ref.current.rotation.y += d * 0.05;
      ref.current.rotation.x += d * 0.02;
    }
  });
  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial transparent color="#5eead4" size={0.025} sizeAttenuation depthWrite={false} />
    </Points>
  );
}

function Blob() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y = s.clock.elapsedTime * 0.2;
      ref.current.rotation.x = s.clock.elapsedTime * 0.1;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.2}>
      <Sphere ref={ref} args={[1.6, 128, 128]}>
        <MeshDistortMaterial
          color="#22d3ee"
          attach="material"
          distort={0.45}
          speed={2}
          roughness={0.15}
          metalness={0.6}
          emissive="#0ea5b7"
          emissiveIntensity={0.3}
        />
      </Sphere>
    </Float>
  );
}

export default function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 55 }} dpr={[1, 2]}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#5eead4" />
      <pointLight position={[-5, -3, -2]} intensity={1} color="#8b5cf6" />
      <Blob />
      <Particles />
    </Canvas>
  );
}
