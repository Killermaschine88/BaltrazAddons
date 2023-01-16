import Settings from "../../constants/settings";

const MCNBTTagString = Java.type('net.minecraft.nbt.NBTTagString');
const MCNBTTagCompound = Java.type("net.minecraft.nbt.NBTTagCompound");
const MCNBTTagList = Java.type("net.minecraft.nbt.NBTTagList");
const Integer = Java.type('java.lang.Integer')
const MCNBTTagByte = Java.type('net.minecraft.nbt.NBTBase$NBTPrimitive')
const GuiChest = Java.type("net.minecraft.client.gui.inventory.GuiChest");
const InventoryBasic = Java.type("net.minecraft.inventory.InventoryBasic");
const Mc = Client.getMinecraft();

let inv = new InventoryBasic("Custom SkyBlock Menu", true, 54); //creates a basic inventory with custom name nad 54 slots
let guiChest = new GuiChest(Player.getPlayer().field_71071_by, inv); //makes a chest out of the players inv and then new inventory
let inCustom 
register("command", () => {
    inCustom = true
    GuiHandler.openGui(guiChest)
}).setName("custommenu");

register("packetSent", (packet) => {
    if (packet.includes("C0EPacketClickWindow" && inCustom)) {
        cancelEvent()
    }
})

let firstTime = true;
let inMenu = false
let stepTwo = false

register("postGuiRender", (gui) => {
    if (!Settings.tradeMenu) return;
    if (Player.getContainer()?.toString()?.includes("Custom SkyBlock Menu")) {

        let uuid = "e780adce-f739-4c15-9e5b-a78562e2c935"
        let texture = "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvNGNiM2FjZGMxMWNhNzQ3YmY3MTBlNTlmNGM4ZTliM2Q5NDlmZGQzNjRjNjg2OTgzMWNhODc4ZjA3NjNkMTc4NyJ9fX0="

        inMenu = true;
        let inv = Player.getContainer()
        //inv.container.func_75141_a(35, new Item("emerald").getItemStack().func_151001_c("§aTrades§r"));
        let trade = inv.getStackInSlot(35)
        //trade.setLore(["§7View your available trades.", "§7These trades are always", "§7available and accessible through", "§7the SkyBlock Menu.", " ", "§7Trades Unlocked: §a100%", "§2----------------------§e24§6/§e24", " ", "§eClick to view!"])
        skullInSlot(26, "§aQuiver§r", ["§7A masterfully crafted Quiver", "§7which holds any kind of", "§7projectile you can think of!", "", "§eClick to open!"], uuid, texture)
        for (i = 0; i <= 54; i++) {
            skullInSlot(i, "§aQuiver§r", ["§7A masterfully crafted Quiver", "§7which holds any kind of", "§7projectile you can think of!", "", "§eClick to open!"], uuid, texture)  
        }
    }
    if (Player.getContainer()?.toString()?.includes("Recipe Book")) {
        if (stepTwo) { 
            Player.getContainer().click(50)
        }
    }


});

register("guiMouseClick", () => {
    if (inMenu) {
        let slot = Client.currentGui.get().getSlotUnderMouse().field_75222_d
        if (slot === 35) {
            Player.getContainer().click(21)
            stepTwo = true
        }
    }
});

register("guiClosed", (gui) => {
    if (firstTime == false) {
        firstTime = true;
        inMenu = false;
    }
    if (inCustom) {
        inCustom = false;
    }
});

register("guiOpened", (gui) => {
    ChatLib.chat("hi")
})

function skullInSlot(slot, name, lore, uuid, texture) {

    const inv = Player.getContainer() // cleans up stuff

    inv.container.func_75141_a(slot, new Item("skull").getItemStack().func_151001_c(name)); // makes the item

    const item = inv.getStackInSlot(slot) // has to be done after setting the item in the slot

    // nbt fuckery dont fucking touch this
    item.getNBT().getTag("tag").set("SkullOwner", new NBTTagCompound(new MCNBTTagCompound())).getTag("SkullOwner").set("Id", new MCNBTTagString(uuid)); // adds the skull owner compound + uuid 
    item.getNBT().getTag("tag").getTag("SkullOwner").set("Properties", new NBTTagCompound(new MCNBTTagCompound())).getTag("Properties").set("textures", new NBTTagList(new MCNBTTagList())); // add properties + textures
    new NBTTagList(item.getNBT().getTag("tag").getTag("SkullOwner").getTag("Properties").getTag("textures").rawNBT).appendTag(new NBTTagCompound(new MCNBTTagCompound())) // adds the value string within the textures list
    new NBTTagCompound(new NBTTagList(item.getNBT().getTag("tag").getTag("SkullOwner").getTag("Properties").getTag("textures").rawNBT).get(0)).set("Value", new MCNBTTagString(texture)) // FUCKING FINALLY adds the texture to the skull
    
    item.setDamage(3) // impofgant? who knows

    // adds lore!
    item.getNBT().getTag("tag").set("display", new NBTTagCompound(new MCNBTTagCompound())).getTag("display").set("Lore", new NBTTagList(new MCNBTTagList()));
    for (let i = 0; i < lore.length + 1; i++) {
        if (!lore[i]) {
            item.setName(name) // sets the name again? idk why but it works to fix lore bug
            break;
        }
        new NBTTagList(
            item.getNBT().getTag("tag").getTag("display").get("Lore").rawNBT
        ).appendTag(new MCNBTTagString(lore[i]));
    }

}

const con = com.chattriggers.ctjs.utils.console.Console;
const c = new con(null);


register("Command", () => {
    c.showConsole()
}).setName("packetlogger")


register("packetSent", (packet) => {
    if (!packet.toString().includes("C03") && !packet.toString().includes("C0F") && !packet.toString().includes("C00")) {
        c.println(packet.toString())
    }
})
/*
register('packetSent', (packet, event) => {
    if (!packet.toString().startsWith("net.minecraft.network.play.client.C02PacketUseEntity")) return;
    ChatLib.chat(packet.func_149564_a(World.getWorld()));
    ChatLib.chat(packet.func_149565_c());
});
*/
