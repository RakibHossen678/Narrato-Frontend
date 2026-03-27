const classesByVariant = {
  solid: "bg-[#0f172a] text-white hover:bg-black",
  ghost:
    "bg-transparent border border-[#0f172a] text-[#0f172a] hover:bg-[#f1f5f9]",
  danger: "bg-[#b91c1c] text-white hover:bg-[#991b1b]",
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
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${classesByVariant[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? "Please wait..." : children}
    </button>
  );
};

export default AppButton;
