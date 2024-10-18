// components/DashboardContent.tsx
import React from "react";
import GeneralDashboard from "./tabs/GeneralDashboard";
import UsersList from "./tabs/UsersList";
import Management from "./tabs/Management";
import Trips from "./tabs/Trips";
import Settings from "./tabs/Settings";

interface DashboardContentProps {
  activeTab: string;
  setBackgroundImage: (image: string) => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  activeTab,
  setBackgroundImage,
}) => {
  const renderContent = () => {
    switch (activeTab) {
      case "General":
        return <GeneralDashboard />;
      case "Users":
        return <UsersList />;
      case "Trips":
        return <Trips />;
      case "Companies":
        return <Management />;
      case "Settings":
        return <Settings setBackgroundImage={setBackgroundImage} />;
      default:
        return <p className="text-white">No content available.</p>;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold text-white mb-4">{activeTab}</h2>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg p-6 w-full">
        {renderContent()}
      </div>
    </div>
  );
};

export default DashboardContent;
