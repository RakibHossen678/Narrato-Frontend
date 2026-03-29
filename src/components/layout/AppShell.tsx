import { PropsWithChildren } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuthStore } from "../../stores/auth.store";
import { useThemeStore } from "../../stores/theme.store";
import { Button } from "../ui/Button";

export const AppShell = ({ children }: PropsWithChildren) => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const mode = useThemeStore((state) => state.mode);
  const toggleMode = useThemeStore((state) => state.toggleMode);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 light:bg-slate-50 light:text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur light:border-slate-200 light:bg-white/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
          <Link
            to="/"
            className="text-xl font-black tracking-tight text-teal-300 light:text-teal-700"
          >
            Narrato
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <NavLink to="/" className="hover:text-teal-300">
              Feed
            </NavLink>
            {user ? <NavLink to="/editor">Write</NavLink> : null}
            {user ? <NavLink to="/profile">Profile</NavLink> : null}
            {user?.role === "admin" ? (
              <NavLink to="/admin">Admin</NavLink>
            ) : null}
          </nav>
          <div className="flex items-center gap-2">
            <Button type="button" onClick={toggleMode}>
              {mode === "dark" ? "Light" : "Dark"}
            </Button>
            {user ? (
              <Button type="button" onClick={logout}>
                Logout
              </Button>
            ) : (
              <Link
                to="/login"
                className="rounded-xl border border-slate-700 px-3 py-2 text-sm"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl p-4 md:p-6">{children}</main>
    </div>
  );
};
