import Settings from "../../constants/settings";
import { prefix } from "../../constants/variables";

let firstTime = true;

register("postGuiRender", (gui) => {
    if (!Settings.minionCollector) return;
    if (!Player.getOpenedInventory()) return;
		if (Player.getOpenedInventory().toString().includes("Minion")) {
			if (firstTime == true) {
				if (Player.getContainer().getStackInSlot(22) != null) {
					if (Player.getContainer().getStackInSlot(22).toString().includes("x")) {
						firstTime = false;
						Player.getContainer().click(48);
						ChatLib.chat(`${prefix} &7Successfully collected minion!`);
						Client.currentGui.close();
						return;
					}
				} else {
					firstTime = false;
                    ChatLib.chat(`${prefix} &7Minion is empty!`);
					Client.currentGui.close();
					return;
				}
			}
		}
});

register("guiClosed", (gui) => {
	if (firstTime == false) {
		firstTime = true;
	}
});