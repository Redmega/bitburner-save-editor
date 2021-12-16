export namespace Bitburner {
  export enum SaveDataKey {
    PlayerSave = "PlayerSave",
    AllServersSave = "AllServersSave",
    CompaniesSave = "CompaniesSave",
    FactionsSave = "FactionsSave",
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
    Script = "Script",
    Server = "Server",
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
      [key: string]: unknown;
      [SaveDataKey.AliasesSave]: Record<string, string>;
      [SaveDataKey.AllGangsSave]: unknown;
      [SaveDataKey.AllServersSave]: Record<string, ServerSaveObject>;
      [SaveDataKey.CompaniesSave]: Record<string, CompanySaveObject>;
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
      runningScripts: unknown[];
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
      data: unknown;
      fn: string;
      reward: { name: string; type: number };
      tries: number;
      type: "string";
    };
  }

  interface CompanySaveObject extends SaveObject<Ctor.Company> {
    data: {
      companyPositions: Record<string, boolean>;
      expMultiplier: 1.7;
      // @TODO
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
}
