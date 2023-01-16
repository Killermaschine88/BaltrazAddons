/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import { @Vigilant, @SwitchProperty, @SliderProperty, @TextProperty, @ButtonProperty, @SelectorProperty, @DecimalSliderProperty, Color } from 'Vigilance';
import { defaultMessage } from "../functions/util";

@Vigilant("BaltrazAddons", "BaltrazAddons", {
    getCategoryComparator: () => (a, b) => {
        const categories = ["Dungeons", "Crimson Isles", "Misc", "QOL", "Config"];

        return categories.indexOf(a.name) - categories.indexOf(b.name);
    },
    getSubcategoryComparator: () => (a, b) => {
        const subcategories = [
            // Dungeons
            "Auto Party Kicker",
            "Dungeon QOL",
            // Crimson Isles
            "Hitboxes",
            "Kuudra",
            // Misc
            "Damage Render",
            "Item Lore",
            "Misc QOL",
            // QOL
            "Pet Swapper",
            // Config
            "Config",
        ];

        return subcategories.indexOf(a.getValue()[0].attributesExt.subcategory) - subcategories.indexOf(b.getValue()[0].attributesExt.subcategory);
    },
})

class Settings {
    constructor() {
        this.initialize(this);

        /* Categories */
        this.setCategoryDescription("Dungeons", "&6Created by Baltraz");
        this.setCategoryDescription("Crimson Isles", "&6Created by Baltraz");
        this.setCategoryDescription("Misc", "&6Created by Baltraz");
        this.setCategoryDescription("Config", "&6Created by Baltraz");

        /* Dependencies */
        // Party Auto Party Kicker
        this.addDependency("Minimum Healer Level", "Auto Kick Healer");
        this.addDependency("Minimum Mage Level", "Auto Kick Mage");
        this.addDependency("Minimum Berserker Level", "Auto Kick Berserker");
        this.addDependency("Minimum Archer Level", "Auto Kick Archer");
        this.addDependency("Minimum Tank Level", "Auto Kick Tank");
    }

    partyDisplayGui = new Gui();

    // -------------------------------------------------------
    /*                  Dungeons                            */
    // -------------------------------------------------------
    // Auto Party Kicker
    @SwitchProperty({
        name: "Auto Kick Healer",
        description: `Kick Healers as soon as they join. ${defaultMessage("&cFalse")}`,
        category: "Dungeons",
        subcategory: "Auto Party Kicker",
    })
    autoKickHealer = false;

    @SliderProperty({
        name: "Minimum Healer Level",
        description: `Set the minimum Healer Level the Player needs to be to not get kicked. ${defaultMessage("&c0")}`,
        category: "Dungeons",
        subcategory: "Auto Party Kicker",
        min: 0,
        max: 50,
    })
    autoKickHealerLevel = 0;

    @SwitchProperty({
        name: "Auto Kick Mage",
        description: `Kick Mages as soon as they join. ${defaultMessage("&cFalse")}`,
        category: "Dungeons",
        subcategory: "Auto Party Kicker",
    })
    autoKickMage = false;

    @SliderProperty({
        name: "Minimum Mage Level",
        description: `Set the minimum Mage Level the Player needs to be to not get kicked. ${defaultMessage("&c0")}`,
        category: "Dungeons",
        subcategory: "Auto Party Kicker",
        min: 0,
        max: 50,
    })
    autoKickMageLevel = 0;

    @SwitchProperty({
        name: "Auto Kick Berserker",
        description: `Kick Berserkers as soon as they join. ${defaultMessage("&cFalse")}`,
        category: "Dungeons",
        subcategory: "Auto Party Kicker",
    })
    autoKickBerserk = false;

    @SliderProperty({
        name: "Minimum Berserker Level",
        description: `Set the minimum Berserker Level the Player needs to be to not get kicked. ${defaultMessage("&c0")}`,
        category: "Dungeons",
        subcategory: "Auto Party Kicker",
        min: 0,
        max: 50,
    })
    autoKickBerserkLevel = 0;

    @SwitchProperty({
        name: "Auto Kick Archer",
        description: `Kick Archers as soon as they join. ${defaultMessage("&cFalse")}`,
        category: "Dungeons",
        subcategory: "Auto Party Kicker",
    })
    autoKickArcher = false;

    @SliderProperty({
        name: "Minimum Archer Level",
        description: `Set the minimum Archer Level the Player needs to be to not get kicked. ${defaultMessage("&c0")}`,
        category: "Dungeons",
        subcategory: "Auto Party Kicker",
        min: 0,
        max: 50,
    })
    autoKickArcherLevel = 0;

    @SwitchProperty({
        name: "Auto Kick Tank",
        description: `Kick Tanks as soon as they join. ${defaultMessage("&cFalse")}`,
        category: "Dungeons",
        subcategory: "Auto Party Kicker",
    })
    autoKickTank = false;

    @SliderProperty({
        name: "Minimum Tank Level",
        description: `Set the minimum Tank Level the Player needs to be to not get kicked. ${defaultMessage("&c0")}`,
        category: "Dungeons",
        subcategory: "Auto Party Kicker",
        min: 0,
        max: 50,
    })
    autoKickTankLevel = 0;

    // Party QOL
    @SwitchProperty({
        name: "Dungeon Player Info",
        description: `Show Info of the Player tha joins your party in chat with Utility Commands &c(Requires API Key) ${defaultMessage("&cFalse")}`,
        category: "Dungeons",
        subcategory: "Dungeon QOL",
    })
    dungeonPlayerInfo = false;

