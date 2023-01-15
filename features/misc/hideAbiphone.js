import Settings from "../../constants/settings";
import { prefix } from "../../constants/variables";

let cancelRinging = false;

register("Chat", (event) => {
    if (!Settings.cancelAbiphone) return;
    const message = ChatLib.getChatMessage(event, true);
    if (message.includes("&r&e✆ &r&cAranya&r&e ✆ &r") || message.includes("&r&e✆ &r&dKaus&r&e ✆ &r") || message.includes("&r&e✆ &r&5Rollim&r&e ✆ &r")) {
        let ignoredCaller
        if (message.includes("&r&e✆ &r&cAranya&r&e ✆ &r")); ignoredCaller = "&cAranya";
        if (message.includes("&r&e✆ &r&dKaus&r&e ✆ &r")); ignoredCaller = "&dKaus";
        if (message.includes("&r&e✆ &r&5Rollim&r&e ✆ &r")); ignoredCaller = "&5Rollim";
        ChatLib.chat(`${prefix} ${ignoredCaller} &7attempted to call you.`)
        cancelRinging = true;
        cancel(event)
    }
    if (cancelRinging) {
        if (message.includes("&r&a✆ Ring...") || message.includes("&r&a✆ Ring... Ring...")) {
            cancel(event)
        }
        if (message.includes("&r&a✆ Ring... Ring... Ring...r")) {
            cancelRinging = false;
            cancel(event)
        }
    }
})