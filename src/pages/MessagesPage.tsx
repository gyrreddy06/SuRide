import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getConversations, getMessages, sendMessage } from "@/lib/api";
import { useRealtime } from "@/hooks/useSupabaseData";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MessagePanel from "@/components/chat/MessagePanel";
import { MessageSkeleton } from "@/components/LoadingState";

interface ChatPreview {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  isOnline: boolean;
}

const MessagesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const { user } = useAuth();

  // Fetch conversations from Supabase with realtime updates
  const { data: supabaseConversations, loading: conversationsLoading } =
    useRealtime(
      "messages",
      () => (user ? getConversations(user.id) : Promise.resolve([])),
      [user?.id],
    );

  // Fetch messages for selected chat with realtime updates
  const { data: chatMessages, loading: messagesLoading } = useRealtime(
    "messages",
    () =>
      user && selectedChat
        ? getMessages(user.id, selectedChat)
        : Promise.resolve([]),
    [user?.id, selectedChat],
  );

  // Process conversations from Supabase
  const [chats, setChats] = useState<ChatPreview[]>([]);

  useEffect(() => {
    if (supabaseConversations && supabaseConversations.length > 0) {
      // Transform the data to match our ChatPreview interface
      const transformedChats = supabaseConversations.map((chat: any) => ({
        id: chat.id,
        name: chat.name || "User",
        avatar:
          chat.avatar ||
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${chat.id}`,
        lastMessage: chat.lastMessage || "No messages yet",
        time: new Date(chat.time).toLocaleString(),
        unread: chat.unread || 0,
        isOnline: Math.random() > 0.5, // Random online status for demo
      }));

      setChats(transformedChats);
    } else {
      // Fallback to sample data if no conversations are found
      setChats([
        {
          id: "1",
          name: "Sarah Miller",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
          lastMessage: "Perfect! And what time will we be arriving in LA?",
          time: "10:30 AM",
          unread: 2,
          isOnline: true,
        },
        {
          id: "2",
          name: "Michael Brown",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
          lastMessage: "I'll be at the pickup point in 5 minutes.",
          time: "Yesterday",
          unread: 0,
          isOnline: false,
        },
        {
          id: "3",
          name: "Emily Wilson",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
          lastMessage: "Thanks for the ride! It was great meeting you.",
          time: "Yesterday",
          unread: 0,
          isOnline: true,
        },
        {
          id: "4",
          name: "David Garcia",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
          lastMessage: "Do you have space for one more person?",
          time: "Mon",
          unread: 0,
          isOnline: false,
        },
      ]);
    }
  }, [supabaseConversations]);

  // Sample chat data (fallback)
  const sampleChats: ChatPreview[] = [
    {
      id: "1",
      name: "Sarah Miller",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      lastMessage: "Perfect! And what time will we be arriving in LA?",
      time: "10:30 AM",
      unread: 2,
      isOnline: true,
    },
    {
      id: "2",
      name: "Michael Brown",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      lastMessage: "I'll be at the pickup point in 5 minutes.",
      time: "Yesterday",
      unread: 0,
      isOnline: false,
    },
    {
      id: "3",
      name: "Emily Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      lastMessage: "Thanks for the ride! It was great meeting you.",
      time: "Yesterday",
      unread: 0,
      isOnline: true,
    },
    {
      id: "4",
      name: "David Garcia",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      lastMessage: "Do you have space for one more person?",
      time: "Mon",
      unread: 0,
      isOnline: false,
    },
  ];

  const filteredChats = chats.filter((chat) => {
    // Filter by search term
    if (
      searchTerm &&
      !chat.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    // Filter by tab
    if (activeTab === "unread" && chat.unread === 0) {
      return false;
    }
    return true;
  });

  const handleChatSelect = (chatId: string) => {
    setSelectedChat(chatId);
  };

  const handleBackFromChat = () => {
    setSelectedChat(null);
  };

  return (
    <div className="container mx-auto px-4 py-4">
      {!selectedChat ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Messages</h1>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search conversations..."
              className="pl-9 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="mb-4"
          >
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="all">All Messages</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
            </TabsList>
          </Tabs>

          <ScrollArea className="h-[calc(100vh-220px)]">
            {conversationsLoading ? (
              <MessageSkeleton />
            ) : filteredChats.length > 0 ? (
              <div className="space-y-2">
                {filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`p-3 rounded-lg flex items-center gap-3 cursor-pointer ${chat.unread > 0 ? "bg-blue-50" : "hover:bg-gray-100"}`}
                    onClick={() => handleChatSelect(chat.id)}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={chat.avatar} alt={chat.name} />
                        <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {chat.isOnline && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium truncate">{chat.name}</h3>
                        <span className="text-xs text-gray-500">
                          {chat.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {chat.lastMessage}
                      </p>
                    </div>
                    {chat.unread > 0 && (
                      <div className="h-5 w-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                        {chat.unread}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                <p>No messages found</p>
              </div>
            )}
          </ScrollArea>
        </>
      ) : (
        <div className="h-[calc(100vh-140px)]">
          <MessagePanel
            onBack={handleBackFromChat}
            otherUser={{
              id: selectedChat,
              name: chats.find((c) => c.id === selectedChat)?.name || "User",
              avatar: chats.find((c) => c.id === selectedChat)?.avatar || "",
              isOnline:
                chats.find((c) => c.id === selectedChat)?.isOnline || false,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
