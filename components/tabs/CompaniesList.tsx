"use client";

import React, { useState } from "react";
import {
  PencilIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  role: "Representative" | "Tour Guide" | "Supportive";
  gender: string;
  companyId: number;
}

interface Company {
  id: number;
  name: string;
  address: string;
  logo: string;
  wallet: string;
  status: "Pending" | "Approved" | "Rejected";
  rejectionReason?: string;
  papers: string[];
  users: User[];
}

const initialCompanies: Company[] = [
  {
    id: 1,
    name: "Company A",
    address: "123 Cairo St",
    logo: "data:image/png;base64,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",
    wallet: "wallet_address",
    status: "Pending",
    papers: ["Paper1", "Paper2"],
    users: [
      {
        firstName: "C",
        lastName: "U",
        email: "cu@vc.com",
        phone: "123-456-7890",
        birthDate: "1990-01-01",
        role: "Representative",
        gender: "Male",
        companyId: 1,
      },
    ],
  },
  {
    id: 2,
    name: "Company B",
    address: "456 Giza St",
    logo: "path/to/logoB.png",
    wallet: "wallet_address",
    status: "Approved",
    papers: ["Paper3"],
    users: [
      {
        firstName: "C",
        lastName: "Two",
        email: "ctwo@vc.com",
        phone: "987-654-3210",
        birthDate: "1985-05-05",
        role: "Tour Guide",
        gender: "Female",
        companyId: 2,
      },
      {
        firstName: "C",
        lastName: "Three",
        email: "cthree@vc.com",
        phone: "456-789-1234",
        birthDate: "1992-08-08",
        role: "Supportive",
        gender: "Female",
        companyId: 2,
      },
    ],
  },
  {
    id: 3,
    name: "Company C",
    address: "789 Aswan St",
    logo: "data:image/jpeg;base64,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",
    wallet: "wallet_address",
    status: "Rejected",
    rejectionReason: "Insufficient documents",
    papers: [],
    users: [],
  },
];

const CompaniesManagement: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);
  const [selectedCategory, setSelectedCategory] = useState<
    "Approved" | "Pending" | "Rejected"
  >("Approved");
  const [rejectionReason, setRejectionReason] = useState<string>("");
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(
    null
  );

  // Get company counts by status
  const getCompanyCountByStatus = (
    status: "Approved" | "Pending" | "Rejected"
  ) => {
    return companies.filter((company) => company.status === status).length;
  };
  const handleCompanyApproval = (companyId: number) => {
    const updatedCompanies: Company[] = companies.map((company) => {
      if (company.id === companyId) {
        // Ensure status is a valid literal
        return { ...company, status: "Approved", rejectionReason: undefined };
      }
      return company; // Type is Company
    });

    setCompanies(updatedCompanies);
  };

  const handleCompanyRejection = (companyId: number) => {
    if (rejectionReason.trim() === "") {
      alert("Please provide a reason for rejection.");
      return;
    }

    const updatedCompanies: Company[] = companies.map((company) => {
      if (company.id === companyId) {
        // Ensure status is a valid literal
        return { ...company, status: "Rejected", rejectionReason };
      }
      return company; // Type is Company
    });

    setCompanies(updatedCompanies);
    setRejectionReason("");
    setSelectedCompanyId(null);
  };

  const handleCategoryChange = (
    category: "Approved" | "Pending" | "Rejected"
  ) => {
    setSelectedCategory(category);
    setSelectedCompanyId(null);
  };

  return (
    <div className="flex p-5 space-x-10">
      {/* Sidebar for Company Categories */}
      <div className="flex flex-col space-y-4 w-1/4">
        <h2 className="text-xl font-bold">Manage Companies</h2>
        <div
          className={`p-3 rounded-md border cursor-pointer ${
            selectedCategory === "Approved" ? "bg-blue-200" : ""
          }`}
          onClick={() => handleCategoryChange("Approved")}
        >
          Approved Companies{" "}
          <span className="bg-green-400 text-white rounded-full px-2">
            {getCompanyCountByStatus("Approved")}
          </span>
        </div>
        <div
          className={`p-3 rounded-md border cursor-pointer ${
            selectedCategory === "Pending" ? "bg-blue-200" : ""
          }`}
          onClick={() => handleCategoryChange("Pending")}
        >
          Pending Companies{" "}
          <span className="bg-yellow-400 text-white rounded-full px-2">
            {getCompanyCountByStatus("Pending")}
          </span>
        </div>
        <div
          className={`p-3 rounded-md border cursor-pointer ${
            selectedCategory === "Rejected" ? "bg-blue-200" : ""
          }`}
          onClick={() => handleCategoryChange("Rejected")}
        >
          Rejected Companies{" "}
          <span className="bg-red-400 text-white rounded-full px-2">
            {getCompanyCountByStatus("Rejected")}
          </span>
        </div>
      </div>

      {/* Companies List Section */}
      <div className="flex-1">
        <CompanyList
          companies={companies.filter(
            (company) => company.status === selectedCategory
          )}
          onApprove={handleCompanyApproval}
          onReject={handleCompanyRejection}
          setRejectionReason={setRejectionReason}
          selectedCompanyId={selectedCompanyId}
          setSelectedCompanyId={setSelectedCompanyId}
          selectedCategory={selectedCategory}
        />
        {selectedCompanyId && (
          <CompanyDetail
            company={companies.find(
              (company) => company.id === selectedCompanyId
            )}
            onClose={() => setSelectedCompanyId(null)}
          />
        )}
        {selectedCategory === "Pending" && selectedCompanyId !== null && (
          <RejectionReason
            rejectionReason={rejectionReason}
            setRejectionReason={setRejectionReason}
            onReject={() => handleCompanyRejection(selectedCompanyId)}
          />
        )}
      </div>
    </div>
  );
};

