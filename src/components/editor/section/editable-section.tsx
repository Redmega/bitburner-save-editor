import {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  PropsWithChildren,
  useCallback,
  useState,
} from "react";
import clsx from "clsx";

interface Props extends PropsWithChildren<{}> {
  formatter?: (...args: any) => string;
  label: string;
  onSubmit(key: string, value: any): void;
  property: string;
  type: string;
  value: string | number;
}

export default function EditableSection({ formatter, label, property, onSubmit, type, value: initialValue }: Props) {
  const [value, setValue] = useState(initialValue);
  const [editing, setEditing] = useState(false);

  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>((event) => {
    setValue(event.currentTarget.value);
  }, []);

  const onClose = useCallback<MouseEventHandler<HTMLDivElement> & FormEventHandler>(
    (event) => {
      let parsedValue: string | number = value;

      if (type === "number") {
        parsedValue = Math.min(Number.MAX_SAFE_INTEGER, Number(value));
      }

      onSubmit(property, parsedValue);
      setEditing(false);
      event.preventDefault();
    },
    [property, onSubmit, type, value]
  );

  return (
    <>
      <form
        className="w-64 rounded border border-gray-700 shadow shadow-green-700"
        data-id="editable-section"
        data-property={property}
        onSubmit={onClose}
      >
        <label
          className={clsx(
            "h-full w-full relative inline-flex flex-col p-2 rounded hover:bg-gray-800 transition-colors duration-200 ease-in-out focus-within:bg-gray-800",
            editing && "z-20"
          )}
          onClick={!editing ? () => setEditing(true) : undefined}
          title={formatter?.(value) ?? `${value}`}
        >
          <span className="text-xl font-bold text-gray-100 mb-1">{label}</span>
          {!editing && <span className="overflow-hidden overflow-ellipsis">{formatter?.(value) ?? `${value}`}</span>}
          {editing && (
            <input
              className="bg-transparent px-2 py-1 rounded border-gray-800 hover:bg-gray-900 focus:bg-gray-900 outline-none"
              value={value}
              type={type}
              onChange={onChange}
            />
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
}
