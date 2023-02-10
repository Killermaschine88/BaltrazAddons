/// <reference types="../../../../CTAutocomplete" />
/// <reference lib="es2015" />

import BaseFeature from "../../../classes/BaseFeature";
import Settings from "../../../constants/settings";
import { playerData } from "../../../constants/dataLoader";
import { getPlayerName, checkIfInText, changeFormatting, checkLoreForCustomName, fixShittyScoreboard } from "./functions";

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

                let inviter = "";
                if (originalMessage.includes("has invited you to join their party!")) {
                    if (originalMessage.includes("[")) {
                        inviter = originalMessage.split(" ")[1];
                    } else {
                        inviter = originalMessage.split(" ")[0];
                    }
                }

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
                    if (originalMessage.includes("has invited you to join their party!")) {
                        return new Message(new TextComponent(originalMessage).setClick("run_command", `/party accept ${inviter}`).setHover("show_text", "Click to join party!")).chat();
                    }
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
                            Scoreboard?.setLine(i + 1, `${fixShittyScoreboard(scoreboardLine?.toString())?.replaceAll(getPlayerName(originalName), changeFormatting(allCustomNames[originalName]))}`, true);
                        }
                    });
                }
            })
        );

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
                        item.setName(newName);
                    }

                    checkLoreForCustomName(item, originalName, allCustomNames[originalName]);
                });
            })
        );

        // Tablist
        // this.addEvent(
        //     register("step", () => {
        //         const allCustomNames = playerData.getCustomNames();
        //         if (!allCustomNames) return;
        //         const originalNames = Object.keys(allCustomNames);
        //     }).setDelay(1)
        // )

        // Registering Events
        this.registerEvents();
    }
}

export default new CustomName();
