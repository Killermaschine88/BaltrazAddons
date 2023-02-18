/// <reference types="../../../../CTAutocomplete" />
// imports
import { darkestColor, darkColor, lightColor, lightestColor } from "./constants";
import * as Elementa from "../../../../Elementa";

/// <reference lib="es2015" />

// Java Imports
const GuiChest = Java.type("net.minecraft.client.gui.inventory.GuiChest");
const InventoryBasic = Java.type("net.minecraft.inventory.InventoryBasic");

// field_71071_by => inventory
export const createGui = (name) => {
    let menu = new InventoryBasic(name, true, 54);
    return new GuiChest(Player.getPlayer().field_71071_by, menu);
};

const MCNBTTagString = Java.type("net.minecraft.nbt.NBTTagString");
const MCNBTTagCompound = Java.type("net.minecraft.nbt.NBTTagCompound");
const MCNBTTagList = Java.type("net.minecraft.nbt.NBTTagList");

export const skullInSlot = (slot, name, lore, uuid, texture) => {
    // Grab Players current Inventory
    const inv = Player.getContainer();

    // Creating Item in the Inventory
    // func_75141_a => putStackInSlot
    // func_151001_c => setStackDisplayName
    inv.container.func_75141_a(slot, new Item("skull").getItemStack().func_151001_c(name));

    // Grabbing the Item just placed into the Inventory
    const item = inv.getStackInSlot(slot);

    // Adding Skull NBTTagCompound for Skull Owner UUID
    item.getNBT().getTag("tag").set("SkullOwner", new NBTTagCompound(new MCNBTTagCompound())).getTag("SkullOwner").set("Id", new MCNBTTagString(uuid)); // adds the skull owner compound + uuid
    // Add Properties and Textures NBT
    item.getNBT().getTag("tag").getTag("SkullOwner").set("Properties", new NBTTagCompound(new MCNBTTagCompound())).getTag("Properties").set("textures", new NBTTagList(new MCNBTTagList()));

    // Add the NBTTagCompound in the Textures Tag
    new NBTTagList(item.getNBT().getTag("tag").getTag("SkullOwner").getTag("Properties").getTag("textures").rawNBT).appendTag(new NBTTagCompound(new MCNBTTagCompound()));

    // Add the NBTTagString with the Texture to the Skull
    new NBTTagCompound(new NBTTagList(item.getNBT().getTag("tag").getTag("SkullOwner").getTag("Properties").getTag("textures").rawNBT).get(0)).set("Value", new MCNBTTagString(texture));

    item.setDamage(3); // Most likely needed (NEEDS TESTING)

    // Adding Lore to the Item
    item.getNBT().getTag("tag").set("display", new NBTTagCompound(new MCNBTTagCompound())).getTag("display").set("Lore", new NBTTagList(new MCNBTTagList()));
    for (let i = 0; i < lore.length + 1; i++) {
        if (!lore[i]) {
            // Set Name again else it breaks the Item and says "Skull" as Item Name
            item.setName(name);
            break;
        }

        // Adding the Lore Line to the NBT
        new NBTTagList(item.getNBT().getTag("tag").getTag("display").get("Lore").rawNBT).appendTag(new MCNBTTagString(lore[i]));
    }
};

export const itemInSlot = (slot, name, lore, itemType, variant) => {
    // variant is optional
    let inv = Player.getContainer(); // cleans up stuff

    // Create the Item with the given ItemType
    // func_75141_a => putStackInSlot
    inv.container.func_75141_a(slot, new Item(itemType).getItemStack().func_151001_c(name));

    // Grabbing the Item just placed into the Inventory
    const item = inv.getStackInSlot(slot);

    // Adding Lore to the Item
    item.getNBT().getTag("tag").set("display", new NBTTagCompound(new MCNBTTagCompound())).getTag("display").set("Lore", new NBTTagList(new MCNBTTagList()));
    for (let i = 0; i < lore.length + 1; i++) {
        if (!lore[i]) {
            // Set Name again else it breaks the Item and says the "ItemType" as Item Name
            item.setName(name);
            break;
        }
        // Adding the Lore Line to the NBT
        new NBTTagList(item.getNBT().getTag("tag").getTag("display").get("Lore").rawNBT).appendTag(new MCNBTTagString(lore[i]));
    }

    if (variant) {
        item.setDamage(variant);
    }
};

// function to get the center x coord of the elementa component (only for nav buttons)
export const getCenterX = (comp) => {
    return comp.getLeft() + comp.getWidth() / 8;
};

// function to get the center y coord of the elementa component (only for nav buttons)
export const getCenterY = (comp) => {
    return comp.getTop() + comp.getBottom() / 18;
};

// function to animate change button color to {color}
export const animateColorDarkest = (comp) => {
    Elementa.animate(comp, (animation) => {
        animation.setColorAnimation(Elementa.Animations.OUT_EXP, 0.5, new Elementa.ConstantColorConstraint(darkestColor()));
    });
};

export const animateColorDark = (comp) => {
    Elementa.animate(comp, (animation) => {
        animation.setColorAnimation(Elementa.Animations.OUT_EXP, 0.5, new Elementa.ConstantColorConstraint(darkColor()));
    });
}

export const animateColorLight = (comp) => {
    Elementa.animate(comp, (animation) => {
        animation.setColorAnimation(Elementa.Animations.OUT_EXP, 0.5, new Elementa.ConstantColorConstraint(lightColor()));
    });
}

export const animateColorLightest = (comp) => {
    Elementa.animate(comp, (animation) => {
        animation.setColorAnimation(Elementa.Animations.OUT_EXP, 0.5, new Elementa.ConstantColorConstraint(lightestColor()));
    });
}
