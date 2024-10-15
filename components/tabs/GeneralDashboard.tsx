"use client";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  UserGroupIcon,
  BriefcaseIcon,
  GlobeAltIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GeneralDashboard: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMonth(e.target.value);
  };

  const data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Trips",
        data: [10, 20, 15, 18],
        backgroundColor: "#FF5B00",
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Trips Status for ${selectedMonth || "October 2024"}`,
        font: {
          size: 18,
        },
      },
    },
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="container mx-auto p-8">
      {/* Numbers Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Number of Users */}
        <div className="flex items-center justify-center space-x-4 p-4 bg-white border-l-4 border-orange-500 rounded-lg shadow-md">
          <UserGroupIcon className="w-8 h-8 text-orange-500" />
          <div>
            <p className="text-lg font-medium text-gray-700">
              Number of Users Registered
            </p>
            <h1 className="text-3xl font-bold text-gray-800">100</h1>
          </div>
        </div>

        {/* Companies Approved */}
        <div className="flex items-center justify-center space-x-4 p-4 bg-white border-l-4 border-green-500 rounded-lg shadow-md">
          <BriefcaseIcon className="w-8 h-8 text-green-500" />
          <div>
            <p className="text-lg font-medium text-gray-700">
              Number of Companies Approved
            </p>
            <h1 className="text-3xl font-bold text-gray-800">15</h1>
          </div>
        </div>

        {/* Active Trips */}
        <div className="flex items-center justify-center space-x-4 p-4 bg-white border-l-4 border-blue-500 rounded-lg shadow-md">
          <GlobeAltIcon className="w-8 h-8 text-blue-500" />
          <div>
            <p className="text-lg font-medium text-gray-700">
              Number of Active Trips
            </p>
            <h1 className="text-3xl font-bold text-gray-800">8</h1>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section: Date Picker and Chart */}
        <div className="lg:col-span-2 space-y-4">
          {/* Date Picker */}
          <div className="flex items-center space-x-3 p-6 bg-white border-l-4 border-yellow-500 rounded-lg shadow-md">
            <CalendarDaysIcon className="w-6 h-6 text-gray-600" />
            <label
              htmlFor="month"
              className="text-lg font-medium text-gray-600"
            >
              Pick a Month
            </label>
            <input
              type="month"
              id="month"
              value={selectedMonth}
              onChange={handleMonthChange}
              className="border border-gray-300 text-black p-2 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Bar data={data} options={options} />
          </div>
        </div>

        {/* Right Section: Pending Requests */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-2xl font-semibold mb-4 text-gray-800">
            Pending Requests
          </p>
          <div className="space-y-4">
            {/* Pending Company A */}
            <div className="flex items-center space-x-4 p-4 border-l-4 border-red-500 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
              <div>
                <p className="text-lg font-medium text-gray-700">Company A</p>
                <p className="text-sm text-gray-500">Cairo 123st, Egypt</p>
              </div>
            </div>

            {/* Pending Company B */}
            <div className="flex items-center space-x-4 p-4 border-l-4 border-red-500 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
              <div>
                <p className="text-lg font-medium text-gray-700">Company B</p>
                <p className="text-sm text-gray-500">Cairo 123st, Egypt</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralDashboard;
