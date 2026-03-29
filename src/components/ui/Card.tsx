import { PropsWithChildren } from "react";
import { cn } from "../../utils/cn";

interface CardProps extends PropsWithChildren {
  className?: string;
}

export const Card = ({ children, className }: CardProps) => (
  <article
    className={cn(
      "rounded-2xl border border-slate-800 bg-slate-900/60 p-4 light:border-slate-200 light:bg-white",
      className,
    )}
  >
    {children}
  </article>
);
