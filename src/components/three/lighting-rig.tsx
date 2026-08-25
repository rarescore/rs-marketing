"use client";

export function LightingRig() {
  return (
    <>
      <ambientLight color="#a9b0b7" intensity={0.34} />
      <directionalLight color="#f0d3a1" intensity={2.7} position={[-4, 7, 5]} />
      <pointLight color="#d5a352" intensity={24} distance={13} position={[3.2, 1.7, -1.8]} />
      <pointLight color="#6f7b8c" intensity={9} distance={11} position={[-4.5, 0.2, 3]} />
    </>
  );
}
