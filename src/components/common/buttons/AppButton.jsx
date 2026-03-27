const classesByVariant = {
  solid:
    "bg-teal-700 text-white hover:bg-teal-800 active:translate-y-[1px] shadow-sm hover:shadow-md",
  ghost:
    "bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 active:translate-y-[1px]",
  danger:
    "bg-rose-700 text-white hover:bg-rose-800 active:translate-y-[1px] shadow-sm hover:shadow-md",
};

const AppButton = ({
  children,
  variant = "solid",
  isLoading = false,
  className = "",
  disabled,
  ...rest
}) => {
  return (
    <button
      className={`focus-ring inline-flex min-h-10 items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${classesByVariant[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? "Please wait..." : children}
    </button>
  );
};

export default AppButton;
