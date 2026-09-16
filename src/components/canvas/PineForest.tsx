import React, { useMemo, useLayoutEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTourStore } from '../../store/useTourStore';

interface PineForestProps {
  count?: number;
}

export const PineForest: React.FC<PineForestProps> = ({ count = 420 }) => {
  const weatherMode = useTourStore((state) => state.weatherLightingMode);

  const foliage1Ref = useRef<THREE.InstancedMesh>(null);
  const foliage2Ref = useRef<THREE.InstancedMesh>(null);
  const foliage3Ref = useRef<THREE.InstancedMesh>(null);
  const trunkRef = useRef<THREE.InstancedMesh>(null);

  // Generate realistic alpine tree distribution along ridge slopes
  const treeTransforms = useMemo(() => {
    const transforms: {
      position: [number, number, number];
      scale: number;
      rotation: number;
      swayPhase: number;
    }[] = [];

    // Seeded pseudo-random placement
    let seed = 571;
    const random = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    for (let i = 0; i < count; i++) {
      const angle = random() * Math.PI * 2;
      const radius = 24 + Math.pow(random(), 0.75) * 115;

      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      // Skip driveway and entrance approach (South front)
      if (z > 14 && Math.abs(x) < 14) continue;

      const dist = Math.sqrt(x * x + z * z);
      const ridgeNoise =
        Math.sin(x * 0.035 + 0.8) * Math.cos(z * 0.035 - 0.4) * 10 +
        Math.sin(x * 0.08 + z * 0.07) * 4;

      const elevation = -4.5 + Math.pow(dist / 40, 1.6) * 12 + ridgeNoise;
      const scale = 0.85 + random() * 1.5;
      const rotation = random() * Math.PI * 2;
      const swayPhase = random() * Math.PI * 2;

      transforms.push({
        position: [x, elevation, z],
        scale,
        rotation,
        swayPhase,
      });
    }

    return transforms;
  }, [count]);

  // Faceted alpine pine geometries
  const trunkGeometry = useMemo(() => new THREE.CylinderGeometry(0.26, 0.48, 2.8, 6), []);
  const tier1Geometry = useMemo(() => new THREE.ConeGeometry(2.3, 2.7, 7), []); // Bottom broad tier
  const tier2Geometry = useMemo(() => new THREE.ConeGeometry(1.8, 2.4, 7), []); // Middle tier
  const tier3Geometry = useMemo(() => new THREE.ConeGeometry(1.2, 2.1, 7), []); // Top crown tier

  const trunkMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#261b12',
        roughness: 0.95,
        metalness: 0.05,
      }),
    []
  );

  // Evergreen foliage colors based on weather mode
  const { color1, color2, color3 } = useMemo(() => {
    switch (weatherMode) {
      case 'SNOWY_WINTER':
        return {
          color1: '#24382e', // Deep shaded winter base
          color2: '#384d42', // Mid winter foliage
          color3: '#7d9488', // Snow-dusted frosted alpine pine tip
        };
      case 'GOLDEN_HOUR':
        return {
          color1: '#142c1b',
          color2: '#204227',
          color3: '#325934',
        };
      case 'MORNING_MIST':
      default:
        return {
          color1: '#0d2215',
          color2: '#153521',
          color3: '#1e472c',
        };
    }
  }, [weatherMode]);

  const foliageMat1 = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: color1,
        roughness: 0.82,
        metalness: 0.08,
        flatShading: true,
        envMapIntensity: 0.4,
      }),
    [color1]
  );
  const foliageMat2 = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: color2,
        roughness: 0.82,
        metalness: 0.08,
        flatShading: true,
        envMapIntensity: 0.4,
      }),
    [color2]
  );
  const foliageMat3 = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: color3,
        roughness: 0.82,
        metalness: 0.08,
        flatShading: true,
        envMapIntensity: 0.4,
      }),
    [color3]
  );

  // Position all 3 foliage tiers and trunk matrix instances
  useLayoutEffect(() => {
    const matrix = new THREE.Matrix4();
    const pos = new THREE.Vector3();
    const quat = new THREE.Quaternion();
    const sc = new THREE.Vector3();

    treeTransforms.forEach((t, i) => {
      quat.setFromAxisAngle(new THREE.Vector3(0, 1, 0), t.rotation);

      // 1. Trunk
      if (trunkRef.current) {
        pos.set(t.position[0], t.position[1] + t.scale * 1.4, t.position[2]);
        sc.set(t.scale, t.scale, t.scale);
        matrix.compose(pos, quat, sc);
        trunkRef.current.setMatrixAt(i, matrix);
      }

      // 2. Foliage Tier 1 (Bottom broad canopy)
      if (foliage1Ref.current) {
        pos.set(t.position[0], t.position[1] + t.scale * 2.8, t.position[2]);
        sc.set(t.scale, t.scale, t.scale);
        matrix.compose(pos, quat, sc);
        foliage1Ref.current.setMatrixAt(i, matrix);
      }

      // 3. Foliage Tier 2 (Middle canopy)
      if (foliage2Ref.current) {
        pos.set(t.position[0], t.position[1] + t.scale * 4.2, t.position[2]);
        sc.set(t.scale * 0.9, t.scale * 0.9, t.scale * 0.9);
        matrix.compose(pos, quat, sc);
        foliage2Ref.current.setMatrixAt(i, matrix);
      }

      // 4. Foliage Tier 3 (Top crown tip)
      if (foliage3Ref.current) {
        pos.set(t.position[0], t.position[1] + t.scale * 5.4, t.position[2]);
        sc.set(t.scale * 0.8, t.scale * 0.8, t.scale * 0.8);
        matrix.compose(pos, quat, sc);
        foliage3Ref.current.setMatrixAt(i, matrix);
      }
    });

    if (trunkRef.current) trunkRef.current.instanceMatrix.needsUpdate = true;
    if (foliage1Ref.current) foliage1Ref.current.instanceMatrix.needsUpdate = true;
    if (foliage2Ref.current) foliage2Ref.current.instanceMatrix.needsUpdate = true;
    if (foliage3Ref.current) foliage3Ref.current.instanceMatrix.needsUpdate = true;
  }, [treeTransforms]);

  // Natural subtle alpine breeze swaying top crown foliage
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() * 1.5;
    if (!foliage3Ref.current) return;

    // Subtle gentle sway on the highest needle crown tips
    const matrix = new THREE.Matrix4();
    const pos = new THREE.Vector3();
    const quat = new THREE.Quaternion();
    const sc = new THREE.Vector3();
    const euler = new THREE.Euler();

    // Throttled low overhead sway
    treeTransforms.forEach((t, i) => {
      const swayX = Math.sin(time + t.swayPhase) * 0.04 * t.scale;
      const swayZ = Math.cos(time * 0.8 + t.swayPhase) * 0.03 * t.scale;

      pos.set(t.position[0] + swayX, t.position[1] + t.scale * 5.4, t.position[2] + swayZ);
      euler.set(swayZ * 0.5, t.rotation, swayX * 0.5);
      quat.setFromEuler(euler);
      sc.set(t.scale * 0.8, t.scale * 0.8, t.scale * 0.8);

      matrix.compose(pos, quat, sc);
      foliage3Ref.current!.setMatrixAt(i, matrix);
    });

    foliage3Ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      {/* Dense Instanced Alpine Pine Trunks */}
      <instancedMesh
        ref={trunkRef}
        args={[trunkGeometry, trunkMaterial, treeTransforms.length]}
        castShadow
      />

      {/* Instanced Pine Canopy Tier 1 (Bottom) */}
      <instancedMesh
        ref={foliage1Ref}
        args={[tier1Geometry, foliageMat1, treeTransforms.length]}
        castShadow
        receiveShadow
      />

      {/* Instanced Pine Canopy Tier 2 (Middle) */}
      <instancedMesh
        ref={foliage2Ref}
        args={[tier2Geometry, foliageMat2, treeTransforms.length]}
        castShadow
        receiveShadow
      />

      {/* Instanced Pine Canopy Tier 3 (Top crown with wind sway) */}
      <instancedMesh
        ref={foliage3Ref}
        args={[tier3Geometry, foliageMat3, treeTransforms.length]}
        castShadow
        receiveShadow
      />
    </group>
  );
};
