/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../constants/settings";
import { playerData } from "../constants/dataLoader"

class FeatureManager {
    constructor() {
        this.loadedEvents = {};

        // Checking if Event should be toggled on or off
        register("step", () => {
            const registeredEvents = Object.keys(this.loadedEvents);

            for (let i = 0; i < registeredEvents.length; i++) {
                if (Settings[registeredEvents[i]]) {
                    this.loadedEvents[registeredEvents[i]].events.forEach((event) => {
                        const requiredWorld = this.loadedEvents[registeredEvents[i]].requiredWorld
                        this.isInArea(requiredWorld) ? event.register() : event.unregister();
                    });
                } else {
                    this.loadedEvents[registeredEvents[i]].events.forEach((event) => {
                        event.unregister();
                    });
                }
            }
        }).setDelay(1);
    }

    addToManager(settingName, events, area) {
        this.loadedEvents[settingName] = {
            events: events,
            requiredWorld: area
        };
        return this;
    }

    isInArea(world) {
        if(world === "any") return true;
        return playerData.currentWorld === world;
    }
}

export const featureManager = new FeatureManager();
