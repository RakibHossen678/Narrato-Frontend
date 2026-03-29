import { PropsWithChildren } from "react";

interface ModalProps extends PropsWithChildren {
  open: boolean;
  onClose: () => void;
  title: string;
}

export const Modal = ({ open, onClose, title, children }: ModalProps) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl border border-slate-700 bg-slate-950 p-5 light:border-slate-200 light:bg-white"
        onClick={(event) => event.stopPropagation()}
      >
        <h3 className="mb-4 text-lg font-semibold text-slate-100 light:text-slate-900">
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
};
