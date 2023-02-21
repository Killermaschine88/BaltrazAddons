/// <reference types="../../../../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../../../constants/settings";
const Blocks = Java.type("net.minecraft.init.Blocks");
const ignoreBlocks = ["Chest", "Lever"];

new KeyBind("Ghost Block", Keyboard.KEY_G, "BaltrazAddons").registerKeyPress(() => {
    if (!Settings.ghostBlockKeybind) return;
    const originalBlock = Player.lookingAt();
    const itemType = `${originalBlock?.type?.name}`;
    if (!originalBlock) return;
    if (ignoreBlocks.includes(itemType)) return;
    //if(!originalBlock?.getX() || !originalBlock?.getY() || originalBlock?.getZ()) return

    // Change the original block to air
    // func_175656_a -> setBlockState
    // field_150350_a -> air
    // func_176223_P -> getDefaultState
    const pos = new net.minecraft.util.BlockPos(originalBlock?.getX(), originalBlock?.getY(), originalBlock?.getZ());
    World.getWorld().func_175656_a(pos, Blocks.field_150350_a.func_176223_P());
});