    // -------------------------------------------------------
    /*                  Crimson Isles Stuff                 */
    // -------------------------------------------------------
    // Mob Hitboxes
    @SwitchProperty({
        name: "Mob Hitboxes (FPS Heavy Kinda)",
        description: `Draw a Box around Vanquishers, Thunders and Jawbusses. ${defaultMessage("&cFalse")}`,
        category: "Crimson Isles",
        subcategory: "Hitboxes",
    })
    mobHitboxes = false;

    // Kuudra
    @SwitchProperty({
        name: "Kuudra Player Info",
        description: `Show Info of the Player tha joins your party in chat with Utility Commands. &c(Requires API Key) ${defaultMessage("&cFalse")}`,
        category: "Crimson Isles",
        subcategory: "Kuudra",
    })
    kuudraPlayerInfo = false;

    // -------------------------------------------------------
    /*                          Misc                        */
    // -------------------------------------------------------
    // Damage Render
    @SwitchProperty({
        name: "Custom Damage Render",
        description: `Displays a custom Damage Render. If this is Disabled the module will not modify the Damage Splash. ${defaultMessage("&cFalse")}`,
        category: "Misc",
        subcategory: "Damage Render",
    })
    customDamageRender = false;

    @SelectorProperty({
        name: "Custom Damage Type",
        description: `Size of the custom Damage Render. ${defaultMessage("&cNormal")}`,
        category: "Misc",
        subcategory: "Damage Render",
        options: ["Small", "Normal", "Big", "Custom", "Hidden"],
    })
    customDamageType = 1;

    @SliderProperty({
        name: "Custom Damage Scale",
        description: `Sets the custom scale of the Damage Render. ${defaultMessage("&c50")}`,
        category: "Misc",
        subcategory: "Damage Render",
        min: 1,
        max: 100,
    })
    customDamageScale = 50;

    @SliderProperty({
        name: "Custom Damage Render Amount",
        description: `Sets the amount of Damage Renders that can be displayed at once. ${defaultMessage("&c20")}`,
        category: "Misc",
        subcategory: "Damage Render",
        min: 1,
        max: 100,
    })
    maxDamageRenderDisplay = 20;

    @SliderProperty({
        name: "Custom Damage Render Distance",
        description: `Estimate of the max distance the Damage Render can be displayed. ${defaultMessage("&c10")}`,
        category: "Misc",
        subcategory: "Damage Render",
        min: 1,
        max: 50,
    })
    maxDamageRenderDistance = 10;

    // Item Lore
    @SwitchProperty({
        name: "Show Champion Level",
        description: `Show the current Champion Level in the Item Lore. ${defaultMessage("&cFalse")}`,
        category: "Misc",
        subcategory: "Item Lore",
    })
    showChampionLevel = false;

    @SwitchProperty({
        name: "Show Hecatomb Level",
        description: `Show the current Hecatomb Level in the Item Lore. ${defaultMessage("&cFalse")}`,
        category: "Misc",
        subcategory: "Item Lore",
    })
    showHecatombLevel = false;

    // Misc QOl
    @SwitchProperty({
        name: "Snake Minigame Helper",
        description: `Allows you to use the WASD keys to control the snake in the Abiphone. ${defaultMessage("&cFalse")}`,
        category: "Misc",
        subcategory: "Misc QOL",
    })
    snakeMinigameHelper = false;

    @SwitchProperty({
        name: "Tracker Trapper Mobs",
        description: `Draw an Box around Trapper mobs when they are in your view distance. ${defaultMessage("&cFalse")}`,
        category: "Misc",
        subcategory: "Misc QOL",
    })
    trackTrapperMobs = false;

    @SwitchProperty({
        name: "Hide Worthless Abiphone Calls",
        description: `Hides annoying abiphone calls while still showing important ones. ${defaultMessage("&cFalse")}`,
        category: "Misc",
        subcategory: "Misc QOL",
    })
    cancelAbiphone = false;

    // -------------------------------------------------------
    /*                         QOL FEATURES                 */
    // -------------------------------------------------------


    @SwitchProperty({
        name: "Trade Menu QOL",
        description: `Adds a button to access the trade menu in the main skyblock menu. ${defaultMessage("&cFalse")}`,
        category: "QOL",
        subcategory: "Misc QOL",
    })
    tradeMenu = false;

    // -------------------------------------------------------
    /*                         Config                       */
    // -------------------------------------------------------
    @TextProperty({
        name: "API Key",
        description: "Hypixel API Key for various Features",
        category: "Config",
        subcategory: "Config",
    })
    apiKey = "";

    @SwitchProperty({
        name: "Log Errors",
        description: `If Errors should be logged into Chat. ${defaultMessage("&cFalse")}`,
        category: "Config",
        subcategory: "Config",
    })
    logErrorsToChat = false;

    @SwitchProperty({
        name: "Allow Essentials Notifications",
        description: `Toggle if the Addon is allowed to send Notifications via Essentials. ${defaultMessage("&cTrue")}`,
        category: "Config",
        subcategory: "Config",
    })
    useEssentialsNotifications = true;

    @SwitchProperty({
        name: "Public Release",
        description: `If the release is Public or not. ${defaultMessage("&cTrue")}`,
        category: "Config",
        subcategory: "Config",
    })
    isPublicRelease = true;
}
export default new Settings();
