/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../constants/settings";
import { getDamageScale, isValidDamageEntity } from "../../functions/features/misc/damageRenderUtils";

let damageText = [];
const customDamageTypes = ["Small", "Normal", "Big", "Custom", "Hidden"];

register("renderEntity", (entity, pos, idk, event) => {
    // Ignore if Custom Damage Render is Disabled
    if (!Settings.customDamageRender) return;

    // Ignoring Non ArmorStands
    if (entity.getClassName() !== "EntityArmorStand") return;

    // Don't render any armorstands if option is "Hidden"
    if (customDamageTypes[Settings.customDamageType] === "Hidden" && isValidDamageEntity(entity)) {
        cancel(event);
        return;
    }

    // Check if Valid Entity
    if (!isValidDamageEntity(entity)) return;

    // Cancel Event if valid entity
    cancel(event);

    // Check if Entity is already in Render List
    if (damageText.find((dmg) => dmg.name === entity.name && dmg.x === entity.x && dmg.y === entity.y && dmg.z === entity.z)) return;

    // Last Checks
    if (Math.floor(entity.distanceTo(Player.getX(), Player.getY(), Player.getZ())) >= Settings.maxDamageRenderDistance) return;
    if (damageText.length >= Settings.maxDamageRenderDisplay) return;

    // Adding to Render List
    damageText.push({ name: entity.name, x: entity.x, y: entity.y, z: entity.z, age: 0 });
});

register("renderWorld", () => {
    // Ignore if Custom Damage Render is Disabled
    if (!Settings.customDamageRender) return;

    // Ignore if Damage Text is empty
    if (damageText.length === 0) return;

    // Render Damage Text
    damageText.forEach((dmg) => {
        Tessellator.drawString(`${dmg.name}`, dmg.x, dmg.y, dmg.z, 0xffffff, true, getDamageScale(customDamageTypes[Settings.customDamageType]), false);
    });
});

// Remove damage text after 3 seconds
register("step", () => {
    damageText.forEach((dmg) => {
        dmg.age++;
        if (dmg.age >= 1) {
            damageText.splice(damageText.indexOf(dmg), 1);
        }
    });
}).setDelay(1);
