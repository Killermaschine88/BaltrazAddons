/// <reference types="../../../../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../../../constants/settings";

let firstTime = true;
let inSnake = false;

register("postGuiRender", (gui) => {
    if (!Settings.snakeMinigameHelper) return;
    if (Player.getContainer()?.toString()?.includes("Snake")) {
        if (firstTime) {
            firstTime = false;
            inSnake = true;
        }
    }
});

register("guiClosed", (gui) => {
    if (firstTime == false) {
        firstTime = true;
        inSnake = false;
    }
});

register("guiKey", (char, code, gui, event) => {
    char = `${char}`; // fix ct bug
    if (inSnake == true) {
        const keys = { a: 50, w: 51, d: 52, s: 53 };
        const invSlot = keys[char];
        if (!invSlot) return;
        Player.getContainer().click(invSlot);
    }
});
