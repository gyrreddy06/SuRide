import React from "react";
import {
  Bell,
  Menu,
  User,
  LogOut,
  Settings,
  MessageSquare,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface HeaderProps {
  userName?: string;
  userAvatar?: string;
  notificationCount?: number;
  onMenuToggle?: () => void;
  onNotificationsClick?: () => void;
  onProfileClick?: () => void;
  onLogoutClick?: () => void;
}

const Header = ({
  userName = "John Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  notificationCount = 3,
  onMenuToggle = () => {},
  onNotificationsClick = () => {},
  onProfileClick = () => {},
  onLogoutClick = () => {},
}: HeaderProps) => {
  return (
    <header className="w-full h-12 bg-white border-b border-gray-200 px-3 flex items-center justify-between shadow-sm fixed top-0 left-0 right-0 z-50">
      {/* Status bar */}
      <div className="absolute top-0 left-0 right-0 h-6 bg-white flex justify-between items-center px-4 text-xs font-medium">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <span className="i-lucide-signal h-3 w-3"></span>
          <span className="i-lucide-wifi h-3 w-3"></span>
          <span className="i-lucide-battery-full h-3 w-3"></span>
        </div>
      </div>

      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="mr-1 h-8 w-8"
          onClick={onMenuToggle}
        >
          <Menu className="h-4 w-4" />
        </Button>
        <Link to="/" className="flex items-center gap-1">
          <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <span className="font-bold text-sm">RideShare</span>
        </Link>
      </div>

      <div className="flex items-center gap-1">
        <Link to="/notifications">
          <Button
            variant="ghost"
            size="icon"
            className="relative h-8 w-8"
            title="Notifications"
          >
            <Bell className="h-4 w-4" />
            {notificationCount > 0 && (
              <Badge
                className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
                variant="destructive"
              >
                {notificationCount}
              </Badge>
            )}
          </Button>
        </Link>

        <Link to="/messages">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            title="Messages"
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-7 w-7 rounded-full"
              onClick={onProfileClick}
            >
              <Avatar className="h-7 w-7">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <div className="flex items-center gap-2 p-2">
              <Avatar className="h-7 w-7">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium text-xs">{userName}</span>
                <span className="text-[10px] text-gray-500">View profile</span>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-xs py-1.5">
              <Link to="/profile" className="flex items-center w-full">
                <User className="mr-2 h-3 w-3" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-xs py-1.5">
              <Link to="/settings" className="flex items-center w-full">
                <Settings className="mr-2 h-3 w-3" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-red-600 text-xs py-1.5"
              onClick={() => {
                // Sign out using the imported supabase client
                supabase.auth.signOut().then(() => {
                  // Remove localStorage flag
                  localStorage.removeItem("isLoggedIn");
                  window.location.href = "/auth";
                });
              }}
            >
              <LogOut className="mr-2 h-3 w-3" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
