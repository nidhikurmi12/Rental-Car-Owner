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
    <div className="p-6 space-y-6 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <FaArrowLeft className="text-gray-700 dark:text-gray-200" />
        </button>
        <h1 className="text-2xl font-bold text-[#7A0000] dark:text-red-400">
          Commission Deduction Details
        </h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Amount */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex items-center gap-4">
          <FaWallet className="text-green-600 dark:text-green-400 text-2xl" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Amount
            </p>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              ₹ {data.totalAmount}
            </p>
          </div>
        </div>

        {/* Commission */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex items-center gap-4">
          <FaPercentage className="text-orange-500 dark:text-orange-400 text-2xl" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Commission ({data.commissionPercent}%)
            </p>
            <p className="text-lg font-semibold text-red-600 dark:text-red-400">
              - ₹ {data.commissionAmount}
            </p>
          </div>
        </div>

        {/* Net Amount */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex items-center gap-4">
          <FaWallet className="text-blue-600 dark:text-blue-400 text-2xl" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Net Amount
            </p>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              ₹ {data.netAmount}
            </p>
          </div>
        </div>
      </div>

      {/* Deduction Breakdown */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FaReceipt className="text-gray-600 dark:text-gray-300" />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Deduction Breakdown
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">
              Reference ID
            </span>
            <span className="font-medium text-gray-800 dark:text-gray-100">
              {data.referenceId}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">
              Deducted On
            </span>
            <span className="font-medium text-gray-800 dark:text-gray-100">
              {data.deductedOn}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">
              Commission Rate
            </span>
            <span className="font-medium text-gray-800 dark:text-gray-100">
              {data.commissionPercent}%
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">
              Commission Amount
            </span>
            <span className="font-medium text-red-600 dark:text-red-400">
              - ₹ {data.commissionAmount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
