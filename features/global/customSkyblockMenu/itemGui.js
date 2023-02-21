/// <reference types="../../../../CTAutocomplete" />
/// <reference lib="es2015" />

// imports
import * as Elementa from "../../../../Elementa";
import { getCenterX, getCenterY, animateColorDarkest, animateColorDark, animateColorLight, animateColorLightest, titleCase, } from "./functions";
import { darkestColor, darkColor, lightColor, lightestColor, gold } from "./constants";

// java vars
const Color = Java.type("java.awt.Color");

// screen size
export const screenWidth = () => {
    return Renderer.screen.getWidth();
};
export const screenHeight = () => {
    return Renderer.screen.getHeight();
};

let glassColors = {
    normal: false,
    brown: false,
    white: false,
    silver: false,
    gray: false,
    black: false,
    red: false,
    orange: false,
    yellow: false,
    green: false,
    blue: false,
    purple: false,
    pink: false,
    magenta: false,
    cyan: false,
    light_blue: false,
    lime: false,
};

let navButtons = {
    ba: true,
    skyblock: false,
    item: false,
    skull: false,
};

function renderGlass(color) {
    let hover = new Elementa.UIRoundedRectangle(1).setX(new Elementa.MousePositionConstraint()).setY(new Elementa.MousePositionConstraint()).setWidth(new Elementa.AdditiveConstraint(new Elementa.ChildBasedMaxSizeConstraint(), (5).pixels())).setHeight(new Elementa.AdditiveConstraint(new Elementa.ChildBasedMaxSizeConstraint(), (5).pixels())).enableEffect(new Elementa.OutlineEffect(Color.WHITE, 0.5)).setColor(new Elementa.ConstantColorConstraint(darkColor()));

    let glass = new Elementa.UIRoundedRectangle(3)
        .setX(new Elementa.AdditiveConstraint(new Elementa.SiblingConstraint(), (5).pixels()))
        .setY(new Elementa.CenterConstraint())
        .setWidth((32).pixels())
        .setHeight((32).pixels())
        .setColor(new Elementa.ConstantColorConstraint(lightestColor()))
        .addChild(new Elementa.UIImage.ofFile(new java.io.File(`./config/ChatTriggers/modules/BaltrazAddons/features/global/customSkyblockMenu/assets/glass_${color}.png`)).setX(new Elementa.CenterConstraint()).setY(new Elementa.CenterConstraint()).setWidth((24).pixels()).setHeight((24).pixels()))
        .onMouseEnter((comp) => {
            animateColorDarkest(comp);
            hover.setChildOf(itemGui.getWindow());
            hover.addChild(new Elementa.UIText(titleCase(`Select: ${color} glass`)).setX(new Elementa.CenterConstraint()).setY(new Elementa.CenterConstraint()).setTextScale((1).pixels()).setColor(new Elementa.ConstantColorConstraint(Color.WHITE)));
        })
        .onMouseLeave((comp) => {
            if (glassColors[color] == false) {
                animateColorLightest(comp);
            }
            hover.getParent().removeChild(hover);
        })
        .onMouseClick((comp) => {
            if (glassColors[color] == false) {
                glass
                    .getParent()
                    .getChildren()
                    .forEach((child) => {
                        if (child != glass) child.setColor(new Elementa.ConstantColorConstraint(lightestColor()));
                    });
                comp.setColor(new Elementa.ConstantColorConstraint(darkestColor()));
                glassColors[color] = true;
            } else if (glassColors[color] == true) {
                animateColorLightest(comp);
                glassColors[color] = false;
            }
        });

    return glass;
}

