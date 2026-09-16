import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTourStore } from '../../store/useTourStore';

export interface AssemblyTiersState {
  tier1Offset: number;
  tier2Offset: number;
  tier3Offset: number;
  tier4Offset: number;
  assemblyRatio: number;
}

// Camera keyframes along the scroll path (clean 3/4 frontal architectural hero view)
// Frames the building in the right 65% of the viewport and leaves the left 35% for UI cards
const SCROLL_CAMERA_KEYFRAMES = [
  {
    progress: 0.0,
    pos: new THREE.Vector3(14.0, 10.0, 26),
    target: new THREE.Vector3(4.5, 9.0, 0),
    fov: 46,
  },
  {
    progress: 0.22,
    pos: new THREE.Vector3(11.5, 4.0, 19),
    target: new THREE.Vector3(4.0, 2.2, 2.0),
    fov: 41,
  },
  {
    progress: 0.45,
    pos: new THREE.Vector3(13.0, 8.0, 22),
    target: new THREE.Vector3(4.2, 6.5, 1.0),
    fov: 43,
  },
  {
    progress: 0.68,
    pos: new THREE.Vector3(13.5, 13.0, 23),
    target: new THREE.Vector3(4.2, 12.0, 0.5),
    fov: 44,
  },
  {
    progress: 0.85,
    pos: new THREE.Vector3(13.0, 18.5, 24),
    target: new THREE.Vector3(4.2, 17.5, 0.0),
    fov: 45,
  },
  {
    progress: 1.0,
    pos: new THREE.Vector3(13.5, 9.0, 25),
    target: new THREE.Vector3(4.5, 9.0, 0.0),
    fov: 44,
  },
];

function smoothstep(min: number, max: number, value: number) {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

export const ScrollyAssemblyController: React.FC<{
  onTierOffsetsUpdate?: (offsets: AssemblyTiersState) => void;
}> = ({ onTierOffsetsUpdate }) => {
  const { camera } = useThree();
  const scrollProgress = useTourStore((state) => state.scrollProgress);

  const currentCamPos = useRef(new THREE.Vector3(14.0, 10.0, 26));
  const currentCamTarget = useRef(new THREE.Vector3(4.5, 9.0, 0));

  useFrame((_, delta) => {
    const p = Math.max(0, Math.min(1, scrollProgress));

    // 1. Calculate physics offsets for the 4 modular building tiers
    // Tier 1 (Podium Foundation & Ground Entrance): Stays grounded
    const t1Factor = smoothstep(0.0, 0.15, p);
    const tier1Offset = 0;

    // Tier 2 (Lower Serviced Suites: Floors 1-3): Starts at +10 and descends
    const t2Factor = smoothstep(0.15, 0.45, p);
    const tier2Offset = (1 - t2Factor) * 10.0;

    // Tier 3 (Upper Mountain Residences: Floors 4-6): Starts at +20 and descends
    const t3Factor = smoothstep(0.40, 0.70, p);
    const tier3Offset = (1 - t3Factor) * 20.0;

    // Tier 4 (Royal Penthouse Crown & Pergola: Floors 7-9): Starts at +30 and descends
    const t4Factor = smoothstep(0.65, 0.90, p);
    const tier4Offset = (1 - t4Factor) * 30.0;

    if (onTierOffsetsUpdate) {
      onTierOffsetsUpdate({
        tier1Offset,
        tier2Offset,
        tier3Offset,
        tier4Offset,
        assemblyRatio: (t1Factor + t2Factor + t3Factor + t4Factor) / 4,
      });
    }

    // 2. Interpolate Camera Keyframes
    let kfStart = SCROLL_CAMERA_KEYFRAMES[0];
    let kfEnd = SCROLL_CAMERA_KEYFRAMES[SCROLL_CAMERA_KEYFRAMES.length - 1];

    for (let i = 0; i < SCROLL_CAMERA_KEYFRAMES.length - 1; i++) {
      if (p >= SCROLL_CAMERA_KEYFRAMES[i].progress && p <= SCROLL_CAMERA_KEYFRAMES[i + 1].progress) {
        kfStart = SCROLL_CAMERA_KEYFRAMES[i];
        kfEnd = SCROLL_CAMERA_KEYFRAMES[i + 1];
        break;
      }
    }

    const segmentSpan = kfEnd.progress - kfStart.progress;
    const segmentP = segmentSpan > 0 ? (p - kfStart.progress) / segmentSpan : 0;
    const easedP = smoothstep(0, 1, segmentP);

    const targetPos = new THREE.Vector3().lerpVectors(kfStart.pos, kfEnd.pos, easedP);
    const targetLook = new THREE.Vector3().lerpVectors(kfStart.target, kfEnd.target, easedP);
    const targetFov = THREE.MathUtils.lerp(kfStart.fov, kfEnd.fov, easedP);

    // Smooth camera damping
    const lerpSpeed = Math.min(delta * 4.5, 0.16);
    currentCamPos.current.lerp(targetPos, lerpSpeed);
    currentCamTarget.current.lerp(targetLook, lerpSpeed);

    camera.position.copy(currentCamPos.current);
    camera.lookAt(currentCamTarget.current);

    if ('fov' in camera) {
      const pCam = camera as THREE.PerspectiveCamera;
      pCam.fov = THREE.MathUtils.lerp(pCam.fov, targetFov, lerpSpeed);
      pCam.updateProjectionMatrix();
    }
  });

  return null;
};
