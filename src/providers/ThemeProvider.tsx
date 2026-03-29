import { PropsWithChildren, useEffect } from "react";
import { useThemeStore } from "../stores/theme.store";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const mode = useThemeStore((state) => state.mode);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", mode === "dark");
    root.classList.toggle("light", mode === "light");
  }, [mode]);

  return children;
};
