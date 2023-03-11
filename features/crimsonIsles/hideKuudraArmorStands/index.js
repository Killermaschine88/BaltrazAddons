/// <reference types="../../../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../../constants/settings";
import BaseFeature from "../../../classes/BaseFeature";
import { playerData } from "../../../constants/dataLoader";

const EntityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand")
const dontRemove = [
    "PROGRESS",
    "CLICK TO PICK UP",
    "HOOK CLOSER",
    "["
]

class HideKuudraArmorStands extends BaseFeature {
    constructor() {
        super();

        this.setName("hideKuudraArmorStands");
        this.setRequiredWorld("Instanced");
        this.addEvent(
            register("renderEntity", (entity, pos, pt, event) => {
                if (!Settings.hideKuudraArmorStands) return;
                if (playerData.currentWorld !== "Instanced") return;
                if (!(entity.getEntity() instanceof EntityArmorStand)) return
                if (dontRemove.some(a => entity.getName().includes(a))) return
                cancel(event)
            })
        );

        this.registerEvents();
    }
}

export default new HideKuudraArmorStands();
