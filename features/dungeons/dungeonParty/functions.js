/// <reference types="../../../../CTAutocomplete" />
/// <reference lib="es2015" />

import { convertToPBTime } from "../../../functions/util";

export const getDungeonRunsDone = (userData, masterMode) => {
    let completedRuns = masterMode === false ? userData.dungeons.dungeon_types.catacombs.tier_completions : userData.dungeons.dungeon_types.master_catacombs.tier_completions;
    let runTimes = masterMode === false ? userData.dungeons.dungeon_types.catacombs.fastest_time : userData.dungeons.dungeon_types.master_catacombs.fastest_time;

    if (!completedRuns) completedRuns = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };
    if (!runTimes) runTimes = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };

    let str = "";
    //ChatLib.chat(JSON.stringify(completedRuns))
    //ChatLib.chat(JSON.stringify(runTimes))
    if (completedRuns[1]) str += `&7Floor 1: ${completedRuns[1] || 0} (PB: ${convertToPBTime(runTimes[1] || 0)})`;
    if (completedRuns[2]) str += `\n&7Floor 2: ${completedRuns[2] || 0} (PB: ${convertToPBTime(runTimes[2] || 0)})`;
    if (completedRuns[3]) str += `\n&7Floor 3: ${completedRuns[3] || 0} (PB: ${convertToPBTime(runTimes[3] || 0)})`;
    if (completedRuns[4]) str += `\n&7Floor 4: ${completedRuns[4] || 0} (PB: ${convertToPBTime(runTimes[4] || 0)})`;
    if (completedRuns[5]) str += `\n&7Floor 5: ${completedRuns[5] || 0} (PB: ${convertToPBTime(runTimes[5] || 0)})`;
    if (completedRuns[6]) str += `\n&7Floor 6: ${completedRuns[6] || 0} (PB: ${convertToPBTime(runTimes[6] || 0)})`;
    if (completedRuns[7]) str += `\n&7Floor 7: ${completedRuns[7] || 0} (PB: ${convertToPBTime(runTimes[7] || 0)})`;

    return str;
};

export const getDungeonItemInfo = (inventoryData) => {
    let hasHyperion = false;
    let hasTerminator = false;
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

    if (nbt.includes("Hyperion") || nbt.includes("Scylla") || nbt.includes("Valkyrie") || nbt.includes("Astraea")) {
        hasHyperion = true;
        progress++;
    }

    if (nbt.includes("Terminator")) {
        hasTerminator = true;
        progress++;
    }

    return {
        string: `&7Hyperion: ${hasHyperion ? "&aYes" : "&cNo"}\n&7Terminator: ${hasTerminator ? "&aYes" : "&cNo"}`,
        progress: `${progress}/2`,
    };
};

export const getMiscDungeonIfno = (userData, secrets = 0) => {
    const completedDungeonRuns = Object.values(userData.dungeons.dungeon_types.catacombs.tier_completions).reduce((a, b) => a + b, 0);
    const completedMastermodeRuns = Object.values(userData.dungeons.dungeon_types.master_catacombs.tier_completions).reduce((a, b) => a + b, 0);
    const totalCompletedRuns = completedDungeonRuns + completedMastermodeRuns;
    const secretsPerRun = (secrets / totalCompletedRuns).toFixed(1);

    return `&7Secrets: ${secrets} (${secretsPerRun} per Run)`;
};
