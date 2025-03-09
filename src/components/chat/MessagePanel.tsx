import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  ArrowLeft,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  isRead: boolean;
}

interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

interface MessagePanelProps {
  messages?: Message[];
  currentUser?: User;
  otherUser?: User;
  onSendMessage?: (text: string) => void;
  onBack?: () => void;
  className?: string;
  isUploading?: boolean;
  onFileUpload?: (file: File) => Promise<string | null>;
}

const MessagePanel = ({
  messages = [
    {
      id: "1",
      senderId: "other-user",
      text: "Hi there! I'm interested in your ride from San Francisco to Los Angeles.",
      timestamp: new Date(Date.now() - 3600000 * 2),
      isRead: true,
    },
    {
      id: "2",
      senderId: "current-user",
      text: "Hello! Great to hear from you. Do you have any questions about the ride?",
      timestamp: new Date(Date.now() - 3600000),
      isRead: true,
    },
    {
      id: "3",
      senderId: "other-user",
      text: "Yes, I was wondering if there's space for a medium-sized suitcase?",
      timestamp: new Date(Date.now() - 1800000),
      isRead: true,
    },
    {
      id: "4",
      senderId: "current-user",
      text: "Absolutely! There's plenty of trunk space for luggage.",
      timestamp: new Date(Date.now() - 900000),
      isRead: true,
    },
    {
      id: "5",
      senderId: "other-user",
      text: "Perfect! And what time will we be arriving in LA?",
      timestamp: new Date(Date.now() - 600000),
      isRead: false,
    },
  ],
  currentUser = {
    id: "current-user",
    name: "You",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
    isOnline: true,
  },
  otherUser = {
    id: "other-user",
    name: "Sarah Miller",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    isOnline: true,
  },
  onSendMessage = (text) => console.log("Sending message:", text),
  onBack = () => console.log("Back button clicked"),
  className = "",
  isUploading = false,
  onFileUpload = async (file) => null,
}: MessagePanelProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState("chat");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        // Send the message
        onSendMessage(newMessage);
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        // Upload the file
        const fileUrl = await onFileUpload(file);
        if (fileUrl) {
          // If it's an image, we could display it
          // For now, we'll just send a message about the file
          setNewMessage(`Sent a file: ${file.name}`);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div
      className={`flex flex-col h-[500px] w-[400px] bg-white rounded-lg shadow-lg ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="md:hidden"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Avatar className="h-10 w-10">
            <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
            <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{otherUser.name}</div>
            <div className="text-xs flex items-center gap-1">
              <div
                className={`h-2 w-2 rounded-full ${otherUser.isOnline ? "bg-green-500" : "bg-gray-300"}`}
              ></div>
              <span>{otherUser.isOnline ? "Online" : "Offline"}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" title="Call">
            <Phone className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" title="Video Call">
            <Video className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem>Clear Chat</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                Block User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full">
          <TabsTrigger value="chat" className="flex-1">
            Chat
          </TabsTrigger>
          <TabsTrigger value="info" className="flex-1">
            Info
          </TabsTrigger>
        </TabsList>

        {activeTab === "chat" && (
          <div className="flex-1 p-4">
            <ScrollArea className="h-[calc(100%-20px)]">
              <div className="space-y-4">
                {messages.map((message) => {
                  const isCurrentUser = message.senderId === currentUser.id;
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                    >
                      <div className="flex items-end gap-2 max-w-[80%]">
                        {!isCurrentUser && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={otherUser.avatar}
                              alt={otherUser.name}
                            />
                            <AvatarFallback>
                              {otherUser.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`p-3 rounded-lg ${isCurrentUser ? "bg-primary text-primary-foreground" : "bg-gray-100 text-gray-800"}`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <div className="flex items-center justify-end gap-1 mt-1">
                            <span className="text-xs opacity-70">
                              {formatTime(message.timestamp)}
                            </span>
                            {isCurrentUser && (
                              <span className="text-xs">
                                {message.isRead ? "✓✓" : "✓"}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </div>
        )}

        {activeTab === "info" && (
          <div className="flex-1 p-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">About</h3>
                <p className="text-sm text-gray-600">
                  This conversation is about a ride from {otherUser.name}.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium mb-2">Media</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="aspect-square bg-gray-100 rounded-md"></div>
                  <div className="aspect-square bg-gray-100 rounded-md"></div>
                  <div className="aspect-square bg-gray-100 rounded-md"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Tabs>

      <Separator />

      {/* Input area */}
      <div className="p-3 flex items-center gap-2">
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleFileSelect}
          disabled={isUploading}
        />
        <Button
          variant="ghost"
          size="icon"
          title="Attach file"
          onClick={() => document.getElementById("file-upload")?.click()}
          disabled={isUploading}
        >
          <Paperclip className="h-5 w-5" />
        </Button>

        <Input
          placeholder={isUploading ? "Uploading file..." : "Type a message..."}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1"
          disabled={isUploading}
        />

        <Button
          onClick={handleSendMessage}
          size="icon"
          disabled={!newMessage.trim() || isUploading}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default MessagePanel;
