/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import { @Vigilant, @SwitchProperty, @SliderProperty, @TextProperty, @ButtonProperty, Color } from 'Vigilance';

@Vigilant("BaltrazAddons", "BaltrazAddons", {
    getCategoryComparator: () => (a, b) => {
        const categories = ["Dungeon Party", "Crimson Isles", "Config"];

        return categories.indexOf(a.name) - categories.indexOf(b.name);
    },
    getSubcategoryComparator: () => (a, b) => {
        const subcategories = ["Auto Kicker", "QOL"];

        return subcategories.indexOf(a.getValue()[0].attributesExt.subcategory) - subcategories.indexOf(b.getValue()[0].attributesExt.subcategory);
    },
})

class Settings {
    constructor() {
        this.initialize(this);

        /* Categories */
        //this.setCategoryDescription("General", "&aCreated by Baltraz");
        this.setCategoryDescription("Dungeon Party", "&aCreated by Baltraz");
        this.setCategoryDescription("Crimson Isles", "&aCreated by Baltraz");
        this.setCategoryDescription("Config", "&aCreated by Baltraz");

        /* Dependencies */
        // Party Auto Kicker
        this.addDependency("Minimum Healer Level", "Auto Kick Healer");
        this.addDependency("Minimum Mage Level", "Auto Kick Mage");
        this.addDependency("Minimum Berserker Level", "Auto Kick Berserker");
        this.addDependency("Minimum Archer Level", "Auto Kick Archer");
        this.addDependency("Minimum Tank Level", "Auto Kick Tank");
    }

    partyDisplayGui = new Gui();

    // -------------------------------------------------------
    /*                  Dungeon PArty Stuff                 */
    // -------------------------------------------------------
    // Party Auto Kicker
    @SwitchProperty({
        name: "Auto Kick Healer",
        description: "Kick Healers as soon as they join",
        category: "Dungeon Party",
        subcategory: "Auto Kicker",
    })
    autoKickHealer = false;

    @SliderProperty({
        name: "Minimum Healer Level",
        description: "Set the minimum Healer Level the Player needs to be to not get kicked (Default 0)",
        category: "Dungeon Party",
        subcategory: "Auto Kicker",
        min: 0,
        max: 50,
    })
    autoKickHealerLevel = 0;

    @SwitchProperty({
        name: "Auto Kick Mage",
        description: "Kick Mages as soon as they join",
        category: "Dungeon Party",
        subcategory: "Auto Kicker",
    })
    autoKickMage = false;

    @SliderProperty({
        name: "Minimum Mage Level",
        description: "Set the minimum Mage Level the Player needs to be to not get kicked (Default 0)",
        category: "Dungeon Party",
        subcategory: "Auto Kicker",
        min: 0,
        max: 50,
    })
    autoKickMageLevel = 0;

    @SwitchProperty({
        name: "Auto Kick Berserker",
        description: "Kick Berserkers as soon as they join",
        category: "Dungeon Party",
        subcategory: "Auto Kicker",
    })
    autoKickBerserk = false;

    @SliderProperty({
        name: "Minimum Berserker Level",
        description: "Set the minimum Berserker Level the Player needs to be to not get kicked (Default 0)",
        category: "Dungeon Party",
        subcategory: "Auto Kicker",
        min: 0,
        max: 50,
    })
    autoKickBerserkLevel = 0;

    @SwitchProperty({
        name: "Auto Kick Archer",
        description: "Kick Archers as soon as they join",
        category: "Dungeon Party",
        subcategory: "Auto Kicker",
    })
    autoKickArcher = false;

    @SliderProperty({
        name: "Minimum Archer Level",
        description: "Set the minimum Archer Level the Player needs to be to not get kicked (Default 0)",
        category: "Dungeon Party",
        subcategory: "Auto Kicker",
        min: 0,
        max: 50,
    })
    autoKickArcherLevel = 0;

    @SwitchProperty({
        name: "Auto Kick Tank",
        description: "Kick Tanks as soon as they join",
        category: "Dungeon Party",
        subcategory: "Auto Kicker",
    })
    autoKickTank = false;

    @SliderProperty({
        name: "Minimum Tank Level",
        description: "Set the minimum Tank Level the Player needs to be to not get kicked (Default 0)",
        category: "Dungeon Party",
        subcategory: "Auto Kicker",
        min: 0,
        max: 50,
    })
    autoKickTankLevel = 0;

    // Party QOL
    @SwitchProperty({
        name: "Player Info",
        description: "Show Info of the Player tha joins your party in chat with Utility Commands &c(Requires API Key)",
        category: "Dungeon Party",
        subcategory: "QOL",
    })
    partyPlayerInfo = false;

    // Party Display
    @SwitchProperty({
        name: "Party Display",
        description: "Show Info of the Dungeon Party on the Screen",
        category: "Dungeon Party",
        subcategory: "QOL",
    })
    partyDisplay = false;

    @ButtonProperty({
        name: "Move",
        description: "Move the Party Info display",
        category: "Dungeon Party",
        subcategory: "QOL",
        placeholder: "Move GUI"
    })
    MovePartyDisplay() {
        this.partyDisplayGui.open();
    }

    // -------------------------------------------------------
    /*                  Crimson Isles Stuff                 */
    // -------------------------------------------------------
    @SwitchProperty({
        name: "Mob ESP (FPS Heavy)",
        description: "Draw a Box around Vanquishers, Thunders and Jawbusses",
        category: "Crimson Isles",
        subcategory: "QOL",
    })
    crimsonIslesESP = false;

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
