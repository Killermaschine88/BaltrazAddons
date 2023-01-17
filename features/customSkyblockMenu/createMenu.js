/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../constants/settings";
import { skullInSlot, itemInSlot } from "../../functions/features/customSkyblockMenu/nbt";

const GuiChest = Java.type("net.minecraft.client.gui.inventory.GuiChest");
const InventoryBasic = Java.type("net.minecraft.inventory.InventoryBasic");
const Mc = Client.getMinecraft();

let firstTimeMenu = true;
let generatedMenu = false;
let firstTimeItem = true;
let generatedItem = false;

// Creating Custom Skyblock Menu GUI
// field_71071_by => inventory
let menuInv = new InventoryBasic("§7Custom SkyBlock Menu§r", true, 54);
let menuGui = new GuiChest(Player.getPlayer().field_71071_by, menuInv);

// Creating Custom Item Selector GUI
// field_71071_by => inventory
let itemInv = new InventoryBasic("§7Custom SkyBlock Menu Button Picker§r", true, 54);
let itemGui = new GuiChest(Player.getPlayer().field_71071_by, itemInv);

register("postGuiRender", (gui) => {
    if (!Settings.skyblockMenu) return;

    /*                          Custom Skyblock Menu                        */
    if (Player.getContainer()?.toString()?.includes("Custom SkyBlock Menu")) {
        if (firstTimeMenu && !generatedMenu) {
            firstTime = false;
            generated = true;
            // this is just here as an example for how uuid and texture work
            let uuid = "e780adce-f739-4c15-9e5b-a78562e2c935";
            let texture = "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvNGNiM2FjZGMxMWNhNzQ3YmY3MTBlNTlmNGM4ZTliM2Q5NDlmZGQzNjRjNjg2OTgzMWNhODc4ZjA3NjNkMTc4NyJ9fX0=";
        }
    }

    /*                          Custom Item Selector                            */
    if (Player.getContainer()?.toString()?.includes("§cButton Picker§r")) {
        console.log(JSON.stringify(Player?.getContainer()?.getStackInSlot(0)?.getLore()));
        if (firstTimeItem && !generatedItem) {
            firstTimeItem = false;
            generatedItem = true;

            itemInSlot(0, "test", ["§7Click to open the Skyblock Menu§r", "§cim a genius ngl§r"], "paper");
        }
    }
});

register("command", () => {
    GuiHandler.openGui(menuGui); // opens the gui
}).setName("test");

// this creates a new console that logs packets to it you can access it with /packetlogger to add stuff to console do c.println("balls")

const con = com.chattriggers.ctjs.utils.console.Console;
const c = new con(null);

register("Command", () => {
    c.showConsole();
}).setName("packetlogger");

register("packetSent", (packet) => {
    if (!packet.toString().includes("C03") && !packet.toString().includes("C0F") && !packet.toString().includes("C00")) {
        c.println(packet.toString());
    }
});

// this stops you from moving the items around while still telling us that you clicked that slot
register("guiMouseClick", (mx, my, btn, gui, event) => {
    if (Player.getContainer().getName().equals("§cCustom SkyBlock Menu§r")) {
        if (Client.isShiftDown()) {
            Client.currentGui.close();
            GuiHandler.openGui(itemGui);
        }
        // cancel the click so no item move
        cancel(event);
    }
    if (Player.getContainer().getName().equals("§cButton Picker")) return cancel(event);
});

register("itemTooltip", (lore, item, event) => {
    if (item.getName().equals("")) {
        cancel(event);
    }
});

/*
// examples of ways to do stuff

Client.currentGui.getSlotUnderMouse().getIndex() // gets the slot you are hovering over









*/
