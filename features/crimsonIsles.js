/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../constants/settings";
import { essentialsNotification } from "../util/essentials";
import RenderLib from "RenderLib";

let isEnabled = false;
let lastNotification = 0;

// register("step", () => {
//     if (!Settings.crimsonIslesESP) return;
//     isEnabled = false;

//     if (lastNotification !== 0) {
//         lastNotification++;
//         if (lastNotification > 20) lastNotification = 0;
//     }

//     World.getAllEntitiesOfType(net.minecraft.entity.item.EntityArmorStand).forEach((entity) => {
//         let name = entity.getName();

//         name = name.removeFormatting();
//         let existedTicks = entity.getTicksExisted();

//         if (name.includes("Vanquisher") || name.includes("[Lv400] Thunder") || name.includes("[Lv600] Lord Jawbus")) {
//             if (existedTicks >= 10) {
//                 if (lastNotification === 0) {
//                     essentialsNotification(`${name} is nearby!`, "ESP Box drawn on Mob.", 5);
//                     lastNotification++;
//                 }
//             }
//             isEnabled = true;
//         }
//     });
// }).setFps(1);

register("renderWorld", () => {
    if (!Settings.crimsonIslesESP) return;

    if (lastNotification !== 0) {
        lastNotification++;
        if (lastNotification > 200) lastNotification = 0;
    }

    World.getAllEntitiesOfType(net.minecraft.entity.item.EntityArmorStand).forEach((entity) => {
        let name = entity.getName();

        name = name.removeFormatting();
        let existedTicks = entity.getTicksExisted();

        if (name.includes("Vanquisher") || name.includes("[Lv400] Thunder") || name.includes("[Lv600] Lord Jawbus")) {
            if (existedTicks >= 10) {
                RenderLib.drawEspBox(entity.getX(), entity.getY(), entity.getZ(), 2, 2, 1, 0, 0, 1, true);
                essentialsNotification(`${name} is nearby!`, "ESP Box drawn on Mob.", 5);
                lastNotification++;
            }
        }
    });
});

function mobThings(entity) {
    let name = entity.getName();
    if (name.includes("'s")) return;
    let Name = name.removeFormatting();
    let existedTicks = entity.getTicksExisted();
    if (Name.includes("Vanquisher")) {
        if (existedTicks <= 20) {
            Client.showTitle("&r&5&l[&b&l&kO&5&l] VANQUISHER &5[&b&l&kO&5&l]", "", 0, 50, 10);
        }
    }
    if (Name.includes("[Lv400] Thunder")) {
        if (existedTicks <= 20) {
            Client.showTitle("&r&6&l[&b&l&kO&6&l] THUNDER [&b&l&kO&6&l]", "", 0, 50, 10);
        }
    }
    if (Name.includes("[Lv600] Lord Jawbus")) {
        if (existedTicks <= 20) {
            Client.showTitle("&r&6&l[&b&l&kO&6&l] LORD JAWBUS [&b&l&kO&6&l]", "", 0, 50, 10);
        }
    }
}
