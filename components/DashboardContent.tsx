
"use client"; 
import React from 'react';

const DashboardContent: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold text-white mb-4">Dashboard</h2>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg p-6 w-full">
        {/* Placeholder for charts and actions */}
        <p className="text-white">This is where the charts and actions will go.</p>
      </div>
    </div>
  );
};

export default DashboardContent;
