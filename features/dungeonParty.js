/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../constants/settings";
import { getHypixelPlayerData, getSkyblockPlayerData, getUUID } from "../util/api";
import { getRank } from "../util/functions";
import { getDungeonRunsDone, getItemInfo, getMiscInfo } from "../util//features/dungeonPartyUtils";
import { getLevelByXp } from "../util/levels";
import { missingAPIKeyError, sendError } from "../util/errors";
import { prefix } from "../constants/variables";

const dungeonClasses = {
    Mage: "M",
    Healer: "H",
    Berserk: "B",
    Archer: "A",
    Tank: "T",
};

register("chat", (name, selectedClass, classLevel, event) => {
    if (Settings[`autoKick${selectedClass}`]) {
        if (Settings[`autoKick${selectedClass}Level`] > classLevel) {
            return setTimeout(() => {
                ChatLib.command(`p kick ${name}`);
            }, 500);
        }
    }

    // Chat Utilities
    if (Settings.partyPlayerInfo) {
        if (!Settings.apiKey) {
            return missingAPIKeyError("Party Player Info");
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
                                const itemInfo = getItemInfo(userData?.inv_contents?.data);

                                new Message(
                                    new TextComponent(`${prefix} &7Dungeon Info &6${rank} ${name} &7(&bC${dungeonLevel}&7, &b${dungeonClasses[selectedClass]}${classLevel}&7) `).setClick("run_command", `/pv ${name}`).setHover("show_text", "&7Check the NEU Profile Viewer for more info!"),
                                    new TextComponent("&c[Kick]\n").setClick("run_command", `/p kick ${name}`).setHover("show_text", "&7Click to kick this player from the party!"),
                                    new TextComponent(`${prefix} &c[Dungeons] `).setHover("show_text", `${getDungeonRunsDone(userData, false)}`),
                                    new TextComponent("&4[Master Mode] ").setHover("show_text", `${getDungeonRunsDone(userData, true)}`),
                                    new TextComponent(`&d[Items (${itemInfo.progress}&d)] `).setHover("show_text", `${itemInfo.string}`),
                                    new TextComponent("&5[Misc Info]").setHover("show_text", `${getMiscInfo(userData, secrets)}`)
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
                            sendError(`${prefix} &7Error getting Data from Hypixel API for ${name}`);
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
}).setCriteria("Party Finder > ${name} joined the dungeon group! (${selectedClass} Level ${classLevel})");
