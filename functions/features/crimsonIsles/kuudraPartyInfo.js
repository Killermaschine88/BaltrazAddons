/// <reference types="../../../../CTAutocomplete" />
/// <reference lib="es2015" />

export const getMiscKuudraInfo = (userData) => {
    return "&7WIP"
}

export const getKuudraItemInfo = (inventoryData) => {
    let hasHyperion = false;
    let hasTerminator = false;
    let progress = 0;

    if (!inventoryData)
        return {
            string: "&cAPI Disabled",
            progress: "&cAPI Disabled",
        };

    const bytearray = Java.util.Base64.getDecoder().decode(inventoryData);
    const inputstream = new Java.io.ByteArrayInputStream(bytearray);
    let nbt = net.minecraft.nbt.CompressedStreamTools.func_74796_a(inputstream); // readCompressed
    nbt = `${nbt}`;

    if (nbt.includes("Hyperion") || nbt.includes("Scylla") || nbt.includes("Valkyrie") || nbt.includes("Astraea")) {
        hasHyperion = true;
        progress++;
    }

    if (nbt.includes("Terminator")) {
        hasTerminator = true;
        progress++;
    }

    return {
        string : `&7Hyperion: ${hasHyperion ? "&aYes" : "&cNo"}\n&7Terminator: ${hasTerminator ? "&aYes" : "&cNo"}`,
        progress : `${progress}/2`,
    }
}