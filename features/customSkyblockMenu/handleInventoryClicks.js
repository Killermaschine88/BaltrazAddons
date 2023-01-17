/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../constants/settings";

register("guiMouseClick", (mx, my, btn, gui, event) => {
    if (Player.getContainer().getName().equals("§cCustom SkyBlock Menu§r")) {
        if (Client.isShiftDown()) {
            Client.currentGui.close();
            GuiHandler.openGui(itemGui);
        }
        // Cancel Inventory Clicks to prevent moving Items
        cancel(event);
    }
    if (Player.getContainer().getName().equals("§cButton Picker")) return cancel(event);
});