/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import { DUNGEONEERING_XP } from "../constants/xpTables";

export const getLevelByXp = (xp, extra = {}) => {
    const xpTable = DUNGEONEERING_XP;
    extra.type = "dungeoneering";

    if (typeof xp !== "number" || isNaN(xp)) {
        xp = 0;
    }

    /** the level that this player is caped at */
    const levelCap = "50";

    /** the level ignoring the cap and using only the table */
    let uncappedLevel = 0;

    /** the amount of xp over the amount required for the level (used for calculation progress to next level) */
    let xpCurrent = xp;

    /** like xpCurrent but ignores cap */
    let xpRemaining = xp;

    while (xpTable[uncappedLevel + 1] <= xpRemaining) {
        uncappedLevel++;
        xpRemaining -= xpTable[uncappedLevel];
        if (uncappedLevel <= levelCap) {
            xpCurrent = xpRemaining;
        }
    }

    if (extra.type == "dungeoneering" && !extra.class) {
        while (xpCurrent >= 200000000) {
            uncappedLevel++;
            xpCurrent -= 200000000;
        }
    }

    /** the maximum level that any player can achieve (used for gold progress bars) */
    const maxLevel = "50";

    // not sure why this is floored but I'm leaving it in for now
    xpCurrent = Math.floor(xpCurrent);

    /** the level as displayed by in game UI */
    const level = extra.type != "dungeoneering" && !extra.class ? Math.min(levelCap, uncappedLevel) : uncappedLevel;

    /** the amount amount of xp needed to reach the next level (used for calculation progress to next level) */
    const xpForNext = level < maxLevel ? Math.ceil(xpTable[level + 1]) : Infinity;

    /** the fraction of the way toward the next level */
    const progress = extra.type == "dungeoneering" && !extra.class && level > 50 ? 1 : Math.max(0, Math.min(xpCurrent / xpForNext, 1));

    /** a floating point value representing the current level for example if you are half way to level 5 it would be 4.5 */
    const levelWithProgress = level + progress;

    /** a floating point value representing the current level ignoring the in-game unlockable caps for example if you are half way to level 5 it would be 4.5 */
    const unlockableLevelWithProgress = extra.cap ? Math.min(uncappedLevel + progress, maxLevel) : levelWithProgress;

    return {
        xp,
        level,
        maxLevel,
        xpCurrent,
        xpForNext,
        progress,
        levelCap,
        uncappedLevel,
        levelWithProgress,
        unlockableLevelWithProgress,
    };
};
