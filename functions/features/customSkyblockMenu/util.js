/// <reference types="../../../../CTAutocomplete" />
/// <reference lib="es2015" />

// Java Imports
const GuiChest = Java.type("net.minecraft.client.gui.inventory.GuiChest");
const InventoryBasic = Java.type("net.minecraft.inventory.InventoryBasic");

// field_71071_by => inventory
export const createGui = (name) => {
    let menu = new InventoryBasic(name, true, 54);
    return new GuiChest(Player.getPlayer().field_71071_by, menu);
};
