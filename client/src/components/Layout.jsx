import { Outlet } from "react-router-dom";
import { SidebarComponent } from "./sidebar";

export default function Layout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <SidebarComponent />
      <Outlet />
    </div>
  );
}
