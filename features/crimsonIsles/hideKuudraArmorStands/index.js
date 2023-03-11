/// <reference types="../../../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../../../constants/settings";
import BaseFeature from "../../../classes/BaseFeature";
import { playerData } from "../../../constants/dataLoader";

const EntityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");
let stopRemoving = true;
const ignoredLocations = ["-98 78.125 -99.0625", "-110 78.125 -106", "-106 78.125 -99.0625", "-106 78.125 -112.9375", "-98 78.125 -112.9375", "-94 78.125 -106"];
const dontRemoveWithMob = [
    "[", // Mob HP
    "PROGRESS", // Building Progress
    "CLICK TO PICK UP", // Supplies & Fuel
    "HOOK CLOSER", // Supplies & Fuel
    "Collected", // Collected Supplies
    "BRING SUPPLY CHEST HERE", // Where to bring supplies
    "SUPPLIES RECEIVED", // Where supplies are placed
    "SUPPLY PILE", // Where supplies are
    "RIGHT-CLICK TO MOUNT", // Mounting Cannon
    "CANNON", // Cannon
    "Explodes In:", // Energy Orbs
    "BALLISTA", // Ballista
];
const dontRemoveWithoutMob = [
    "PROGRESS", // Building Progress
    "CLICK TO PICK UP", // Supplies & Fuel
    "HOOK CLOSER", // Supplies & Fuel
    "Collected", // Collected Supplies
    "BRING SUPPLY CHEST HERE", // Where to bring supplies
    "SUPPLIES RECEIVED", // Where supplies are placed
    "SUPPLY PILE", // Where supplies are
    "RIGHT-CLICK TO MOUNT", // Mounting Cannon
    "CANNON", // Cannon
    "Explodes In:", // Energy Orbs
];


class HideKuudraArmorStands extends BaseFeature {
    constructor() {
        super();

        this.setName("hideKuudraArmorStands");
        this.setRequiredWorld("Instanced");
        this.addEvent(
            register("renderEntity", (entity, pos, pt, event) => {
                if (!Settings.hideKuudraArmorStands) return;
                if (playerData.currentWorld !== "Instanced") return;

                const mcEntity = entity.getEntity();
                const entityName = entity.getName();
                const entityLocation = `${entity.getX()} ${entity.getY()} ${entity.getZ()}`;

                if (!(mcEntity instanceof EntityArmorStand)) return;

                // Valid Entity Check
                if (Settings.hideMobHPArmorStands) {
                    if (dontRemoveWithoutMob.some((listEntry) => entityName.includes(listEntry))) return;
                } else {
                    if (dontRemoveWithMob.some((listEntry) => entityName.includes(listEntry))) return;
                }

                // Location Check
                if (ignoredLocations.some((listEntry) => entityLocation.includes(listEntry))) return;

                // func_72900_e -> removeEntity()
                if (!stopRemoving) World.getWorld().func_72900_e(mcEntity);
            })
        );

        // Kuudra Start Check
        this.addEvent(
            register("chat", () => {
                stopRemoving = false;
            }).setCriteria("[NPC] Elle: Okay adventurers, I will go and fish up Kuudra!")
        );
        // Kuudra End Check
        this.addEvent(
            register("chat", () => {
                stopRemoving = true;
            }).setCriteria("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬")
        );

        this.registerEvents();
    }
}

export default new HideKuudraArmorStands();
