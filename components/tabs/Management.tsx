"use client";

import React, { useEffect, useState } from "react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { getCompanies, getCompanyPapers, getCompanyUsers } from "../../api/get";
import { updateCompany } from "../../api/put";

interface Company {
  id: number;
  name: string;
  address: string;
  logo: string;
  wallet: string;
  status: "pending" | "approved" | "rejected";
  rejectionReason?: string;
  users?: User[];
  papers?: string[];
}

interface User {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: string;
}

const CompaniesManagement: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<
    "Approved" | "Pending" | "Rejected"
  >("Approved");
  const [rejectionReason, setRejectionReason] = useState<string>("");
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const companiesData = await getCompanies();
        const companiesWithPapers = await Promise.all(
          companiesData.map(async (company: Company) => {
            const papers = await getCompanyPapers(company.id.toString());
            const users = await getCompanyUsers(company.id);
            return { ...company, papers, users: users ?? [] };
          })
        );

        setCompanies(companiesWithPapers);
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return <p>Loading companies...</p>;
  }

  const filteredCompanies = companies.filter(
    (company) => company.status === selectedCategory.toLowerCase()
  );

  const getCompanyCountByStatus = (
    status: "Approved" | "Pending" | "Rejected"
  ) => {
    return companies.filter(
      (company) => company.status === status.toLowerCase()
    ).length;
  };

  const handleCompanyApproval = async (companyId: number) => {
    try {
      await updateCompany(companyId.toString(), {
        status: "approved",
      });

      const updatedCompanies = companies.map((company) => {
        if (company.id === companyId) {
          return { ...company, status: "approved" };
        }
        return company;
      });

      setCompanies(updatedCompanies);
    } catch (error) {
      alert(`Error approving company: ${error.message}`);
    }
  };

  const handleCompanyRejection = async (companyId: number) => {
    if (rejectionReason.trim() === "") {
      alert("Please provide a reason for rejection.");
      return;
    }

    try {
      await updateCompany(companyId.toString(), {
        status: "rejected",
        admin_msg: rejectionReason,
      });

      const updatedCompanies = companies.map((company) => {
        if (company.id === companyId) {
          return { ...company, status: "rejected", rejectionReason };
        }
        return company;
      });

      setCompanies(updatedCompanies);
      setRejectionReason("");
      setSelectedCompanyId(null);
    } catch (error) {
      alert(`Error rejecting company: ${error.message}`);
    }
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
          onClick={() => setSelectedCategory("Approved")}
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
          onClick={() => setSelectedCategory("Pending")}
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
          onClick={() => setSelectedCategory("Rejected")}
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
          companies={filteredCompanies}
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
                setSelectedCompanyId(null);
              } else {
                setSelectedCompanyId(company.id);
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
                {company.rejectionReason && (
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
  const [showPapers, setShowPapers] = useState(false);

  if (!company) return null;

  return (
    <div className="border rounded-lg p-4 mt-4">
      <h3 className="text-xl font-semibold">Company Details</h3>
      <p>Name: {company.name}</p>
      <p>Address: {company.address}</p>
      <p>Wallet: {company.wallet}</p>

      {/* Paper Image Toggle */}
      <button
        className="mt-2 text-blue-500"
        onClick={() => setShowPapers(!showPapers)}
      >
        {showPapers ? "Hide Papers" : "Show Papers"}
      </button>
      {showPapers && (
        <div className="mt-2">
          <h4 className="font-semibold">Papers:</h4>
          <ul className="list-disc pl-5">
            {company.papers?.map((paper, index) => (
              <li key={index}>{paper}</li>
            ))}
          </ul>
        </div>
      )}
      <button className="mt-4 p-2 bg-gray-300 rounded-md" onClick={onClose}>
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
        className="w-full border p-2 mt-2"
        rows={4}
        value={rejectionReason}
        onChange={(e) => setRejectionReason(e.target.value)}
        placeholder="Enter the reason for rejection..."
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
