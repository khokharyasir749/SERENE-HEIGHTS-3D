import React from 'react';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

export const PostProcessingEffects: React.FC = () => {
  return (
    <EffectComposer multisampling={0}>
      {/* Photorealistic architectural bloom for interior lights, sun glint, and fireplace */}
      <Bloom
        intensity={0.4}
        luminanceThreshold={0.8}
        luminanceSmoothing={0.25}
        mipmapBlur
      />

      {/* Cinematic Real Estate Photography Vignette */}
      <Vignette eskil={false} offset={0.22} darkness={0.45} />
    </EffectComposer>
  );
};
