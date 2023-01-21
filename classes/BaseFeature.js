/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import { featureManager } from "./FeatureManager";

class BaseFeature {
    constructor() {
        this.events = [];
        this.world = "any";
        this.featureManager = featureManager;
    }

    registerEvents() {
        this.featureManager.addToManager(this.settingName, this.events, this.world);
    }

    setName(name) {
        this.settingName = name;
    }

    addEvent(event) {
        this.events.push(event);
    }

    setRequiredWorld(world) {
        this.world = world;
    }
}

export default BaseFeature;
