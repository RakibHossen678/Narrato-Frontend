import { useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const initials = useMemo(() => {
    const raw = user?.userName || user?.email || "NA";
    return raw.slice(0, 2).toUpperCase();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#26324a] bg-[#0b1220]/88 backdrop-blur">
      <div className="narrato-shell flex h-16 items-center justify-between gap-4 py-0">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-teal-500 font-black text-[#032722] shadow-[0_6px_18px_rgba(20,184,166,0.35)]">
            N
          </span>
          <span className="text-lg font-black tracking-tight text-slate-100">
            Narrato
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-[#173756] text-cyan-100"
                    : "text-slate-300 hover:bg-[#14243c]"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="rounded-md bg-teal-500 px-3 py-2 text-sm font-semibold text-[#032722] hover:bg-teal-400"
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md border border-[#334866] px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-[#14243c]"
              >
                Logout
              </button>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#172842] text-xs font-bold text-cyan-100">
                {initials}
              </span>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-md border border-[#334866] px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-[#14243c]"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="rounded-md bg-teal-500 px-3 py-2 text-sm font-semibold text-[#032722] hover:bg-teal-400"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="rounded-md border border-[#334866] px-3 py-2 text-sm font-semibold text-slate-200 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          Menu
        </button>
      </div>

      {open && (
        <div className="border-t border-[#26324a] bg-[#0f1a2e] md:hidden">
          <div className="narrato-shell space-y-2 py-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-[#173756] text-cyan-100"
                      : "text-slate-200 hover:bg-[#14243c]"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className="block rounded-md bg-teal-500 px-3 py-2 text-sm font-semibold text-[#032722]"
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={async () => {
                    await handleLogout();
                    setOpen(false);
                  }}
                  className="w-full rounded-md border border-[#334866] px-3 py-2 text-left text-sm font-semibold text-slate-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-md border border-[#334866] px-3 py-2 text-center text-sm font-semibold text-slate-100"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="rounded-md bg-teal-500 px-3 py-2 text-center text-sm font-semibold text-[#032722]"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
