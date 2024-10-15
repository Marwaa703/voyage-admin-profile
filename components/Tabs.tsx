"use client";
import React from "react";

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = ["General","Users", "Trips", "Companies", "Settings"];

  return (
    <div className="flex flex-col space-y-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)} 
          className={`py-2 px-4 text-white bg-white bg-opacity-10 backdrop-blur-lg rounded-md hover:bg-opacity-20 transition duration-200 ${
            activeTab === tab ? "bg-opacity-30" : ""
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
