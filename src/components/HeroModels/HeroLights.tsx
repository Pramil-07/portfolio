
import { Environment } from "@react-three/drei";

export const HeroLights = () => (
    <>
            {/* key light */}
            <spotLight
                position={[2, 5, 6]}
                angle={0.25}
                penumbra={1}
                intensity={150}
                color="#ffffff"
            />
            {/* cool bluish rim light */}
            <spotLight
                position={[5, 3, -3]}
                angle={0.4}
                penumbra={1}
                intensity={80}
                color="#4cc9f0"
            />
            {/* warm purple fill light */}
            <spotLight
                position={[-4, 2, 4]}
                angle={0.5}
                penumbra={1}
                intensity={90}
                color="#9d4edd"
            />

            {/* soft ambient */}
            <ambientLight intensity={0.6} color="#ffffff" />

            {/* environment reflections for realism */}
            <Environment preset="city" background={false} />
    </>
);
