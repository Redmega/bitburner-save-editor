import { createContext, useContext } from "react";
import FileLoader from "components/file-loader";
import fileStore from "store/file.store";
import type { FileStore } from "store/file.store";

import { ReactComponent as DownloadIcon } from "icons/download.svg";
import { observer } from "mobx-react-lite";

export const FileContext = createContext<FileStore>(fileStore);

function App() {
  const fileStore = useContext(FileContext);

  return (
    <FileContext.Provider value={fileStore}>
      <div className="h-full w-full">
        <header>
          <h1 className="flex items-center text-4xl mb-4">
            Bitburner Save Editor
            {fileStore.ready && (
              <button
                className="ml-4 p-1 rounded bg-gray-800 hover:bg-gray-700"
                onClick={fileStore.downloadFile}
              >
                <DownloadIcon className="h-8 w-8" />
              </button>
            )}
          </h1>
          <FileLoader />
        </header>
      </div>{" "}
    </FileContext.Provider>
  );
}

export default observer(App);
