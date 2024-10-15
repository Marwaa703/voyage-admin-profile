"use client";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Trip {
  id: number;
  status: "Ongoing" | "Scheduled" | "Canceled" | "Completed";
}

interface Company {
  name: string;
  trips: Trip[];
}

const tripData: Trip[] = [
  { id: 1, status: "Ongoing" },
  { id: 2, status: "Scheduled" },
  { id: 3, status: "Canceled" },
  { id: 4, status: "Completed" },
  { id: 5, status: "Ongoing" },
  { id: 6, status: "Scheduled" },
  { id: 7, status: "Completed" },
  { id: 8, status: "Scheduled" },
  { id: 9, status: "Scheduled" },
  { id: 10, status: "Completed" },
  { id: 11, status: "Ongoing" },
  { id: 12, status: "Scheduled" },
  { id: 13, status: "Completed" },
  { id: 14, status: "Ongoing" },
];

const companyData: Company[] = [
  {
    name: "Company A",
    trips: [
      { id: 1, status: "Ongoing" },
      { id: 2, status: "Scheduled" },
      { id: 11, status: "Ongoing" },
      { id: 12, status: "Scheduled" },
      { id: 13, status: "Completed" },
      { id: 14, status: "Ongoing" },
    ],
  },
  {
    name: "Company B",
    trips: [
      { id: 3, status: "Canceled" },
      { id: 4, status: "Completed" },
      { id: 6, status: "Scheduled" },
      { id: 7, status: "Completed" },
      { id: 8, status: "Scheduled" },
      { id: 9, status: "Scheduled" },
    ],
  },
];

// Colors for trip status types
const STATUS_COLORS: Record<string, string> = {
  Ongoing: "#0088FE",
  Scheduled: "#00C49F",
  Canceled: "#FFBB28",
  Completed: "#FF8042",
};

const getTripCounts = (trips: Trip[]) => {
  const counts = {
    Ongoing: 0,
    Scheduled: 0,
    Canceled: 0,
    Completed: 0,
  };

  trips.forEach((trip) => {
    counts[trip.status]++;
  });

  return counts;
};

const Trips: React.FC = () => {
  const { Ongoing, Scheduled, Canceled, Completed } = getTripCounts(tripData);
  const data = [
    { name: "Ongoing", value: Ongoing },
    { name: "Scheduled", value: Scheduled },
    { name: "Canceled", value: Canceled },
    { name: "Completed", value: Completed },
  ];

  const COLORS = Object.values(STATUS_COLORS);

  return (
    <div className="w-full h-full p-4">
    
      <div className="bg-gray-800 p-4 rounded">
        <h3 className="text-xl font-semibold text-white mb-4">Trip Status</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              label
              outerRadius={110}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Second Row: Companies and Their Trips */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-white mb-4">
          Companies and Their Trips
        </h3>
        <div className="bg-gray-800 p-4 rounded">
          {companyData.map((company, index) => (
            <div key={index} className="mb-4">
              <h4 className="text-lg font-semibold text-white">
                {company.name}
              </h4>
              <ul className="list-disc pl-5">
                {company.trips.map((trip) => (
                  <li
                    key={trip.id}
                    style={{ color: STATUS_COLORS[trip.status] }}
                    className="text-white"
                  >
                    Trip ID: {trip.id} - Status: {trip.status}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trips;
