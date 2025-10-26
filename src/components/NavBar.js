import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { navLinks } from "../constants";
export const NavBar = () => {
    // track if the user has scrolled down the page
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        // create an event listener for when the user scrolls
        const handleScroll = () => {
            // check if the user has scrolled down at least 10px
            // if so, set the state to true
            const isScrolled = window.scrollY > 10;
            setScrolled(isScrolled);
        };
        // add the event listener to the window
        window.addEventListener("scroll", handleScroll);
        // cleanup the event listener when the component is unmounted
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (_jsx("header", { className: `navbar ${scrolled ? "scrolled" : "not-scrolled"}`, children: _jsxs("div", { className: "inner", children: [_jsx("a", { href: "#hero", className: "logo", children: "Pramil Dhungana" }), _jsx("nav", { className: "desktop", children: _jsx("ul", { children: navLinks.map(({ link, name }) => (_jsx("li", { className: "group", children: _jsxs("a", { href: link, children: [_jsx("span", { children: name }), _jsx("span", { className: "underline" })] }) }, name))) }) }), _jsx("a", { href: "#contact", className: "contact-btn group", children: _jsx("div", { className: "inner", children: _jsx("span", { children: "Contact me" }) }) })] }) }));
};
export default NavBar;
