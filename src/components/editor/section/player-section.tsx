import { useCallback, useContext } from "react";
import { observer } from "mobx-react-lite";

import { Bitburner } from "bitburner.types";
import EditableSection from "./editable-section";
import { FileContext } from "App";
import { formatMoney } from "util/format";

export type PlayerDataKey = keyof Bitburner.PlayerSaveObject["data"];

export default observer(function PlayerSection() {
  const { player } = useContext(FileContext);

  const onChange = useCallback(
    (key: PlayerDataKey, value: any) => {
      player.updatePlayer({
        [key]: value,
      });
    },
    [player]
  );

  return (
    <div>
      <EditableSection
        type="number"
        label="Money"
        property="money"
        value={player.data.money}
        formatter={formatMoney}
        onChange={onChange}
      />
    </div>
  );
});
