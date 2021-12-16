import { createContext } from "react";
import FileLoader from "./components/file-loader";
import fileStore, { type FileStore } from "./store/file.store";

export const FileContext = createContext<FileStore>(undefined);

function App() {
  return (
    <FileContext.Provider value={fileStore}>
      <div className="h-full w-full">
        <header>
          <h1 className="text-4xl mb-4">Bitburner Save Editor</h1>
          <FileLoader />
        </header>
      </div>
    </FileContext.Provider>
  );
}

export default App;
