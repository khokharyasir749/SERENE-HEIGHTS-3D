import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useTourStore } from '../../store/useTourStore';
import { getAlpineTerrainTextures, getStoneTextures } from '../../utils/textureGenerator';

export const MountainTerrain: React.FC = () => {
  const weatherMode = useTourStore((state) => state.weatherLightingMode);

  const terrainTextures = useMemo(() => getAlpineTerrainTextures(), []);
  const stoneTextures = useMemo(() => getStoneTextures(), []);

  // High-density procedural alpine terrain
  const terrainGeometry = useMemo(() => {
    const size = 360;
    const segments = 140;
    const geom = new THREE.PlaneGeometry(size, size, segments, segments);
    geom.rotateX(-Math.PI / 2);

    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);

      const dist = Math.sqrt(x * x + z * z);

      // Primary mountain ridges (Mukshpuri & Miranjani alpine range)
      const ridge1 = Math.sin(x * 0.018 + 1.2) * Math.cos(z * 0.018 - 0.5) * 28;
      const ridge2 = Math.sin(x * 0.045 - 0.8) * Math.sin(z * 0.045 + 1.1) * 14;
      const ridge3 = Math.cos(x * 0.09) * Math.sin(z * 0.09) * 5;
      const micro = Math.cos(x * 0.2) * Math.sin(z * 0.2) * 1.5;

      // Distant dramatic mountain rim
      const distantRim = Math.pow(dist / 130, 2.4) * 52;

      // Smooth plateau clearing for the luxury resort podium & driveway
      const bowlFactor = Math.min(1, Math.max(0, (dist - 18) / 55));

      let height = (ridge1 + ridge2 + ridge3 + micro) * bowlFactor + distantRim - 9.5;

      // Flat leveled resort plateau (South access road)
      if (dist < 26) {
        if (z > 4 && Math.abs(x) < 16) {
          height = -3.2; // Gentle access road grade
        } else {
          height = -3.8 + Math.sin(x * 0.1) * 0.15;
        }
      }

      pos.setY(i, height);
    }

    geom.computeVertexNormals();
    return geom;
  }, []);

  // Material color schemes based on weather preset
  const { groundColor, rockColor, grassColor } = useMemo(() => {
    switch (weatherMode) {
      case 'SNOWY_WINTER':
        return {
          groundColor: '#d6e2e8', // Snowy powder blanket
          rockColor: '#525d66',   // Cold slate rock outcroppings
          grassColor: '#8da298',  // Frost-covered pine turf
        };
      case 'GOLDEN_HOUR':
        return {
          groundColor: '#253d26', // Warm golden-lit alpine moss
          rockColor: '#4d3a2b',   // Warm limestone cliffs
          grassColor: '#3d6138',  // Sun-kissed pine grass
        };
      case 'MORNING_MIST':
      default:
        return {
          groundColor: '#1a3322', // Deep emerald alpine grass
          rockColor: '#374148',   // Wet grey mountain schist
          grassColor: '#24472f',  // Lush pine turf
        };
    }
  }, [weatherMode]);

  return (
    <group>
      {/* 1. Main Alpine Mountain Terrain with Procedural PBR Terrain Texture */}
      <mesh
        geometry={terrainGeometry}
        receiveShadow
        position={[0, 0, 0]}
      >
        <meshStandardMaterial
          map={weatherMode === 'SNOWY_WINTER' ? undefined : terrainTextures.map}
          bumpMap={terrainTextures.bumpMap}
          bumpScale={0.12}
          color={groundColor}
          roughness={0.88}
          metalness={0.08}
          flatShading={false}
          envMapIntensity={0.5}
        />
      </mesh>

      {/* 2. Layered Distant Himalayan Mountain Ridges (Mukshpuri Silhouette) */}
      <mesh position={[0, 18, -210]}>
        <coneGeometry args={[140, 110, 6]} />
        <meshStandardMaterial
          color={weatherMode === 'SNOWY_WINTER' ? '#ccd5dc' : rockColor}
          roughness={0.95}
          fog={true}
        />
      </mesh>
      <mesh position={[-180, 28, -130]} rotation={[0, 0.5, 0]}>
        <coneGeometry args={[150, 120, 6]} />
        <meshStandardMaterial
          color={weatherMode === 'SNOWY_WINTER' ? '#cfdbe3' : rockColor}
          roughness={0.95}
          fog={true}
        />
      </mesh>
      <mesh position={[170, 24, -140]} rotation={[0, -0.7, 0]}>
        <coneGeometry args={[140, 105, 6]} />
        <meshStandardMaterial
          color={weatherMode === 'SNOWY_WINTER' ? '#d4dee6' : rockColor}
          roughness={0.95}
          fog={true}
        />
      </mesh>

      {/* 3. Resort Stone Retaining Wall & Driveway Approach */}
      <group position={[0, 0, 0]}>
        {/* Driveway Asphalt / Stone Pavement Approach */}
        <mesh position={[0, -3.4, 18]} receiveShadow>
          <boxGeometry args={[18, 0.25, 22]} />
          <meshStandardMaterial color="#1f242b" roughness={0.92} metalness={0.1} />
        </mesh>

        {/* Terraced Alpine Schist Retaining Walls with PBR Masonry Texture */}
        <mesh position={[0, -2.4, 28]} receiveShadow castShadow>
          <boxGeometry args={[36, 1.6, 2.0]} />
          <meshStandardMaterial
            map={stoneTextures.map}
            bumpMap={stoneTextures.bumpMap}
            bumpScale={0.08}
            roughness={0.9}
          />
        </mesh>
        <mesh position={[-14, -2.4, 16]} rotation={[0, 0.4, 0]} receiveShadow castShadow>
          <boxGeometry args={[14, 1.6, 1.8]} />
          <meshStandardMaterial
            map={stoneTextures.map}
            bumpMap={stoneTextures.bumpMap}
            bumpScale={0.08}
            roughness={0.9}
          />
        </mesh>
        <mesh position={[14, -2.4, 16]} rotation={[0, -0.4, 0]} receiveShadow castShadow>
          <boxGeometry args={[14, 1.6, 1.8]} />
          <meshStandardMaterial
            map={stoneTextures.map}
            bumpMap={stoneTextures.bumpMap}
            bumpScale={0.08}
            roughness={0.9}
          />
        </mesh>

        {/* Landscaped Pine Bedding Strips with Curbs */}
        {[-8.5, 8.5].map((lx) => (
          <group key={lx} position={[lx, -3.1, 16]}>
            <mesh receiveShadow>
              <boxGeometry args={[2.5, 0.35, 14]} />
              <meshStandardMaterial color="#2a1f18" roughness={0.95} />
            </mesh>
            <mesh position={[0, 0.22, 0]} castShadow>
              <boxGeometry args={[2.2, 0.18, 13.6]} />
              <meshStandardMaterial color={grassColor} roughness={0.9} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};
