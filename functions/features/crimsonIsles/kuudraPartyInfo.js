/// <reference types="../../../../CTAutocomplete" />
/// <reference lib="es2015" />

const kuudraItems = ["Hyperion", "Scylla", "Valkyrie", "Astraea", "Terminator", "Gyrokinetic Wand"];

export const getMiscKuudraInfo = (userData) => {
    return "&7WIP";
};

export const getKuudraItemInfo = (inventoryData) => {
    let hasItems = [];
    let progress = 0;

    if (!inventoryData)
        return {
            string: "&cAPI Disabled",
            progress: "&cAPI Disabled",
        };

    const bytearray = java.util.Base64.getDecoder().decode(inventoryData);
    const inputstream = new java.io.ByteArrayInputStream(bytearray);
    // func_74796_a => readCompressed
    let nbt = net.minecraft.nbt.CompressedStreamTools.func_74796_a(inputstream);
    nbt = `${nbt}`;

    kuudraItems.forEach((item) => {
        if(nbt.includes(item)) {
            hasItems.push(`&7${item}`);
            progress++;
        }
    })

    return {
        string: hasItems.join("\n"),
        progress: `${progress}/${kuudraItems.length - 3}`,
    };
};
