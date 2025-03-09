import React from "react";
import MobileNavBar from "./MobileNavBar";
import { Toaster } from "@/components/ui/toaster";
import PhoneContainer from "./PhoneContainer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <PhoneContainer>
      <div className="flex flex-col h-full bg-gray-50">
        <main className="flex-1 pb-16 overflow-auto">{children}</main>
        <MobileNavBar />
        <Toaster />
      </div>
    </PhoneContainer>
  );
};

export default Layout;
