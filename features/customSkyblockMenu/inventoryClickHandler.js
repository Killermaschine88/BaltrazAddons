/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../constants/settings";
import BaseFeature from "../../classes/BaseFeature";
import { menuGui } from "./createMenu";
import { prefix } from "../../constants/variables";

class InventoryClickHandler extends BaseFeature {
    constructor() {
        super();

        this.setName("customSkyblockMenu");
        this.addEvent(
            register("guiMouseClick", (mx, my, btn, gui, event) => {
                if (Player.getContainer().getName().equals(`${prefix} §7SkyBlock Menu§r`)) {
                    if (Client.isShiftDown()) {
                        ChatLib.chat("hi?");
                        Client.currentGui.close();
                        GuiHandler.openGui(menuGui);
                    }
                    // Cancel Inventory Clicks to prevent moving Items
                    cancel(event);
                }
                if (Player.getContainer().getName().equals("§7Choose an icon§r")) return cancel(event);
            })
        );

        this.registerEvents();
    }
}

export default new InventoryClickHandler();
