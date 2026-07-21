import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";

function MainLayout() {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;

