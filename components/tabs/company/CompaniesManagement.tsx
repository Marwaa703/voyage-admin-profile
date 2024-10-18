import React, { useState } from "react";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import RejectionReason from "./RejectionReason";
import Sidebar from "./Sidebar";

const CompaniesManagement: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);
  const [selectedCategory, setSelectedCategory] = useState<
    "Approved" | "Pending" | "Rejected"
  >("Approved");
  const [rejectionReason, setRejectionReason] = useState<string>("");
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(
    null
  );

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
      {/* Sidebar */}
      <Sidebar
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        approvedCount={getCompanyCountByStatus("Approved")}
        pendingCount={getCompanyCountByStatus("Pending")}
        rejectedCount={getCompanyCountByStatus("Rejected")}
      />

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

export default CompaniesManagement;
