"use client";
import React from "react";
import Tabs from "@/components/Tabs";
import DashboardContent from "@/components/DashboardContent";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query/react";

const Home: React.FC = () => {
  const user = useSelector((state: RootState) => state.admin.user);

  return (
    <div className="h-screen w-full flex items-center justify-center overflow-hidden login-bg">
      <div className="flex w-[90%] h-[90%] bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg m-5">
        {/* Sidebar for Tabs */}
        <div className="w-1/4 p-4">
          <h1 className="text-3xl font-semibold text-white mb-4 text-center">
            Welcome, {user ? user.first_name : "Admin"}
          </h1>
          <Tabs />
        </div>

        {/* Main Content for Displaying Charts and Actions */}
        <div className="w-3/4 p-6">
          <DashboardContent />
        </div>
      </div>
    </div>
  );
};

export default Home;
