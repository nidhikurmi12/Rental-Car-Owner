import React from "react";

export default function GSTInvoice() {
  return (
    <div className="p-8 text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 print:bg-white print:text-black print:p-0 print:shadow-none">
      {/* Header */}
      <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
        <div>
          <h1 className="text-xl font-bold text-[#7A0000] dark:text-red-400 print:text-[#7A0000]">
            TAX INVOICE
          </h1>
          <p className="text-gray-600 dark:text-gray-400 print:text-gray-600">
            Commission Deduction
          </p>
        </div>
        <div className="text-right text-sm">
          <p>
            <strong>Invoice No:</strong> INV-001
          </p>
          <p>
            <strong>Date:</strong> 23 Dec 2025
          </p>
        </div>
      </div>

      {/* Seller / Buyer */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h2 className="font-semibold mb-1">Seller</h2>
          <p>Manasvi Technology Pvt Ltd</p>
          <p>GSTIN: 27ABCDE1234F1Z5</p>
          <p>Indore, Madhya Pradesh - 452001</p>
        </div>

        <div>
          <h2 className="font-semibold mb-1">Buyer</h2>
          <p>Chetna Sangthan</p>
          <p>GSTIN: 23ABCDE5678K1Z9</p>
          <p>Bhopal, Madhya Pradesh - 462001</p>
        </div>
      </div>

      {/* Invoice Table */}
      <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 print:border-gray-300 text-sm mb-6">
        <thead className="bg-gray-100 dark:bg-gray-800 print:bg-gray-100">
          <tr>
            <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">
              Description
            </th>
            <th className="border border-gray-300 dark:border-gray-700 p-2 text-right">
              Amount (₹)
            </th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Commission Charges", "5,000"],
            ["CGST (9%)", "450"],
            ["SGST (9%)", "450"],
          ].map(([label, value]) => (
            <tr key={label}>
              <td className="border border-gray-300 dark:border-gray-700 p-2">
                {label}
              </td>
              <td className="border border-gray-300 dark:border-gray-700 p-2 text-right">
                {value}
              </td>
            </tr>
          ))}

          <tr className="font-semibold">
            <td className="border border-gray-300 dark:border-gray-700 p-2">
              Total
            </td>
            <td className="border border-gray-300 dark:border-gray-700 p-2 text-right">
              5,900
            </td>
          </tr>
        </tbody>
      </table>

      {/* Footer */}
      <div className="text-right text-xs">
        <p>Authorized Signature</p>
        <p className="mt-8">_____________________</p>
      </div>

      {/* Print / Download */}
      <div className="mt-6 print:hidden">
        <button
          onClick={() => window.print()}
          className="px-4 py-2 rounded-md bg-[#7A0000] hover:bg-[#600000] text-white transition"
        >
          Download / Print Invoice
        </button>
      </div>
    </div>
  );
}
