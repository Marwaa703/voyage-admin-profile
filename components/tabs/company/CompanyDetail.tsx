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

export default CompanyDetail;
