import React from "react";
import { Home, Search, Car, MessageSquare, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 rounded-b-3xl shadow-sm">
      <div className="flex justify-around items-center h-12 px-1">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center w-full h-full ${path === "/" ? "text-primary" : "text-gray-500"}`}
        >
          <Home className="h-4 w-4" />
          <span className="text-[10px] mt-0.5">Home</span>
        </Link>
        <Link
          to="/ride-search"
          className={`flex flex-col items-center justify-center w-full h-full ${path === "/ride-search" ? "text-primary" : "text-gray-500"}`}
        >
          <Search className="h-4 w-4" />
          <span className="text-[10px] mt-0.5">Search</span>
        </Link>
        <Link
          to="/offer-ride"
          className={`flex flex-col items-center justify-center w-full h-full ${path === "/offer-ride" ? "text-primary" : "text-gray-500"}`}
        >
          <div className="bg-primary text-white rounded-full p-3 -mt-6 shadow-lg">
            <Car className="h-4 w-4" />
          </div>
          <span className="text-[10px] mt-1">Offer</span>
        </Link>
        <Link
          to="/messages"
          className={`flex flex-col items-center justify-center w-full h-full ${path === "/messages" ? "text-primary" : "text-gray-500"}`}
        >
          <MessageSquare className="h-4 w-4" />
          <span className="text-[10px] mt-0.5">Messages</span>
        </Link>
        <Link
          to="/profile"
          className={`flex flex-col items-center justify-center w-full h-full ${path === "/profile" ? "text-primary" : "text-gray-500"}`}
        >
          <User className="h-4 w-4" />
          <span className="text-[10px] mt-0.5">Profile</span>
        </Link>
      </div>

      {/* Home indicator */}
      <div className="w-1/3 h-1 bg-gray-300 rounded-full mx-auto mb-1"></div>
    </div>
  );
};

export default BottomNav;
