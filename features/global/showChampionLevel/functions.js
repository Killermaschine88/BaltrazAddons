/// <reference types="../../../../CTAutocomplete" />
/// <reference lib="es2015" />

const NBTTagString = Java.type("net.minecraft.nbt.NBTTagString");

// Credit to soopyV2 for the Function
export const addToItemLore = (item, prefix, newLine) => {
    const loreList = item.getNBT().getCompoundTag("tag").getCompoundTag("display").getTagMap().get("Lore");

    let alreadyExisted = false;

    // Loop over lore list and check if the prefix already exists, if so update it
    // func_74745_c => tagCount
    // func_150307_f => getStringTagAt
    // func_150304_a => set
    for (let i = 0; i < loreList.func_74745_c(); i++) {
        if (String(loreList.func_150307_f(i)).startsWith(prefix)) {
            loreList.func_150304_a(i, new NBTTagString(prefix + newLine));
            alreadyExisted = true;
        }
    }

    // if the prefix didn't exist, add it to the end of the list
    if (!alreadyExisted) {
        // func_74742_a => appendTag
        loreList.func_74742_a(new NBTTagString(prefix + newLine));
    }

    // Update the item's lore
    // func_74782_a => setTag
    item.getNBT().getCompoundTag("tag").getCompoundTag("display").getRawNBT().func_74782_a("Lore", loreList);
};
