import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTourStore } from '../../store/useTourStore';

export const ApartmentInterior: React.FC = () => {
  const activeViewMode = useTourStore((state) => state.activeViewMode);
  const weatherMode = useTourStore((state) => state.weatherLightingMode);

  const fireplaceLightRef = useRef<THREE.PointLight>(null);
  const flameMeshRef = useRef<THREE.Mesh>(null);

  // Animate electric fireplace flame shimmer
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 5;
    if (fireplaceLightRef.current) {
      fireplaceLightRef.current.intensity = 1.2 + Math.sin(t * 1.5) * 0.3 + Math.cos(t * 3.1) * 0.2;
    }
    if (flameMeshRef.current) {
      flameMeshRef.current.scale.y = 1 + Math.sin(t * 2) * 0.2;
    }
  });

  // Render interior details only when in interior mode or balcony mode
  if (activeViewMode !== 'APARTMENT_INTERIOR' && activeViewMode !== 'BALCONY_PANORAMA') {
    return null;
  }

  return (
    <group position={[0, 10.6, 0]}>
      {/* ======================================================== */}
      {/* 1. STRUCTURAL SHELL & FLOORS (Official Hotel Suite Layout) */}
      {/* ======================================================== */}
      {/* Interior Floor: Herringbone Warm Smoked Oak Parquet */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[15.6, 0.12, 11.6]} />
        <meshStandardMaterial
          color="#382518"
          roughness={0.35}
          metalness={0.1}
          envMapIntensity={0.8}
        />
      </mesh>

      {/* Ceiling with Recessed Architectural Light Coves */}
      <mesh position={[0, 2.55, 0]}>
        <boxGeometry args={[15.6, 0.1, 11.6]} />
        <meshStandardMaterial color="#f3f4f6" roughness={0.9} />
      </mesh>

      {/* Perimeter Exterior Back Wall */}
      <mesh position={[0, 1.25, -5.7]} receiveShadow>
        <boxGeometry args={[15.6, 2.5, 0.2]} />
        <meshStandardMaterial color="#171e27" roughness={0.85} />
      </mesh>

      {/* Left Wall (Bedroom Exterior) */}
      <mesh position={[-7.7, 1.25, 0]} receiveShadow>
        <boxGeometry args={[0.2, 2.5, 11.6]} />
        <meshStandardMaterial color="#1a222e" roughness={0.85} />
      </mesh>

      {/* Right Wall (Living Exterior) */}
      <mesh position={[7.7, 1.25, 0]} receiveShadow>
        <boxGeometry args={[0.2, 2.5, 11.6]} />
        <meshStandardMaterial color="#1a222e" roughness={0.85} />
      </mesh>

      {/* Acoustic Partition Wall with Doorway Passage between Living & Bedroom */}
      {/* North partition section */}
      <mesh position={[-2.2, 1.25, -3.2]} receiveShadow>
        <boxGeometry args={[0.18, 2.5, 4.8]} />
        <meshStandardMaterial color="#263140" roughness={0.7} />
      </mesh>
      {/* South partition section (leaving passage at Z: 1.0 to 3.5) */}
      <mesh position={[-2.2, 1.25, 4.7]} receiveShadow>
        <boxGeometry args={[0.18, 2.5, 1.8]} />
        <meshStandardMaterial color="#263140" roughness={0.7} />
      </mesh>

      {/* ======================================================== */}
      {/* 2. FLOOR-TO-CEILING PANORAMIC GLASS CURTAIN WALL (SOUTH) */}
      {/* ======================================================== */}
      <mesh position={[0, 1.25, 5.7]}>
        <boxGeometry args={[15.6, 2.5, 0.04]} />
        <meshPhysicalMaterial
          color="#dbeafe"
          transparent
          opacity={0.15}
          roughness={0.02}
          transmission={0.95}
          thickness={0.4}
          ior={1.5}
          reflectivity={0.6}
        />
      </mesh>

      {/* Architectural Black Aluminum Mullions */}
      {[-7.6, -5.0, -2.2, 1.8, 5.0, 7.6].map((x) => (
        <mesh key={x} position={[x, 1.25, 5.7]}>
          <boxGeometry args={[0.08, 2.5, 0.12]} />
          <meshStandardMaterial color="#0b0f14" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* Horizontal Transom Frame */}
      <mesh position={[0, 2.45, 5.7]}>
        <boxGeometry args={[15.6, 0.1, 0.12]} />
        <meshStandardMaterial color="#0b0f14" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* ======================================================== */}
      {/* 3. LIVING LOUNGE & ELECTRIC FIREPLACE */}
      {/* ======================================================== */}
      {/* Feature Timber Slatted Feature Wall */}
      <group position={[2.5, 1.25, -5.55]}>
        <mesh receiveShadow>
          <boxGeometry args={[5.2, 2.45, 0.08]} />
          <meshStandardMaterial color="#513621" roughness={0.65} />
        </mesh>

        {/* Vertical Oak Accent Slats */}
        {[-2.4, -2.0, -1.6, -1.2, -0.8, -0.4, 0, 0.4, 0.8, 1.2, 1.6, 2.0, 2.4].map((sx) => (
          <mesh key={sx} position={[sx, 0, 0.05]}>
            <boxGeometry args={[0.04, 2.45, 0.03]} />
            <meshStandardMaterial color="#7a4e2d" roughness={0.6} />
          </mesh>
        ))}

        {/* Linear Modern Electric Fireplace */}
        <group position={[0, -0.75, 0.1]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[3.2, 0.65, 0.25]} />
            <meshStandardMaterial color="#080808" roughness={0.2} metalness={0.8} />
          </mesh>
          <mesh position={[0, 0, 0.14]}>
            <boxGeometry args={[3.0, 0.55, 0.02]} />
            <meshPhysicalMaterial
              color="#ffffff"
              transparent
              opacity={0.3}
              transmission={0.85}
              roughness={0.05}
            />
          </mesh>
          <mesh position={[0, -0.22, 0.05]}>
            <boxGeometry args={[2.9, 0.06, 0.12]} />
            <meshStandardMaterial
              color="#ff5500"
              emissive="#ff4400"
              emissiveIntensity={2.5}
              roughness={0.3}
            />
          </mesh>
          <mesh ref={flameMeshRef} position={[0, -0.05, 0.05]}>
            <coneGeometry args={[1.2, 0.35, 12]} />
            <meshBasicMaterial color="#ffaa11" transparent opacity={0.85} />
          </mesh>
          <pointLight
            ref={fireplaceLightRef}
            color="#ff7b1a"
            intensity={1.5}
            distance={8}
            decay={2}
            position={[0, 0.1, 0.3]}
          />
        </group>

        {/* 75" Wall OLED Display */}
        <group position={[0, 0.45, 0.06]}>
          <mesh>
            <boxGeometry args={[2.8, 1.35, 0.04]} />
            <meshStandardMaterial color="#050505" roughness={0.1} metalness={0.9} />
          </mesh>
          <mesh position={[0, 0, 0.025]}>
            <planeGeometry args={[2.7, 1.25]} />
            <meshBasicMaterial
              color={weatherMode === 'SNOWY_WINTER' ? '#93c5fd' : '#f59e0b'}
              opacity={0.85}
            />
          </mesh>
        </group>
      </group>

      {/* Modern Curved Sectional Sofa (Deep Charcoal & Emerald Accents) */}
      <group position={[2.8, 0, 1.6]}>
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.6, 0.55, 1.9]} />
          <meshStandardMaterial color="#1f2530" roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.68, -0.78]} castShadow>
          <boxGeometry args={[3.6, 0.65, 0.36]} />
          <meshStandardMaterial color="#161b24" roughness={0.85} />
        </mesh>
        <mesh position={[-1.72, 0.55, 0]} castShadow>
          <boxGeometry args={[0.3, 0.45, 1.9]} />
          <meshStandardMaterial color="#161b24" roughness={0.85} />
        </mesh>
        <mesh position={[1.72, 0.55, 0]} castShadow>
          <boxGeometry args={[0.3, 0.45, 1.9]} />
          <meshStandardMaterial color="#161b24" roughness={0.85} />
        </mesh>

        {/* Velvet Cushions */}
        <mesh position={[-1.1, 0.72, -0.52]} rotation={[0.15, 0.25, 0]}>
          <boxGeometry args={[0.48, 0.48, 0.18]} />
          <meshStandardMaterial color="#059669" roughness={0.7} />
        </mesh>
        <mesh position={[1.1, 0.72, -0.52]} rotation={[0.15, -0.2, 0]}>
          <boxGeometry args={[0.48, 0.48, 0.18]} />
          <meshStandardMaterial color="#d4af37" roughness={0.65} metalness={0.2} />
        </mesh>

        {/* Calacatta Gold Marble Coffee Table */}
        <group position={[0, 0.24, 1.45]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.9, 0.9, 0.07, 36]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.15} metalness={0.15} />
          </mesh>
          <mesh position={[0, -0.12, 0]}>
            <cylinderGeometry args={[0.55, 0.55, 0.2, 20]} />
            <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.25} />
          </mesh>
        </group>

        {/* Wool Rug */}
        <mesh position={[0, 0.02, 0.8]} receiveShadow>
          <boxGeometry args={[4.4, 0.02, 3.4]} />
          <meshStandardMaterial color="#334155" roughness={0.98} />
        </mesh>

        {/* Ceiling Warm Ring Chandelier */}
        <group position={[0, 2.2, 1.0]}>
          <mesh>
            <torusGeometry args={[0.7, 0.028, 16, 48]} />
            <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
          </mesh>
          <pointLight color="#fed7aa" intensity={1.6} distance={8} decay={2} />
        </group>
      </group>

      {/* ======================================================== */}
      {/* 4. MASTER BEDROOM SUITE & EXECUTIVE WORKSTATION */}
      {/* ======================================================== */}
      <group position={[-5.0, 0, 1.8]}>
        {/* Floating Solid Walnut Bed Platform */}
        <mesh position={[0, 0.26, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.6, 0.36, 2.8]} />
          <meshStandardMaterial color="#2d1c11" roughness={0.65} />
        </mesh>
        {/* Luxury Ergonomic Mattress & Duvet */}
        <mesh position={[0, 0.52, 0.1]} castShadow>
          <boxGeometry args={[2.4, 0.34, 2.5]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.85} />
        </mesh>
        {/* Emerald Velvet Tufted Headboard */}
        <mesh position={[0, 0.95, -1.28]} castShadow>
          <boxGeometry args={[2.8, 1.35, 0.18]} />
          <meshStandardMaterial color="#064e3b" roughness={0.7} />
        </mesh>
        {/* Pillows */}
        {[-0.65, 0.65].map((px) => (
          <mesh key={px} position={[px, 0.72, -0.85]} rotation={[-0.3, 0, 0]}>
            <boxGeometry args={[0.75, 0.22, 0.45]} />
            <meshStandardMaterial color="#ffffff" roughness={0.9} />
          </mesh>
        ))}

        {/* Bedside Nightstands & Warm Drop Pendants */}
        {[-1.6, 1.6].map((nx) => (
          <group key={nx} position={[nx, 0.28, -1.0]}>
            <mesh castShadow>
              <boxGeometry args={[0.55, 0.48, 0.55]} />
              <meshStandardMaterial color="#1e293b" roughness={0.8} />
            </mesh>
            <mesh position={[0, 1.6, 0]}>
              <cylinderGeometry args={[0.015, 0.015, 1.2, 8]} />
              <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.95, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.25, 16]} />
              <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
            </mesh>
            <pointLight color="#fde047" intensity={0.9} distance={5} position={[0, 0.8, 0]} />
          </group>
        ))}
      </group>

      {/* EXECUTIVE WORKSTATION / DESK */}
      <group position={[-5.2, 0, -2.5]}>
        {/* Walnut Executive Desk */}
        <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.06, 0.9]} />
          <meshStandardMaterial color="#332114" roughness={0.6} />
        </mesh>
        {/* Desk Legs */}
        {[-0.95, 0.95].map((lx) => (
          <mesh key={lx} position={[lx, 0.18, 0]} castShadow>
            <boxGeometry args={[0.06, 0.36, 0.8]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
          </mesh>
        ))}
        {/* Executive Leather Chair */}
        <group position={[0, 0, 0.65]} rotation={[0, Math.PI, 0]}>
          <mesh position={[0, 0.25, 0]} castShadow>
            <boxGeometry args={[0.55, 0.1, 0.55]} />
            <meshStandardMaterial color="#181e28" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.55, 0.22]} castShadow>
            <boxGeometry args={[0.55, 0.55, 0.1]} />
            <meshStandardMaterial color="#181e28" roughness={0.7} />
          </mesh>
        </group>
        {/* Modern Laptop on Desk */}
        <mesh position={[0, 0.42, 0]}>
          <boxGeometry args={[0.38, 0.015, 0.28]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Warm Desk Reading Lamp */}
        <pointLight color="#fde68a" intensity={0.8} distance={3.5} position={[-0.7, 0.8, 0]} />
      </group>

      {/* ======================================================== */}
      {/* 5. CHEF'S KITCHENETTE & WATERFALL ISLAND */}
      {/* ======================================================== */}
      <group position={[2.5, 0, -3.8]}>
        {/* Waterfall Island Counter (Calacatta White Marble) */}
        <mesh position={[0, 0.52, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.4, 0.98, 1.3]} />
          <meshStandardMaterial
            color="#f8fafc"
            roughness={0.2}
            metalness={0.15}
            envMapIntensity={1.0}
          />
        </mesh>
        {/* Under-counter Warm LED Glow Strip */}
        <pointLight color="#fef08a" intensity={1.1} distance={5} position={[0, 0.35, 0.75]} />

        {/* Modern Bar Stools */}
        {[-0.95, 0, 0.95].map((bx) => (
          <group key={bx} position={[bx, 0.36, 1.05]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.22, 0.22, 0.68, 16]} />
              <meshStandardMaterial color="#0f172a" roughness={0.8} />
            </mesh>
            <mesh position={[0, 0.36, 0]}>
              <cylinderGeometry args={[0.26, 0.26, 0.08, 16]} />
              <meshStandardMaterial color="#78350f" roughness={0.6} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ======================================================== */}
      {/* 6. CANTILEVER PRIVATE BALCONY DECK */}
      {/* ======================================================== */}
      <group position={[2.8, -0.06, 7.2]}>
        {/* Balcony Solid Cedar Decking Planks */}
        <mesh receiveShadow>
          <boxGeometry args={[8.4, 0.16, 3.0]} />
          <meshStandardMaterial color="#3b2210" roughness={0.6} />
        </mesh>

        {/* Reflective Glass Windscreen Balustrade */}
        <mesh position={[0, 0.68, 1.45]}>
          <boxGeometry args={[8.4, 1.15, 0.05]} />
          <meshPhysicalMaterial
            color="#bae6fd"
            transparent
            opacity={0.25}
            roughness={0.05}
            transmission={0.92}
            reflectivity={0.7}
          />
        </mesh>

        {/* Balcony Brushed Gold Top Handrail */}
        <mesh position={[0, 1.28, 1.45]}>
          <boxGeometry args={[8.5, 0.06, 0.1]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* 2 Modern Alpine Lounge Chairs overlooking mountain vista */}
        {[-1.8, 1.8].map((cx) => (
          <group key={cx} position={[cx, 0.36, 0.2]} rotation={[0, cx > 0 ? -0.22 : 0.22, 0]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.9, 0.48, 0.9]} />
              <meshStandardMaterial color="#1e293b" roughness={0.8} />
            </mesh>
            <mesh position={[0, 0.38, -0.38]} castShadow>
              <boxGeometry args={[0.9, 0.7, 0.16]} />
              <meshStandardMaterial color="#0f172a" roughness={0.8} />
            </mesh>
          </group>
        ))}

        {/* Balcony Small Round Drink Table */}
        <group position={[0, 0.25, 0.2]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.3, 0.3, 0.04, 24]} />
            <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.25} />
          </mesh>
          <mesh position={[0, -0.12, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.24, 12]} />
            <meshStandardMaterial color="#111827" metalness={0.9} />
          </mesh>
        </group>
      </group>
    </group>
  );
};
