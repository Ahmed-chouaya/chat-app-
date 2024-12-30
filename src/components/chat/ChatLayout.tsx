import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Plus, Send, Mic, ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
  isSent: boolean;
}

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar?: string;
  messages: Message[];
}

const mockChats: Chat[] = [
  {
    id: "1",
    name: "Alice Smith",
    lastMessage: "See you tomorrow!",
    time: "12:30 PM",
    unread: 2,
    messages: [
      {
        id: "1",
        text: "Hi there!",
        sender: "Alice Smith",
        timestamp: "12:00 PM",
        isSent: false,
      },
      {
        id: "2",
        text: "Hello Alice!",
        sender: "me",
        timestamp: "12:15 PM",
        isSent: true,
      },
      {
        id: "3",
        text: "See you tomorrow!",
        sender: "Alice Smith",
        timestamp: "12:30 PM",
        isSent: false,
      },
    ],
  },
  {
    id: "2",
    name: "Bob Johnson",
    lastMessage: "How's the project going?",
    time: "10:15 AM",
    unread: 0,
    messages: [
      {
        id: "1",
        text: "How's the project going?",
        sender: "Bob Johnson",
        timestamp: "10:15 AM",
        isSent: false,
      },
    ],
  },
];

interface ChatsListProps {
  onSelectChat: (chatId: string) => void;
}

const ChatsList = ({ onSelectChat }: ChatsListProps) => {
  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 border-b space-y-4">
        <h1 className="text-lg font-semibold">Chats</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input className="pl-10" placeholder="Search chats" type="search" />
        </div>
      </div>
      <ScrollArea className="flex-1">
        {mockChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className="flex items-center space-x-4 p-4 border-b hover:bg-gray-50 cursor-pointer"
          >
            <Avatar>
              <AvatarImage
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${chat.id}`}
              />
              <AvatarFallback>{chat.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h3 className="font-medium truncate">{chat.name}</h3>
                <span className="text-xs text-gray-500">{chat.time}</span>
              </div>
              <p className="text-sm text-gray-500 truncate">
                {chat.lastMessage}
              </p>
            </div>
            {chat.unread > 0 && (
              <div className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                {chat.unread}
              </div>
            )}
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

interface ChatViewProps {
  onBack: () => void;
  chat?: Chat;
  onSendMessage: (text: string) => void;
}

const ChatView = ({ onBack, chat, onSendMessage }: ChatViewProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 border-b flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onBack}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Avatar>
          <AvatarImage
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${chat?.id}`}
          />
          <AvatarFallback>{chat?.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-medium">{chat?.name}</h3>
          <p className="text-sm text-gray-500">Online</p>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          <div className="flex justify-center">
            <p className="text-gray-500 text-sm">Today</p>
          </div>
          {chat?.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isSent ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${msg.isSent ? "bg-blue-600 text-white" : "bg-gray-100"}`}
              >
                <p>{msg.text}</p>
                <p
                  className={`text-xs mt-1 ${msg.isSent ? "text-blue-100" : "text-gray-500"}`}
                >
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon">
            <Plus className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Type a message"
            className="flex-1"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <Button variant="ghost" size="icon">
            <Mic className="h-5 w-5" />
          </Button>
          <Button size="icon" onClick={handleSend} disabled={!message.trim()}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const ChatLayout = () => {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const selectedChat = chats.find((chat) => chat.id === activeChat);

  const handleSendMessage = (text: string) => {
    if (!activeChat) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isSent: true,
    };

    setChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.id === activeChat) {
          return {
            ...chat,
            messages: [...chat.messages, newMessage],
            lastMessage: text,
            time: newMessage.timestamp,
          };
        }
        return chat;
      }),
    );
  };

  return (
    <div className="h-[calc(100vh-4rem)] lg:h-[calc(100vh-0px)] flex bg-gray-50">
      <div
        className={`w-full ${!activeChat ? "block" : "hidden"} lg:block lg:w-full max-w-sm border-r`}
      >
        <ChatsList onSelectChat={setActiveChat} />
      </div>
      <div
        className={`w-full ${activeChat ? "block" : "hidden"} lg:block lg:flex-1`}
      >
        {activeChat ? (
          <ChatView
            onBack={() => setActiveChat(null)}
            chat={selectedChat}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <div className="hidden lg:flex items-center justify-center h-full bg-white">
            <p className="text-gray-500">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatLayout;
