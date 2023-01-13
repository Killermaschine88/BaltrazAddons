/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import { prefix } from "../constants/variables";

export const sendError = (err) => {
    ChatLib.chat(`${prefix} ${err}`);
};

export const missingAPIKeyError = (feature = "Unknown") => {
    ChatLib.chat(`${prefix} &cYou need to set an API Key in the config to use ${feature}!`);
};
