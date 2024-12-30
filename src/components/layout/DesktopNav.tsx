import { Users, MessageCircle, Settings, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const navItems = [
  { icon: MessageCircle, label: "Chats", path: "/chat" },
  { icon: Users, label: "Contacts", path: "/contacts" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const DesktopNav = () => {
  const location = useLocation();

  return (
    <div className="hidden lg:flex flex-col h-screen w-20 border-r dark:border-gray-700 bg-white dark:bg-gray-800 fixed left-0 top-0">
      <div className="flex flex-col items-center flex-1 p-4">
        <div className="mb-8">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>

        <nav className="space-y-4 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
                  : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700/50"
              }`}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="mt-auto text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg p-3"
        >
          <div className="flex flex-col items-center">
            <LogOut className="h-6 w-6" />
            <span className="text-xs mt-1">Logout</span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default DesktopNav;
