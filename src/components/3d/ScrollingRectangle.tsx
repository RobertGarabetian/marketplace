import { useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ScrollingRectangleProps {
  scrollY: number;
}

const ScrollingRectangle = ({ scrollY }: ScrollingRectangleProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Load textures for the different faces of the cube
  const textures = useLoader(THREE.TextureLoader, [
    "/images/right.jpg", // Right face (0)
    "/images/left.jpg", // Left face (1)
    "/images/left.jpg", // Top face (2)
    "/images/left.jpg", // Bottom face (3)
    "/images/front.jpg", // Front face (4)
    "/images/back.jpg", // Back face (5)
  ]);

  useFrame(() => {
    if (!meshRef.current) return;

    // Map scrollY to x position (from left to right)
    // Use a symmetrical range, e.g. from -8 to 8
    const scrollProgress = Math.min(scrollY / 2000, 1);
    const targetX = -8 + scrollProgress * 16; // Move from -8 to 8 (symmetrical around center 0)

    // Update position with smooth lerping
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      targetX,
      0.05
    );

    // Rotate based on scroll, but only around Y axis
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef} position={[-8, 0, 0]} castShadow>
      <boxGeometry args={[5, 7, 1.2]} />
      <meshStandardMaterial
        map={textures[0]}
        metalness={0.8}
        roughness={0.2}
        attach="material-0"
      />{" "}
      {/* Right */}
      <meshStandardMaterial
        map={textures[1]}
        metalness={0.8}
        roughness={0.2}
        attach="material-1"
      />{" "}
      {/* Left */}
      <meshStandardMaterial
        map={textures[2]}
        metalness={0.8}
        roughness={0.2}
        attach="material-2"
      />{" "}
      {/* Top */}
      <meshStandardMaterial
        map={textures[3]}
        metalness={0.8}
        roughness={0.2}
        attach="material-3"
      />{" "}
      {/* Bottom */}
      <meshStandardMaterial
        map={textures[4]}
        metalness={0.8}
        roughness={0.2}
        attach="material-4"
      />{" "}
      {/* Front */}
      <meshStandardMaterial
        map={textures[5]}
        metalness={0.8}
        roughness={0.2}
        attach="material-5"
      />{" "}
      {/* Back */}
    </mesh>
  );
};

export default ScrollingRectangle;
