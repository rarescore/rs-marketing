import * as THREE from "three";
import { clampProgress } from "@/lib/motion/scroll-utils";

export type VectorTuple = readonly [number, number, number];

export interface CameraKeyframe {
  t: number;
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
  fov: number;
  lookAt: VectorTuple;
}

export interface CameraSample {
  position: THREE.Vector3;
  quaternion: THREE.Quaternion;
  fov: number;
  lookAt: THREE.Vector3;
}

export interface PreparedCameraKeyframe extends CameraKeyframe {
  position: THREE.Vector3;
  quaternion: THREE.Quaternion;
  target: THREE.Vector3;
}

const up = new THREE.Vector3(0, 1, 0);

function keyframeQuaternion(keyframe: CameraKeyframe) {
  const position = new THREE.Vector3(keyframe.x, keyframe.y, keyframe.z);
  const target = new THREE.Vector3(...keyframe.lookAt);
  const base = new THREE.Matrix4().lookAt(position, target, up);
  const baseQuaternion = new THREE.Quaternion().setFromRotationMatrix(base);
  const offset = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(keyframe.rx, keyframe.ry, keyframe.rz, "YXZ"),
  );
  return baseQuaternion.multiply(offset);
}

export function validateCameraPath(keyframes: readonly CameraKeyframe[]) {
  if (keyframes.length < 2) throw new Error("A camera path requires at least two keyframes.");

  const sorted = [...keyframes].sort((a, b) => a.t - b.t);
  sorted.forEach((keyframe, index) => {
    if (keyframe.t < 0 || keyframe.t > 1) {
      throw new Error(`Camera keyframe ${index} has t outside 0–1.`);
    }
    if (index > 0 && keyframe.t === sorted[index - 1]?.t) {
      throw new Error(`Camera keyframe ${index} duplicates a previous t value.`);
    }
  });

  if (sorted[0]?.t !== 0 || sorted.at(-1)?.t !== 1) {
    throw new Error("A camera path must begin at t=0 and end at t=1.");
  }

  return sorted;
}

export function prepareCameraPath(
  keyframes: readonly CameraKeyframe[],
) {
  const sorted = validateCameraPath(keyframes);
  return sorted.map((keyframe) => ({
    ...keyframe,
    position: new THREE.Vector3(keyframe.x, keyframe.y, keyframe.z),
    quaternion: keyframeQuaternion(keyframe),
    target: new THREE.Vector3(...keyframe.lookAt),
  }));
}

export function sampleCameraPath(
  keyframes: readonly PreparedCameraKeyframe[],
  progress: number,
  sample: CameraSample,
): CameraSample {
  const p = clampProgress(progress);
  const endIndex = keyframes.findIndex((keyframe) => keyframe.t >= p);
  const rightIndex = endIndex <= 0 ? 1 : endIndex;
  const left = keyframes[rightIndex - 1]!;
  const right = keyframes[rightIndex]!;
  const span = right.t - left.t;
  const local = span === 0 ? 0 : (p - left.t) / span;
  const eased = THREE.MathUtils.smoothstep(local, 0, 1);

  sample.position.lerpVectors(left.position, right.position, eased);
  sample.quaternion.copy(left.quaternion).slerp(right.quaternion, eased);
  sample.lookAt.lerpVectors(left.target, right.target, eased);
  sample.fov = THREE.MathUtils.lerp(left.fov, right.fov, eased);
  return sample;
}
