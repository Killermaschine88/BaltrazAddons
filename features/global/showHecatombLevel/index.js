/// <reference types="../../../../CTAutocomplete" />
/// <reference lib="es2015" />

import BaseFeature from "../../../classes/BaseFeature";
import Settings from "../../../constants/settings";
import { addToItemLore } from "../showChampionLevel/functions";
import { formatNumber } from "../../../functions/util";

const hecatombRuns = [2, 5, 10, 20, 30, 40, 60, 80, 100];

class ShowHecatombLevel extends BaseFeature {
    constructor() {
        super();

        this.setName("showHecatombLevel");
        this.addEvent(
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
            })
        );

        this.registerEvents();
    }
}

export default new ShowHecatombLevel();
