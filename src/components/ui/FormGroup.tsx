import { PropsWithChildren } from "react";

interface FormGroupProps extends PropsWithChildren {
  label: string;
}

export const FormGroup = ({ label, children }: FormGroupProps) => (
  <label className="flex flex-col gap-2 text-sm text-slate-300 light:text-slate-700">
    <span className="font-medium">{label}</span>
    {children}
  </label>
);