// creates a nav button to be used at the top of the gui (NOTE) bongo fix this function later ty
function createNavButton(button, hoverText) {
    button = new Elementa.UIRoundedRectangle(3)
        .setX(new Elementa.AdditiveConstraint(new Elementa.SiblingConstraint(), (5).pixels()))
        .setY(new Elementa.CenterConstraint())
        .setWidth(new Elementa.AdditiveConstraint(new Elementa.ChildBasedMaxSizeConstraint(), (5).pixels()))
        .setHeight(new Elementa.AdditiveConstraint(new Elementa.ChildBasedMaxSizeConstraint(), (5).pixels()))
        .setColor(new Elementa.ConstantColorConstraint(lightestColor()))
        .onMouseEnter((comp) => {
            animateColorDark(comp);
            hoverNav(hoverText).setChildOf(itemGui.getWindow());
        })
        .onMouseLeave((comp) => {
            animateColorLightest(comp);
            hoverNav(hoverText).getParent().removeChild(hoverNav(hoverText));
        })
        .onMouseClick((comp) => {
            if (navButtons[button] == false) {
                button
                    .getParent()
                    .getChildren()
                    .forEach((child) => {
                        if (child != comp) child.setColor(new Elementa.ConstantColorConstraint(lightestColor()));
                    });
                comp.setColor(new Elementa.ConstantColorConstraint(darkestColor()));
                navButtons[button] = true;
            } else if (navButtons[button] == true) {
                animateColorLightest(comp);
                navButtons[button] = false;
            }
        });

    return button;
}

// creates hover text
function hoverNav(text) {
    text = titleCase(text);
    return new Elementa.UIRoundedRectangle(1)
        .setX(new Elementa.MousePositionConstraint())
        .setY(new Elementa.MousePositionConstraint())
        .setWidth(new Elementa.AdditiveConstraint(new Elementa.ChildBasedMaxSizeConstraint(), (5).pixels()))
        .setHeight(new Elementa.AdditiveConstraint(new Elementa.ChildBasedMaxSizeConstraint(), (5).pixels()))
        .enableEffect(new Elementa.OutlineEffect(Color.WHITE, 0.5))
        .setColor(new Elementa.ConstantColorConstraint(darkColor()))
        .addChild(new Elementa.UIText(text).setX(new Elementa.CenterConstraint()).setY(new Elementa.CenterConstraint()).setTextScale((1).pixels()).setColor(new Elementa.ConstantColorConstraint(Color.WHITE)));
}

// click checks
let clickedBa = true;
let clickedSkyblock = false;
let clickedItem = false;
let clickedSkull = false;

// elementa components used later on
// main button parts
let baButton = new Elementa.UIRoundedRectangle(3)
    .setX(new Elementa.CenterConstraint())
    .setY(new Elementa.CenterConstraint())
    .setWidth((screenWidth() / 32).pixels())
    .setHeight((screenHeight() / 16).pixels())
    .setColor(new Elementa.ConstantColorConstraint(darkestColor()));

let skyblockButton = new Elementa.UIRoundedRectangle(3)
    .setX(new Elementa.CenterConstraint())
    .setY(new Elementa.CenterConstraint())
    .setWidth((screenWidth() / 32).pixels())
    .setHeight((screenHeight() / 16).pixels())
    .setColor(new Elementa.ConstantColorConstraint(lightColor()));

let customItemButton = new Elementa.UIRoundedRectangle(3)
    .setX(new Elementa.CenterConstraint())
    .setY(new Elementa.CenterConstraint())
    .setWidth((screenWidth() / 32).pixels())
    .setHeight((screenHeight() / 16).pixels())
    .setColor(new Elementa.ConstantColorConstraint(lightColor()));

let customSkullButton = new Elementa.UIRoundedRectangle(3)
    .setX(new Elementa.CenterConstraint())
    .setY(new Elementa.CenterConstraint())
    .setWidth((screenWidth() / 32).pixels())
    .setHeight((screenHeight() / 16).pixels())
    .setColor(new Elementa.ConstantColorConstraint(lightColor()));

