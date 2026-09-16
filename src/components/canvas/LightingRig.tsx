import React, { useMemo } from 'react';
import { useTourStore } from '../../store/useTourStore';

export const LightingRig: React.FC = () => {
  const weatherMode = useTourStore((state) => state.weatherLightingMode);

  // Dynamic parameters per weather lighting preset (calibrated to the official twilight photograph)
  const config = useMemo(() => {
    switch (weatherMode) {
      case 'MORNING_MIST':
        return {
          sunPosition: [45, 30, 40] as [number, number, number],
          sunColor: '#fff5e6',
          sunIntensity: 2.8,
          moonPosition: [-40, 35, 25] as [number, number, number],
          moonColor: '#bae6fd',
          moonIntensity: 1.2,
          ambientColor: '#64748b',
          ambientIntensity: 0.85,
          hemiSky: '#bfdbfe',
          hemiGround: '#1e293b',
          hemiIntensity: 0.8,
          interiorGlow: '#ffa726',
          interiorIntensity: 1.8,
        };
      case 'SNOWY_WINTER':
        return {
          sunPosition: [40, 45, 35] as [number, number, number],
          sunColor: '#fed7aa',
          sunIntensity: 2.9,
          moonPosition: [-45, 40, 25] as [number, number, number],
          moonColor: '#cbd5e1',
          moonIntensity: 1.5,
          ambientColor: '#64748b',
          ambientIntensity: 0.9,
          hemiSky: '#e2e8f0',
          hemiGround: '#334155',
          hemiIntensity: 0.9,
          interiorGlow: '#ffa726',
          interiorIntensity: 2.2,
        };
      case 'GOLDEN_HOUR':
      default:
        // Authentic Alpine Twilight Sunset: Indigo Moonlight (Left) + Warm Sunset Rim (Right)
        return {
          sunPosition: [55, 20, 38] as [number, number, number],
          sunColor: '#ff9233', // Warm golden-pink alpine sunset
          sunIntensity: 3.5,
          moonPosition: [-50, 38, 28] as [number, number, number],
          moonColor: '#93c5fd', // Cool twilight indigo moonlight
          moonIntensity: 1.6,
          ambientColor: '#475569',
          ambientIntensity: 0.8,
          hemiSky: '#a5b4fc',
          hemiGround: '#1e293b',
          hemiIntensity: 0.85,
          interiorGlow: '#ffa726',
          interiorIntensity: 2.4,
        };
    }
  }, [weatherMode]);

  return (
    <>
      {/* 1. Primary Directional Sunset Sun Light (From Right) with Soft High-Res Shadows */}
      <directionalLight
        position={config.sunPosition}
        intensity={config.sunIntensity}
        color={config.sunColor}
        castShadow
        shadow-mapSize={[4096, 4096]}
        shadow-camera-near={0.5}
        shadow-camera-far={240}
        shadow-camera-left={-35}
        shadow-camera-right={35}
        shadow-camera-top={35}
        shadow-camera-bottom={-35}
        shadow-bias={-0.00012}
        shadow-radius={2.5}
      />

      {/* 2. Secondary Directional Twilight Moonlight Fill (From Upper-Left) */}
      <directionalLight
        position={config.moonPosition}
        intensity={config.moonIntensity}
        color={config.moonColor}
      />

      {/* 3. Sunset Rim Light (Back-Right rim for building silhouette pop) */}
      <directionalLight
        position={[30, 15, -40]}
        intensity={1.2}
        color="#f472b6"
      />

      {/* 4. Ambient & Hemisphere Twilight Sky Glow */}
      <ambientLight color={config.ambientColor} intensity={config.ambientIntensity} />
      <hemisphereLight
        args={[config.hemiSky, config.hemiGround, config.hemiIntensity]}
      />

      {/* 5. Architectural Suite Warm Light Bounces & Ground Downlights */}
      <pointLight
        color={config.interiorGlow}
        intensity={config.interiorIntensity}
        distance={24}
        decay={2}
        position={[0, 10, 4]}
      />
      <pointLight
        color={config.interiorGlow}
        intensity={config.interiorIntensity * 0.9}
        distance={22}
        decay={2}
        position={[-4, 15, 3]}
      />
      <pointLight
        color={config.interiorGlow}
        intensity={config.interiorIntensity * 0.9}
        distance={22}
        decay={2}
        position={[4, 15, 3]}
      />

      {/* Ground Snowy Slope Accent Downlights */}
      <pointLight
        color="#ffedd5"
        intensity={2.0}
        distance={18}
        decay={2}
        position={[0, -1.5, 7.5]}
      />
      <pointLight
        color="#93c5fd"
        intensity={1.5}
        distance={20}
        decay={2}
        position={[-6, -1.0, 7.0]}
      />
    </>
  );
};
