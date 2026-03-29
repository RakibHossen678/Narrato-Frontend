import { ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export const Button = ({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={cn(
      "rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-teal-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-50",
      "light:bg-white light:text-slate-900 light:border-slate-200",
      className,
    )}
    {...props}
  />
);
