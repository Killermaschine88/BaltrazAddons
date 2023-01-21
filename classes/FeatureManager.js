/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../constants/settings";

class FeatureManager {
    constructor() {
        this.events = {};

        // Checking if Event should be toggled on or off
        register("step", () => {
            const registeredEvents = Object.keys(this.events);

            for (let i = 0; i < registeredEvents.length; i++) {
                if (Settings[registeredEvents[i]]) {
                    this.events[registeredEvents[i]].forEach((event) => {
                        event.register();
                    });
                } else {
                    this.events[registeredEvents[i]].forEach((event) => {
                        event.unregister();
                    });
                }
            }
        }).setDelay(1);
    }

    addToManager(settingName, events) {
        this.events[settingName] = events;
        return this;
    }
}

export const featureManager = new FeatureManager();
