import React, { ChangeEventHandler, PropsWithChildren } from "react";

interface Props extends PropsWithChildren<{}> {
  "data-key": string;
  disabled?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type: React.HTMLInputTypeAttribute;
  value?: string;
}

export function Input({ "data-key": dataKey, disabled, onChange, type, value }: Props) {
  return (
    <input
      className="w-full bg-transparent px-2 py-1 rounded border-gray-800 hover:bg-gray-900 focus:bg-gray-900 outline-none disabled:opacity-50"
      data-key={dataKey}
      disabled={disabled}
      value={value}
      type={type}
      onChange={onChange}
    />
  );
}
