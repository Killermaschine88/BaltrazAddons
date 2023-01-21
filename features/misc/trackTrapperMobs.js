/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../constants/settings";
import BaseFeature from "../../classes/BaseFeature";
import RenderLib from "RenderLib";
import { essentialsNotification } from "../../functions/essentials";
import { playerData } from "../../constants/dataLoader";

let lastNotification = 0;

class TrapperMobTracker extends BaseFeature {
    constructor() {
        super();

        this.setName("trapperMobTracker");
        this.setRequiredWorld("The Farming Islands");
        this.addEvent(
            register("renderWorld", () => {
                if (!Settings.trapperMobTracker) return;
                if (playerData.currentWorld !== "The Farming Islands") return;

                if (lastNotification !== 0) {
                    lastNotification++;
                    if (lastNotification > 3000) lastNotification = 0;
                }

                World.getAllEntitiesOfType(net.minecraft.entity.item.EntityArmorStand).forEach((entity) => {
                    let name = entity.getName();
                    name = name.removeFormatting();
                    let existedTicks = entity.getTicksExisted();

                    if (name.includes("Trackable") || name.includes("Untrackable") || name.includes("Undetected") || name.includes("Endangered") || name.includes("Elusive")) {
                        if (existedTicks >= 10) {
                            RenderLib.drawEspBox(entity.getX(), entity.getY(), entity.getZ(), 2, 2, 1, 0, 0, 1, Settings.isPublicRelease ? false : true);
                            if (lastNotification === 0) {
                                if (Settings.useEssentialsNotifications) {
                                    essentialsNotification(`${name} is nearby!`, `Box drawn on Mob.`, 5);
                                    lastNotification++;
                                }
                            }
                        }
                    }
                });
            })
        );

        this.registerEvents();
    }
}

export default new TrapperMobTracker();
