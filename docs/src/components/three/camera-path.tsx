"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { PerspectiveCamera } from "three";
import * as THREE from "three";
import {
  prepareCameraPath,
  sampleCameraPath,
  type CameraKeyframe,
  type CameraSample,
} from "@/lib/three/camera-path";

export function CameraPath({
  getProgress,
  keyframes,
}: {
  getProgress: () => number;
  keyframes: readonly CameraKeyframe[];
}) {
  const preparedPath = useMemo(() => prepareCameraPath(keyframes), [keyframes]);
  const sampleRef = useRef<CameraSample>({
    position: new THREE.Vector3(),
    quaternion: new THREE.Quaternion(),
    fov: 45,
    lookAt: new THREE.Vector3(),
  });

  useFrame(({ camera }) => {
    const perspectiveCamera = camera as PerspectiveCamera;
    const sample = sampleCameraPath(preparedPath, getProgress(), sampleRef.current);
    perspectiveCamera.position.copy(sample.position);
    perspectiveCamera.quaternion.copy(sample.quaternion);
    if (Math.abs(perspectiveCamera.fov - sample.fov) > 0.001) {
      perspectiveCamera.fov = sample.fov;
      perspectiveCamera.updateProjectionMatrix();
    }
  });

  return null;
}
