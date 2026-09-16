import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTourStore } from '../../store/useTourStore';

export const AlpineSkybox: React.FC = () => {
  const weatherMode = useTourStore((state) => state.weatherLightingMode);

  const cloudsRef1 = useRef<THREE.Group>(null);
  const cloudsRef2 = useRef<THREE.Group>(null);
  const snowRef = useRef<THREE.Points>(null);

  // Dynamic sky colors and horizon gradients
  const skyConfig = useMemo(() => {
    switch (weatherMode) {
      case 'SNOWY_WINTER':
        return {
          topColor: '#5a7082',
          bottomColor: '#b4c6d4',
          fogColor: '#7a8e9e',
          cloudOpacity: 0.55,
          cloudColor: '#e2e8f0',
          sunGlow: '#f1f5f9',
        };
      case 'GOLDEN_HOUR':
        return {
          topColor: '#1d2a44',
          bottomColor: '#c8682a',
          fogColor: '#6d381c',
          cloudOpacity: 0.45,
          cloudColor: '#fed7aa',
          sunGlow: '#ffaa33',
        };
      case 'MORNING_MIST':
      default:
        return {
          topColor: '#1e384d',
          bottomColor: '#7aa3b8',
          fogColor: '#344c59',
          cloudOpacity: 0.6,
          cloudColor: '#cfe2ec',
          sunGlow: '#fff3d1',
        };
    }
  }, [weatherMode]);

  // Snowfall particles for winter mode
  const snowGeometry = useMemo(() => {
    const count = 900;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = Math.random() * 40 - 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geom;
  }, []);

  // Animate cloud drift and snowfall
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (cloudsRef1.current) {
      cloudsRef1.current.rotation.y = time * 0.012;
    }
    if (cloudsRef2.current) {
      cloudsRef2.current.rotation.y = -time * 0.008;
    }

    if (snowRef.current && weatherMode === 'SNOWY_WINTER') {
      const positions = snowRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] -= 0.12; // Fall down
        positions[i] += Math.sin(time + i) * 0.02; // Sway
        if (positions[i + 1] < -5) {
          positions[i + 1] = 35;
        }
      }
      snowRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* 1. Large Hemispherical Atmospheric Sky Dome */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[290, 32, 24]} />
        <meshBasicMaterial
          color={skyConfig.bottomColor}
          side={THREE.BackSide}
          fog={false}
        />
      </mesh>

      {/* 2. Panoramic Mountain Ridgeline Ring (Visible from balconies & windows) */}
      <group position={[0, 5, 0]}>
        {/* Distant high mountain peaks ring (Mukshpuri & Himalayan range) */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const dist = 240;
          const px = Math.sin(rad) * dist;
          const pz = Math.cos(rad) * dist;
          const height = 75 + (i % 3) * 25;
          const radius = 95 + (i % 2) * 20;

          return (
            <mesh
              key={deg}
              position={[px, height / 2 - 15, pz]}
              rotation={[0, rad + 0.3, 0]}
            >
              <coneGeometry args={[radius, height, 6]} />
              <meshStandardMaterial
                color={
                  weatherMode === 'SNOWY_WINTER'
                    ? '#9bb0c1'
                    : weatherMode === 'GOLDEN_HOUR'
                    ? '#42281a'
                    : '#2c3e44'
                }
                roughness={0.95}
                metalness={0.05}
              />
            </mesh>
          );
        })}
      </group>

      {/* 3. Layered Drifting Valley Mist / Cloud Bands */}
      <group ref={cloudsRef1} position={[0, 12, 0]}>
        {[0, 120, 240].map((rot) => (
          <mesh
            key={rot}
            position={[Math.cos((rot * Math.PI) / 180) * 110, 0, Math.sin((rot * Math.PI) / 180) * 110]}
            rotation={[0, (rot * Math.PI) / 180, 0]}
          >
            <cylinderGeometry args={[55, 65, 12, 16, 1, true]} />
            <meshStandardMaterial
              color={skyConfig.cloudColor}
              transparent
              opacity={skyConfig.cloudOpacity * 0.7}
              side={THREE.DoubleSide}
              roughness={1}
            />
          </mesh>
        ))}
      </group>

      <group ref={cloudsRef2} position={[0, 22, 0]}>
        {[60, 180, 300].map((rot) => (
          <mesh
            key={rot}
            position={[Math.cos((rot * Math.PI) / 180) * 150, 4, Math.sin((rot * Math.PI) / 180) * 150]}
            rotation={[0, (rot * Math.PI) / 180, 0]}
          >
            <cylinderGeometry args={[80, 90, 16, 16, 1, true]} />
            <meshStandardMaterial
              color={skyConfig.cloudColor}
              transparent
              opacity={skyConfig.cloudOpacity * 0.5}
              side={THREE.DoubleSide}
              roughness={1}
            />
          </mesh>
        ))}
      </group>

      {/* 4. Winter Falling Snow (when SNOWY_WINTER active) */}
      {weatherMode === 'SNOWY_WINTER' && (
        <points ref={snowRef} geometry={snowGeometry}>
          <pointsMaterial
            color="#ffffff"
            size={0.25}
            transparent
            opacity={0.85}
            blending={THREE.AdditiveBlending}
          />
        </points>
      )}

      {/* 5. Glowing Sun Sphere in Sky */}
      <mesh
        position={
          weatherMode === 'GOLDEN_HOUR'
            ? [-190, 45, 160]
            : weatherMode === 'SNOWY_WINTER'
            ? [100, 190, 100]
            : [180, 90, 140]
        }
      >
        <sphereGeometry args={[14, 16, 16]} />
        <meshBasicMaterial color={skyConfig.sunGlow} fog={false} />
      </mesh>
    </group>
  );
};
