import { PropsWithChildren, useState } from "react";

interface DropdownMenuProps extends PropsWithChildren {
  trigger: React.ReactNode;
}

export const DropdownMenu = ({ trigger, children }: DropdownMenuProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button type="button" onClick={() => setOpen((state) => !state)}>
        {trigger}
      </button>
      {open ? (
        <div className="absolute right-0 z-20 mt-2 min-w-40 rounded-xl border border-slate-700 bg-slate-950 p-2 light:border-slate-200 light:bg-white">
          {children}
        </div>
      ) : null}
    </div>
  );
};
