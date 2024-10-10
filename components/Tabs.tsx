
"use client"; 
import React from 'react';

const Tabs: React.FC = () => {
  const tabs = ["General", "Trips", "Companies", "Settings"];
  
  return (
    <div className="flex flex-col space-y-4">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className="py-2 px-4 text-white bg-white bg-opacity-10 backdrop-blur-lg rounded-md hover:bg-opacity-20 transition duration-200"
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;