import { jsx as _jsx } from "react/jsx-runtime";
import Lottie from "lottie-react";
import animationData from "../../../../public/animations/Contact_us.json";
export default function ContactExperience() {
    return (_jsx(Lottie, { animationData: animationData, loop: true, autoplay: true, style: { width: 800, height: 700 } }));
}
