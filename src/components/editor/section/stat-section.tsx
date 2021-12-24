import {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { FileContext } from "App";
import { calculateExp } from "util/game";
import { Bitburner } from "bitburner.types";

interface Props extends PropsWithChildren<{}> {
  property: Bitburner.PlayerStat;
  onSubmit(key: string, value: any): void;
}

export default observer(function StatSection({ property, onSubmit }: Props) {
  const { player } = useContext(FileContext);
  const [value, setValue] = useState(`${player.data[property]}`);

  const [editing, setEditing] = useState(false);

  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>((event) => {
    setValue(event.currentTarget.value);
  }, []);

  const onClose = useCallback<MouseEventHandler<HTMLDivElement> & FormEventHandler>(
    (event) => {
      const desiredLevel = Math.min(Number.MAX_SAFE_INTEGER, Number(value));
      let mult = property === "intelligence" ? 1 : player.data[`${property}_exp_mult`];

      // @TODO: Handle augmentations

      onSubmit(`${property}_exp`, calculateExp(desiredLevel, mult));
      onSubmit(`${property}`, desiredLevel);
      setEditing(false);
      event.preventDefault();
    },
    [property, onSubmit, value, player.data]
  );

  return (
    <>
      <form
        className="w-64 rounded border border-gray-700 shadow shadow-green-700"
        data-id="stat-section"
        data-property={property}
        onSubmit={onClose}
      >
        <label
          className={clsx(
            "h-full w-full relative inline-flex flex-col p-2 rounded hover:bg-gray-800 transition-colors duration-200 ease-in-out focus-within:bg-gray-800",
            editing && "z-20"
          )}
          onClick={!editing ? () => setEditing(true) : undefined}
        >
          <span className="text-xl font-bold text-gray-100 mb-1 capitalize">{property}</span>
          {!editing && <span className="overflow-hidden overflow-ellipsis">{player.data[property]}</span>}
          {editing && (
            <>
              <div>
                <span>Level: </span>
                <input
                  className="bg-transparent px-2 py-1 rounded border-gray-800 hover:bg-gray-900 focus:bg-gray-900 outline-none"
                  value={value}
                  type="number"
                  onChange={onChange}
                />
              </div>
              <small className="mt-1 text-xs italic text-slate-500 px-2">
                Level calculation does not factor augmentations, so actual in-game levels may vary
              </small>
            </>
          )}
        </label>
      </form>
      <div
        className={clsx(
          "z-10 absolute inset-0 bg-gray-900  transition-opacity duration-200 ease-in-out",
          editing ? "opacity-50" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
    </>
  );
});
