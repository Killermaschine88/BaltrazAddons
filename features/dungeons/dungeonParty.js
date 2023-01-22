/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../constants/settings";
import BaseFeature from "../../classes/BaseFeature";
import { getHypixelPlayerData, getSkyblockPlayerData, getUUID } from "../../functions/api";
import { getRank } from "../../functions/ranks";
import { getDungeonRunsDone, getDungeonItemInfo, getMiscDungeonIfno } from "../../functions/features/dungeons/dungeonPartyUtils";
import { getLevelByXp } from "../../functions/levels";
import { missingAPIKeyError, sendError } from "../../functions/errors";
import { prefix } from "../../constants/variables";

const dungeonClasses = {
    Mage: "M",
    Healer: "H",
    Berserk: "B",
    Archer: "A",
    Tank: "T",
};

let autoKicked = false;

class DungeonAutoKicker extends BaseFeature {
    constructor() {
        super();

        this.setName("dungeonAutoKicker");
        this.addEvent(
            register("chat", (name, selectedClass, classLevel, event) => {
                if (!Settings.dungeonAutoKicker) return;
                if (Settings[`autoKick${selectedClass}`]) {
                    if (Settings[`autoKick${selectedClass}Level`] > classLevel) {
                        setTimeout(() => {
                            autoKicked = true;
                            return ChatLib.command(`p kick ${name}`);
                        }, 500);
                    }
                }
            }).setCriteria("Party Finder > ${name} joined the dungeon group! (${selectedClass} Level ${classLevel})")
        );

        this.registerEvents();
    }
}

class DungeonPlayerInfo extends BaseFeature {
    constructor() {
        super();

        this.setName("dungeonPlayerInfo");
        this.addEvent(
            register("chat", (name, selectedClass, classLevel, event) => {
                // Chat Utilities
                if (Settings.dungeonPlayerInfo) {
                    if (!Settings.apiKey) {
                        return missingAPIKeyError("Dungeon Party Player Info");
                    }

                    if(autoKicked) {
                        return autoKicked = false;
                    }

                    getUUID(name)
                        .then((res) => {
                            const uuid = res.id;

                            getHypixelPlayerData(uuid)
                                .then((res) => {
                                    const secrets = res.player.achievements.skyblock_treasure_hunter;
                                    const rank = getRank(res);

                                    getSkyblockPlayerData(uuid)
                                        .then((res) => {
                                            const profile = res.profiles.find((profile) => profile.selected);
                                            const userData = profile.members[uuid];
                                            const dungeonLevel = getLevelByXp(userData.dungeons.dungeon_types.catacombs.experience)?.level;
                                            const itemInfo = getDungeonItemInfo(userData?.inv_contents?.data);

                                            new Message(
                                                new TextComponent(`${prefix} &7Dungeon Info &6${rank} ${name} &7(&bC${dungeonLevel}&7, &b${dungeonClasses[selectedClass]}${classLevel}&7) `).setClick("run_command", `/pv ${name}`).setHover("show_text", "&7Check the NEU Profile Viewer for more info!"),
                                                new TextComponent("&c[Kick]\n").setClick("run_command", `/p kick ${name}`).setHover("show_text", "&7Click to kick this player from the party!"),
                                                new TextComponent(`${prefix} &c[Dungeons] `).setHover("show_text", `${getDungeonRunsDone(userData, false)}`),
                                                new TextComponent("&4[Master Mode] ").setHover("show_text", `${getDungeonRunsDone(userData, true)}`),
                                                new TextComponent(`&d[Items (${itemInfo.progress}&d)] `).setHover("show_text", `${itemInfo.string}`),
                                                new TextComponent("&5[Misc Info]").setHover("show_text", `${getMiscDungeonIfno(userData, secrets)}`)
                                            ).chat();
                                        })
                                        .catch((err) => {
                                            if (Settings.logErrorsToChat) {
                                                sendError(`&7Error getting Data from Skyblock API for ${name}`);
                                                sendError(`&7${JSON.stringify(err)}`);
                                            }
                                            console.log(err);
                                        });
                                })
                                .catch((err) => {
                                    if (Settings.logErrorsToChat) {
                                        sendError(`&7Error getting Data from Hypixel API for ${name}`);
                                        sendError(`&7${JSON.stringify(err)}`);
                                    }
                                    console.log(err);
                                });
                        })
                        .catch((err) => {
                            if (Settings.logErrorsToChat) {
                                sendError(`&7Error getting UUID for ${name}`);
                                sendError(`&7${JSON.stringify(err)}`);
                            }
                            console.log(err);
                        });
                }
            }).setCriteria("Party Finder > ${name} joined the dungeon group! (${selectedClass} Level ${classLevel})")
        );

        this.registerEvents();
    }
}

export const DungeonAutoKickerExport = new DungeonAutoKicker();
export const DungeonPlayerInfoExport = new DungeonPlayerInfo();
