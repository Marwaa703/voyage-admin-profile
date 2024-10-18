"use client";
import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getCompanies, getTripsByCompanyId } from "../../api/get"; 

interface Trip {
  id: number;
  status: "active" | "paused" | "completed";
}

interface Company {
  id: number; 
  name: string;
  trips: Trip[];
  status: string; 
}

const STATUS_COLORS: Record<string, string> = {
  active: "#0088FE", 
  paused: "#FFBB28",
  completed: "#FF8042",
};

const getTripCounts = (trips: Trip[]) => {
  const counts = {
    active: 0,
    paused: 0,
    completed: 0,
  };

  trips.forEach((trip) => {
    counts[trip.status]++;
  });

  return counts;
};

const Trips: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompaniesAndTrips = async () => {
      try {
        const companiesData = await getCompanies();

        const approvedCompanies = companiesData.filter(
          (company: Company) => company.status === "approved"
        );
        console.log("Approved Companies Data:", approvedCompanies);

        const companiesWithTrips = await Promise.all(
          approvedCompanies.map(async (company: Company) => {
            try {
              const trips = await getTripsByCompanyId(company.id);
              console.log(`Trips for Company ID ${company.id}:`, trips);
              return { ...company, trips };
            } catch (error) {
              console.error(
                `Error fetching trips for Company ID ${company.id}:`,
                error
              );
              return { ...company, trips: [] };
            }
          })
        );

        setCompanies(companiesWithTrips);
      } catch (error) {
        console.error("Error fetching companies and trips:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompaniesAndTrips();
  }, []);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  const flatTrips = companies.flatMap((company) => company.trips);
  const { active, paused, completed } = getTripCounts(flatTrips);
  const pieData = [
    { name: "Active", value: active },
    { name: "Paused", value: paused },
    { name: "Completed", value: completed },
  ];

  return (
    <div className="w-full h-full p-4">
      <div className="bg-gray-800 p-4 rounded">
        <h3 className="text-xl font-semibold text-white mb-4">Trip Status</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              label
              outerRadius={110}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={STATUS_COLORS[entry.name.toLowerCase()]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-semibold text-white mb-4">
          Companies and Their Trips
        </h3>
        <div className="bg-gray-800 p-4 rounded">
          {companies.length === 0 ? (
            <div className="text-white">No approved companies found.</div>
          ) : (
            companies.map((company) => (
              <div key={company.id} className="mb-4">
                <h4 className="text-lg font-semibold text-white">
                  {company.name}
                </h4>
                {company.trips.length === 0 ? (
                  <p className="text-gray-400">No trips yet.</p>
                ) : (
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
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Trips;
