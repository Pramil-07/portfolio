import React from "react";
import { Float, useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { TechIconCardExperienceProps } from "../../../constants/types";

const LogoPlane: React.FC<{ modelPath: string; scale?: [number, number, number] }> = ({ modelPath, scale }) => {
    // useTexture is now safely inside Canvas context
    const texture = useTexture(modelPath);

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh scale={scale ?? [1, 1, 1]}>
                <planeGeometry args={[1, 1]} />
                <meshStandardMaterial map={texture} transparent />
            </mesh>
        </Float>
    );
};

const TechIconCardExperience: React.FC<TechIconCardExperienceProps> = ({ model }) => {
    return (
        <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />

            {/* Now the hook is safely inside the Canvas */}
            <LogoPlane modelPath={model.modelPath} scale={model.scale as [number, number, number]} />

            {/*<OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />*/}
        </Canvas>
    );
};

export default TechIconCardExperience;
