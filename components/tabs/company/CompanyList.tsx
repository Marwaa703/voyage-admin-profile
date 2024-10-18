import React from "react";

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
    <div>
      <h2 className="text-xl font-semibold">Companies List ({selectedCategory})</h2>
      <div className="mt-4 space-y-4">
        {companies.map((company) => (
          <div
            key={company.id}
            className="border p-4 rounded-lg flex justify-between items-center"
          >
            <div onClick={() => setSelectedCompanyId(company.id)} className="cursor-pointer">
              <h3 className="text-lg font-bold">{company.name}</h3>
              <p>{company.address}</p>
              <p>Status: {company.status}</p>
              {company.rejectionReason && (
                <p className="text-red-600">Rejection Reason: {company.rejectionReason}</p>
              )}
            </div>
            <div>
              {selectedCategory === "Pending" && (
                <>
                  <button
                    className="bg-green-500 text-white rounded px-3 py-1 mr-2"
                    onClick={() => onApprove(company.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white rounded px-3 py-1"
                    onClick={() => {
                      setRejectionReason("");
                      setSelectedCompanyId(company.id);
                      onReject(company.id);
                    }}
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyList;
