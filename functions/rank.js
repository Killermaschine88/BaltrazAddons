/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import { colorDictionary } from "../constants/colors";

export const removeUnicode = (string) => (typeof string !== "string" ? "" : string.replace(/[^\u0000-\u007F]/g, ""));

export const getRank = (playerInfo) => {
    // Gets the player's rank via the Hypixel player API method json
    const rankFormats = {
        VIP: "&a[VIP]",
        VIP_PLUS: "&a[VIP&6+&a]",
        MVP: "&b[MVP]",
        MVP_PLUS: "&b[MVP&c+&b]",
        ADMIN: "&c[ADMIN]",
        MODERATOR: "&2[MOD]",
        HELPER: "&9[HELPER]",
        YOUTUBER: "&c[&fYOUTUBE&c]",
        GAME_MASTER: "&2[GM]&r",
    };
    const player = playerInfo.player;
    // Special ranks
    if ("prefix" in player) return removeUnicode(player.prefix.replace(/§/g, "&"));
    if ("rank" in player) return rankFormats[player.rank];
    let rank = "&7";
    let plusColor = "&c";
    if ("rankPlusColor" in player) plusColor = colorDictionary[player.rankPlusColor];
    // MVP++
    if (player.monthlyPackageRank == "SUPERSTAR") {
        let color = "&6";
        if (player.monthlyRankColor == "AQUA") color = "&b";
        return `${color}[MVP${plusColor}++${color}]`;
    }
    // MVP+
    if (player.newPackageRank == "MVP_PLUS") return `&b[MVP${plusColor}+&b]`;
    // All other ranks
    if ("newPackageRank" in player) return rankFormats[player.newPackageRank];
    return rank;
};
