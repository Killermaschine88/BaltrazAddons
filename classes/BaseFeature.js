/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import { featureManager } from "./FeatureManager";

class BaseFeature {
    constructor() {
        this.events = [];
        this.featureManager = featureManager;
    }

    registerEvents() {
        this.featureManager.addToManager(this.settingName, this.events);
    }

    setName(name) {
        this.settingName = name;
    }

    addEvent(event) {
        this.events.push(event);
    }
}

export default BaseFeature;
