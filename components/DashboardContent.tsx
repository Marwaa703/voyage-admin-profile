"use client";
import React from "react";

interface DashboardContentProps {
  activeTab: string;
}


const DashboardContent: React.FC<DashboardContentProps> = ({ activeTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case "General":
        return <p className="text-white">This is the General content.</p>;
      case "Trips":
        return <p className="text-white">This is the Trips content.</p>;
      case "Companies":
        return <p className="text-white">This is the Companies content.</p>;
      case "Settings":
        return <p className="text-white">This is the Settings content.</p>;
      default:
        return <p className="text-white">No content available.</p>;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold text-white mb-4">
        {activeTab}
      </h2>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg p-6 w-full">
        {renderContent()}
      </div>
    </div>
  );
};

export default DashboardContent;
