import React from "react";
import {
  FaArrowLeft,
  FaPercentage,
  FaWallet,
  FaReceipt,
} from "react-icons/fa";

export default function CommissionDeductionDetails({ onBack }) {
  const data = {
    totalAmount: 50000,
    commissionPercent: 10,
    commissionAmount: 5000,
    netAmount: 45000,
    deductedOn: "23 Dec 2025",
    referenceId: "COM-982341",
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 rounded-lg bg-white shadow hover:bg-gray-100 transition"
        >
          <FaArrowLeft />
        </button>
        <h1 className="text-2xl font-bold text-[#7A0000]">
          Commission Deduction Details
        </h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Amount */}
        <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
          <FaWallet className="text-green-600 text-2xl" />
          <div>
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="text-lg font-semibold">₹ {data.totalAmount}</p>
          </div>
        </div>

        {/* Commission */}
        <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
          <FaPercentage className="text-orange-500 text-2xl" />
          <div>
            <p className="text-sm text-gray-500">
              Commission ({data.commissionPercent}%)
            </p>
            <p className="text-lg font-semibold text-red-600">
              - ₹ {data.commissionAmount}
            </p>
          </div>
        </div>

        {/* Net Amount */}
        <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
          <FaWallet className="text-blue-600 text-2xl" />
          <div>
            <p className="text-sm text-gray-500">Net Amount</p>
            <p className="text-lg font-semibold">₹ {data.netAmount}</p>
          </div>
        </div>
      </div>

      {/* Deduction Breakdown */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FaReceipt className="text-gray-600" />
          <h2 className="text-lg font-semibold">Deduction Breakdown</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Reference ID</span>
            <span className="font-medium">{data.referenceId}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Deducted On</span>
            <span className="font-medium">{data.deductedOn}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Commission Rate</span>
            <span className="font-medium">
              {data.commissionPercent}%
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Commission Amount</span>
            <span className="font-medium text-red-600">
              - ₹ {data.commissionAmount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
