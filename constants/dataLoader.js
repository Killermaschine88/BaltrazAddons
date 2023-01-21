/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

class DataLoader {
    constructor() {
        // Variables
        this.inSkyblock = false;
        this.currentWorld = "unknown";

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
}

export const playerData = new DataLoader();
