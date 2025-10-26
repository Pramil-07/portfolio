import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import * as THREE from "three";
import { HeroLights } from "./HeroLights";
import Particles from "./particals";
import { Pramil } from "./Pramil";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
export const HeroExperience = () => {
    const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });
    const isMobile = useMediaQuery({ query: '(min-width: 768px)' });
    return (_jsxs(Canvas, { camera: { position: [0, 0, 15], fov: 45 }, shadows: true, gl: {
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            outputColorSpace: THREE.SRGBColorSpace,
        }, children: [_jsx(HeroLights, {}), _jsx(Particles, { count: 100 }), _jsx(OrbitControls, { enablePan: false, enableZoom: !isTablet, maxDistance: 20, minDistance: 5, minPolarAngle: Math.PI / 5, maxPolarAngle: Math.PI / 2 }), _jsxs("group", { scale: isMobile ? 0.7 : 1, position: [0, -2, 0], rotation: [0, -Math.PI / 4, 0], children: [_jsx(Pramil, { scale: [15, 15, 15], position: [0, -1, 0] }), _jsx(EffectComposer, { children: _jsx(Bloom, { intensity: 0.3, luminanceThreshold: 0.2 }) })] })] }));
};
export default HeroExperience;
