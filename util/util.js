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
