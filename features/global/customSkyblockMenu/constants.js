// java vars
const Color = Java.type("java.awt.Color");

// colors
export const darkestColor = () => {
    return new Color(46 / 255, 52 / 255, 64 / 255, 1);
}

export const darkColor = () => {
    return new Color(59 / 255, 66 / 255, 82 / 255, 1);
}

export const lightColor = () => {
    return new Color(67 / 255, 76 / 255, 94 / 255, 1);
}

export const lightestColor = () => {
    return new Color(76 / 255, 86 / 255, 106 / 255, 1);
}

export const gold = () => {
    return new Color(255 / 255, 170 / 255, 0 / 255, 1);
}
