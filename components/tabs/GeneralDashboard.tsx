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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
        color: "#FFFFFF", // White text color
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#FFFFFF", // White text color for x-axis
        },
      },
      y: {
        ticks: {
          color: "#FFFFFF", // White text color for y-axis
        },
      },
    },
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="container mx-auto p-8 bg-gray-900 min-h-screen">
      {/* Numbers Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Number of Users */}
        <div className="flex items-center justify-center space-x-4 p-4 bg-gray-800 border-l-4 border-orange-500 rounded-lg shadow-md">
          <UserGroupIcon className="w-8 h-8 text-orange-500" />
          <div>
            <p className="text-lg font-medium text-gray-300">Number of Users Registered</p>
            <h1 className="text-3xl font-bold text-white">100</h1>
          </div>
        </div>

        {/* Companies Approved */}
        <div className="flex items-center justify-center space-x-4 p-4 bg-gray-800 border-l-4 border-green-500 rounded-lg shadow-md">
          <BriefcaseIcon className="w-8 h-8 text-green-500" />
          <div>
            <p className="text-lg font-medium text-gray-300">Number of Companies Approved</p>
            <h1 className="text-3xl font-bold text-white">15</h1>
          </div>
        </div>

        {/* Active Trips */}
        <div className="flex items-center justify-center space-x-4 p-4 bg-gray-800 border-l-4 border-blue-500 rounded-lg shadow-md">
          <GlobeAltIcon className="w-8 h-8 text-blue-500" />
          <div>
            <p className="text-lg font-medium text-gray-300">Number of Active Trips</p>
            <h1 className="text-3xl font-bold text-white">8</h1>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section: Date Picker and Chart */}
        <div className="lg:col-span-2 space-y-4">
          {/* Date Picker */}
          <div className="flex items-center space-x-3 p-6 bg-gray-800 border-l-4 border-yellow-500 rounded-lg shadow-md">
            <CalendarDaysIcon className="w-6 h-6 text-gray-300" />
            <label htmlFor="month" className="text-lg font-medium text-gray-300">
              Pick a Month
            </label>
            <input
              type="month"
              id="month"
              value={selectedMonth}
              onChange={handleMonthChange}
              className="border border-gray-700 text-black p-2 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>

          {/* Bar Chart */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <Bar data={data} options={options} />
          </div>
        </div>

        {/* Right Section: Pending Requests */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <p className="text-2xl font-semibold mb-4 text-white">Pending Requests</p>
          <div className="space-y-4">
            {/* Pending Company A */}
            <div className="flex items-center space-x-4 p-4 border-l-4 border-red-500 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-gray-600 rounded-full"></div>
              <div>
                <p className="text-lg font-medium text-gray-300">Company A</p>
                <p className="text-sm text-gray-400">Cairo 123st, Egypt</p>
              </div>
            </div>

            {/* Pending Company B */}
            <div className="flex items-center space-x-4 p-4 border-l-4 border-red-500 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-gray-600 rounded-full"></div>
              <div>
                <p className="text-lg font-medium text-gray-300">Company B</p>
                <p className="text-sm text-gray-400">Cairo 123st, Egypt</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralDashboard;
