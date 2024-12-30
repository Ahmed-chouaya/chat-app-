import {
  User,
  Bell,
  Shield,
  HelpCircle,
  UserPlus,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const menuItems = [
  { icon: User, label: "Account", path: "/settings/account" },
  { icon: Bell, label: "Notifications", path: "/settings/notifications" },
  { icon: Shield, label: "Privacy", path: "/settings/privacy" },
  { icon: HelpCircle, label: "Help", path: "/settings/help" },
  { icon: UserPlus, label: "Invite Your Friends", path: "/settings/invite" },
];

const SettingsLayout = () => {
  return (
    <div className="h-[calc(100vh-4rem)] lg:h-[calc(100vh-0px)] flex flex-col bg-gray-50 overflow-auto">
      <div className="sticky top-0 bg-white border-b p-4">
        <h1 className="text-lg font-semibold">More</h1>
      </div>

      <div className="bg-white p-4 mb-2">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-xl font-semibold">John Doe</h2>
            <p className="text-sm text-gray-500">+1 234 567 8900</p>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center justify-between p-4 border-b"
          >
            <div className="flex items-center space-x-3">
              <item.icon className="h-5 w-5 text-gray-500" />
              <span>{item.label}</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SettingsLayout;
