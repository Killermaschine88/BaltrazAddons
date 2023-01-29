/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../constants/settings";
import BaseFeature from "../../classes/BaseFeature";
import { skullInSlot, itemInSlot } from "../../functions/features/customSkyblockMenu/nbt";
import { prefix } from "../../constants/variables";

// Java Imports
const GuiChest = Java.type("net.minecraft.client.gui.inventory.GuiChest");
const InventoryBasic = Java.type("net.minecraft.inventory.InventoryBasic");

let firstTimeMenu = true;


// will be moved probs
let skyblockItems = {
    "quiver": "#*&*#!Quiver"
};

// will be moved probs

let menuSlots = {
    0: "",
    1: "",
    2: "",
    3: "",
    4: skyblockItems.quiver,
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
    10: "",
    11: "",
    12: "",
    13: "",
    14: "",
    15: "",
    16: "",
    17: "",
    18: "",
    19: "",
    20: "",
    21: "",
    22: "",
    23: "",
    24: "",
    25: "",
    26: "",
    27: "",
    28: "",
    29: "",
    30: "",
    31: "",
    32: "",
    33: "",
    34: "",
    35: "",
    36: "",
    37: "",
    38: "",
    39: "",
    40: "",
    41: "",
    42: "",
    43: "",
    44: "",
    45: "",
    46: "",
    47: "",
    48: "",
    49: "",
    50: "",
    51: "",
    52: "",
    53: "",
};

if (skyblockItems.quiver === "") {
    ChatLib.chat("error!")
}


// Creating Custom Skyblock Menu GUI// field_71071_by => inventory
let menuInv = new InventoryBasic(`${prefix} §7SkyBlock Menu§r`, true, 54);
export let menuGui = new GuiChest(Player.getPlayer().field_71071_by, menuInv);

register("postGuiRender", (gui) => {
    if (!Settings.customSkyblockMenu) return;

    if (Player.getContainer()?.toString()?.includes(`${prefix} §7SkyBlock Menu§r`)) {
        if (firstTimeMenu) {

            firstTimeMenu = false;

            itemInSlot(0, "test", ["§7Click to open the Skyblock Menu§r", "§cim a genius ngl§r"], "paper");
    
            for (let i = 1; i < 54; i++) {
                if (i == 54) break;
                if (menuSlots[i] !== "") {
                    if (menuSlots[i].includes("#*&*#!")) { // checks if the item failed to be grabbed from the gui
                        let item = menuSlots[i].replace("#*&*#!", ""); // if it does create a new variable w/o that for the error
                        itemInSlot(i, "§c§lERROR", [`§cError loading §b${item}`, "§cPlease report this to the discord", "§cThe discord link has been sent in chat.", "Before reporting try reopening the menu", "If you just created the item it may not be working yet in which case reopen the menu."], "barrier"); // creates in item in the slot they specified 
                        ChatLib.chat(`${prefix} §cPlease send the error in #bug-reports§r`);
                        ChatLib.chat(new TextComponent(`${prefix} §7https://discord.gg/CM9ZT5U8na`).setHoverValue(`§bhttps://discord.gg/CM9ZT5U8na`).setClick("open_url", "https://discord.gg/CM9ZT5U8na"));
                    } else {
                        Player.getContainer().container.func_75141_a(i, menuSlots[i]);
                    }
                }
            }


        }
    }
});

register("guiClosed", () => {
    if (!Settings.customSkyblockMenu) return;

    if (firstTimeMenu == false) {
        firstTimeMenu = true;
    }

});

register("command", () => {
    GuiHandler.openGui(menuGui); // opens the gui
}).setName("test");

register("itemTooltip", (lore, item, event) => {
    if (item.getName().includes("Empty Slot") && Settings.hiddenCustomItemTooltip) return cancel(event);
});

// examples of ways to do stuff

// Client.currentGui.getSlotUnderMouse().getIndex() // gets the slot you are hovering over

// let example = Player.getContainer().getStackInSlot(SLOT).getItemStack(); // grabs the item that you want to move somewhere else

// Player.getContainer().container.func_75141_a(slot#, exampleItem); // sets the item in the slot specified

// this is just here as an example for how uuid and texture work
// let uuid = "e780adce-f739-4c15-9e5b-a78562e2c935";
// let texture = "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvNGNiM2FjZGMxMWNhNzQ3YmY3MTBlNTlmNGM4ZTliM2Q5NDlmZGQzNjRjNjg2OTgzMWNhODc4ZjA3NjNkMTc4NyJ9fX0=";

// #*&*#! // THAT IS THE KEY TO CHECK FOR ERRORS AND SHIT YEAH DONT REMOVE THIS ITS REQUIRED AT THE START OF THE STRING