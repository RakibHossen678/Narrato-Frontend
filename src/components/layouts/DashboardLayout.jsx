import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr] bg-[#070e1c]">
      <Sidebar />
      <main className="min-h-screen">
        <header className="sticky top-0 z-10 flex h-14 items-center border-b border-[#26324a] bg-[#0c1425]/92 px-4 backdrop-blur">
          <h1 className="text-lg font-semibold tracking-tight text-slate-100">
            Dashboard
          </h1>
        </header>
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
export default DashboardLayout;
