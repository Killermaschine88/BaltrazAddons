import Settings from "../../constants/settings";

let keybindPressed1 = false;
let keybindPressed2 = false;
let number = 0
// #1: Pets
new KeyBind("Pet Swapper #1", Keyboard.KEY_NONE).registerKeyPress(() => {
    if (!Settings.pet1) {
        ChatLib.chat("&cYou need to set a pet first!");
        return;
    }
    if (Settings.pet1) {
    ChatLib.say("/pets")
    keybindPressed1 = true;
    return;
    }
  });

  register("postGuiRender", (gui) => {
    if (keybindPressed1) {
        let inv = Player.getContainer()
        for (let i = 10; i <= 44; i++) {
            if (inv?.getStackInSlot(i)?.getName()?.includes(Settings.pet1)) {
                inv.click(i)
                keybindPressed1 = false;
                break;
            } else if (i == 44) {
                if (number != 3); number++;
                if (number == 3) {
                    number = 0;
                keybindPressed1 = false;
                break;
                }
            }

        }
    }
  });

  // #2: Pet
  new KeyBind("Pet Swapper #2", Keyboard.KEY_NONE).registerKeyPress(() => {
    if (!Settings.pet2) {
        ChatLib.chat("&cYou need to set a pet first!");
        return;
    }
    if (Settings.pet2) {
    ChatLib.say("/pets")
    keybindPressed2 = true;
    return;
    }
  });

  register("postGuiRender", (gui) => {
    if (keybindPressed2) {
        let inv = Player.getContainer()
        for (let i = 10; i <= 44; i++) {
            if (inv?.getStackInSlot(i)?.getName()?.includes(Settings.pet2)) {
                inv.click(i)
                keybindPressed2 = false;
                break;
            } else if (i == 44) {
                if (number != 3); number++;
                if (number == 3) {
                number = 0;
                keybindPressed2 = false;
                break;
                }
            }

        }
    }
  });

