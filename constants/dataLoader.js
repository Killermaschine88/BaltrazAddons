/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import { getCustomNamesData } from "../functions/api";

class DataLoader {
    constructor() {
        // Variables
        this.inSkyblock = false;
        this.currentWorld = "unknown";
        this.customNames = {};

        // Updating Custom Names on Startup
        getCustomNamesData().then((res) => {
            if(!res?.data) return;
            this.customNames = res?.data;
        });

        // Checking for Current World
        register("worldLoad", () => {
            setTimeout(() => {
                ChatLib.command("locraw");
            }, 1000);
        });

        // Locraw chat event to get current world
        register("chat", (server, mode, worldName, event) => {
            cancel(event);
            this.isInSkyblock = Scoreboard.getTitle()?.removeFormatting()?.includes("SKYBLOCK");
            this.currentWorld = worldName;
        }).setCriteria('{"server":"${server}","gametype":"SKYBLOCK","mode":"${mode}","map":"${worldName}"}');
    }

    setCustomNames(names) {
        this.customNames = names;
        return this;
    }

    getCustomNames() {
        return this.customNames;
    }
}

export const playerData = new DataLoader();
