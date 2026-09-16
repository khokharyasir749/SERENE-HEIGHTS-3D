import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const SnowAtmosphere: React.FC = () => {
  const count = 350;
  const meshRef = useRef<THREE.Points>(null);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = Math.random() * 30 - 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;

      vel[i * 3] = (Math.random() - 0.5) * 0.04;
      vel[i * 3 + 1] = -(0.03 + Math.random() * 0.05);
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.04;
    }

    return [pos, vel];
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    const posAttr = meshRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      array[i * 3] += velocities[i * 3];
      array[i * 3 + 1] += velocities[i * 3 + 1];
      array[i * 3 + 2] += velocities[i * 3 + 2];

      // Wrap around
      if (array[i * 3 + 1] < -5) {
        array[i * 3 + 1] = 25;
        array[i * 3] = (Math.random() - 0.5) * 50;
      }
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.18}
        color="#ffffff"
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
