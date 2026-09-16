import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTourStore } from '../../store/useTourStore';

export const FirstPersonController: React.FC = () => {
  const { camera, gl } = useThree();
  const activeViewMode = useTourStore((state) => state.activeViewMode);
  const navigationMode = useTourStore((state) => state.navigationMode);
  const updateTelemetry = useTourStore((state) => state.updateCameraTelemetry);

  const lastSentPos = useRef([0, 0, 0]);
  const lastSentYaw = useRef(0);

  // Key states
  const keys = useRef<{ forward: boolean; backward: boolean; left: boolean; right: boolean; sprint: boolean }>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    sprint: false,
  });

  // Rotation angles (Euler yaw & pitch)
  const rotation = useRef<{ yaw: number; pitch: number }>({ yaw: 0, pitch: 0 });
  const isMouseDown = useRef(false);
  const prevMouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Initialize camera orientation from current camera forward direction
  useEffect(() => {
    if (navigationMode === 'FIRST_PERSON') {
      const dir = new THREE.Vector3();
      camera.getWorldDirection(dir);
      rotation.current.yaw = Math.atan2(dir.x, dir.z);
      rotation.current.pitch = Math.asin(Math.max(-0.95, Math.min(0.95, dir.y)));
    }
  }, [navigationMode, camera]);

  // Keyboard event listeners
  useEffect(() => {
    if (navigationMode !== 'FIRST_PERSON') return;

    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          keys.current.forward = true;
          break;
        case 'KeyS':
        case 'ArrowDown':
          keys.current.backward = true;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          keys.current.left = true;
          break;
        case 'KeyD':
        case 'ArrowRight':
          keys.current.right = true;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          keys.current.sprint = true;
          break;
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          keys.current.forward = false;
          break;
        case 'KeyS':
        case 'ArrowDown':
          keys.current.backward = false;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          keys.current.left = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          keys.current.right = false;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          keys.current.sprint = false;
          break;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [navigationMode]);

  // Mouse / Pointer drag look controls
  useEffect(() => {
    if (navigationMode !== 'FIRST_PERSON') return;
    const dom = gl.domElement;

    const onMouseDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName !== 'CANVAS') return;
      isMouseDown.current = true;
      prevMouse.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isMouseDown.current) return;
      const deltaX = e.clientX - prevMouse.current.x;
      const deltaY = e.clientY - prevMouse.current.y;
      prevMouse.current = { x: e.clientX, y: e.clientY };

      const sensitivity = 0.0035;
      rotation.current.yaw -= deltaX * sensitivity;
      rotation.current.pitch -= deltaY * sensitivity;

      // Clamp vertical pitch looking up/down
      rotation.current.pitch = Math.max(-Math.PI / 2.3, Math.min(Math.PI / 2.3, rotation.current.pitch));
    };

    const onMouseUp = () => {
      isMouseDown.current = false;
    };

    // Touch controls for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isMouseDown.current = true;
        prevMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isMouseDown.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouse.current.x;
      const deltaY = e.touches[0].clientY - prevMouse.current.y;
      prevMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

      const sensitivity = 0.005;
      rotation.current.yaw -= deltaX * sensitivity;
      rotation.current.pitch -= deltaY * sensitivity;
      rotation.current.pitch = Math.max(-Math.PI / 2.3, Math.min(Math.PI / 2.3, rotation.current.pitch));
    };

    const onTouchEnd = () => {
      isMouseDown.current = false;
    };

    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [navigationMode, gl]);

  // Frame update: Movement physics & room collision clamping
  useFrame((_, delta) => {
    if (navigationMode !== 'FIRST_PERSON') return;

    // 1. Calculate movement vector
    const speed = (keys.current.sprint ? 5.5 : 3.0) * delta;
    const forwardVector = new THREE.Vector3(
      Math.sin(rotation.current.yaw),
      0,
      Math.cos(rotation.current.yaw)
    ).normalize();

    const rightVector = new THREE.Vector3(
      Math.cos(rotation.current.yaw),
      0,
      -Math.sin(rotation.current.yaw)
    ).normalize();

    const move = new THREE.Vector3(0, 0, 0);
    if (keys.current.forward) move.add(forwardVector);
    if (keys.current.backward) move.sub(forwardVector);
    if (keys.current.right) move.add(rightVector);
    if (keys.current.left) move.sub(rightVector);

    if (move.lengthSq() > 0) {
      move.normalize().multiplyScalar(speed);
    }

    // Proposed new position
    const nextX = camera.position.x + move.x;
    const nextZ = camera.position.z + move.z;

    // 2. Collision boundaries & Eye-level elevation
    let eyeY = 12.25; // Default Apartment Floor eye height (10.6 + 1.65)
    let clampedX = nextX;
    let clampedZ = nextZ;

    if (activeViewMode === 'ROOFTOP_TERRACE') {
      eyeY = 21.15; // Rooftop floor (19.5 + 1.65)
      // Rooftop deck perimeter bounds
      clampedX = Math.max(-6.5, Math.min(6.5, nextX));
      clampedZ = Math.max(-4.8, Math.min(4.8, nextZ));
    } else {
      // APARTMENT_INTERIOR Bounds
      eyeY = 12.25;

      // Balcony Zone (Z between 5.2 and 8.3, X between -1.5 and 7.2)
      const inBalcony = nextZ > 5.2;

      if (inBalcony) {
        clampedX = Math.max(-1.5, Math.min(7.2, nextX));
        clampedZ = Math.max(5.2, Math.min(8.3, nextZ));
      } else {
        // Interior Suite Rooms
        const isMasterBedZone = nextX < -2.2;

        if (isMasterBedZone) {
          clampedX = Math.max(-7.2, Math.min(-2.4, nextX));
          clampedZ = Math.max(-5.2, Math.min(5.2, nextZ));

          // Check doorway passage (Z between 1.0 and 3.5)
          if (nextX > -2.5 && (nextZ < 0.8 || nextZ > 3.6)) {
            clampedX = -2.4;
          }
        } else {
          clampedX = Math.max(-2.0, Math.min(7.2, nextX));
          clampedZ = Math.max(-5.2, Math.min(5.4, nextZ));

          if (nextX < -2.0 && (nextZ < 0.8 || nextZ > 3.6)) {
            clampedX = -2.0;
          }
        }
      }
    }

    camera.position.set(clampedX, eyeY, clampedZ);

    const lookTarget = new THREE.Vector3(
      camera.position.x + Math.sin(rotation.current.yaw) * Math.cos(rotation.current.pitch),
      camera.position.y + Math.sin(rotation.current.pitch),
      camera.position.z + Math.cos(rotation.current.yaw) * Math.cos(rotation.current.pitch)
    );

    camera.lookAt(lookTarget);

    // Throttled minimap telemetry update
    const dx = Math.abs(camera.position.x - lastSentPos.current[0]);
    const dz = Math.abs(camera.position.z - lastSentPos.current[2]);
    const dyaw = Math.abs(rotation.current.yaw - lastSentYaw.current);

    if (dx > 0.08 || dz > 0.08 || dyaw > 0.04) {
      lastSentPos.current = [camera.position.x, camera.position.y, camera.position.z];
      lastSentYaw.current = rotation.current.yaw;
      updateTelemetry([camera.position.x, camera.position.y, camera.position.z], rotation.current.yaw);
    }
  });

  return null;
};
