/// <reference types="../../../../CTAutocomplete" />
/// <reference lib="es2015" />

// imports
import { darkestColor, darkColor, lightColor, lightestColor } from "./constants";
import * as Elementa from "../../../../Elementa";

// Java Imports
const GuiChest = Java.type("net.minecraft.client.gui.inventory.GuiChest");
const InventoryBasic = Java.type("net.minecraft.inventory.InventoryBasic");
const Color = Java.type("java.awt.Color");

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

// functions to animate change button color to {color}
export const animateColorDarkest = (comp) => {
    if (!comp) return;
    Elementa.animate(comp, (animation) => {
        animation.setColorAnimation(Elementa.Animations.OUT_EXP, 0.5, new Elementa.ConstantColorConstraint(darkestColor()));
    });
};

export const animateColorDark = (comp) => {
    if (!comp) return;
    Elementa.animate(comp, (animation) => {
        animation.setColorAnimation(Elementa.Animations.OUT_EXP, 0.5, new Elementa.ConstantColorConstraint(darkColor()));
    });
};

export const animateColorLight = (comp) => {
    if (!comp) return;
    Elementa.animate(comp, (animation) => {
        animation.setColorAnimation(Elementa.Animations.OUT_EXP, 0.5, new Elementa.ConstantColorConstraint(lightColor()));
    });
};

export const animateColorLightest = (comp) => {
    if (!comp) return;
    Elementa.animate(comp, (animation) => {
        animation.setColorAnimation(Elementa.Animations.OUT_EXP, 0.5, new Elementa.ConstantColorConstraint(lightestColor()));
    });
};
// title case skidded from online (https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript) cause i dont have time to make my own
export const titleCase = (str) => {
    str = str.toString();

    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

// creates hover text 
export const hoverNav = (text) => {
    text = titleCase(text);
    return new Elementa.UIRoundedRectangle(1)
        .setX(new Elementa.MousePositionConstraint())
        .setY(new Elementa.MousePositionConstraint())
        .setWidth(new Elementa.AdditiveConstraint(new Elementa.ChildBasedMaxSizeConstraint(), (5).pixels()))
        .setHeight(new Elementa.AdditiveConstraint(new Elementa.ChildBasedMaxSizeConstraint(), (5).pixels()))
        .enableEffect(new Elementa.OutlineEffect(Color.WHITE, 0.5))
        .setColor(new Elementa.ConstantColorConstraint(darkColor()))
        .addChild(new Elementa.UIText(text).setX(new Elementa.CenterConstraint()).setY(new Elementa.CenterConstraint()).setTextScale((1).pixels()).setColor(new Elementa.ConstantColorConstraint(Color.WHITE)));
};


