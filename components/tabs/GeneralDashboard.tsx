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
import Link from "next/link";
import { getUsers, getCompanies, getTrips } from "../../api/get";

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
  const [usersCount, setUsersCount] = useState(0);
  const [companiesCount, setCompaniesCount] = useState(0);
  const [tripsCount, setTripsCount] = useState(0);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    setIsMounted(true);

    const fetchData = async () => {
      try {
        const usersData = await getUsers();
        const companiesData = await getCompanies();
        const tripsData = await getTrips();

        const usersWithRoleUser = usersData.filter(
          (user: any) => user.role === "User"
        );
        setFilteredUsers(usersWithRoleUser);
        setUsersCount(usersWithRoleUser.length);

        const approvedCompaniesList = companiesData.filter(
          (company: any) => company.status === "approved"
        );
        setCompaniesCount(approvedCompaniesList.length);

        const activeTripsList = tripsData.filter(
          (trip: any) => trip.status === "active"
        );
        setTripsCount(activeTripsList.length);

        const pendingCompaniesList = companiesData.filter(
          (company: any) => company.status === "pending"
        );
        setPendingRequests(pendingCompaniesList);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
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
        color: "#FFFFFF",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#FFFFFF",
        },
      },
      y: {
        ticks: {
          color: "#FFFFFF",
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
        {/* Number of Users with Role "User" */}
        <div className="flex items-center justify-center space-x-4 p-4 bg-gray-800 border-l-4 border-orange-500 rounded-lg shadow-md">
          <UserGroupIcon className="w-8 h-8 text-orange-500" />
          <div>
            <p className="text-lg font-medium text-gray-300">Users Registers</p>
            <h1 className="text-3xl font-bold text-white">{usersCount}</h1>
          </div>
        </div>

        {/* Companies Approved */}
        <div className="flex items-center justify-center space-x-4 p-4 bg-gray-800 border-l-4 border-green-500 rounded-lg shadow-md">
          <BriefcaseIcon className="w-8 h-8 text-green-500" />
          <div>
            <p className="text-lg font-medium text-gray-300">
              Companies Approved
            </p>
            <h1 className="text-3xl font-bold text-white">{companiesCount}</h1>
          </div>
        </div>

        {/* Active Trips */}
        <div className="flex items-center justify-center space-x-4 p-4 bg-gray-800 border-l-4 border-blue-500 rounded-lg shadow-md">
          <GlobeAltIcon className="w-8 h-8 text-blue-500" />
          <div>
            <p className="text-lg font-medium text-gray-300">Active Trips</p>
            <h1 className="text-3xl font-bold text-white">{tripsCount}</h1>
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
            <label
              htmlFor="month"
              className="text-lg font-medium text-gray-300"
            >
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
          <p className="text-2xl font-semibold mb-4 text-white">
            Pending Requests
          </p>
          <div className="space-y-4">
            {pendingRequests.map((company, index) => (
              // <Link href="./CompaniesList" key={index}>
              <div className="flex items-center space-x-4 p-4 border-l-4 border-red-500 rounded-lg shadow-sm transition-transform transform hover:scale-105 hover:bg-gray-700 cursor-pointer">
                <div className="w-12 h-12 bg-gray-600 rounded-full overflow-hidden">
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-300">
                    {company.name}
                  </p>
                  <p className="text-sm text-gray-400">{company.address}</p>
                  <p className="text-sm text-red-400">Status: Pending</p>
                </div>
              </div>
              // </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralDashboard;
