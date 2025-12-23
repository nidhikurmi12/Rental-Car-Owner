import React from "react";

export default function GSTInvoice() {
  return (
    <div className="p-8 bg-white text-sm print:p-0 print:shadow-none">
      {/* Header */}
      <div className="flex justify-between border-b pb-4 mb-4">
        <div>
          <h1 className="text-xl font-bold text-[#7A0000]">
            TAX INVOICE
          </h1>
          <p className="text-gray-600">Commission Deduction</p>
        </div>
        <div className="text-right">
          <p><strong>Invoice No:</strong> INV-001</p>
          <p><strong>Date:</strong> 23 Dec 2025</p>
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
      <table className="w-full border-collapse border text-sm mb-6">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">Description</th>
            <th className="border p-2 text-right">Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">Commission Charges</td>
            <td className="border p-2 text-right">5,000</td>
          </tr>
          <tr>
            <td className="border p-2">CGST (9%)</td>
            <td className="border p-2 text-right">450</td>
          </tr>
          <tr>
            <td className="border p-2">SGST (9%)</td>
            <td className="border p-2 text-right">450</td>
          </tr>
          <tr className="font-semibold">
            <td className="border p-2">Total</td>
            <td className="border p-2 text-right">5,900</td>
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
          className="px-4 py-2 bg-[#7A0000] text-white rounded-md"
        >
          Download / Print Invoice
        </button>
      </div>
    </div>
  );
}
