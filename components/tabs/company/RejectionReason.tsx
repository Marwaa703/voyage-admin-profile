import React from "react";

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
      <button className="mt-2 p-2 bg-red-500 text-white rounded-md" onClick={onReject}>
        Reject Company
      </button>
    </div>
  );
};

export default RejectionReason;
