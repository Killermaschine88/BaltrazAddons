/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../constants/settings";
import { itemGui } from "./createMenu";

register("guiMouseClick", (mx, my, btn, gui, event) => {
    if (Player.getContainer().getName().equals("§7Custom SkyBlock Menu§r")) {
        if (Client.isShiftDown()) {
            ChatLib.chat("hi?");
            Client.currentGui.close();
            GuiHandler.openGui(itemGui);
        }
        // Cancel Inventory Clicks to prevent moving Items
        cancel(event);
    }
    if (Player.getContainer().getName().equals("§7Choose an icon§r")) return cancel(event);
});
