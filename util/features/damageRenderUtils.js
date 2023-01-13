/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../constants/settings";

export const getDamageScale = (type) => {
    if (type === "Small") return 0.02;
    if (type === "Normal") return 0.03;
    if (type === "Big") return 0.05;
    if (type === "Custom") {
        return Number(Settings.customDamageScale / 1666);
    }
};

export const isValidDamageEntity = (entity) => {
    if (entity.getName().includes("§8[")) return false; // Ignoring Mob Nametags

    if (!isNaN(Number(entity.getName().replace("§", "")))) return true; // Non Crits
    if (entity.getName().includes("✧")) return true; // Crits
    if (entity.getName().includes("§2")) return true; // Venomous Damage
    if (entity.getName().includes("§6") && !isNaN(entity.getName())) return true; // Fire Aspect Damage
    if (entity.getName().includes("§7")) return true; // True Damage
    if (entity.getName().includes("§9")) return true; // IDFK what this damage type is but it exists

    // Nothing passed
    return false;
};
