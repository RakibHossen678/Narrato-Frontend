import { PropsWithChildren } from "react";

export const Table = ({ children }: PropsWithChildren) => (
  <div className="overflow-auto rounded-2xl border border-slate-800 light:border-slate-200">
    <table className="min-w-full text-left text-sm">{children}</table>
  </div>
);
