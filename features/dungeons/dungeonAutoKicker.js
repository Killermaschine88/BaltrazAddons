/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../constants/settings";
import BaseFeature from "../../classes/BaseFeature";

class DungeonAutoKicker extends BaseFeature {
    constructor() {
        super();

        this.setName("dungeonAutoKicker");
        this.addEvent(
            register("chat", (name, selectedClass, classLevel, event) => {
                if (!Settings.dungeonAutoKicker) return;
                if (Settings[`autoKick${selectedClass}`]) {
                    if (Settings[`autoKick${selectedClass}Level`] > classLevel) {
                        return setTimeout(() => {
                            ChatLib.command(`p kick ${name}`);
                        }, 500);
                    }
                }
            }).setCriteria("Party Finder > ${name} joined the dungeon group! (${selectedClass} Level ${classLevel})")
        );

        this.registerEvents();
    }
}

export default new DungeonAutoKicker();
