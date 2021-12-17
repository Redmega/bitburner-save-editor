import { createContext, useContext } from "react";
import { observer } from "mobx-react-lite";

import FileLoader from "components/file-loader";
import Editor from "components/editor";
import fileStore from "store/file.store";
import type { FileStore } from "store/file.store";

import { ReactComponent as DownloadIcon } from "icons/download.svg";

export const FileContext = createContext<FileStore>(fileStore);

function App() {
  const fileStore = useContext(FileContext);

  return (
    <FileContext.Provider value={fileStore}>
      <div className="flex flex-col h-full w-full">
        <header>
          <h1 className="flex items-center text-4xl mb-4">
            Bitburner Save Editor
            {fileStore.ready && (
              <button
                className="ml-4 p-2 rounded bg-gray-800 hover:bg-gray-700"
                onClick={fileStore.downloadFile}
              >
                <DownloadIcon className="h-8 w-8" />
              </button>
            )}
          </h1>
          <FileLoader />
        </header>
        <Editor />
      </div>
    </FileContext.Provider>
  );
}

export default observer(App);
