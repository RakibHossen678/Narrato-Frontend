import { motion as Motion } from "framer-motion";

const classesByVariant = {
  solid:
    "bg-teal-500 text-slate-950 hover:bg-teal-400 active:translate-y-[1px] shadow-sm hover:shadow-md",
  ghost:
    "bg-[#16253f] border border-[#2d3f62] text-slate-100 hover:bg-[#1c3050] active:translate-y-[1px]",
  danger:
    "bg-rose-600 text-white hover:bg-rose-500 active:translate-y-[1px] shadow-sm hover:shadow-md",
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
    <Motion.button
      className={`focus-ring inline-flex min-h-10 items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${classesByVariant[variant]} ${className}`}
      disabled={disabled || isLoading}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      {...rest}
    >
      {isLoading ? "Please wait..." : children}
    </Motion.button>
  );
};

export default AppButton;
