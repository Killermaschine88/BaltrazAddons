/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../constants/settings";

const Essential = Java.type("gg.essential.api.EssentialAPI");

register("command", () => {
    ChatLib.chat(Settings.apiKey);
}).setName("batest");
