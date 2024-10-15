"use client";
import React, { useState } from "react";
import Tabs from "@/components/Tabs";
import DashboardContent from "@/components/DashboardContent";
import {
  GlobeAltIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("General");

  return (
    <div className="h-screen w-full flex items-center justify-center overflow-hidden login-bg">
      <div className="flex flex-col lg:flex-row w-[95%] h-[90%] bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-2xl p-5 m-5 border border-white/20">
        <div className="w-full lg:w-1/4 p-4 border-b lg:border-b-0 lg:border-r border-white/20">
          <h1 className="text-3xl font-semibold text-white mb-6 text-center">
            Welcome, Admin
          </h1>

          {/* Sidebar Tabs */}
          <div className="space-y-6">
            <button
              className={`flex items-center space-x-4 p-4 w-full text-white bg-opacity-10 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors duration-300 ${
                activeTab === "General" ? "bg-white bg-opacity-20" : ""
              }`}
              onClick={() => setActiveTab("General")}
            >
              <GlobeAltIcon className="w-6 h-6" />
              <span className="font-semibold">General</span>
            </button>
            <button
              className={`flex items-center space-x-4 p-4 w-full text-white bg-opacity-10 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors duration-300 ${
                activeTab === "Users" ? "bg-white bg-opacity-20" : ""
              }`}
              onClick={() => setActiveTab("Users")}
            >
              <UserGroupIcon className="w-6 h-6" />
              <span className="font-semibold">Users</span>
            </button>

            <button
              className={`flex items-center space-x-4 p-4 w-full text-white bg-opacity-10 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors duration-300 ${
                activeTab === "Trips" ? "bg-white bg-opacity-20" : ""
              }`}
              onClick={() => setActiveTab("Trips")}
            >
              <BriefcaseIcon className="w-6 h-6" />
              <span className="font-semibold">Trips</span>
            </button>

            <button
              className={`flex items-center space-x-4 p-4 w-full text-white bg-opacity-10 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors duration-300 ${
                activeTab === "Companies" ? "bg-white bg-opacity-20" : ""
              }`}
              onClick={() => setActiveTab("Companies")}
            >
              <UserGroupIcon className="w-6 h-6" />
              <span className="font-semibold">Companies</span>
            </button>

            <button
              className={`flex items-center space-x-4 p-4 w-full text-white bg-opacity-10 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors duration-300 ${
                activeTab === "Settings" ? "bg-white bg-opacity-20" : ""
              }`}
              onClick={() => setActiveTab("Settings")}
            >
              <Cog6ToothIcon className="w-6 h-6" />
              <span className="font-semibold">Settings</span>
            </button>
          </div>
        </div>

        <div className="w-full lg:w-3/4 p-6 overflow-y-auto">
          <DashboardContent activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
};

export default Home;
