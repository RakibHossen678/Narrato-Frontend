const commonClassName =
  "w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500";

const FormField = (props) => {
  const { label, error } = props;

  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </span>
      {props.as === "textarea" ? (
        <textarea
          {...props}
          className={`${commonClassName} min-h-32 ${props.className || ""}`}
        />
      ) : (
        <input
          {...props}
          className={`${commonClassName} ${props.className || ""}`}
        />
      )}
      {error ? (
        <span className="mt-1 block text-xs text-red-600">{error}</span>
      ) : null}
    </label>
  );
};

export default FormField;
