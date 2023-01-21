/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import BaseFeature from "../../classes/BaseFeature";
import Settings from "../../constants/settings";
import { addToItemLore } from "../../functions/features/misc/loreRenderUtils";
import { formatNumber } from "../../functions/util";

const championLevels = [50000, 100000, 250000, 500000, 1000000, 1500000, 2000000, 2500000, 3000000];

class ShowChampionLevel extends BaseFeature {
    constructor() {
        super();

        this.setName("showChampionLevel");
        this.addEvent(
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
            })
        );

        this.registerEvents();
    }
}

export default new ShowChampionLevel();
