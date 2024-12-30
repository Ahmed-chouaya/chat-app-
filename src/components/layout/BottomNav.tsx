import { Users, MessageCircle, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-white dark:bg-gray-800 dark:border-gray-700 lg:hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-around items-center h-16">
          <Link
            to="/contacts"
            className={`flex flex-col items-center space-y-1 px-4 ${location.pathname === "/contacts" ? "text-blue-600" : "text-gray-500"}`}
          >
            <Users className="h-6 w-6" />
            <span className="text-xs">Contacts</span>
          </Link>
          <Link
            to="/chat"
            className={`flex flex-col items-center space-y-1 px-4 ${location.pathname === "/chat" ? "text-blue-600" : "text-gray-500"}`}
          >
            <MessageCircle className="h-6 w-6" />
            <span className="text-xs">Chats</span>
          </Link>
          <Link
            to="/settings"
            className={`flex flex-col items-center space-y-1 px-4 ${location.pathname === "/settings" ? "text-blue-600" : "text-gray-500"}`}
          >
            <Settings className="h-6 w-6" />
            <span className="text-xs">More</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
