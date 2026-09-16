import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTourStore, CINEMATIC_TOUR_STAGES } from '../../store/useTourStore';

export const CinematicTourController: React.FC = () => {
  const { camera } = useThree();
  const isCinematicActive = useTourStore((state) => state.isCinematicTourActive);
  const stageIndex = useTourStore((state) => state.cinematicStageIndex);

  const currentStage = CINEMATIC_TOUR_STAGES[stageIndex];
  const targetPos = useRef(new THREE.Vector3());
  const targetLook = useRef(new THREE.Vector3());

  useFrame(({ clock }, delta) => {
    if (!isCinematicActive || !currentStage) return;

    const pose = currentStage.cameraPose;
    const time = clock.getElapsedTime();

    // Base target coordinates with subtle cinematic orbital drift
    const driftX = Math.sin(time * 0.2) * 0.8;
    const driftZ = Math.cos(time * 0.2) * 0.8;

    targetPos.current.set(
      pose.position[0] + driftX,
      pose.position[1],
      pose.position[2] + driftZ
    );

    targetLook.current.set(...pose.target);

    // Smooth cinematic camera lerp
    const lerpSpeed = Math.min(delta * 2.2, 0.08);
    camera.position.lerp(targetPos.current, lerpSpeed);

    // Smooth lookAt interpolation
    const currentLook = new THREE.Vector3();
    camera.getWorldDirection(currentLook);
    const targetDirection = new THREE.Vector3().subVectors(targetLook.current, camera.position).normalize();
    currentLook.lerp(targetDirection, lerpSpeed);

    const finalTarget = new THREE.Vector3().addVectors(camera.position, currentLook);
    camera.lookAt(finalTarget);

    if (pose.fov && 'fov' in camera) {
      const pCam = camera as THREE.PerspectiveCamera;
      pCam.fov = THREE.MathUtils.lerp(pCam.fov, pose.fov, lerpSpeed);
      pCam.updateProjectionMatrix();
    }
  });

  return null;
};