// gui
export const itemGui = new JavaAdapter(Elementa.WindowScreen, {
    init() {
        // All Elementa components

        // border on baButton (main button)
        let baBackground = new Elementa.UIRoundedRectangle(3)
            .setX(new Elementa.AdditiveConstraint(new Elementa.SiblingConstraint(), (5).pixels()))
            .setY(new Elementa.CenterConstraint())
            .setWidth(new Elementa.AdditiveConstraint(new Elementa.ChildBasedMaxSizeConstraint(), (5).pixels()))
            .setHeight(new Elementa.AdditiveConstraint(new Elementa.ChildBasedMaxSizeConstraint(), (5).pixels()))
            .setColor(new Elementa.ConstantColorConstraint(lightestColor()))
            .onMouseEnter((comp) => {
                animateColorDark(comp);
                baHoverText.setChildOf(this.getWindow());
            })
            .onMouseLeave((comp) => {
                animateColorLightest(comp);
                baHoverText.getParent().removeChild(baHoverText);
            })
            .onMouseClick(() => {
                if (!clickedBa) {
                    clickedBa = true;
                    clickedSkyblock = false;
                    clickedItem = false;
                    clickedSkull = false;
                    animateColorDarkest(baButton);
                    animateColorLight(skyblockButton);
                    animateColorLight(customItemButton);
                    animateColorLight(customSkullButton);
                }
            });

        // border on skyblockButton (premade)
        let skyblockBackground = new Elementa.UIRoundedRectangle(3)
            .setX(new Elementa.AdditiveConstraint(new Elementa.SiblingConstraint(), (5).pixels()))
            .setY(new Elementa.CenterConstraint())
            .setWidth(new Elementa.AdditiveConstraint(new Elementa.ChildBasedMaxSizeConstraint(), (5).pixels()))
            .setHeight(new Elementa.AdditiveConstraint(new Elementa.ChildBasedMaxSizeConstraint(), (5).pixels()))
            .setColor(new Elementa.ConstantColorConstraint(lightestColor()))
            .onMouseEnter((comp) => {
                animateColorDark(comp);
                hoverNav("Premade Items").setChildOf(this.getWindow());
            })
            .onMouseLeave((comp) => {
                animateColorLightest(comp);
                hoverNav("Premade Items").getParent().removeChild(hoverNav("Premade Items"));
            })
            .onMouseClick(() => {
                if (!clickedSkyblock) {
                    clickedBa = false;
                    clickedSkyblock = true;
                    clickedItem = false;
                    clickedSkull = false;
                    animateColorLight(baButton);
                    animateColorDarkest(skyblockButton);
                    animateColorLight(customItemButton);
                    animateColorLight(customSkullButton);
                }
            });

        // border on customItemButton
        let customItemBackground = new Elementa.UIRoundedRectangle(3)
            .setX(new Elementa.AdditiveConstraint(new Elementa.SiblingConstraint(), (5).pixels()))
            .setY(new Elementa.CenterConstraint())
            .setWidth(new Elementa.AdditiveConstraint(new Elementa.ChildBasedMaxSizeConstraint(), (5).pixels()))
            .setHeight(new Elementa.AdditiveConstraint(new Elementa.ChildBasedMaxSizeConstraint(), (5).pixels()))
            .setColor(new Elementa.ConstantColorConstraint(lightestColor()))
            .onMouseEnter((comp) => {
                animateColorDark(comp);
                itemHoverText.setChildOf(this.getWindow());
            })
            .onMouseLeave((comp) => {
                animateColorLightest(comp);
                itemHoverText.getParent().removeChild(itemHoverText);
            })
            .onMouseClick(() => {
                if (!clickedItem) {
                    clickedBa = false;
                    clickedSkyblock = false;
                    clickedItem = true;
                    clickedSkull = false;
                    animateColorLight(baButton);
                    animateColorLight(skyblockButton);
                    animateColorDarkest(customItemButton);
                    animateColorLight(customSkullButton);
                }
            });
        // border on the skullButton
        let customSkullBackground = new Elementa.UIRoundedRectangle(3)
            .setX(new Elementa.AdditiveConstraint(new Elementa.SiblingConstraint(), (5).pixels()))
            .setY(new Elementa.CenterConstraint())
            .setWidth(new Elementa.AdditiveConstraint(new Elementa.ChildBasedMaxSizeConstraint(), (5).pixels()))
            .setHeight(new Elementa.AdditiveConstraint(new Elementa.ChildBasedMaxSizeConstraint(), (5).pixels()))
            .setColor(new Elementa.ConstantColorConstraint(lightestColor()))
            .onMouseEnter((comp) => {
                // when mouse is over the button
                animateColorDark(comp);
                skullHoverText.setChildOf(this.getWindow());
            })
            .onMouseLeave((comp) => {
                // when mouse leaves the area of the button
                animateColorLightest(comp);
                skullHoverText.getParent().removeChild(skullHoverText);
            })
            .onMouseClick(() => {
                if (!clickedSkull) {
                    clickedBa = false;
                    clickedSkyblock = false;
                    clickedItem = false;
                    clickedSkull = true;
                    animateColorLight(baButton);
                    animateColorLight(skyblockButton);
                    animateColorLight(customItemButton);
                    animateColorDarkest(customSkullButton);
                }
            });

        // BA text shown on baButton
        let baText = new Elementa.UIText("BA").setX(new Elementa.CenterConstraint()).setY(new Elementa.CenterConstraint()).setTextScale((1.3).pixels()).setColor(new Elementa.ConstantColorConstraint(gold()));

        // image on skyBlockButton
        let skyblockImage = new Elementa.UIImage.ofFile(new java.io.File("./config/ChatTriggers/modules/BaltrazAddons/features/global/customSkyblockMenu/assets/nether_star.png")).setX(new Elementa.CenterConstraint()).setY(new Elementa.CenterConstraint()).setWidth((24).pixels()).setHeight(new Elementa.ImageAspectConstraint());

        // image on customItemButton
        let customItemImage = new Elementa.UIImage.ofFile(new java.io.File("./config/ChatTriggers/modules/BaltrazAddons/features/global/customSkyblockMenu/assets/apple_golden.png")).setX(new Elementa.CenterConstraint()).setY(new Elementa.CenterConstraint()).setWidth((24).pixels()).setHeight(new Elementa.ImageAspectConstraint());

        // image on customSkullButton
        let customSkullImage = new Elementa.UIImage.ofFile(new java.io.File("./config/ChatTriggers/modules/BaltrazAddons/features/global/customSkyblockMenu/assets/skull.png")).setX(new Elementa.CenterConstraint()).setY(new Elementa.CenterConstraint()).setWidth((20).pixels()).setHeight(new Elementa.ImageAspectConstraint());

        //  border of the Background of gui
        let backgroundBorder = new Elementa.UIRoundedRectangle(15)
            .setX(new Elementa.CenterConstraint())
            .setY(new Elementa.CenterConstraint())
            .setWidth(((screenWidth() / 4) * 3 + 5).pixels())
            .setHeight(((screenHeight() / 3) * 2 + 5).pixels())
            .setColor(new Elementa.ConstantColorConstraint(lightestColor()))
            .addChild(
                new Elementa.UIRoundedRectangle(15) // adds the main background above it
                    .setX(new Elementa.CenterConstraint())
                    .setY(new Elementa.CenterConstraint())
                    .setWidth(((screenWidth() / 4) * 3).pixels())
                    .setHeight(((screenHeight() / 3) * 2).pixels())
                    .setColor(new Elementa.ConstantColorConstraint(darkColor()))
            );
        // add the background to the gui to let button container hook into it
        backgroundBorder.setChildOf(this.getWindow());

        // Container for navigation buttons on top of gui
        let buttonContainer = new Elementa.UIContainer()
            .setWidth(screenWidth().pixels())
            .setHeight((screenHeight() / 16).pixels())
            .setX((backgroundBorder.getLeft() + screenWidth() / 100).pixels())
            .setY((screenHeight() / 2 - screenHeight() / 3 - screenHeight() / 16).pixels());

        // contains the glass images
        let glassContainer = new Elementa.UIContainer()
            .setWidth(screenWidth().pixels())
            .setHeight(screenHeight().pixels())
            .setX((backgroundBorder.getLeft() + backgroundBorder.getWidth() / 3).pixels())
            .setY(new Elementa.AdditiveConstraint(new Elementa.CenterConstraint(), ((backgroundBorder.getHeight() / 10) * -1).pixels()));

        // contains the glass images
        let glassContainer2 = new Elementa.UIContainer()
            .setWidth(screenWidth().pixels())
            .setHeight((screenHeight() / 16).pixels())
            .setX((backgroundBorder.getLeft() + backgroundBorder.getWidth() / 4.8).pixels())
            .setY(new Elementa.AdditiveConstraint(new Elementa.CenterConstraint(), ((backgroundBorder.getHeight() / 4) * -1).pixels()));

        // generate confirm button
        let confirmButton = new Elementa.UIRoundedRectangle(3)
            .setX((backgroundBorder.getRight() - backgroundBorder.getWidth() / 8).pixels())
            .setY((backgroundBorder.getBottom() - backgroundBorder.getHeight() / 9).pixels())
            .setWidth(new Elementa.AdditiveConstraint(new Elementa.ChildBasedMaxSizeConstraint(), (5).pixels()))
            .setHeight(new Elementa.AdditiveConstraint(new Elementa.ChildBasedMaxSizeConstraint(), (5).pixels()))
            .setColor(new Elementa.ConstantColorConstraint(darkColor()))
            .addChild(new Elementa.UIText("Confirm").setX(new Elementa.CenterConstraint()).setY(new Elementa.CenterConstraint()).setTextScale((1.3).pixels()).setColor(new Elementa.ConstantColorConstraint(WHITE)));

        // adds the button container in order to add the buttons afterwards
        buttonContainer.setChildOf(this.getWindow());

        // BA Button (default)
        baBackground.setChildOf(buttonContainer);
        baButton.setChildOf(baBackground);
        baText.setChildOf(baButton);

        // Skyblock Button (premade items)
        skyblockBackground.setChildOf(buttonContainer);
        skyblockButton.setChildOf(skyblockBackground);
        skyblockImage.setChildOf(skyblockButton);

        // Custom Item Button (custom items)
        customItemBackground.setChildOf(buttonContainer);
        customItemButton.setChildOf(customItemBackground);
        customItemImage.setChildOf(customItemButton);

        // Custom Skull Button (custom skulls)
        customSkullBackground.setChildOf(buttonContainer);
        customSkullButton.setChildOf(customSkullBackground);
        customSkullImage.setChildOf(customSkullButton);

        // add the background to the gui
        backgroundBorder.setChildOf(this.getWindow());

        // add the glass to the gui
        glassContainer.setChildOf(backgroundBorder).addChild(renderGlass("normal")).addChild(renderGlass("brown")).addChild(renderGlass("white")).addChild(renderGlass("silver")).addChild(renderGlass("gray")).addChild(renderGlass("black"));
        glassContainer2.setChildOf(backgroundBorder).addChild(renderGlass("pink")).addChild(renderGlass("red")).addChild(renderGlass("orange")).addChild(renderGlass("yellow")).addChild(renderGlass("lime")).addChild(renderGlass("green")).addChild(renderGlass("light_blue")).addChild(renderGlass("cyan")).addChild(renderGlass("blue")).addChild(renderGlass("magenta")).addChild(renderGlass("purple"));

        // add the confirm button to the gui lol
        confirmButton.setChildOf(this.getWindow());
    },
});
itemGui.init();

register("command", () => {
    GuiHandler.openGui(itemGui);
}).setName("itemgui");
