/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../constants/settings";
import BaseFeature from "../../classes/BaseFeature";

class TooltipHider extends BaseFeature {
    constructor() {
        super();

        this.setName("customSkyblockMenu");
        this.addEvent(
            register("itemTooltip", (lore, item, event) => {
                if (item.getName().includes("Empty Slot") && Settings.hideGlassPaneTooltip) return cancel(event);
            })
        );

        this.registerEvents();
    }
}

export default new TooltipHider();
