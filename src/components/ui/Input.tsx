import { InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export const Input = ({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={cn(
      "w-full rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-teal-400 focus:outline-none",
      "light:bg-white light:text-slate-900 light:border-slate-200",
      className,
    )}
    {...props}
  />
);
