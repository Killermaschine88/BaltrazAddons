/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../constants/settings";
import { addToItemLore } from "../../functions/features/misc/loreRenderUtils";
import { formatNumber } from "../../functions/util";

const championLevels = [50000, 100000, 250000, 500000, 1000000, 1500000, 2000000, 2500000, 3000000];
const hecatombRuns = [2, 5, 10, 20, 30, 40, 60, 80, 100];

// Have to split it into 2 events else it breaks for some reason
register("itemTooltip", (lore, item, event) => {
    if (Settings.showChampionLevel) {
        const currentXP = item?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getDouble("champion_combat_xp");

        if (!currentXP) return;

        let currentLevel = 1;
        championLevels.forEach((lvl) => {
            if (currentXP >= lvl) currentLevel++;
        });
        const nextLevel = championLevels[currentLevel - 1];

        return addToItemLore(item, "§6Champion: ", "§a" + currentLevel + " §e" + formatNumber(Math.round(currentXP), "comma") + (nextLevel ? " §7/ §e" + formatNumber(Math.round(nextLevel), "comma") : ""));
    }
});

register("itemTooltip", (lore, item, event) => {
    if (Settings.showHecatombLevel) {
        const currentRuns = item?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getInteger("hecatomb_s_runs");

        if (!currentRuns) return;

        let currentLevel = 1;
        hecatombRuns.forEach((lvl) => {
            if (currentRuns >= lvl) currentLevel++;
        });
        const nextLevel = hecatombRuns[currentLevel - 1];

        return addToItemLore(item, "§6Hecatomb: ", "§a" + currentLevel + " §e" + formatNumber(Math.round(currentRuns), "comma") + (nextLevel ? " §7/ §e" + formatNumber(Math.round(nextLevel), "comma") : ""));
    }
});
