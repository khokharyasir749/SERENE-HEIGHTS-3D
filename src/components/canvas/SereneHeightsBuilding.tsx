import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  getStoneTextures,
  getWoodTextures,
  getLimestoneTextures,
} from '../../utils/textureGenerator';

interface BuildingProps {
  tierOffsets?: {
    tier1: number;
    tier2: number;
    tier3: number;
    tier4: number;
  };
}

// -----------------------------------------------------------------------------
// REUSABLE 3D ARCHITECTURAL COMPONENTS
// -----------------------------------------------------------------------------

/**
 * Cantilevered Balcony with Black Wrought-Iron Railings & Gold Finials
 */
const CantileveredBalcony: React.FC<{
  position: [number, number, number];
  width: number;
  depth?: number;
  stoneTextures: any;
}> = ({ position, width, depth = 1.6, stoneTextures }) => {
  const numPickets = Math.floor(width * 4.0);
  const picketSpacing = (width - 0.2) / (numPickets - 1);

  return (
    <group position={position}>
      {/* 1. Cantilevered Stone Deck Slab */}
      <mesh position={[0, -0.08, depth / 2]} castShadow receiveShadow>
        <boxGeometry args={[width, 0.16, depth]} />
        <meshStandardMaterial
          map={stoneTextures.map}
          bumpMap={stoneTextures.bumpMap}
          bumpScale={0.06}
          color="#dfd5c4"
          roughness={0.7}
        />
      </mesh>

      {/* Decorative Gold/Bronze Under-Trim */}
      <mesh position={[0, -0.17, depth / 2]} castShadow>
        <boxGeometry args={[width + 0.05, 0.03, depth + 0.03]} />
        <meshStandardMaterial color="#c59b27" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Underside Warm LED Downlight Strip */}
      <mesh position={[0, -0.19, depth / 2]}>
        <boxGeometry args={[width * 0.85, 0.015, 0.05]} />
        <meshStandardMaterial color="#ffa726" emissive="#ff9800" emissiveIntensity={2.5} />
      </mesh>

      {/* 2. Black Wrought-Iron Railing Frame */}
      {/* Top Molded Handrail */}
      <mesh position={[0, 0.72, depth - 0.04]} castShadow>
        <boxGeometry args={[width, 0.035, 0.05]} />
        <meshStandardMaterial color="#18181b" metalness={0.88} roughness={0.2} />
      </mesh>

      {/* Bottom Base Rail */}
      <mesh position={[0, 0.06, depth - 0.04]} castShadow>
        <boxGeometry args={[width, 0.025, 0.035]} />
        <meshStandardMaterial color="#18181b" metalness={0.88} roughness={0.2} />
      </mesh>

      {/* Corner Posts with Gold Finials */}
      {[-width / 2, width / 2].map((px) => (
        <group key={px} position={[px, 0.38, depth - 0.04]}>
          <mesh castShadow>
            <boxGeometry args={[0.05, 0.76, 0.05]} />
            <meshStandardMaterial color="#18181b" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.41, 0]} castShadow>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.15} />
          </mesh>
        </group>
      ))}

      {/* Vertical Wrought-Iron Pickets */}
      {Array.from({ length: numPickets }).map((_, i) => {
        const px = -width / 2 + 0.1 + i * picketSpacing;
        return (
          <mesh key={i} position={[px, 0.38, depth - 0.04]} castShadow>
            <boxGeometry args={[0.018, 0.66, 0.018]} />
            <meshStandardMaterial color="#18181b" metalness={0.88} roughness={0.2} />
          </mesh>
        );
      })}

      {/* Side Return Railings */}
      {[-width / 2, width / 2].map((sx) => (
        <group key={sx} position={[sx, 0, depth / 2]}>
          <mesh position={[0, 0.72, 0]} castShadow>
            <boxGeometry args={[0.035, 0.035, depth - 0.08]} />
            <meshStandardMaterial color="#18181b" metalness={0.88} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.06, 0]} castShadow>
            <boxGeometry args={[0.025, 0.025, depth - 0.08]} />
            <meshStandardMaterial color="#18181b" metalness={0.88} roughness={0.2} />
          </mesh>
          {[-depth * 0.25, 0, depth * 0.25].map((pz, idx) => (
            <mesh key={idx} position={[0, 0.38, pz]} castShadow>
              <boxGeometry args={[0.018, 0.66, 0.018]} />
              <meshStandardMaterial color="#18181b" metalness={0.88} roughness={0.2} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
};

/**
 * Continuous Central Roman-Arched French Window Bay
 */
const ArchedWindowBay: React.FC<{
  position: [number, number, number];
  width: number;
  height: number;
  limestoneTextures: any;
}> = ({ position, width, height, limestoneTextures }) => {
  return (
    <group position={position}>
      {/* Recessed Warm Interior Glazing Panel */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[width - 0.3, height - 0.2]} />
        <meshStandardMaterial
          color="#ffb74d"
          emissive="#ffa726"
          emissiveIntensity={1.8}
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>

      {/* Dark Window Frame & Muntins */}
      <mesh position={[0, 0, 0.01]}>
        <boxGeometry args={[width - 0.25, height - 0.15, 0.04]} />
        <meshStandardMaterial color="#1c1917" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Vertical Mullion Slits */}
      {[-0.65, 0, 0.65].map((mx) => (
        <mesh key={mx} position={[mx, 0, 0.04]}>
          <boxGeometry args={[0.05, height - 0.1, 0.05]} />
          <meshStandardMaterial color="#18181b" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* Protruding Limestone Arch Surround Header */}
      <mesh position={[0, height / 2 + 0.1, 0.12]} castShadow receiveShadow>
        <boxGeometry args={[width + 0.2, 0.24, 0.28]} />
        <meshStandardMaterial
          map={limestoneTextures.map}
          bumpMap={limestoneTextures.bumpMap}
          bumpScale={0.05}
          color="#f3ede2"
          roughness={0.65}
        />
      </mesh>

      {/* Keystone Accent on Arch Center */}
      <mesh position={[0, height / 2 + 0.15, 0.28]} castShadow>
        <boxGeometry args={[0.22, 0.32, 0.12]} />
        <meshStandardMaterial color="#c59b27" metalness={0.8} roughness={0.25} />
      </mesh>

      {/* Protruding Vertical Framing Pilasters */}
      {[-width / 2 - 0.05, width / 2 + 0.05].map((px) => (
        <mesh key={px} position={[px, 0, 0.12]} castShadow receiveShadow>
          <boxGeometry args={[0.22, height + 0.2, 0.24]} />
          <meshStandardMaterial
            map={limestoneTextures.map}
            bumpMap={limestoneTextures.bumpMap}
            color="#ede5d8"
            roughness={0.7}
          />
        </mesh>
      ))}
    </group>
  );
};

/**
 * Classical Carriage Lamp for Ground Foundation
 */
const CarriageLamp: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.035, 0.05, 1.8, 8]} />
        <meshStandardMaterial color="#18181b" metalness={0.9} roughness={0.2} />
      </mesh>
      <group position={[0, 0.95, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.2, 0.28, 0.2]} />
          <meshStandardMaterial color="#18181b" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial color="#ffeedd" emissive="#ffa726" emissiveIntensity={3.2} />
        </mesh>
      </group>
    </group>
  );
};

