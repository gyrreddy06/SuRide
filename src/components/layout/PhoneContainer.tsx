import React from "react";

interface PhoneContainerProps {
  children: React.ReactNode;
  className?: string;
}

const PhoneContainer = ({ children, className = "" }: PhoneContainerProps) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div
        className={`w-full max-w-md h-[calc(100vh-2rem)] overflow-hidden bg-white rounded-3xl shadow-xl flex flex-col ${className}`}
        style={{ maxHeight: "844px" }} // iPhone 12 Pro Max height
      >
        {/* Status bar */}
        <div className="h-6 bg-white flex justify-between items-center px-4 text-xs font-medium">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <div className="h-2.5 w-2.5 bg-gray-800 rounded-full"></div>
            <div className="h-2.5 w-2.5 bg-gray-800 rounded-full"></div>
            <div className="h-2.5 w-2.5 bg-gray-800 rounded-full"></div>
          </div>
        </div>

        <div className="flex-1 overflow-auto">{children}</div>

        {/* Home indicator */}
        <div className="w-1/3 h-1 bg-gray-300 rounded-full mx-auto mb-2"></div>
      </div>
    </div>
  );
};

export default PhoneContainer;
