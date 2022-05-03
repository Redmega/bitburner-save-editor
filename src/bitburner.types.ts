export namespace Bitburner {
  export enum SaveDataKey {
    PlayerSave = "PlayerSave",
    FactionsSave = "FactionsSave",
    AllServersSave = "AllServersSave",
    CompaniesSave = "CompaniesSave",
    AliasesSave = "AliasesSave",
    GlobalAliasesSave = "GlobalAliasesSave",
    MessagesSave = "MessagesSave",
    StockMarketSave = "StockMarketSave",
    SettingsSave = "SettingsSave",
    VersionSave = "VersionSave",
    AllGangsSave = "AllGangsSave",
    LastExportBonus = "LastExportBonus",
    StaneksGiftSave = "StaneksGiftSave",
  }

  export const enum Ctor {
    BitburnerSaveObject = "BitburnerSaveObject",
    CodingContract = "CodingContract",
    Company = "Company",
    Faction = "Faction",
    HacknetNode = "HacknetNode",
    HashManager = "HashManager",
    Message = "Message",
    MoneySourceTracker = "MoneySourceTracker",
    PlayerObject = "PlayerObject",
    Script = "Script",
    Server = "Server",
    StaneksGift = "StaneksGift",
  }

  export interface RawSaveData extends SaveObject<Ctor.BitburnerSaveObject> {
    ctor: Ctor.BitburnerSaveObject;
    data: Record<SaveDataKey, string>;
  }

  export interface SaveObject<T extends Ctor> {
    ctor: T;
    data: {};
  }
  export interface SaveData extends SaveObject<Ctor.BitburnerSaveObject> {
    ctor: Ctor.BitburnerSaveObject;
    data: {
      [SaveDataKey.AliasesSave]: Record<string, string>;
      [SaveDataKey.AllGangsSave]: unknown; // @TODO: Gangs
      [SaveDataKey.AllServersSave]: Record<string, ServerSaveObject>;
      [SaveDataKey.CompaniesSave]: Record<string, CompanySaveObject>;
      [SaveDataKey.FactionsSave]: Record<string, FactionsSaveObject>;
      [SaveDataKey.GlobalAliasesSave]: Record<string, string>;
      [SaveDataKey.LastExportBonus]: number; // Date Number
      [SaveDataKey.MessagesSave]: Record<string, MessageSaveObject>;
      [SaveDataKey.PlayerSave]: PlayerSaveObject;
      [SaveDataKey.SettingsSave]: SettingsSaveData;
      [SaveDataKey.StaneksGiftSave]: StaneksGiftSaveObject;
      [SaveDataKey.StockMarketSave]: StockMarketSaveData;
      [SaveDataKey.VersionSave]: number;
    };
  }

  interface ServerSaveObject extends SaveObject<Ctor.Server> {
    data: {
      backdoorInstalled: boolean;
      baseDifficulty: number;
      contracts: CodingContractSaveObject[];
      cpuCores: number;
      ftpPortOpen: boolean;
      hackDifficulty: number;
      hasAdminRights: boolean;
      hostname: string;
      httpPortOpen: boolean;
      ip: string;
      isConnectedTo: boolean;
      maxRam: number;
      messages: string[];
      minDifficulty: number;
      moneyAvailable: number;
      moneyMax: number;
      numOpenPortsRequired: number;
      openPortCount: number;
      organizationName: string;
      programs: string[];
      purchasedByPlayer: boolean;
      ramUsed: number;
      requiredHackingSkill: number;
      runningScripts: unknown[]; // @TODO: RunningScript
      scripts: ScriptSaveObject[];
      serverGrowth: number;
      serversOnNetwork: string[];
      smtpPortOpen: boolean;
      sqlPortOpen: boolean;
      sshPortOpen: boolean;
      textFiles: string[];
    };
  }

  interface CodingContractSaveObject extends SaveObject<Ctor.CodingContract> {
    data: {
      data: any; // Data can be anything, arrays of numbers, 2d arrays, etc.
      fn: string;
      reward: { name: string; type: number } | null;
      tries: number;
      type: string;
    };
  }

  interface CompanySaveObject extends SaveObject<Ctor.Company> {
    data: {
      name: string;
      info: string;
      companyPositions: Record<string, boolean>;
      expMultiplier: number;
      isMegacorp?: boolean;
      jobStatReqOffset: number;
      salaryMultiplier: number;
    };
  }

  export interface FactionsSaveObject extends SaveObject<Ctor.Faction> {
    data: {
      alreadyInvited: boolean;
      augmentations: string[];
      favor: number;
      isBanned: boolean;
      isMember: boolean;
      name: string;
      playerReputation: number;
    };
  }

  interface HacknetNodeSaveObject extends SaveObject<Ctor.HacknetNode> {
    data: {
      cores: number;
      level: number;
      moneyGainRatePerSecond: number;
      name: string;
      onlineTimeSeconds: number;
      ram: number;
      totalMoneyGenerated: number;
    };
  }

  interface HashManagerSaveObject extends SaveObject<Ctor.HashManager> {
    data: {
      capacity: number;
      hashes: number;
      upgrades: Record<string, number>;
    };
  }

  interface MessageSaveObject extends SaveObject<Ctor.Message> {
    data: {
      filename: string;
      msg: string;
      recvd: boolean;
    };
  }

  interface MoneySourceSaveObject extends SaveObject<Ctor.MoneySourceTracker> {
    data: {
      [key: string]: number;
      bladeburner: number;
      casino: number;
      class: number;
      codingcontract: number;
      corporation: number;
      crime: number;
      gang: number;
      hacking: number;
      hacknet: number;
      hacknet_expenses: number;
      hospitalization: number;
      infiltration: number;
      sleeves: number;
      stock: number;
      total: number;
      work: number;
      servers: number;
      other: number;
      augmentations: number;
    };
  }

  interface ScriptSaveObject extends SaveObject<Ctor.Script> {
    data: {
      code: string;
      dependencies: { filename: string; url: string }[];
      filename: string;
      module: object | string;
      moduleSequenceNumber: number;
      ramUsage: number;
      server: string;
      url: string;
    };
  }

  interface StaneksGiftSaveObject extends SaveObject<Ctor.StaneksGift> {
    data: {
      fragments: {
        id: number;
        avgCharge: number;
        numCharge: number;
        rotation: number;
        x: number;
        y: number;
      }[];
      storedCycles: number;
    };
  }

  export interface PlayerSaveObject extends SaveObject<Ctor.PlayerObject> {
    data: {
      augmentations: { level: number; name: string }[];
      bitNodeN: number;
      city: CityName;
      companyName: string;
      corporation: unknown | null; // @TODO ICorporation
      gang: unknown | null; // @TODO IGang
      bladeburner: unknown | null; // @TODO IBladeburner
      currentServer: string;
      factions: string[];
      factionInvitations: string[];
      hacknetNodes: (HacknetNodeSaveObject | string)[];
      has4SData: boolean;
      has4SDataTixApi: boolean;
      hashManager: HashManagerSaveObject;
      hasTixApiAccess: boolean;
      hasWseAccount: boolean;
      hp: number;
      jobs: Record<string, string>;
      isWorking: boolean;
      karma: number;
      numPeopleKilled: number;
      location: LocationName;
      max_hp: number;
      money: number;
      moneySourceA: MoneySourceSaveObject;
      moneySourceB: MoneySourceSaveObject;
      playtimeSinceLastAug: number;
      playtimeSinceLastBitnode: number;
      purchasedServers: string[];
      queuedAugmentations: { level: number; name: string }[];
      resleeves: unknown[]; // @TODO Resleeve[];
      scriptProdSinceLastAug: number;
      sleeves: unknown[]; // @TODO Sleeve[];
      sleevesFromCovenant: number;
      sourceFiles: {
        lvl: number;
        n: number;
      }[];
      exploits: Exploit[];
      lastUpdate: number;
      totalPlaytime: number;

      // Stats
      hacking: number;
      strength: number;
      defense: number;
      dexterity: number;
      agility: number;
      charisma: number;
      intelligence: number;

      // Experience
      hacking_exp: number;
      strength_exp: number;
      defense_exp: number;
      dexterity_exp: number;
      agility_exp: number;
      charisma_exp: number;
      intelligence_exp: number;

      // Multipliers
      entropy: number;
      hacking_chance_mult: number;
      hacking_speed_mult: number;
      hacking_money_mult: number;
      hacking_grow_mult: number;
      hacking_mult: number;
      hacking_exp_mult: number;
      strength_mult: number;
      strength_exp_mult: number;
      defense_mult: number;
      defense_exp_mult: number;
      dexterity_mult: number;
      dexterity_exp_mult: number;
      agility_mult: number;
      agility_exp_mult: number;
      charisma_mult: number;
      charisma_exp_mult: number;
      hacknet_node_money_mult: number;
      hacknet_node_purchase_cost_mult: number;
      hacknet_node_ram_cost_mult: number;
      hacknet_node_core_cost_mult: number;
      hacknet_node_level_cost_mult: number;
      company_rep_mult: number;
      faction_rep_mult: number;
      work_money_mult: number;
      crime_success_mult: number;
      crime_money_mult: number;
      bladeburner_max_stamina_mult: number;
      bladeburner_stamina_gain_mult: number;
      bladeburner_analysis_mult: number;
      bladeburner_success_chance_mult: number;

      createProgramReqLvl: number;
      factionWorkType: string;
      createProgramName: string;
      timeWorkedCreateProgram: number;
      crimeType: string;
      committingCrimeThruSingFn: boolean;
      singFnCrimeWorkerScript: unknown | null; // @TODO: WorkerScript
      timeNeededToCompleteWork: number;
      focus: boolean;
      className: string;
      currentWorkFactionName: string;
      workType: string;
      currentWorkFactionDescription: string;
      timeWorked: number;
      workMoneyGained: number;
      workMoneyGainRate: number;
      workRepGained: number;
      workRepGainRate: number;
      workHackExpGained: number;
      workHackExpGainRate: number;
      workStrExpGained: number;
      workStrExpGainRate: number;
      workDefExpGained: number;
      workDefExpGainRate: number;
      workDexExpGained: number;
      workDexExpGainRate: number;
      workAgiExpGained: number;
      workAgiExpGainRate: number;
      workChaExpGained: number;
      workChaExpGainRate: number;
      workMoneyLossRate: number;
    };
  }

  export type PlayerStat = "hacking" | "strength" | "defense" | "dexterity" | "agility" | "charisma" | "intelligence";

  export const PLAYER_STATS: PlayerStat[] = [
    "hacking",
    "strength",
    "defense",
    "dexterity",
    "agility",
    "charisma",
    "intelligence",
  ];

  // Not sure why these don't follow the SaveObject model
  interface SettingsSaveData {
    // Basically ripped from the bitburner git repo
    /**
     * How many servers per page
     */
    ActiveScriptsServerPageSize: number;
    /**
     * How many scripts per page
     */
    ActiveScriptsScriptPageSize: number;
    /**
     * How often the game should autosave the player's progress, in seconds.
     */
    AutosaveInterval: number;

    /**
     * How many milliseconds between execution points for Netscript 1 statements.
     */
    CodeInstructionRunTime: number;

    /**
     * Render city as list of buttons.
     */
    DisableASCIIArt: boolean;

    /**
     * Whether global keyboard shortcuts should be recognized throughout the game.
     */
    DisableHotkeys: boolean;

    /**
     * Whether text effects such as corruption should be visible.
     */
    DisableTextEffects: boolean;

    /**
     * Enable bash hotkeys
     */
    EnableBashHotkeys: boolean;

    /**
     * Enable timestamps
     */
    EnableTimestamps: boolean;

    /**
     * Locale used for display numbers
     */
    Locale: string;

    /**
     * Limit the number of log entries for each script being executed on each server.
     */
    MaxLogCapacity: number;

    /**
     * Limit how many entries can be written to a Netscript Port before entries start to get pushed out.
     */
    MaxPortCapacity: number;

    /**
     * Limit the number of entries in the terminal.
     */
    MaxTerminalCapacity: number;

    /**
     * Save the game when you save any file.
     */
    SaveGameOnFileSave: boolean;

    /**
     * Whether the player should be asked to confirm purchasing each and every augmentation.
     */
    SuppressBuyAugmentationConfirmation: boolean;

    /**
     * Whether the user should be prompted to join each faction via a dialog box.
     */
    SuppressFactionInvites: boolean;

    /**
     * Whether to show a popup message when player is hospitalized from taking too much damage
     */
    SuppressHospitalizationPopup: boolean;

    /**
     * Whether the user should be shown a dialog box whenever they receive a new message file.
     */
    SuppressMessages: boolean;

    /**
     * Whether the user should be asked to confirm travelling between cities.
     */
    SuppressTravelConfirmation: boolean;

    /**
     * Whether the user should be displayed a popup message when his Bladeburner actions are cancelled.
     */
    SuppressBladeburnerPopup: boolean;

    /*
     * Theme colors
     */
    theme: {
      [key: string]: string | undefined;
      primarylight: string;
      primary: string;
      primarydark: string;
      errorlight: string;
      error: string;
      errordark: string;
      secondarylight: string;
      secondary: string;
      secondarydark: string;
      warninglight: string;
      warning: string;
      warningdark: string;
      infolight: string;
      info: string;
      infodark: string;
      welllight: string;
      well: string;
      white: string;
      black: string;
      hp: string;
      money: string;
      hack: string;
      combat: string;
      cha: string;
      int: string;
      rep: string;
      disabled: string;
    };
  }

  enum LocationName {
    // Cities
    Aevum = "Aevum",
    Chongqing = "Chongqing",
    Ishima = "Ishima",
    NewTokyo = "New Tokyo",
    Sector12 = "Sector-12",
    Volhaven = "Volhaven",

    // Aevum Locations
    AevumAeroCorp = "AeroCorp",
    AevumBachmanAndAssociates = "Bachman & Associates",
    AevumClarkeIncorporated = "Clarke Incorporated",
    AevumCrushFitnessGym = "Crush Fitness Gym",
    AevumECorp = "ECorp",
    AevumFulcrumTechnologies = "Fulcrum Technologies",
    AevumGalacticCybersystems = "Galactic Cybersystems",
    AevumNetLinkTechnologies = "NetLink Technologies",
    AevumPolice = "Aevum Police Headquarters",
    AevumRhoConstruction = "Rho Construction",
    AevumSnapFitnessGym = "Snap Fitness Gym",
    AevumSummitUniversity = "Summit University",
    AevumWatchdogSecurity = "Watchdog Security",
    AevumCasino = "Iker Molina Casino",

    // Chongqing locations
    ChongqingKuaiGongInternational = "KuaiGong International",
    ChongqingSolarisSpaceSystems = "Solaris Space Systems",
    ChongqingChurchOfTheMachineGod = "Church of the Machine God",

    // Sector 12
    Sector12AlphaEnterprises = "Alpha Enterprises",
    Sector12BladeIndustries = "Blade Industries",
    Sector12CIA = "Central Intelligence Agency",
    Sector12CarmichaelSecurity = "Carmichael Security",
    Sector12CityHall = "Sector-12 City Hall",
    Sector12DeltaOne = "DeltaOne",
    Sector12FoodNStuff = "FoodNStuff",
    Sector12FourSigma = "Four Sigma",
    Sector12IcarusMicrosystems = "Icarus Microsystems",
    Sector12IronGym = "Iron Gym",
    Sector12JoesGuns = "Joe's Guns",
    Sector12MegaCorp = "MegaCorp",
    Sector12NSA = "National Security Agency",
    Sector12PowerhouseGym = "Powerhouse Gym",
    Sector12RothmanUniversity = "Rothman University",
    Sector12UniversalEnergy = "Universal Energy",

    // New Tokyo
    NewTokyoDefComm = "DefComm",
    NewTokyoGlobalPharmaceuticals = "Global Pharmaceuticals",
    NewTokyoNoodleBar = "Noodle Bar",
    NewTokyoVitaLife = "VitaLife",

    // Ishima
    IshimaNovaMedical = "Nova Medical",
    IshimaOmegaSoftware = "Omega Software",
    IshimaStormTechnologies = "Storm Technologies",
    IshimaGlitch = "0x6C1",

    // Volhaven
    VolhavenCompuTek = "CompuTek",
    VolhavenHeliosLabs = "Helios Labs",
    VolhavenLexoCorp = "LexoCorp",
    VolhavenMilleniumFitnessGym = "Millenium Fitness Gym",
    VolhavenNWO = "NWO",
    VolhavenOmniTekIncorporated = "OmniTek Incorporated",
    VolhavenOmniaCybersystems = "Omnia Cybersystems",
    VolhavenSysCoreSecurities = "SysCore Securities",
    VolhavenZBInstituteOfTechnology = "ZB Institute of Technology",

    // Generic locations
    Hospital = "Hospital",
    Slums = "The Slums",
    TravelAgency = "Travel Agency",
    WorldStockExchange = "World Stock Exchange",

    // Default name for Location objects
    Void = "The Void",
  }

  // Stocks for companies at which you can work
  const StockSymbols: Record<LocationName | string, string> = {
    [LocationName.AevumECorp]: "ECP",
    [LocationName.Sector12MegaCorp]: "MGCP",
    [LocationName.Sector12BladeIndustries]: "BLD",
    [LocationName.AevumClarkeIncorporated]: "CLRK",
    [LocationName.VolhavenOmniTekIncorporated]: "OMTK",
    [LocationName.Sector12FourSigma]: "FSIG",
    [LocationName.ChongqingKuaiGongInternational]: "KGI",
    [LocationName.AevumFulcrumTechnologies]: "FLCM",
    [LocationName.IshimaStormTechnologies]: "STM",
    [LocationName.NewTokyoDefComm]: "DCOMM",
    [LocationName.VolhavenHeliosLabs]: "HLS",
    [LocationName.NewTokyoVitaLife]: "VITA",
    [LocationName.Sector12IcarusMicrosystems]: "ICRS",
    [LocationName.Sector12UniversalEnergy]: "UNV",
    [LocationName.AevumAeroCorp]: "AERO",
    [LocationName.VolhavenOmniaCybersystems]: "OMN",
    [LocationName.ChongqingSolarisSpaceSystems]: "SLRS",
    [LocationName.NewTokyoGlobalPharmaceuticals]: "GPH",
    [LocationName.IshimaNovaMedical]: "NVMD",
    [LocationName.AevumWatchdogSecurity]: "WDS",
    [LocationName.VolhavenLexoCorp]: "LXO",
    [LocationName.AevumRhoConstruction]: "RHOC",
    [LocationName.Sector12AlphaEnterprises]: "APHE",
    [LocationName.VolhavenSysCoreSecurities]: "SYSC",
    [LocationName.VolhavenCompuTek]: "CTK",
    [LocationName.AevumNetLinkTechnologies]: "NTLK",
    [LocationName.IshimaOmegaSoftware]: "OMGA",
    [LocationName.Sector12FoodNStuff]: "FNS",

    // Stocks for other companies
    "Sigma Cosmetics": "SGC",
    "Joes Guns": "JGN",
    "Catalyst Ventures": "CTYS",
    "Microdyne Technologies": "MDYN",
    "Titan Laboratories": "TITN",
  };

  interface StockMarketSaveData {
    Orders: Record<
      string,
      {
        pos: PositionTypes;
        price: number;
        shares: number;
        stockSymbol: keyof typeof StockSymbols;
        type: OrderTypes;
      }[]
    >;
    lastUpdate: number;
    storedCycles: number;
    ticksUntilCycle: number;
  }

  /**
   * Enums from Bitburner
   */
  export enum CityName {
    Aevum = "Aevum",
    Chongqing = "Chongqing",
    Ishima = "Ishima",
    NewTokyo = "New Tokyo",
    Sector12 = "Sector-12",
    Volhaven = "Volhaven",
  }

  export enum Exploit {
    Bypass = "Bypass",
    PrototypeTampering = "PrototypeTampering",
    Unclickable = "Unclickable",
    UndocumentedFunctionCall = "UndocumentedFunctionCall",
    TimeCompression = "TimeCompression",
    RealityAlteration = "RealityAlteration",
    N00dles = "N00dles",
    // To the players reading this. Yes you're supposed to add EditSaveFile by
    // editing your save file, yes you could add them all, no we don't care
    // that's not the point.
    EditSaveFile = "EditSaveFile",
  }

  export enum OrderTypes {
    LimitBuy = "Limit Buy Order",
    LimitSell = "Limit Sell Order",
    StopBuy = "Stop Buy Order",
    StopSell = "Stop Sell Order",
  }

  export enum PositionTypes {
    Long = "L",
    Short = "S",
  }
}
