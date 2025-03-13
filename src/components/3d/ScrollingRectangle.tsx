"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ScrollingRectangleProps {
  scrollY: number;
}

const ScrollingRectangle = ({ scrollY }: ScrollingRectangleProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!meshRef.current) return;

    // Map scrollY to x position (from left to right)
    // Start at left (-10) and move to right (10)
    const scrollProgress = Math.min(scrollY / 2000, 1);
    const targetX = -10 + scrollProgress * 20; // Move from left (-10) to right (10)

    // Update position with smooth lerping
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      targetX,
      0.03
    );

    // Rotate based on scroll, but only around Y axis
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef} position={[-10, 0, 0]} castShadow>
      {/* Made the rectangle bigger: 3 width, 7 height, 0.2 depth */}
      <boxGeometry args={[5, 7, 1.2]} />
      <meshStandardMaterial
        color={new THREE.Color("#9333ea")}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
};

export default ScrollingRectangle;
