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
    logo: "data:image/jpeg;base64,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",
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
    const updatedCompanies = companies.map((company) => {
      if (company.id === companyId) {
        return { ...company, status: "Approved", rejectionReason: undefined };
      }
      return company;
    });

    setCompanies(updatedCompanies);
  };

  const handleCompanyRejection = (companyId: number) => {
    if (rejectionReason.trim() === "") {
      alert("Please provide a reason for rejection.");
      return;
    }

    const updatedCompanies = companies.map((company) => {
      if (company.id === companyId) {
        return { ...company, status: "Rejected", rejectionReason };
      }
      return company;
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
