import Lottie from "lottie-react";
import animationData from "../../../assets/animations/Contact_us.json";
import React from "react";
import { useEffect, useState } from "react";

export default function ContactExperience() {
    const [animationData, setAnimationData] = useState(null);

    useEffect(() => {
        fetch("/animations/Contact_us.json")
            .then((res) => res.json())
            .then((data) => setAnimationData(data));
    }, []);

    if (!animationData) return null;

    return (
        <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            style={{ width: 800, height: 700 }}
        />
    );
}
