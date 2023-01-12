/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import { getHypixelPlayerData, getUUID } from "../util/api";
import { getRank } from "../util/functions";

class DataLoader {
    constructor() {
        // Variables
        this.inSkyblock = false;
        this.currentParty = {};
        this.currentWorld = "unknown";

        // Constants
        const partyDisbanded = ["You are not currently in a party.", "You are not in a party.", "You are not in a party right now.", "You have been kicked from the party by ${*}", "You left the party.", "The party was disbanded because all invites expired and the party was empty.", "${*} has disbanded the party!"];
        const partyInvited = ["${name} joined the party.", "${name} invited ${*} to the party! They have &c60 seconds to accept.", "&dDungeon Finder &f> ${name} joined the dungeon group! (${*})"];
        const partyFinderJoined = ["Party Finder > ${name} joined the dungeon group! (${selectedClass} Level ${classLevel})"];
        const partyRemoved = ["${name} has been removed from the party.", "${name} has left the party.", "${name} was removed from your party because they disconnected", "Kicked ${name} because they were offline."];
        const partyCreated = ["Party Finder > Your party has been queued in the dungeon finder!"];

        // Checking for Current World
        register("worldLoad", () => {
            ChatLib.command("locraw");
        });

        // Locraw chat event to get current world
        register("chat", (server, mode, worldName, event) => {
            cancel(event);
            this.isInSkyblock = Scoreboard.getTitle()?.removeFormatting()?.includes("SKYBLOCK");
            this.currentWorld = worldName;
        }).setCriteria('{"server":"${server}","gametype":"SKYBLOCK","mode":"${mode}","map":"${worldName}"}');

        // Party Stuff
        partyDisbanded.forEach((msg) => {
            this.registerChat(msg, () => {
                this.currentParty = {};
            });
        });

        partyInvited.forEach((msg) => {
            this.registerChat(msg, (name) => {
                this.currentParty[name.split(" ")[1]] = {
                    name: name,
                    class: `&7(&cUnknown [Invited via /p]&7)`,
                    isLeader: false,
                };
            });
        });

        partyFinderJoined.forEach((msg) => {
            this.registerChat(msg, (name, selectedClass, classLevel) => {
                getUUID(name).then((res) => {
                    const uuid = res.id;

                    getHypixelPlayerData(uuid).then((res) => {
                        const rank = getRank(res);

                        this.currentParty[name] = {
                            name: `${rank} ${name}`,
                            class: `&7(&b${selectedClass} ${classLevel}&7)`,
                            isLeader: false,
                        };
                    });
                });
            });
        });

        partyCreated.forEach((msg) => {
            this.registerChat(msg, () => {
                const name = Player.getName();
                const uuid = Player.getUUID();
                getHypixelPlayerData(uuid).then((res) => {
                    const rank = getRank(res);

                    this.currentParty[name] = {
                        name: `${rank} ${name}`,
                        class: `&7(&cUnknown [Created via PFinder]&7)`,
                        isLeader: true,
                    };
                });
            });
        });

        partyRemoved.forEach((msg) => {
            this.registerChat(msg, (name) => {
                if (name.includes(" ")) name = name.split(" ")[1];
                delete this.currentParty[name];
            });
        });
    }

    // Functions
    registerChat(msg, fun) {
        return register("chat", fun.bind(this)).setCriteria(msg);
    }
}

global.playerData = new DataLoader();
let loader = global.playerData;
export default loader;
