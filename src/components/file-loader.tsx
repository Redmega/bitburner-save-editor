import { ChangeEventHandler, useCallback, useContext } from "react";
import { FileContext } from "../App";

export default function FileLoader() {
  const fileContext = useContext(FileContext);

  const onSelectFile = useCallback<ChangeEventHandler<HTMLInputElement>>(
    async (event) => {
      const { files } = event.currentTarget;
      await fileContext.uploadFile(files[0]);
    },
    [fileContext]
  );

  return (
    <input type="file" accept="application/json" onChange={onSelectFile} />
  );
}
