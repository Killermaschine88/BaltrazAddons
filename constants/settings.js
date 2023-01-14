/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import { @Vigilant, @SwitchProperty, @SliderProperty, @TextProperty, @ButtonProperty, @SelectorProperty, @DecimalSliderProperty, Color } from 'Vigilance';

@Vigilant("BaltrazAddons", "BaltrazAddons", {
    getCategoryComparator: () => (a, b) => {
        const categories = ["Dungeons", "Crimson Isles", "Misc", "Config"];

        return categories.indexOf(a.name) - categories.indexOf(b.name);
    },
    getSubcategoryComparator: () => (a, b) => {
        const subcategories = [
            // Dungeons
            "Auto Party Kicker",
            "QOL",
            // Crimson Isles
            "Hitboxes",
            // Misc
            "Damage Render",
            "Item Lore",
            // Config
            "Config"
        ];

        return subcategories.indexOf(a.getValue()[0].attributesExt.subcategory) - subcategories.indexOf(b.getValue()[0].attributesExt.subcategory);
    },
})
class Settings {
    constructor() {
        this.initialize(this);

        /* Categories */
        //this.setCategoryDescription("General", "&aCreated by Baltraz");
        this.setCategoryDescription("Dungeons", "&aCreated by Baltraz");
        this.setCategoryDescription("Crimson Isles", "&aCreated by Baltraz");
        this.setCategoryDescription("Misc", "&aCreated by Baltraz");
        this.setCategoryDescription("Config", "&aCreated by Baltraz");

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
        description: "Kick Healers as soon as they join",
        category: "Dungeons",
        subcategory: "Auto Party Kicker",
    })
    autoKickHealer = false;

    @SliderProperty({
        name: "Minimum Healer Level",
        description: "Set the minimum Healer Level the Player needs to be to not get kicked (Default 0)",
        category: "Dungeons",
        subcategory: "Auto Party Kicker",
        min: 0,
        max: 50,
    })
    autoKickHealerLevel = 0;

    @SwitchProperty({
        name: "Auto Kick Mage",
        description: "Kick Mages as soon as they join",
        category: "Dungeons",
        subcategory: "Auto Party Kicker",
    })
    autoKickMage = false;

    @SliderProperty({
        name: "Minimum Mage Level",
        description: "Set the minimum Mage Level the Player needs to be to not get kicked (Default 0)",
        category: "Dungeons",
        subcategory: "Auto Party Kicker",
        min: 0,
        max: 50,
    })
    autoKickMageLevel = 0;

    @SwitchProperty({
        name: "Auto Kick Berserker",
        description: "Kick Berserkers as soon as they join",
        category: "Dungeons",
        subcategory: "Auto Party Kicker",
    })
    autoKickBerserk = false;

    @SliderProperty({
        name: "Minimum Berserker Level",
        description: "Set the minimum Berserker Level the Player needs to be to not get kicked (Default 0)",
        category: "Dungeons",
        subcategory: "Auto Party Kicker",
        min: 0,
        max: 50,
    })
    autoKickBerserkLevel = 0;

    @SwitchProperty({
        name: "Auto Kick Archer",
        description: "Kick Archers as soon as they join",
        category: "Dungeons",
        subcategory: "Auto Party Kicker",
    })
    autoKickArcher = false;

    @SliderProperty({
        name: "Minimum Archer Level",
        description: "Set the minimum Archer Level the Player needs to be to not get kicked (Default 0)",
        category: "Dungeons",
        subcategory: "Auto Party Kicker",
        min: 0,
        max: 50,
    })
    autoKickArcherLevel = 0;

    @SwitchProperty({
        name: "Auto Kick Tank",
        description: "Kick Tanks as soon as they join",
        category: "Dungeons",
        subcategory: "Auto Party Kicker",
    })
    autoKickTank = false;

    @SliderProperty({
        name: "Minimum Tank Level",
        description: "Set the minimum Tank Level the Player needs to be to not get kicked (Default 0)",
        category: "Dungeons",
        subcategory: "Auto Party Kicker",
        min: 0,
        max: 50,
    })
    autoKickTankLevel = 0;

    // Party QOL
    @SwitchProperty({
        name: "Player Info",
        description: "Show Info of the Player tha joins your party in chat with Utility Commands &c(Requires API Key)",
        category: "Dungeons",
        subcategory: "QOL",
    })
    partyPlayerInfo = false;

    // -------------------------------------------------------
    /*                  Crimson Isles Stuff                 */
    // -------------------------------------------------------
    // Mob Hitboxes
    @SwitchProperty({
        name: "Mob Hitboxes (FPS Heavy Kinda)",
        description: "Draw a Box around Vanquishers, Thunders and Jawbusses",
        category: "Crimson Isles",
        subcategory: "Hitboxes",
    })
    mobHitboxes = false;

    // -------------------------------------------------------
    /*                          Misc                        */
    // -------------------------------------------------------
    // Damage Render
    @SwitchProperty({
        name: "Custom Damage Render",
        description: "Displays a custom Damage Render. If this is Disabled the module will not modify the Damage Splash.\nDefaults to §cDisabled§r.",
        category: "Misc",
        subcategory: "Damage Render",
    })
    customDamageRender = false;

    @SelectorProperty({
        name: "Custom Damage Type",
        description: "Size of the custom Damage Render.\nDefaults to §cNormal§r.",
        category: "Misc",
        subcategory: "Damage Render",
        options: ["Small", "Normal", "Big", "Custom", "Hidden"],
    })
    customDamageType = 1;

    @SliderProperty({
        name: "Custom Damage Scale",
        description: "Sets the custom scale of the Damage Render.\nDefaults to 50 (Default Hypixel Size Prolly)",
        category: "Misc",
        subcategory: "Damage Render",
        min: 1,
        max: 100,
    })
    customDamageScale = 50;

    @SliderProperty({
        name: "Custom Damage Render Amount",
        description: "Sets the amount of Damage Renders that can be displayed at once.\nDefaults to 20",
        category: "Misc",
        subcategory: "Damage Render",
        min: 1,
        max: 100,
    })
    maxDamageRenderDisplay = 20;

    @SliderProperty({
        name: "Custom Damage Render Distance",
        description: "Estimate of the max distance the Damage Render can be displayed.\nDefaults to 10",
        category: "Misc",
        subcategory: "Damage Render",
        min: 1,
        max: 50,
    })
    maxDamageRenderDistance = 10;

    // 
    @SwitchProperty({
        name: "Show Champion Level",
        description: "Show the current Champion Level in the Item Lore",
        category: "Misc",
        subcategory: "Item Lore",
    })
    showChampionLevel = false;

    @SwitchProperty({
        name: "Show Hecatomb Level",
        description: "Show the current Hecatomb Level in the Item Lore",
        category: "Misc",
        subcategory: "Item Lore",
    })
    showHecatombLevel = false;

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
        description: "If Errors should be logged into Chat",
        category: "Config",
        subcategory: "Config",
    })
    logErrorsToChat = false;
}
export default new Settings();
