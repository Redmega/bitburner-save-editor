import { ChangeEventHandler, useCallback, useContext } from "react";
import { FileContext } from "../App";

import { ReactComponent as UploadIcon } from "icons/upload.svg";
import { observer } from "mobx-react-lite";

export default observer(function FileLoader() {
  const fileContext = useContext(FileContext);

  const onSelectFile = useCallback<ChangeEventHandler<HTMLInputElement>>(
    async (event) => {
      const { files } = event.currentTarget;
      await fileContext.uploadFile(files[0]);
    },
    [fileContext]
  );

  return (
    <label className="inline-flex items-center rounded py-2 px-8 bg-gray-800 cursor-pointer">
      <UploadIcon className="h-8 w-8 mr-4" />
      {fileContext.file?.name ?? "Choose File"}
      <input className="hidden" type="file" accept="application/json" onChange={onSelectFile} />
    </label>
  );
});
