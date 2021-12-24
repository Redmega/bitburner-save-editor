import {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { observer } from "mobx-react-lite";
import clsx from "clsx";
import { pick } from "ramda";

import { FileContext } from "App";
import { Bitburner } from "bitburner.types";
import { Checkbox } from "components/inputs/checkbox";
import { Input } from "components/inputs/input";

export type FactionDataKey = keyof Bitburner.FactionsSaveObject["data"];

export default observer(function FactionSection() {
  const { factions } = useContext(FileContext);

  const onSubmit = useCallback(
    (faction: string, updates: Partial<Bitburner.FactionsSaveObject["data"]>) => {
      factions.updateFaction(faction, updates);
    },
    [factions]
  );

  // @TODO: Add sorting
  return (
    <div className="grid grid-cols-6 grid-flow-row gap-4">
      {factions.data.map(([faction, factionData]) => (
        <Faction key={faction} id={faction} faction={factionData} onSubmit={onSubmit} />
      ))}
    </div>
  );
});

interface FactionProps extends PropsWithChildren<{}> {
  id: string;
  faction: Bitburner.FactionsSaveObject;
  onSubmit(key: string, value: Partial<Bitburner.FactionsSaveObject["data"]>): void;
}

const Faction = function Faction({ id, faction, onSubmit }: FactionProps) {
  const [editing, setEditing] = useState(false);
  const [state, setState] = useState(Object.assign({}, faction.data));

  const onClickEnter = useCallback<MouseEventHandler<HTMLDivElement>>(
    (event) => {
      setEditing(true);
      // So clicking into the box does not trigger checkboxes.
      if ((event.target as HTMLElement).tagName === "svg") event.preventDefault();
      console.log(state.augmentations);
    },
    [state.augmentations]
  );

  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>((event) => {
    const { checked, dataset, type, value } = event.currentTarget;
    setState((s) => ({ ...s, [dataset.key]: type === "checkbox" ? checked : value }));
  }, []);

  const onClose = useCallback<FormEventHandler>(
    (event) => {
      // Process rep and favor
      const playerReputation = Math.min(Number.MAX_SAFE_INTEGER, Number(state.playerReputation));
      const favor = Math.min(Number.MAX_SAFE_INTEGER, Number(state.favor));

      onSubmit(id, {
        ...pick(["alreadyInvited", "isMember", "isBanned"]),
        playerReputation,
        favor,
      });

      setEditing(false);
      event.preventDefault();
    },
    [id, state, onSubmit]
  );

  // @TODO: Display Augmentations
  return (
    <>
      <div
        className={clsx(
          "transition-colors duration-200 ease-in-out relative inline-flex flex-col p-2 rounded border shadow shadow-green-700 border-gray-700 hover:bg-gray-800  focus-within:bg-gray-800 row-span-2",
          editing && "z-20"
        )}
        onClick={!editing ? onClickEnter : undefined}
      >
        <form className="grid grid-cols-3 gap-1" data-id="editable-section" onSubmit={onClose}>
          <header className="col-span-2 flex items-baseline justify-between">
            <h3 className="text-lg tracking-wide text-green-100">{faction.data.name}</h3>
          </header>
          <label className="ml-auto inline-flex items-start text-slate-100">
            <span className="mr-2 text-sm">Invited: </span>
            <Checkbox
              checked={state.alreadyInvited}
              disabled={!editing}
              onChange={onChange}
              data-key="alreadyInvited"
            />
          </label>
          <label className="col-span-2 flex items-center">
            <span>Reputation: </span>
            <Input
              disabled={!editing}
              onChange={onChange}
              value={`${state.playerReputation}`}
              type="number"
              data-key="playerReputation"
            />
          </label>
          <label className="ml-auto inline-flex items-center text-slate-100">
            <span className="mr-2 text-sm">Joined: </span>
            <Checkbox checked={state.isMember} disabled={!editing} onChange={onChange} data-key="isMember" />
          </label>
          <label className="col-span-2 flex items-center">
            <span>Favor: </span>
            <Input disabled={!editing} onChange={onChange} value={`${state.favor}`} type="number" data-key="favor" />
          </label>
          <label className="ml-auto inline-flex items-center text-slate-100">
            <span className="mr-2 text-sm">Banned: </span>
            <Checkbox checked={state.isBanned} disabled={!editing} onChange={onChange} data-key="isBanned" />
          </label>
        </form>
      </div>
      <div
        className={clsx(
          "z-10 absolute inset-0 bg-gray-900  transition-opacity duration-200 ease-in-out",
          editing ? "opacity-50" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
    </>
  );
};
