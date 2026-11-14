import {
  LayoutDashboard,
  CalendarDays,
  Users,
  ClipboardCheck,
  Wallet,
  Store,
  Settings,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    name: "Events",
    icon: CalendarDays,
    path: "/events",
  },
  {
    name: "Members",
    icon: Users,
    path: "/members",
  },
  {
    name: "Tasks",
    icon: ClipboardCheck,
    path: "/tasks",
  },
  {
    name: "Finance",
    icon: Wallet,
    path: "/finance",
  },
  {
    name: "Vendors",
    icon: Store,
    path: "/vendors",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col">

      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-blue-600">
          KamatiHub
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">

        <p className="text-xs font-semibold text-gray-400 uppercase mb-4 px-3">
          Main Menu
        </p>

        <div className="space-y-2">

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.name}
                type="button"
                onClick={() => navigate(item.path)}
                className={`
                  w-full
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-lg
                  transition
                  text-left
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  }
                `}
              >
                <Icon size={20} />

                <span className="font-medium">
                  {item.name}
                </span>
              </button>
            );
          })}

        </div>

      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-gray-200">

        <div className="bg-blue-50 rounded-lg p-4">

          <p className="text-sm font-semibold text-blue-700">
            KamatiHub
          </p>

          <p className="text-xs text-gray-500 mt-1">
            Event Management Platform
          </p>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;