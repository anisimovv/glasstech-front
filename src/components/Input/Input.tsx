import { InputHTMLAttributes } from "react";

interface ShowerElementInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  width: number | string;
}

export const Input = ({ width, ...props }: ShowerElementInputProps) => {
  return (
    <input
      className="border border-slate-300 h-10 rounded-lg px-4 text-right text-slate-900"
      style={{ width: width || "100%" }}
      {...props}
    />
  );
};
