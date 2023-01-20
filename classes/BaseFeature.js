/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import { featureManager } from "./FeatureManager";

class BaseFeature {
    constructor() {
        this.featureManager = featureManager;
    }

    registerEvent() {
        this.featureManager.addToManager(this.settingName, this.event);
    }
}

export default BaseFeature;
