/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../constants/settings";
import BaseFeature from "../../classes/BaseFeature";
import RenderLib from "RenderLib";
import { essentialsNotification } from "../../functions/essentials";
import { playerData } from "../../constants/dataLoader"

let lastNotification = 0;

new class MobHitboxes extends BaseFeature {
    constructor() {
        super();

        this.settingName = "mobHitboxes"
        this.event = register("renderWorld", () => {
            if (playerData.currentWorld !== "Crimson Isle") return;

            if (lastNotification !== 0) {
                lastNotification++;
                if (lastNotification > 10000) lastNotification = 0;
            }

            World.getAllEntitiesOfType(net.minecraft.entity.item.EntityArmorStand).forEach((entity) => {
                let name = entity.getName();

                name = name.removeFormatting();
                let existedTicks = entity.getTicksExisted();

                if (name.includes("Vanquisher") || name.includes("[Lv400] Thunder") || name.includes("[Lv600] Lord Jawbus")) {
                    if (existedTicks >= 10) {
                        RenderLib.drawEspBox(entity.getX(), entity.getY(), entity.getZ(), 2, 2, 1, 0, 0, 1, Settings.isPublicRelease ? false : true);
                        if (lastNotification === 0) {
                            if (Settings.useEssentialsNotifications) {
                                essentialsNotification(`${name} is nearby!`, "Box drawn on Mob.", 5);
                                lastNotification++;
                            }
                        }
                    }
                }
            });
        });

        this.registerEvent()
    }
}