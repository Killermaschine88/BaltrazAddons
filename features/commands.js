/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../constants/settings";

register("command", (...args) => {
    return Settings.openGUI();
}).setName("ba");
