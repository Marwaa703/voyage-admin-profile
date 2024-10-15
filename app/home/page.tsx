"use client";
import React, { useState } from "react";
import Tabs from "@/components/Tabs";
import DashboardContent from "@/components/DashboardContent";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query/react";

const Home: React.FC = () => {

  const [activeTab, setActiveTab] = useState<string>("General");

  return (
    <div className="h-screen w-full flex items-center justify-center overflow-hidden login-bg">
      <div className="flex w-[90%] h-[90%] bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg m-5">
        <div className="w-1/4 p-4">
          <h1 className="text-3xl font-semibold text-white mb-4 text-center">
            Welcome, Admin
          </h1>
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div className="w-3/4 p-6">
          <DashboardContent activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
};

export default Home;
