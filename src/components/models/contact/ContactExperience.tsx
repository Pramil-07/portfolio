import Lottie from "lottie-react";
import animationData from "../../../assets/animations/Contact_us.json";

export default function ContactExperience() {
    return (
        <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            style={{ width: "100%", height: "auto" }}
        />
    );
}