interface CompanyListProps {
  companies: Company[];
  onApprove: (companyId: number) => void;
  onReject: (companyId: number) => void;
  setRejectionReason: (reason: string) => void;
  selectedCompanyId: number | null;
  setSelectedCompanyId: (id: number | null) => void;
  selectedCategory: "Approved" | "Pending" | "Rejected";
}

const CompanyList: React.FC<CompanyListProps> = ({
  companies,
  onApprove,
  onReject,
  setRejectionReason,
  selectedCompanyId,
  setSelectedCompanyId,
  selectedCategory,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {companies.map((company) => (
        <div key={company.id} className="relative">
          <div
            className="border rounded-lg p-4 flex flex-col space-y-2 cursor-pointer"
            onClick={() => {
              if (selectedCompanyId === company.id) {
                setSelectedCompanyId(null); // Close details if already open
              } else {
                setSelectedCompanyId(company.id); // Open details
              }
            }}
          >
            <div className="flex items-center space-x-2">
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                className="w-12 h-12"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{company.name}</h2>
                <p>{company.address}</p>
                <p>Status: {company.status}</p>
                {company.status === "Rejected" && (
                  <p className="text-red-600">
                    Rejected Reason: {company.rejectionReason}
                  </p>
                )}
              </div>
              {selectedCategory === "Pending" && (
                <div className="flex space-x-2">
                  <button
                    className="p-2 bg-green-500 text-white rounded-md"
                    onClick={(e) => {
                      e.stopPropagation();
                      onApprove(company.id);
                    }}
                  >
                    <CheckIcon className="h-5 w-5" />
                  </button>
                  <button
                    className="p-2 bg-red-500 text-white rounded-md"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCompanyId(company.id);
                      setRejectionReason("");
                    }}
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
interface CompanyDetailProps {
  company: Company | undefined;
  onClose: () => void;
}

const CompanyDetail: React.FC<CompanyDetailProps> = ({ company, onClose }) => {
  if (!company) return null;

  return (
    <div className="border rounded-lg p-4 mt-4">
      <h3 className="text-xl font-semibold">Company Details</h3>
      <p>Name: {company.name}</p>
      <p>Address: {company.address}</p>
      <p>Wallet: {company.wallet}</p>
      <p>Papers: {company.papers.join(", ")}</p>

      {/* Display Users Associated with the Company */}
      <h4 className="text-lg font-semibold mt-4">Users:</h4>
      {company.users.length > 0 ? (
        <ul className="list-disc pl-5">
          {company.users.map((user, index) => (
            <li key={index}>
              <strong>
                {user.firstName} {user.lastName}
              </strong>{" "}
              - {user.role} <br />
              Email: {user.email} <br />
              Phone: {user.phone} <br />
              Birth Date: {user.birthDate} <br />
              Gender: {user.gender}
            </li>
          ))}
        </ul>
      ) : (
        <p>No users associated with this company.</p>
      )}

      <button
        className="mt-4 p-2 bg-blue-500 text-white rounded-md"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

interface RejectionReasonProps {
  rejectionReason: string;
  setRejectionReason: (reason: string) => void;
  onReject: () => void;
}

const RejectionReason: React.FC<RejectionReasonProps> = ({
  rejectionReason,
  setRejectionReason,
  onReject,
}) => {
  return (
    <div className="border rounded-lg p-4 mt-4">
      <h3 className="text-xl font-semibold">Rejection Reason</h3>
      <textarea
        value={rejectionReason}
        onChange={(e) => setRejectionReason(e.target.value)}
        placeholder="Enter rejection reason"
        className="w-full h-24 p-2 border rounded-md"
      />
      <button
        className="mt-2 p-2 bg-red-500 text-white rounded-md"
        onClick={onReject}
      >
        Reject Company
      </button>
    </div>
  );
};

export default CompaniesManagement;
