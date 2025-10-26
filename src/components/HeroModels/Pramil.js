import { jsx as _jsx } from "react/jsx-runtime";
import { useGLTF } from '@react-three/drei';
export function Pramil(props) {
    const { nodes, materials } = useGLTF('models/Pramil_3d_Grediant-transformed.glb');
    return (_jsx("group", Object.assign({}, props, { dispose: null, children: _jsx("mesh", { geometry: nodes['tripo_node_5e3e2ad7-51de-428a-ab87-aa722cf2b7ab'].geometry, material: materials['tripo_mat_5e3e2ad7-51de-428a-ab87-aa722cf2b7ab'] }) })));
}
useGLTF.preload('models/Pramil_3d_Grediant-transformed.glb');
