import Settings from "../../constants/settings";
import { prefix } from "../../constants/variables";

const ignoredCallers = ["&r&e✆ &r&cAranya&r&e ✆ &r", "&r&e✆ &r&dKaus&r&e ✆ &r", "&r&e✆ &r&5Rollim&r&e ✆ &r"];

register("Chat", (event) => {

    if (!Settings.cancelAbiphone) return;

    let cancelRinging = false;

    const message = ChatLib.getChatMessage(event, true);

    if (message.includes(ignoredCallers)) {
        let theCaller
        if (message.includes(ignoredCallers[0])); theCaller = "&cAranya";
        if (message.includes(ignoredCallers[1])); theCaller = "&dKaus";
        if (message.includes(ignoredCallers[2])); theCaller = "&5Rollim";
        ChatLib.chat(`${prefix} ${theCaller} &7attempted to call you.`)
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
