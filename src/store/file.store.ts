import { Buffer } from "buffer";
import { Bitburner } from "bitburner.types";
import { makeAutoObservable } from "mobx";

export class FileStore {
  _file: File;
  save: Bitburner.SaveData;

  constructor() {
    makeAutoObservable(this);

    // @ts-ignore
    window.store = this;
  }

  get file() {
    return this._file;
  }

  get ready() {
    return !!this.save;
  }

  get player() {
    return {
      data: this.save.data.PlayerSave.data,
      updatePlayer: this.updatePlayer,
    };
  }

  updatePlayer = (updates: Partial<Bitburner.PlayerSaveObject["data"]>) => {
    Object.assign(this.save.data.PlayerSave.data, updates);
  };

  get factions() {
    return {
      data: Object.entries(this.save.data.FactionsSave).sort(
        (a, b) => b[1].data.playerReputation - a[1].data.playerReputation
      ),
      updateFaction: this.updateFaction,
    };
  }

  updateFaction = (faction: string, updates: Partial<Bitburner.FactionsSaveObject["data"]>) => {
    Object.assign(this.save.data.FactionsSave[faction].data, updates);

    if (updates.isMember) {
      this.updatePlayer({ factions: Array.from(new Set(this.player.data.factions.concat(faction))) });
    } else {
      this.updatePlayer({ factions: this.player.data.factions.filter((f) => f !== faction) });
    }
    if (updates.alreadyInvited && !updates.isMember) {
      this.updatePlayer({
        factionInvitations: Array.from(new Set(this.player.data.factionInvitations.concat(faction))),
      });
    } else {
      this.updatePlayer({ factionInvitations: this.player.data.factionInvitations.filter((f) => f !== faction) });
    }
  };

  clearFile = () => {
    this._file = undefined;
    this.save = undefined;
  };

  uploadFile = async (file: File) => {
    this.clearFile();
    this._file = file;
    await this.processFile();
  };

  processFile = async () => {
    const buffer = Buffer.from(await this.file.text(), "base64");

    const rawData: Bitburner.RawSaveData = JSON.parse(buffer.toString());

    if (rawData.ctor !== "BitburnerSaveObject") {
      throw new Error("Invalid save file");
    }

    const data: any = {};

    for (const key of Object.values(Bitburner.SaveDataKey)) {
      if (!rawData.data[key]) {
        data[key] = null;
      } else {
        data[key] = JSON.parse(rawData.data[key]);
      }
    }

    this.setSaveData({
      ctor: Bitburner.Ctor.BitburnerSaveObject,
      data,
    });

    if (!this.save.data.PlayerSave.data.exploits.includes(Bitburner.Exploit.EditSaveFile)) {
      console.info("Applying EditSaveFile exploit!");
      this.save.data.PlayerSave.data.exploits.push(Bitburner.Exploit.EditSaveFile);
    }

    console.info("File processed...");
  };

  downloadFile = () => {
    const rawData: Partial<Bitburner.RawSaveData> = {
      ctor: Bitburner.Ctor.BitburnerSaveObject,
    };

    const data: any = {};

    Object.values(Bitburner.SaveDataKey).forEach((key) => {
      // Each key's value needs to be stringified independently
      if (this.save.data[key] === null) {
        data[key] = "";
      } else {
        data[key] = JSON.stringify(this.save.data[key]);
      }
    });

    rawData.data = data;

    const encodedData = Buffer.from(JSON.stringify(rawData)).toString("base64");

    const blobUrl = window.URL.createObjectURL(new Blob([encodedData], { type: "base64" }));

    // Trick to start a download
    const downloadLink = document.createElement("a");
    downloadLink.style.display = "none";
    downloadLink.href = blobUrl;
    const match = this.file.name.match(/bitburnerSave_(?<ts>\d+)_(?<bn>BN.+?)(?:-H4CKeD)*?.json/);

    downloadLink.download = `bitburnerSave_${
      Math.floor(Date.now() / 1000) // Seconds, not milliseconds
    }_${match.groups.bn ?? "BN1x0"}-H4CKeD.json`;

    document.body.appendChild(downloadLink);
    downloadLink.click();

    downloadLink.remove();

    window.URL.revokeObjectURL(blobUrl);

    return encodedData;
  };

  setSaveData = (save: typeof this.save) => {
    this.save = save;
  };
}

export default new FileStore();
