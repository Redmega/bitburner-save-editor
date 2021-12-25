import { useCallback, useContext } from "react";
import { observer } from "mobx-react-lite";

import { Bitburner } from "bitburner.types";
import EditableSection from "./editable-section";
import StatSection from "./stat-section";
import { FileContext } from "App";
import { formatMoney } from "util/format";

export type PlayerDataKey = keyof Bitburner.PlayerSaveObject["data"];

export default observer(function PlayerSection() {
  const { player } = useContext(FileContext);

  const onSubmit = useCallback(
    (key: PlayerDataKey, value: any) => {
      player.updatePlayer({
        [key]: value,
      });
    },
    [player]
  );

  return (
    <div className="flex flex-wrap gap-4">
      <EditableSection
        type="number"
        label="Money"
        property="money"
        value={player.data.money}
        formatter={formatMoney}
        onSubmit={onSubmit}
      />
      {Bitburner.PLAYER_STATS.map((stat) => (
        <StatSection
          // @ts-ignore
          key={stat}
          property={stat}
          onSubmit={onSubmit}
        />
      ))}
    </div>
  );
});