import React from "react";

interface SidebarProps {
  selectedCategory: "Approved" | "Pending" | "Rejected";
  onCategoryChange: (category: "Approved" | "Pending" | "Rejected") => void;
  approvedCount: number;
  pendingCount: number;
  rejectedCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedCategory,
  onCategoryChange,
  approvedCount,
  pendingCount,
  rejectedCount,
}) => {
  return (
    <div className="flex flex-col space-y-4 w-1/4">
      <h2 className="text-xl font-bold">Manage Companies</h2>
      <div
        className={`p-3 rounded-md border cursor-pointer ${
          selectedCategory === "Approved" ? "bg-blue-200" : ""
        }`}
        onClick={() => onCategoryChange("Approved")}
      >
        Approved Companies{" "}
        <span className="bg-green-400 text-white rounded-full px-2">
          {approvedCount}
        </span>
      </div>
      <div
        className={`p-3 rounded-md border cursor-pointer ${
          selectedCategory === "Pending" ? "bg-blue-200" : ""
        }`}
        onClick={() => onCategoryChange("Pending")}
      >
        Pending Companies{" "}
        <span className="bg-yellow-400 text-white rounded-full px-2">
          {pendingCount}
        </span>
      </div>
      <div
        className={`p-3 rounded-md border cursor-pointer ${
          selectedCategory === "Rejected" ? "bg-blue-200" : ""
        }`}
        onClick={() => onCategoryChange("Rejected")}
      >
        Rejected Companies{" "}
        <span className="bg-red-400 text-white rounded-full px-2">
          {rejectedCount}
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
