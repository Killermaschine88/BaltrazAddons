/// <reference types="../../../../CTAutocomplete" />
/// <reference lib="es2015" />

// imports
import * as Elementa from "../../../../Elementa";
import { getCenterX, getCenterY, animateColorDarkest, animateColorDark, animateColorLight, animateColorLightest } from "./functions";
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
    .setColor(new Elementa.ConstantColorConstraint(lightColor()))
    .onWindowResize();

// hover texts on nav buttons
let baHoverText = new Elementa.UIRoundedRectangle(1)
    .setX(new Elementa.MousePositionConstraint())
    .setY(new Elementa.MousePositionConstraint())
    .setWidth(new Elementa.AdditiveConstraint(new Elementa.ChildBasedMaxSizeConstraint(), (5).pixels()))
    .setHeight(new Elementa.AdditiveConstraint(new Elementa.ChildBasedMaxSizeConstraint(), (5).pixels()))
    .enableEffect(new Elementa.OutlineEffect(Color.WHITE, 0.5))
    .setColor(new Elementa.ConstantColorConstraint(darkColor()))
    .addChild(new Elementa.UIText("Help + Glass").setX(new Elementa.CenterConstraint()).setY(new Elementa.CenterConstraint()).setTextScale((1).pixels()).setColor(new Elementa.ConstantColorConstraint(Color.WHITE)));

let skyblockHoverText = new Elementa.UIRoundedRectangle(1)
    .setX(new Elementa.MousePositionConstraint())
    .setY(new Elementa.MousePositionConstraint())
    .setWidth(new Elementa.AdditiveConstraint(new Elementa.ChildBasedMaxSizeConstraint(), (5).pixels()))
    .setHeight(new Elementa.AdditiveConstraint(new Elementa.ChildBasedMaxSizeConstraint(), (5).pixels()))
    .enableEffect(new Elementa.OutlineEffect(Color.WHITE, 0.5))
    .setColor(new Elementa.ConstantColorConstraint(darkColor()))
    .addChild(new Elementa.UIText("Premade Items").setX(new Elementa.CenterConstraint()).setY(new Elementa.CenterConstraint()).setTextScale((1).pixels()).setColor(new Elementa.ConstantColorConstraint(Color.WHITE)));

let itemHoverText = new Elementa.UIRoundedRectangle(1)
    .setX(new Elementa.MousePositionConstraint())
    .setY(new Elementa.MousePositionConstraint())
    .setWidth(new Elementa.AdditiveConstraint(new Elementa.ChildBasedMaxSizeConstraint(), (5).pixels()))
    .setHeight(new Elementa.AdditiveConstraint(new Elementa.ChildBasedMaxSizeConstraint(), (5).pixels()))
    .enableEffect(new Elementa.OutlineEffect(Color.WHITE, 0.5))
    .setColor(new Elementa.ConstantColorConstraint(darkColor()))
    .addChild(new Elementa.UIText("Custom Items").setX(new Elementa.CenterConstraint()).setY(new Elementa.CenterConstraint()).setTextScale((1).pixels()).setColor(new Elementa.ConstantColorConstraint(Color.WHITE)));
let skullHoverText = new Elementa.UIRoundedRectangle(1)
    .setX(new Elementa.MousePositionConstraint())
    .setY(new Elementa.MousePositionConstraint())
    .setWidth(new Elementa.AdditiveConstraint(new Elementa.ChildBasedMaxSizeConstraint(), (5).pixels()))
    .setHeight(new Elementa.AdditiveConstraint(new Elementa.ChildBasedMaxSizeConstraint(), (5).pixels()))
    .enableEffect(new Elementa.OutlineEffect(Color.WHITE, 0.5))
    .setColor(new Elementa.ConstantColorConstraint(darkColor()))
    .addChild(new Elementa.UIText("Custom Skulls").setX(new Elementa.CenterConstraint()).setY(new Elementa.CenterConstraint()).setTextScale((1).pixels()).setColor(new Elementa.ConstantColorConstraint(Color.WHITE)));
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
                skyblockHoverText.setChildOf(this.getWindow());
            })
            .onMouseLeave((comp) => {
                animateColorLightest(comp);
                skyblockHoverText.getParent().removeChild(skyblockHoverText);
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
            .setY((screenHeight() / 2 - screenHeight() / 3 - screenHeight() / 16).pixels())
            .onWindowResize();
        
        let glassContainer = new Elementa.UIContainer()
            .setWidth(screenWidth().pixels())
            .setHeight((screenHeight() / 16).pixels())
            .setX((backgroundBorder.getLeft() + screenWidth() / 100).pixels())
            .setY(new Elementa.CenterConstraint())

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
    },
});
itemGui.init();

register("command", () => {
    GuiHandler.openGui(itemGui);
}).setName("itemgui");
