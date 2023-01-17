import Settings from "../../constants/settings";

const MCNBTTagString = Java.type('net.minecraft.nbt.NBTTagString');
const MCNBTTagCompound = Java.type("net.minecraft.nbt.NBTTagCompound");
const MCNBTTagList = Java.type("net.minecraft.nbt.NBTTagList");
const Integer = Java.type('java.lang.Integer')
const MCNBTTagByte = Java.type('net.minecraft.nbt.NBTBase$NBTPrimitive')
const GuiChest = Java.type("net.minecraft.client.gui.inventory.GuiChest");
const InventoryBasic = Java.type("net.minecraft.inventory.InventoryBasic");
const Mc = Client.getMinecraft();

let firstTimeMenu = true; // optimization!!!
let generatedMenu = false; // optimization!!!
let firstTimeItem = true; // optimization!!!
let generatedItem = false; // optimization!!!


// custom menu GUI
let menuInv = new InventoryBasic("§cCustom SkyBlock Menu", true, 54); //creates a basic inventory with custom name nad 54 slots (cakend gave this code w let so idk)
let menuGui = new GuiChest(Player.getPlayer().field_71071_by, menuInv); //makes a chest out of the players inv and then new inventory (cakend gave this code w let so idk)

// item selector GUI
let itemInv = new InventoryBasic("§cButton Picker", true, 54); //creates a basic inventory with custom name nad 54 slots (cakend gave this code w let so idk)
let itemGui = new GuiChest(Player.getPlayer().field_71071_by, itemInv); //makes a chest out of the players inv and then new inventory (cakend gave this code w let so idk)


register("postGuiRender", (gui) => {
    if (!Settings.skyblockMenu) return;

    //////////////////////////// CUSTOM MENU ////////////////////////////
    if (Player.getContainer()?.toString()?.includes("Custom SkyBlock Menu")) {
        if (firstTimeMenu && !generatedMenu) {
            firstTime = false;
            generated = true;
            // this is just here as an example for how uuid and texture work
            let uuid = "e780adce-f739-4c15-9e5b-a78562e2c935"
            let texture = "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvNGNiM2FjZGMxMWNhNzQ3YmY3MTBlNTlmNGM4ZTliM2Q5NDlmZGQzNjRjNjg2OTgzMWNhODc4ZjA3NjNkMTc4NyJ9fX0="

        }
    }

    //////////////////////////// ITEM SELECTOR ////////////////////////////
    if (Player.getContainer()?.toString()?.includes("§cButton Picker")) {
        console.log(JSON.stringify(Player?.getContainer()?.getStackInSlot(0)?.getLore()))
        if (firstTimeItem && !generatedItem) {
            firstTimeItem = false;
            generatedItem = true;

            itemInSlot(0, "test", ["§7Click to open the Skyblock Menu", "im a genius ngl"], "paper")
        }
    }





});


register("command", () => {
    GuiHandler.openGui(menuGui) // opens the gui
}).setName("test");

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

function itemInSlot(slot, name, lore, theItem) {
    
    let inv = Player.getContainer() // cleans up stuff
    
        inv.container.func_75141_a(slot, new Item(theItem).getItemStack().func_151001_c(name)); // makes the item
    
        const item = inv.getStackInSlot(slot) // has to be done after setting the item in the slot
    
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


// this creates a new console that logs packets to it you can access it with /packetlogger to add stuff to console do c.println("balls")

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

// this stops you from moving the items around while still telling us that you clicked that slot
register("guiMouseClick", (mx, my, btn, gui, event) => {
    if (Player.getContainer().getName().equals("§cCustom SkyBlock Menu")) {
        if (Client.isShiftDown()) {
            Client.currentGui.close()
            GuiHandler.openGui(itemGui)
        }
        // cancel the click so no item move
        cancel(event);
    }
    if (Player.getContainer().getName().equals("§cButton Picker")) cancel(event);
});


register("itemTooltip", (lore, item, event) => {
    if (item.getName().equals("")) {
        cancel(event);
    }
});


/*
// examples of ways to do stuff

Client.currentGui.getSlotUnderMouse().getIndex() // gets the slot you are hovering over









*/