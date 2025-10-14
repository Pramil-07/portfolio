import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {useMediaQuery} from "react-responsive";
import * as THREE from "three";
import {HeroLights} from "./HeroLights.tsx";
import Particles from "./particals.tsx";
import {Pramil} from "./Pramil.tsx";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
export const HeroExperience = () => {
    const isTablet = useMediaQuery({query : '(max-width: 1024px)'});
    const isMobile = useMediaQuery({query : '(min-width: 768px)'});
    return (
        <Canvas camera={{position:[0,0,15] , fov:45}}  shadows
                gl={{
                    antialias: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    outputColorSpace: THREE.SRGBColorSpace,
                }}
        >
            <HeroLights/>
            <Particles count={100}/>
            <OrbitControls
                enablePan={false}
                enableZoom={!isTablet}
                maxDistance={20}
                minDistance={5}
                minPolarAngle={Math.PI / 5}
                maxPolarAngle={Math.PI / 2}
            />
            <group
                scale={isMobile? 0.7 : 1}
                position={[0 , -2 , 0]}
                rotation={[0 , -Math.PI / 4 ,0]}
            >
                {/*<Room/>*/}
                <Pramil  scale={[15, 15, 15]} position={[0, -1, 0]}/>
                <EffectComposer>
                    <Bloom intensity={0.3} luminanceThreshold={0.2} />
                </EffectComposer>
            </group>

        </Canvas>
    )
}
export default HeroExperience
