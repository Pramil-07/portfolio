import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Float, useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
const LogoPlane = ({ modelPath, scale }) => {
    // useTexture is now safely inside Canvas context
    const texture = useTexture(modelPath);
    return (_jsx(Float, { speed: 2, rotationIntensity: 0.5, floatIntensity: 0.5, children: _jsxs("mesh", { scale: scale !== null && scale !== void 0 ? scale : [1, 1, 1], children: [_jsx("planeGeometry", { args: [1, 1] }), _jsx("meshStandardMaterial", { map: texture, transparent: true })] }) }));
};
const TechIconCardExperience = ({ model }) => {
    return (_jsxs(Canvas, { children: [_jsx("ambientLight", { intensity: 0.5 }), _jsx("directionalLight", { position: [5, 5, 5], intensity: 1 }), _jsx(LogoPlane, { modelPath: model.modelPath, scale: model.scale })] }));
};
export default TechIconCardExperience;
