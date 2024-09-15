import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/use-auth";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  LogOut,
  Moon,
  Search,
  Sun,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./ui/logo";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Search", href: "/search", icon: Search },
  { name: "Suggested Friends", href: "/friends", icon: Users },
];

export function SidebarComponent() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const pathname = window.location.pathname;
  const { theme, setTheme } = useTheme();
  const { logout } = useAuth();
  return (
    <div
      className={cn(
        "flex flex-col border-r bg-background h-full",
        isCollapsed ? "w-16" : "w-64",
        "transition-all duration-300 ease-in-out"
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && (
          <div className="text-2xl font-semibold flex gap-3">
            <Logo />
            <div>
              <span className="text-rose-500">Lamp</span>Stack
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-2 p-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                pathname === item.href
                  ? "bg-secondary text-secondary-foreground"
                  : "hover:bg-secondary/50",
                isCollapsed && "justify-center"
              )}
            >
              <item.icon size={20} />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <div>
        <Button
          variant="ghost"
          onClick={logout}
          aria-label="Toggle theme"
          className="w-full flex  justify-start items-center gap-2 p-4"
        >
          <LogOut size={20} />
          {!isCollapsed && <span> Logout</span>}
        </Button>
        <Button
          variant="ghost"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          aria-label="Toggle theme"
          className="w-full flex  justify-start items-center gap-2 p-4"
        >
          {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
          {!isCollapsed && (
            <span>Switch to {theme === "light" ? "Dark" : "Light"} Mode</span>
          )}
        </Button>
      </div>
      <div className="p-4">
        {!isCollapsed && (
          <p className="text-xs text-muted-foreground">© 2024 LampStack</p>
        )}
      </div>
    </div>
  );
}
