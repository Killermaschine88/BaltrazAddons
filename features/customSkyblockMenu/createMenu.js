/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../constants/settings";
import BaseFeature from "../../classes/BaseFeature";
import { skullInSlot, itemInSlot } from "../../functions/features/customSkyblockMenu/nbt";
import { createGui } from "../../functions/features/customSkyblockMenu/util";

// Java Imports
const GuiChest = Java.type("net.minecraft.client.gui.inventory.GuiChest");
const InventoryBasic = Java.type("net.minecraft.inventory.InventoryBasic");

let firstTimeMenu = true;
let generatedMenu = false;
let firstTimeItem = true;
let generatedItem = false;

// Creating Custom Skyblock Menu GUI
// field_71071_by => inventory
let menuGui = createGui("§7Custom SkyBlock Menu§r");

// Creating Custom Item Selector GUI
// field_71071_by => inventory
export let itemGui = createGui("§7Choose an Icon§r");

register("postGuiRender", (gui) => {
    if (!Settings.customSkyblockMenu) return;

    if (Player.getContainer()?.toString()?.includes("§7Custom SkyBlock Menu§r")) {
        if (firstTimeMenu && !generatedMenu) {
            itemInSlot(0, "test", ["§7Click to open the Skyblock Menu§r", "§cim a genius ngl§r"], "paper");
            firstTime = false;
            generated = true;
            let test1 = Player.getContainer().getStackInSlot(0).getItemStack();
            Player.getContainer().container.func_75141_a(1, test1);
            // this is just here as an example for how uuid and texture work
            let uuid = "e780adce-f739-4c15-9e5b-a78562e2c935";
            let texture = "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvNGNiM2FjZGMxMWNhNzQ3YmY3MTBlNTlmNGM4ZTliM2Q5NDlmZGQzNjRjNjg2OTgzMWNhODc4ZjA3NjNkMTc4NyJ9fX0=";
        }
    }

    /*                          Custom Item Selector                            */
    if (Player.getContainer()?.toString()?.includes("§7Choose an icon§r")) {
        if (firstTimeItem && !generatedItem) {
            firstTimeItem = false;
            generatedItem = true;

            itemInSlot(0, "test", ["§7Click to open the Skyblock Menu§r", "§cim a genius ngl§r"], "paper");
        }
        console.log(
            Player?.getContainer()
                ?.getStackInSlot(0)
                ?.getNBT()
                ?.getTag("tag")
                ?.getTag("display")
                ?.get("Lore")
                .toString()
                .replace(/[0-9]:/g, "")
        ); // This gets the lore of the item and puts it in the format required for the item creation functions
    }
});

register("command", () => {
    GuiHandler.openGui(menuGui); // opens the gui
}).setName("test");

register("itemTooltip", (lore, item, event) => {
    if (item.getName().includes("Empty Slot") && Settings.hiddenCustomItemTooltip) return cancel(event);
});

// examples of ways to do stuff

//Client.currentGui.getSlotUnderMouse().getIndex() // gets the slot you are hovering over
// let example = Player.getContainer().getStackInSlot(SLOT).getItemStack(); // grabs the item that you want to move somewhere else
