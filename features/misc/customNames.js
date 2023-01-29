/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import BaseFeature from "../../classes/BaseFeature";
import Settings from "../../constants/settings";
import { playerData } from "../../constants/dataLoader";
import { getPlayerName, checkIfInText, changeFormatting, checkLoreForCustomName, fixShittyScoreboard } from "../../functions/features/misc/customNamesUtil";

class CustomName extends BaseFeature {
    constructor() {
        super();

        this.setName("showCustomNames");

        // Chat
        this.addEvent(
            register("chat", (event) => {
                // Getting All Custom Names
                const allCustomNames = playerData.getCustomNames();
                if (!allCustomNames) return;
                const originalNames = Object.keys(allCustomNames);

                let originalMessage = ChatLib.getChatMessage(event, true).replaceAll("&r", "");
                let sendMessage = false;

                // Replacing Original Names with Custom Names
                originalNames.forEach((originalName) => {
                    // Chat
                    if (checkIfInText(originalMessage, originalName) || checkIfInText(originalMessage, `${getPlayerName(originalName)} is in`)) {
                        cancel(event);
                        if (Settings.customNameReplaceRank) {
                            originalMessage = originalMessage.replaceAll(originalName, allCustomNames[originalName]);
                        } else {
                            originalMessage = originalMessage.replaceAll(getPlayerName(originalName), allCustomNames[originalName]);
                        } 
                        sendMessage = true;
                    }

                    // Friend List
                    if (checkIfInText(originalMessage, `${getPlayerName(originalName)}&e is in`) || checkIfInText(originalMessage, `${getPlayerName(originalName)} &r&ejoined`)) {
                        cancel(event);
                        originalMessage = originalMessage.replaceAll(getPlayerName(originalName), allCustomNames[originalName]);
                        sendMessage = true;
                    }

                    // Party Finder joined
                    if (originalMessage.includes(getPlayerName(originalName))) {
                        cancel(event);
                        originalMessage = originalMessage.replaceAll(getPlayerName(originalName), allCustomNames[originalName]);
                        sendMessage = true;
                    }
                });

                if (sendMessage) {
                    return ChatLib.chat(originalMessage);
                }
            })
        );

        // Scoreboard
        this.addEvent(
            register("step", () => {
                const allCustomNames = playerData.getCustomNames();
                if (!allCustomNames) return;
                const originalNames = Object.keys(allCustomNames);

                Scoreboard?.resetCache();
                const scoreboardLength = Scoreboard?.getLines()?.length;

                for (let i = 0; i < scoreboardLength; i++) {
                    const scoreboardLine = Scoreboard?.getLineByIndex(i);
                    originalNames.forEach((originalName) => {
                        if (checkIfInText(fixShittyScoreboard(scoreboardLine?.toString()), getPlayerName(originalName))) {
                            Scoreboard?.setLine(i+1, `${fixShittyScoreboard(scoreboardLine?.toString())?.replaceAll(getPlayerName(originalName), changeFormatting(allCustomNames[originalName]))}`, true);
                        }
                    });
                }
            })
        )

        // Lore and Item Name
        this.addEvent(
            register("itemTooltip", (lore, item, event) => {
                const allCustomNames = playerData.getCustomNames();
                if (!allCustomNames) return;
                const originalNames = Object.keys(allCustomNames);

                originalNames.forEach((originalName) => {
                    let itemName = item.getName();
                    let newName = "";
                    if (checkIfInText(itemName, originalName)) {
                        if (Settings.customNameReplaceRank) {
                            newName = changeFormatting(allCustomNames[originalName]);
                        } else {
                            newName += `${itemName.split(" ")[0]} `;
                            newName += `${changeFormatting(allCustomNames[originalName])}`;
                        }
                        item.setName(newName)
                    }

                    checkLoreForCustomName(item, originalName, allCustomNames[originalName]);
                });
            })
        );

        // Nameplate + Tablist
        // this.addEvent(
        //     register("step", () => {

        //         // Change Player Nameplate
        //         // func_147114_u => getNetHandler
        //         // func_175104_a => getPlayerInfo
        //         // func_178850_i => getPlayerTeam
        //         // func_96666_b => setNamePrefix
        //         // func_96662_c => setNameSuffix
        //         World.getAllPlayers().forEach((player) => {
        //             const NetHandlerPlayClient = Client.getMinecraft().func_147114_u()
        //             player.setTabDisplayName("Fish")
        //             if (NetHandlerPlayClient !== null) {
        //                 let playerInfo = NetHandlerPlayClient.func_175104_a(player.getName())
        //                 if (playerInfo !== null) {
        //                     let thePlayerInfoTeam = NetHandlerPlayClient.func_175104_a(player.getName()).func_178850_i()
        //                     if (thePlayerInfoTeam !== null) {
        //                         thePlayerInfoTeam.func_96666_b("")
        //                         thePlayerInfoTeam.func_96662_c("")
        //                     }
        //                 }
        //              }
        //         })
        //     }).setDelay(1)
        // )

        // Registering Events
        this.registerEvents();
    }
}

export default new CustomName();
