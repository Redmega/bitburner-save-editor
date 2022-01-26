import clsx from "clsx";
import { InputHTMLAttributes, PropsWithChildren } from "react";

interface Props extends PropsWithChildren<InputHTMLAttributes<HTMLInputElement>> {
  "data-key"?: string;
}

export function Input({ "data-key": dataKey, className, ...props }: Props) {
  return (
    <input
      className={clsx(
        "w-full bg-transparent px-2 py-1 rounded border-gray-800 hover:bg-gray-900 focus:bg-gray-900 outline-none disabled:opacity-50",
        className
      )}
      data-key={dataKey}
      {...props}
    />
  );
}
