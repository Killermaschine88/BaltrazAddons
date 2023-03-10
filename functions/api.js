/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../constants/settings";
import request from "../../requestV2";

export const getUUID = (name) => {
    return request({
        url: `https://api.mojang.com/users/profiles/minecraft/${name}`,
        json: true,
    });
};

export const getSkyblockPlayerData = (uuid) => {
    return request({
        url: `https://api.hypixel.net/skyblock/profiles?key=${Settings.apiKey}&uuid=${uuid}`,
        json: true,
    });
};

export const getHypixelPlayerData = (uuid) => {
    return request({
        url: `https://api.hypixel.net/player?key=${Settings.apiKey}&uuid=${uuid}`,
        json: true,
    });
};
