import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Contact {
  id: string;
  name: string;
  status: string;
  online: boolean;
}

const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Alice Smith",
    status: "Available",
    online: true,
  },
  {
    id: "2",
    name: "Bob Johnson",
    status: "In a meeting",
    online: false,
  },
  {
    id: "3",
    name: "Carol Williams",
    status: "Away",
    online: false,
  },
  {
    id: "4",
    name: "David Brown",
    status: "Available",
    online: true,
  },
];

const ContactsLayout = () => {
  return (
    <div className="h-[calc(100vh-4rem)] lg:h-[calc(100vh-0px)] flex flex-col bg-gray-50">
      <div className="sticky top-0 bg-white border-b p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">Contacts</h1>
          <Button variant="ghost" size="icon">
            <Plus className="h-5 w-5" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input className="pl-10" placeholder="Search" type="search" />
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {mockContacts.map((contact) => (
          <div
            key={contact.id}
            className="flex items-center space-x-4 p-4 border-b bg-white"
          >
            <div className="relative">
              <Avatar>
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.id}`}
                />
                <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {contact.online && (
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{contact.name}</h3>
              <p className="text-sm text-gray-500">{contact.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactsLayout;
