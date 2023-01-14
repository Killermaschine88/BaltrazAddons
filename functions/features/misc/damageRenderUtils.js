/// <reference types="../../../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../../constants/settings";

export const getDamageScale = (type) => {
    if (type === "Small") return 0.02;
    if (type === "Normal") return 0.03;
    if (type === "Big") return 0.05;
    if (type === "Custom") {
        return Number(Settings.customDamageScale / 1666);
    }
};

export const isValidDamageEntity = (entity) => {
    const entityName = entity.getName()
    const formattedName = parseInt(entity.getName().removeFormatting().replaceAll(",", "").replaceAll("✧", ""))

    if(isNaN(formattedName)) return false; // Ignoring Non Numbers
    if (entityName.includes("§8[")) return false; // Ignoring Mob Nametags
    if (entityName.includes(" ")) return false; // Ignoring Stuff with Spaces as DMG ArmorStands don't have spaces

    if (!isNaN(formattedName)) return true; // Non Crits
    if (entityName.includes("✧")) return true; // Crits
    if(entityName.includes("☄")) return true // Vood Doll
    if (entityName.includes("§2")) return true; // Venomous Damage
    if (entityName.includes("§6")) return true; // Fire Aspect Damage
    if (entityName.includes("§7")) return true; // True Damage
    if (entityName.includes("§3") && !(entityName.includes("✦"))) return true; // IDFK what this damage type is but it exists

    // Nothing passed
    return false;
};
