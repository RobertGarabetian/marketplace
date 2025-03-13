"use client";
import { Canvas } from "@react-three/fiber";
import {
  PerspectiveCamera,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import ScrollingRectangle from "./ScrollingRectangle";

interface SceneProps {
  scrollY: number;
}

const Scene = ({ scrollY = 0 }: SceneProps) => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <ambientLight intensity={0.5} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
      />
      <Environment preset="city" />

      <ScrollingRectangle scrollY={scrollY} />

      <ContactShadows
        position={[0, -4.5, 0]}
        opacity={0.4}
        width={20}
        height={20}
        blur={2}
      />
    </>
  );
};

interface CardSceneProps {
  scrollY?: number;
}

const CardScene = ({ scrollY = 0 }: CardSceneProps) => {
  return (
    <div className="w-full h-[80vh] relative">
      <Canvas shadows>
        <Scene scrollY={scrollY} />
      </Canvas>
    </div>
  );
};

export default CardScene;
