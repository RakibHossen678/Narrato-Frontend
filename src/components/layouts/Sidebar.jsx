import { NavLink } from "react-router";
import { sections, sectionsForUser } from "../../constants/routes";

const LinkBase = ({ to, children, isActive }) => (
  <NavLink
    to={to}
    className={({ isActive: active }) =>
      `group flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
        (active ?? isActive)
          ? "bg-[#173756] text-cyan-100"
          : "text-slate-300 hover:bg-[#152640]"
      }`
    }
  >
    <span
      className={`inline-block w-1.5 h-1.5 rounded-full ${
        isActive ? "bg-cyan-300" : "bg-transparent group-hover:bg-slate-400"
      }`}
    />
    <span>{children}</span>
  </NavLink>
);

const SidebarSection = ({ title, items }) => (
  <div className="mb-6">
    <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
      {title}
    </p>
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item.path}>
          <LinkBase to={item.path}>{item.label}</LinkBase>
          {item.hasDropdown && item.dropdownItems?.length ? (
            <ul className="ml-5 mt-1 space-y-1 border-l border-gray-200 pl-3">
              {item.dropdownItems.map((dd) => (
                <li key={dd.path}>
                  <NavLink
                    to={dd.path}
                    className={({ isActive }) =>
                      `block px-3 py-1 rounded-md text-sm transition-colors ${
                        isActive
                          ? "bg-[#173756] text-cyan-100"
                          : "text-slate-300 hover:bg-[#152640]"
                      }`
                    }
                  >
                    {dd.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ul>
  </div>
);

const Sidebar = ({ role = "admin" }) => {
  const data = role === "user" ? sectionsForUser : sections;
  return (
    <aside className="sticky top-0 h-screen overflow-y-auto border-r border-[#26324a] bg-[#0c1425]/94 backdrop-blur">
      <div className="flex h-14 items-center border-b border-[#26324a] px-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded bg-teal-500" />
          <span className="font-semibold text-slate-100">Narrato Admin</span>
        </div>
      </div>
      <nav className="p-3">
        {data.map((sec) => (
          <SidebarSection key={sec.title} title={sec.title} items={sec.items} />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
