import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { useTourStore } from '../../store/useTourStore';

export const CameraController: React.FC = () => {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();

  const activeViewMode = useTourStore((state) => state.activeViewMode);
  const currentRoom = useTourStore((state) => state.currentRoom);
  const navigationMode = useTourStore((state) => state.navigationMode);
  const isCinematicActive = useTourStore((state) => state.isCinematicTourActive);
  const getCurrentPose = useTourStore((state) => state.getCurrentCameraPose);
  const setCameraTransitioning = useTourStore((state) => state.setCameraTransitioning);
  const updateTelemetry = useTourStore((state) => state.updateCameraTelemetry);

  const targetPos = useRef(new THREE.Vector3());
  const targetLook = useRef(new THREE.Vector3());
  const isTransitioning = useRef(false);

  const lastSentPos = useRef([0, 0, 0]);
  const lastSentYaw = useRef(0);

  // Trigger smooth transition whenever view mode or room changes
  useEffect(() => {
    if (isCinematicActive) return;

    const pose = getCurrentPose();
    targetPos.current.set(...pose.position);
    targetLook.current.set(...pose.target);
    isTransitioning.current = true;
    setCameraTransitioning(true);

    if (pose.fov && 'fov' in camera) {
      (camera as THREE.PerspectiveCamera).fov = pose.fov;
      (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
    }
  }, [activeViewMode, currentRoom, getCurrentPose, camera, setCameraTransitioning, isCinematicActive]);

  useFrame((_, delta) => {
    if (navigationMode === 'FIRST_PERSON' || isCinematicActive) return;
    if (!controlsRef.current) return;

    // Throttled minimap telemetry update
    const dir = new THREE.Vector3();
    camera.getWorldDirection(dir);
    const yaw = Math.atan2(dir.x, dir.z);

    const dx = Math.abs(camera.position.x - lastSentPos.current[0]);
    const dz = Math.abs(camera.position.z - lastSentPos.current[2]);
    const dyaw = Math.abs(yaw - lastSentYaw.current);

    if (dx > 0.08 || dz > 0.08 || dyaw > 0.04) {
      lastSentPos.current = [camera.position.x, camera.position.y, camera.position.z];
      lastSentYaw.current = yaw;
      updateTelemetry([camera.position.x, camera.position.y, camera.position.z], yaw);
    }

    if (isTransitioning.current) {
      // Lerp camera position
      const posDist = camera.position.distanceTo(targetPos.current);
      const lookDist = controlsRef.current.target.distanceTo(targetLook.current);

      const lerpSpeed = Math.min(delta * 3.2, 0.14);

      camera.position.lerp(targetPos.current, lerpSpeed);
      controlsRef.current.target.lerp(targetLook.current, lerpSpeed);
      controlsRef.current.update();

      // Check if settled
      if (posDist < 0.06 && lookDist < 0.06) {
        camera.position.copy(targetPos.current);
        controlsRef.current.target.copy(targetLook.current);
        controlsRef.current.update();
        isTransitioning.current = false;
        setCameraTransitioning(false);
      }
    }
  });

  const pose = getCurrentPose();

  if (navigationMode === 'FIRST_PERSON' || isCinematicActive) {
    return null;
  }

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      rotateSpeed={0.65}
      zoomSpeed={0.8}
      panSpeed={0.6}
      minDistance={pose.minDistance || 1.0}
      maxDistance={pose.maxDistance || 120}
      maxPolarAngle={Math.PI / 2 - 0.02}
      minPolarAngle={Math.PI * 0.08}
    />
  );
};
