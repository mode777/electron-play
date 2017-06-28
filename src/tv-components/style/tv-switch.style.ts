import { themeStyle } from "./tv-theme.style";

const RAIL_HEIGHT = 17;

export let switchStyle = {
    width: "50px",
    height: "25px",
    colorOn: themeStyle.accent,
    colorOff: themeStyle.secondary,
    animation: "300ms ease-in-out",
    rail: {
        top: "4px",
        left: "8px",
        height: RAIL_HEIGHT + "px",
        width: "35px",
        borderRadius: RAIL_HEIGHT / 2 + "px",
        opacity: .3,
        color: themeStyle.accent
    },
    knob: {
        top: "0px",
        leftOff: "0px",
        leftOn: "26px",
        diameter: "25px",
    }
}