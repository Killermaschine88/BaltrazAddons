/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

export const convertToPBTime = (timeStamp) => {
    if (!timeStamp) return `??:??`;
    let minutes = parseInt(timeStamp / 1000 / 60);
    let seconds = parseInt((timeStamp - minutes * 1000 * 60) / 1000);
    if (seconds.toString().length == 1) seconds = "0" + seconds;
    if (isNaN(minutes) || isNaN(seconds)) return `??:??`;
    return `${minutes ? minutes + ":" : ""}${seconds}`;
};

export const formatNumber = (number, format="comma") => {
    if(format === "comma") {
        if(!number) return ""

        let parts = number.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }
}