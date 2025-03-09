import React from "react";

interface MobileContainerProps {
  children: React.ReactNode;
  className?: string;
}

const MobileContainer = ({
  children,
  className = "",
}: MobileContainerProps) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div
        className={`w-full max-w-md h-[calc(100vh-2rem)] overflow-hidden bg-white rounded-3xl shadow-xl flex flex-col ${className}`}
        style={{ maxHeight: "844px" }} // iPhone 12 Pro Max height
      >
        <div className="flex-1 overflow-auto">{children}</div>
        {/* Phone status bar indicator */}
        <div className="w-1/3 h-1 bg-gray-300 rounded-full mx-auto mb-2"></div>
      </div>
    </div>
  );
};

export default MobileContainer;
