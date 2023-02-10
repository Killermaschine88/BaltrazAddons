/// <reference types="../../../../CTAutocomplete" />
/// <reference lib="es2015" />

const NBTTagString = Java.type("net.minecraft.nbt.NBTTagString");

export const checkLoreForCustomName = (item, originalName, customName) => {
    const loreList = item.getNBT().getCompoundTag("tag").getCompoundTag("display").getTagMap().get("Lore");
    if (!loreList) return;
    let alreadyExisted = false;

    // Loop over lore list and check if the prefix already exists, if so update it
    // func_74745_c => tagCount
    // func_150307_f => getStringTagAt
    // func_150304_a => set
    for (let i = 0; i < loreList.func_74745_c(); i++) {
        if (String(loreList.func_150307_f(i)).includes(originalName) || String(loreList.func_150307_f(i)).includes(getPlayerName(originalName))) {
            let newLore = String(loreList.func_150307_f(i)).replace(getPlayerName(originalName), changeFormatting(customName));
            loreList.func_150304_a(i, new NBTTagString(newLore));
            alreadyExisted = true;
        }
    }

    // Update the item's lore
    // func_74782_a => setTag
    item.getNBT().getCompoundTag("tag").getCompoundTag("display").getRawNBT().func_74782_a("Lore", loreList);
};

export const checkIfInText = (text, name) => {
    if (text.includes(name) || text.includes(name?.replaceAll("&", "§"))) {
        return true;
    } else {
        return false;
    }
};

export const changeFormatting = (text) => {
    return text.replaceAll("&", "§");
};

export const getPlayerName = (text) => {
    return text.split(" ")[1];
};

export const fixShittyScoreboard = (text) => {
    return text.replaceAll("🎁", "").replaceAll("⚽", "").replaceAll("🎉", "").replaceAll("👹", "").replaceAll("🏀", "").replaceAll("🍭", "").replaceAll("🌠", "").replaceAll("👾", "").replaceAll("🐍").replaceAll("🔮").replaceAll("👽", "").replaceAll("🎂", "");
};
