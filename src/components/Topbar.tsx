import { Bell, Search } from "lucide-react";

function Topbar() {
  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
      
      {/* Search */}
      <div className="flex items-center gap-3 w-full max-w-md bg-gray-50 rounded-lg px-4 py-2.5">
        <Search size={20} className="text-gray-400 shrink-0" />

        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none w-full text-sm text-gray-700"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4 sm:gap-6 shrink-0">
        
        {/* Notification */}
        <button
          className="relative text-gray-500 hover:text-blue-600 transition"
          aria-label="Notifications"
        >
          <Bell size={22} />

          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </button>

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <span className="text-blue-600 font-semibold">
              Y
            </span>
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-800">
              Yusuf
            </p>

            <p className="text-xs text-gray-500">
              Administrator
            </p>
          </div>
        </div>

      </div>
    </header>
  );
}

export default Topbar;