import { Buffer } from "buffer";
import { Bitburner } from "../bitburner.types";
// import { Bitburner } from "../bitburner.types";

export class FileStore {
  _file: File;
  data: Bitburner.SaveData;
  emptyKeys: Set<Bitburner.SaveDataKey> = new Set();

  get file() {
    return this._file;
  }

  async uploadFile(file: File) {
    this._file = file;
    await this.processFile();
  }

  async processFile() {
    const buffer = Buffer.from(await this.file.text(), "base64");

    const rawData: Bitburner.RawSaveData = JSON.parse(buffer.toString());

    if (rawData.ctor !== "BitburnerSaveObject") {
      throw new Error("Invalid save file");
    }

    const saveFile: Partial<Bitburner.SaveData> = {
      ctor: Bitburner.Ctor.BitburnerSaveObject,
    };

    const data: Partial<Bitburner.SaveData["data"]> = {};

    console.log(rawData);

    Object.values(Bitburner.SaveDataKey).forEach((key) => {
      if (!rawData.data[key]) {
        this.emptyKeys.add(key);
        data[key] = null;
      } else {
        data[key] = JSON.parse(rawData.data[key]);
      }
    });

    console.log(data.CompaniesSave);
  }
}

export default new FileStore();
