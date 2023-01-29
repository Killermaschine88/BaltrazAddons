/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../constants/settings";
import { playerData } from "../../constants/dataLoader";
import { getCustomNamesData } from "../../functions/api";
import { prefix } from "../../constants/variables";

register("command", (...args) => {
    if (!args) {
        return Settings.openGUI();
    }

    if (args[0] === "updatenames" || args[0] === "un") {
        return getCustomNamesData()
            .then((res) => {
                if(!res?.data) return ChatLib.chat(`${prefix} &cError updating custom names!`);
                playerData.setCustomNames(res?.data);
                ChatLib.chat(`${prefix} &aSuccessfully updated custom names!`);
            })
            .catch((err) => {
                if (Settings.logErrorsToChat) {
                    sendError(`&7Error updating Custom Names`);
                    sendError(`&7${JSON.stringify(err)}`);
                }
                console.log(err);
            });
    }
})
    .setName("baltrazaddons")
    .setAliases(["ba"]);
