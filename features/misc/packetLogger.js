/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../constants/settings";

// this creates a new console that logs packets to it you can access it with /packetlogger to add stuff to console do c.println("balls")

const con = com.chattriggers.ctjs.utils.console.Console;
const c = new con(null);

register("Command", () => {
    c.showConsole();
}).setName("packetlogger");

register("packetSent", (packet) => {
    if (!packet.toString().includes("C03") && !packet.toString().includes("C0F") && !packet.toString().includes("C00")) {
        c.println(packet.toString());
    }
});
