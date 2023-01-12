/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../constants/settings";
import { data } from "../constants/variables";
import playerData from "../constants/dataLoader";

let partyStr = null;

register("dragged", (dx, dy, x, y, btn) => {
    if (!Settings.partyDisplayGui.isOpen()) return;
    data.partyDisplay.x = x;
    data.partyDisplay.y = y;
    data.save();
});

register("tick", () => {
    // String so you can move it in config
    if (Settings.partyDisplayGui.isOpen()) return (partyStr = "&b[MVP&c++&b] BaltrazYT (&bArcher 30&7)");
    if (!Settings.partyDisplayGui.isOpen() && partyStr === "&b[MVP&c++&b] BaltrazYT (&bArcher 30&7)") return (partyStr = null);

    // Normal Code
    if (!Settings.partyDisplayGui.isOpen() && !Settings.partyDisplay) return (partyStr = null);
    const names = Object.keys(playerData.currentParty);
    if (!names.length) return (partyStr = null);
    partyStr = "&6Current Party:\n";

    for (let i = 0; i < names.length; i++) {
        if (playerData.currentParty[names[i]].isLeader) {
            partyStr += `👑 ${playerData.currentParty[names[i]].name} ${playerData.currentParty[names[i]].class}\n`;
        } else {
            partyStr += `${playerData.currentParty[names[i]].name} ${playerData.currentParty[names[i]].class}\n`;
        }
    }
});

register("renderOverlay", () => {
    if (!partyStr) return;
    Renderer.drawString(partyStr, data.partyDisplay.x, data.partyDisplay.y);
});
