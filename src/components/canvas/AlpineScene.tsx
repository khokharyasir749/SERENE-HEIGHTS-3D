import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { LightingRig } from './LightingRig';
import { SnowAtmosphere } from './SnowAtmosphere';
import { PostProcessingEffects } from './PostProcessingEffects';

export const AlpineScene: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-[5]">
      <Canvas
        dpr={[1, 2]}
        gl={{
          alpha: true,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
          powerPreference: 'high-performance',
        }}
        camera={{
          position: [0, 0, 18],
          fov: 45,
          near: 0.1,
          far: 200,
        }}
      >
        <Suspense fallback={null}>
          {/* Dynamic Weather & Atmospheric Lighting */}
          <LightingRig />

          {/* High-Altitude Ambient Snowfall Particles */}
          <SnowAtmosphere />

          {/* Cinematic Bloom & Vignette */}
          <PostProcessingEffects />
        </Suspense>
      </Canvas>
    </div>
  );
};
