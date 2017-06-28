import { themeStyle } from "./tv-theme.style";
import { sliderStyle } from "./tv-slider.style";

export let menuStyle = {
    paddingLeft: "32px",
    width: "480px",
    position: "right",
    offsetTop: sliderStyle.title.height,
    paddingBottom: "64px",
    defaultTitle: "Menu",
    defaultOpen: false,
    heading: {
        padding: "20px",
        fontSize: "14px",
        fontFamily: themeStyle.fontCondensed,
        fontWeight: "700",
        colorDefault: themeStyle.accent
    },
    item: {
        alignV: "center",
        padding: "16px",
        fontFamily: themeStyle.fontDefault,
        fontSize: "16px",
        fontWeight: "400",
        activeOpacity: "0.1",
        activeAnimation: "100ms ease-in",
        inactiveAnimation: "600ms ease-out",
        defaultColor: themeStyle.textColor,
        defaultHightlight: themeStyle.textColor,
        icon: {
            marginRight: "20px",
            fontSize: "40px",
        }
    },
}