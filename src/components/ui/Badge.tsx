import { PropsWithChildren } from "react";

export const Badge = ({ children }: PropsWithChildren) => (
  <span className="inline-flex rounded-full border border-teal-500/40 bg-teal-500/10 px-2.5 py-0.5 text-xs text-teal-300 light:text-teal-700">
    {children}
  </span>
);