/**
 * Exterior Architectural Brass Wall Sconce
 */
const ArchitecturalWallSconce: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[0.1, 0.25, 0.08]} />
        <meshStandardMaterial color="#c59b27" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.14, 0.04]}>
        <cylinderGeometry args={[0.03, 0.04, 0.08, 12]} />
        <meshStandardMaterial color="#ffeedd" emissive="#ffb74d" emissiveIntensity={2.5} />
      </mesh>
      <mesh position={[0, -0.14, 0.04]}>
        <cylinderGeometry args={[0.04, 0.03, 0.08, 12]} />
        <meshStandardMaterial color="#ffeedd" emissive="#ffb74d" emissiveIntensity={2.5} />
      </mesh>
    </group>
  );
};

// -----------------------------------------------------------------------------
// MAIN COMPONENT: COHESIVE 3D SERENE HEIGHTS CHALET (4 MODULAR ASSEMBLING TIERS)
// -----------------------------------------------------------------------------

export const SereneHeightsBuilding: React.FC<BuildingProps> = ({ tierOffsets }) => {
  const fireLightRef = useRef<THREE.PointLight>(null);
  const foyerLightRef = useRef<THREE.PointLight>(null);
  const bayGlowRef = useRef<THREE.PointLight>(null);

  // Smooth lerped suspension offsets
  const currentOffsets = useRef({
    tier1: 0,
    tier2: 10,
    tier3: 20,
    tier4: 30,
  });

  const stoneTextures = useMemo(() => getStoneTextures(), []);
  const woodTextures = useMemo(() => getWoodTextures(), []);
  const limestoneTextures = useMemo(() => getLimestoneTextures(), []);

  // Frame animation loop
  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    if (fireLightRef.current) {
      fireLightRef.current.intensity = 2.4 + Math.sin(t * 5.0) * 0.4 + Math.cos(t * 3.2) * 0.3;
    }
    if (foyerLightRef.current) {
      foyerLightRef.current.intensity = 2.8 + Math.sin(t * 1.8) * 0.2;
    }
    if (bayGlowRef.current) {
      bayGlowRef.current.intensity = 2.2 + Math.sin(t * 2.2) * 0.25;
    }

    if (tierOffsets) {
      const lerpSpeed = Math.min(delta * 5.5, 0.22);
      currentOffsets.current.tier1 = THREE.MathUtils.lerp(currentOffsets.current.tier1, tierOffsets.tier1, lerpSpeed);
      currentOffsets.current.tier2 = THREE.MathUtils.lerp(currentOffsets.current.tier2, tierOffsets.tier2, lerpSpeed);
      currentOffsets.current.tier3 = THREE.MathUtils.lerp(currentOffsets.current.tier3, tierOffsets.tier3, lerpSpeed);
      currentOffsets.current.tier4 = THREE.MathUtils.lerp(currentOffsets.current.tier4, tierOffsets.tier4, lerpSpeed);
    }
  });

  const t1Y = tierOffsets ? currentOffsets.current.tier1 : 0;
  const t2Y = tierOffsets ? currentOffsets.current.tier2 : 0;
  const t3Y = tierOffsets ? currentOffsets.current.tier3 : 0;
  const t4Y = tierOffsets ? currentOffsets.current.tier4 : 0;

  return (
    <group position={[0, -2.5, 0]}>
      {/* ========================================================================= */}
      {/* TIER 1: GROUND FOUNDATION, RETAINING BASE & GRAND ARRIVAL (y: 0 to 4.2)    */}
      {/* ========================================================================= */}
      <group position={[0, t1Y, 0]}>
        {/* Snow Slope & Terrain Retaining Foundation Base */}
        <mesh position={[0, -0.6, 0.5]} receiveShadow>
          <boxGeometry args={[22.0, 1.2, 14.0]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.8} />
        </mesh>

        {/* Schist / Charcoal Stone Retaining Wall Podium */}
        <mesh position={[0, 1.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[18.4, 2.8, 10.4]} />
          <meshStandardMaterial
            map={stoneTextures.map}
            bumpMap={stoneTextures.bumpMap}
            bumpScale={0.08}
            roughness={0.85}
          />
        </mesh>

        {/* Stone Podium Cap / Transition Molding */}
        <mesh position={[0, 2.85, 0.05]} castShadow receiveShadow>
          <boxGeometry args={[18.8, 0.2, 10.8]} />
          <meshStandardMaterial
            map={limestoneTextures.map}
            bumpMap={limestoneTextures.bumpMap}
            color="#dfd5c4"
            roughness={0.7}
          />
        </mesh>

        {/* Grand Arched Porte-Cochère Canopy & Foyer Entrance */}
        <group position={[0, 1.4, 5.2]}>
          {/* Foyer Recessed Double Glass Entrance */}
          <mesh position={[0, 0, 0.1]}>
            <planeGeometry args={[4.4, 2.4]} />
            <meshStandardMaterial
              color="#fed7aa"
              emissive="#ff9800"
              emissiveIntensity={2.0}
              roughness={0.15}
            />
          </mesh>

          {/* Dark Glass Entrance Frame */}
          <mesh position={[0, 0, 0.15]}>
            <boxGeometry args={[4.5, 2.45, 0.06]} />
            <meshStandardMaterial color="#18181b" metalness={0.85} roughness={0.2} />
          </mesh>

          {/* Cantilevered Porte-Cochère Canopy Roof */}
          <mesh position={[0, 1.35, 1.2]} castShadow receiveShadow>
            <boxGeometry args={[7.2, 0.2, 2.4]} />
            <meshStandardMaterial color="#1c1917" metalness={0.85} roughness={0.3} />
          </mesh>

          {/* Gold Trim Fascia on Canopy Header */}
          <mesh position={[0, 1.35, 2.42]} castShadow>
            <boxGeometry args={[7.25, 0.22, 0.06]} />
            <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.15} />
          </mesh>

          {/* Supporting Entrance Columns */}
          {[-3.2, 3.2].map((cx) => (
            <mesh key={cx} position={[cx, 0, 2.2]} castShadow receiveShadow>
              <cylinderGeometry args={[0.2, 0.24, 2.6, 16]} />
              <meshStandardMaterial
                map={limestoneTextures.map}
                bumpMap={limestoneTextures.bumpMap}
                color="#ede5d8"
                roughness={0.65}
              />
            </mesh>
          ))}

          {/* Foyer Warm Glow Light */}
          <pointLight
            ref={foyerLightRef}
            color="#fed7aa"
            intensity={2.8}
            distance={16}
            decay={2}
            position={[0, 0.8, 1.2]}
          />
        </group>

        {/* Classical Carriage Lantern Lamp Posts */}
        {[-8.5, -4.5, 4.5, 8.5].map((lx) => (
          <CarriageLamp key={lx} position={[lx, 0.9, 6.2]} />
        ))}
      </group>

      {/* ========================================================================= */}
      {/* TIER 2: LOWER SERVICED SUITES (Floors 1 to 3, y: 4.2 to 10.8)             */}
      {/* ========================================================================= */}
      <group
        position={[0, t2Y, 0]}
        rotation={[tierOffsets ? Math.min(0.08, currentOffsets.current.tier2 * 0.005) : 0, 0, 0]}
      >
        {/* Main Solid Cream Limestone Wall Facade (Floors 1–3) */}
        <mesh position={[0, 6.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[18.0, 6.4, 10.0]} />
          <meshStandardMaterial
            map={limestoneTextures.map}
            bumpMap={limestoneTextures.bumpMap}
            bumpScale={0.06}
            color="#ede5d8"
            roughness={0.7}
          />
        </mesh>

        {/* Horizontal Floor Moldings / Cornice Bands between Floors */}
        {[5.2, 7.3, 9.4].map((fy) => (
          <mesh key={fy} position={[0, fy, 0.05]} castShadow receiveShadow>
            <boxGeometry args={[18.2, 0.14, 10.2]} />
            <meshStandardMaterial color="#dfd5c4" roughness={0.65} />
          </mesh>
        ))}

        {/* Central Multi-Tiered Continuous Roman-Arched French Window Bays */}
        {[
          { level: 1, y: 4.2 },
          { level: 2, y: 6.3 },
          { level: 3, y: 8.4 },
        ].map((floor) => (
          <group key={floor.level} position={[0, floor.y, 0]}>
            {/* Center Arched Bay Window */}
            <ArchedWindowBay
              position={[0, 0.9, 5.02]}
              width={2.8}
              height={1.8}
              limestoneTextures={limestoneTextures}
            />

            {/* Symmetrical Left Wing Suites: Window + Cantilevered Balcony */}
            <group position={[-5.4, 0.9, 5.02]}>
              <mesh position={[0, 0, -0.05]}>
                <planeGeometry args={[3.6, 1.8]} />
                <meshStandardMaterial
                  color="#ffb74d"
                  emissive="#ffa726"
                  emissiveIntensity={1.6}
                  roughness={0.1}
                />
              </mesh>
              <mesh position={[0, 0, 0.01]}>
                <boxGeometry args={[3.65, 1.85, 0.04]} />
                <meshStandardMaterial color="#1c1917" roughness={0.3} metalness={0.7} />
              </mesh>
            </group>
            <CantileveredBalcony
              position={[-5.4, 0, 5.05]}
              width={4.2}
              depth={1.7}
              stoneTextures={stoneTextures}
            />

            {/* Symmetrical Right Wing Suites: Window + Cantilevered Balcony */}
            <group position={[5.4, 0.9, 5.02]}>
              <mesh position={[0, 0, -0.05]}>
                <planeGeometry args={[3.6, 1.8]} />
                <meshStandardMaterial
                  color="#ffb74d"
                  emissive="#ffa726"
                  emissiveIntensity={1.6}
                  roughness={0.1}
                />
              </mesh>
              <mesh position={[0, 0, 0.01]}>
                <boxGeometry args={[3.65, 1.85, 0.04]} />
                <meshStandardMaterial color="#1c1917" roughness={0.3} metalness={0.7} />
              </mesh>
            </group>
            <CantileveredBalcony
              position={[5.4, 0, 5.05]}
              width={4.2}
              depth={1.7}
              stoneTextures={stoneTextures}
            />

            {/* Brass Wall Sconces flanking central bay */}
            <ArchitecturalWallSconce position={[-2.0, 1.0, 5.12]} />
            <ArchitecturalWallSconce position={[2.0, 1.0, 5.12]} />
          </group>
        ))}

        {/* Ambient Bay Light Glow */}
        <pointLight
          ref={bayGlowRef}
          color="#ffb74d"
          intensity={2.2}
          distance={18}
          decay={2}
          position={[0, 7.0, 6.0]}
        />
      </group>

      {/* ========================================================================= */}
      {/* TIER 3: UPPER MOUNTAIN RESIDENCES (Floors 4 to 6, y: 10.8 to 17.2)        */}
      {/* ========================================================================= */}
      <group
        position={[0, t3Y, 0]}
        rotation={[tierOffsets ? Math.min(0.08, currentOffsets.current.tier3 * 0.004) : 0, 0, 0]}
      >
        {/* Main Solid Cream Limestone Wall Facade (Floors 4–6) */}
        <mesh position={[0, 13.0, 0]} castShadow receiveShadow>
          <boxGeometry args={[17.6, 6.2, 9.6]} />
          <meshStandardMaterial
            map={limestoneTextures.map}
            bumpMap={limestoneTextures.bumpMap}
            bumpScale={0.06}
            color="#ede5d8"
            roughness={0.7}
          />
        </mesh>

        {/* Horizontal Floor Moldings */}
        {[11.8, 13.9, 16.0].map((fy) => (
          <mesh key={fy} position={[0, fy, 0.05]} castShadow receiveShadow>
            <boxGeometry args={[17.8, 0.14, 9.8]} />
            <meshStandardMaterial color="#dfd5c4" roughness={0.65} />
          </mesh>
        ))}

        {/* Upper Continuous Roman-Arched French Window Bays & Balconies */}
        {[
          { level: 4, y: 10.8 },
          { level: 5, y: 12.9 },
          { level: 6, y: 15.0 },
        ].map((floor) => (
          <group key={floor.level} position={[0, floor.y, 0]}>
            {/* Center Arched Bay Window */}
            <ArchedWindowBay
              position={[0, 0.9, 4.82]}
              width={2.7}
              height={1.75}
              limestoneTextures={limestoneTextures}
            />

            {/* Left Wing Upper Balcony & Window */}
            <group position={[-5.2, 0.9, 4.82]}>
              <mesh position={[0, 0, -0.05]}>
                <planeGeometry args={[3.5, 1.75]} />
                <meshStandardMaterial
                  color="#ffb74d"
                  emissive="#ffa726"
                  emissiveIntensity={1.7}
                  roughness={0.1}
                />
              </mesh>
              <mesh position={[0, 0, 0.01]}>
                <boxGeometry args={[3.55, 1.8, 0.04]} />
                <meshStandardMaterial color="#1c1917" roughness={0.3} metalness={0.7} />
              </mesh>
            </group>
            <CantileveredBalcony
              position={[-5.2, 0, 4.85]}
              width={4.0}
              depth={1.65}
              stoneTextures={stoneTextures}
            />

            {/* Right Wing Upper Balcony & Window */}
            <group position={[5.2, 0.9, 4.82]}>
              <mesh position={[0, 0, -0.05]}>
                <planeGeometry args={[3.5, 1.75]} />
                <meshStandardMaterial
                  color="#ffb74d"
                  emissive="#ffa726"
                  emissiveIntensity={1.7}
                  roughness={0.1}
                />
              </mesh>
              <mesh position={[0, 0, 0.01]}>
                <boxGeometry args={[3.55, 1.8, 0.04]} />
                <meshStandardMaterial color="#1c1917" roughness={0.3} metalness={0.7} />
              </mesh>
            </group>
            <CantileveredBalcony
              position={[5.2, 0, 4.85]}
              width={4.0}
              depth={1.65}
              stoneTextures={stoneTextures}
            />

            {/* Brass Wall Sconces */}
            <ArchitecturalWallSconce position={[-1.9, 1.0, 4.92]} />
            <ArchitecturalWallSconce position={[1.9, 1.0, 4.92]} />
          </group>
        ))}
      </group>

      {/* ========================================================================= */}
      {/* TIER 4: ROYAL PENTHOUSE CROWN, CORNICE & ROOFTOP PERGOLA (y: 17.2 to 24)  */}
      {/* ========================================================================= */}
      <group
        position={[0, t4Y, 0]}
        rotation={[tierOffsets ? Math.min(0.08, currentOffsets.current.tier4 * 0.003) : 0, 0, 0]}
      >
        {/* Penthouse Suite Walls (Floor 7–8) */}
        <mesh position={[0, 18.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[17.0, 2.8, 9.0]} />
          <meshStandardMaterial
            map={limestoneTextures.map}
            bumpMap={limestoneTextures.bumpMap}
            color="#ede5d8"
            roughness={0.7}
          />
        </mesh>

        {/* Penthouse Panoramic Glazed French Suites */}
        {[-4.8, 0, 4.8].map((px) => (
          <group key={px} position={[px, 18.5, 4.52]}>
            <mesh position={[0, 0, -0.05]}>
              <planeGeometry args={[3.8, 2.2]} />
              <meshStandardMaterial
                color="#ffe0b2"
                emissive="#ff9800"
                emissiveIntensity={2.2}
                roughness={0.1}
              />
            </mesh>
            <mesh position={[0, 0, 0.02]}>
              <boxGeometry args={[3.85, 2.25, 0.05]} />
              <meshStandardMaterial color="#18181b" metalness={0.9} roughness={0.2} />
            </mesh>
          </group>
        ))}

        {/* Penthouse Cantilevered Balconies */}
        <CantileveredBalcony
          position={[-4.8, 17.4, 4.55]}
          width={4.2}
          depth={1.6}
          stoneTextures={stoneTextures}
        />
        <CantileveredBalcony
          position={[4.8, 17.4, 4.55]}
          width={4.2}
          depth={1.6}
          stoneTextures={stoneTextures}
        />

        {/* Classical Grand Stepped Cornice Header */}
        <mesh position={[0, 20.05, 0]} castShadow receiveShadow>
          <boxGeometry args={[17.6, 0.35, 9.6]} />
          <meshStandardMaterial color="#dfd5c4" roughness={0.65} />
        </mesh>
        <mesh position={[0, 20.25, 0]} castShadow>
          <boxGeometry args={[17.8, 0.12, 9.8]} />
          <meshStandardMaterial color="#c59b27" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Corner Decorative Finials / Urns */}
        {[-8.5, 8.5].map((cx) =>
          [-4.5, 4.5].map((cz) => (
            <group key={`${cx}-${cz}`} position={[cx, 20.5, cz]}>
              <mesh castShadow>
                <boxGeometry args={[0.3, 0.4, 0.3]} />
                <meshStandardMaterial color="#dfd5c4" roughness={0.7} />
              </mesh>
              <mesh position={[0, 0.3, 0]} castShadow>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.15} />
              </mesh>
            </group>
          ))
        )}

        {/* Rooftop Sky Terrace: Open Timber Pergola Dining Canopy */}
        <group position={[-3.6, 21.0, 0]}>
          {/* Pergola Dark Steel Columns */}
          {[-2.6, 2.6].map((px) =>
            [-2.6, 2.6].map((pz) => (
              <mesh key={`${px}-${pz}`} position={[px, 1.2, pz]} castShadow receiveShadow>
                <boxGeometry args={[0.16, 2.4, 0.16]} />
                <meshStandardMaterial color="#18181b" metalness={0.9} roughness={0.2} />
              </mesh>
            ))
          )}

          {/* Exposed Cedar Timber Louver Beams */}
          {[-2.6, -1.5, -0.4, 0.7, 1.8, 2.6].map((pz) => (
            <mesh key={pz} position={[0, 2.45, pz]} castShadow receiveShadow>
              <boxGeometry args={[5.8, 0.14, 0.22]} />
              <meshStandardMaterial
                map={woodTextures.map}
                bumpMap={woodTextures.bumpMap}
                color="#4a3321"
                roughness={0.65}
              />
            </mesh>
          ))}
        </group>

        {/* Sunken Basalt Fire Pit & Social Lounge */}
        <group position={[3.6, 20.3, 0]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[1.4, 1.6, 0.4, 32]} />
            <meshStandardMaterial map={stoneTextures.map} roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.24, 0]}>
            <coneGeometry args={[0.55, 0.7, 16]} />
            <meshBasicMaterial color="#ff7a18" />
          </mesh>
          <pointLight
            ref={fireLightRef}
            color="#ff8c2b"
            intensity={2.8}
            distance={16}
            decay={2}
            position={[0, 0.6, 0]}
          />
        </group>
      </group>
    </group>
  );
};
