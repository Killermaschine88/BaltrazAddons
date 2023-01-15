/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../constants/settings";
import { getHypixelPlayerData, getSkyblockPlayerData, getUUID } from "../../functions/api";
import { getRank } from "../../functions/functions";
import { missingAPIKeyError, sendError } from "../../functions/errors";
import { prefix } from "../../constants/variables";

register("chat", (name, combatLevel, event) => {
    // Chat Utilities
    if (Settings.kuudraPlayerInfo) {
        if (!Settings.apiKey) {
            return missingAPIKeyError("Kuudra Party Player Info");
        }

        getUUID(name)
            .then((res) => {
                const uuid = res.id;

                getHypixelPlayerData(uuid)
                    .then((res) => {
                        const rank = getRank(res);

                        getSkyblockPlayerData(uuid)
                            .then((res) => {
                                const profile = res.profiles.find((profile) => profile.selected);
                                const userData = profile.members[uuid];
                                const itemInfo = getKuudraItemInfo(userData?.inv_contents?.data);

                                new Message(
                                    new TextComponent(`${prefix} &7Kuudra Info &6${rank} ${name} &7(&bC${combatLevel}&7) `).setClick("run_command", `/pv ${name}`).setHover("show_text", "&7Check the NEU Profile Viewer for more info!"),
                                    new TextComponent("&c[Kick]\n").setClick("run_command", `/p kick ${name}`).setHover("show_text", "&7Click to kick this player from the party!"),
                                    new TextComponent(`&d[Items (${itemInfo.progress}&d)] `).setHover("show_text", `${itemInfo.string}`),
                                    new TextComponent("&5[Misc Info]").setHover("show_text", `${getMiscKuudraInfo(userData)}`)
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
}).setCriteria("Party Finder > ${name} joined the group! (Combat Level ${combatlevel})");
