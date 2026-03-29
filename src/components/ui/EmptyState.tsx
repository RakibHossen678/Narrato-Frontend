interface EmptyStateProps {
  title: string;
  message: string;
}

export const EmptyState = ({ title, message }: EmptyStateProps) => (
  <div className="rounded-2xl border border-dashed border-slate-700 p-8 text-center light:border-slate-300">
    <h3 className="text-lg font-semibold text-slate-100 light:text-slate-900">
      {title}
    </h3>
    <p className="mt-2 text-sm text-slate-400 light:text-slate-600">
      {message}
    </p>
  </div>
);
