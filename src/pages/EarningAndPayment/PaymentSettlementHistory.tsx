import React from "react";
import {
  FiDollarSign,
  FiCheckCircle,
  FiClock,
  FiCreditCard,
} from "react-icons/fi";

type Settlement = {
  id: string;
  date: string;
  bookingId: string;
  carName: string;
  amount: number;
  status: "Paid" | "Pending";
};

const settlements: Settlement[] = [
  {
    id: "1",
    date: "10 Jan 2025",
    bookingId: "BK-10231",
    carName: "Toyota Corolla",
    amount: 320,
    status: "Paid",
  },
  {
    id: "2",
    date: "12 Jan 2025",
    bookingId: "BK-10245",
    carName: "Honda Civic",
    amount: 180,
    status: "Pending",
  },
  {
    id: "3",
    date: "15 Jan 2025",
    bookingId: "BK-10288",
    carName: "Hyundai Creta",
    amount: 450,
    status: "Paid",
  },
];

export default function PaymentSettlementHistory() {
  const total = settlements.reduce((s, i) => s + i.amount, 0);
  const paid = settlements
    .filter((s) => s.status === "Paid")
    .reduce((s, i) => s + i.amount, 0);
  const pending = total - paid;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* 🔝 Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Payment Settlement History
          </h1>
          <p className="text-gray-500 mt-1">
            Track your earnings and settlement payments
          </p>
        </div>

        {/* 💎 Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Earnings"
            value={`$${total}`}
            icon={<FiDollarSign />}
            gradient="from-indigo-500 to-purple-500"
          />
          <StatCard
            title="Settled Amount"
            value={`$${paid}`}
            icon={<FiCheckCircle />}
            gradient="from-green-500 to-emerald-500"
          />
          <StatCard
            title="Pending Amount"
            value={`$${pending}`}
            icon={<FiClock />}
            gradient="from-yellow-500 to-orange-500"
          />
        </div>

        {/* 📄 Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <FiCreditCard /> Settlement Records
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 text-left">Date</th>
                  <th className="px-6 py-4 text-left">Booking</th>
                  <th className="px-6 py-4 text-left">Car</th>
                  <th className="px-6 py-4 text-left">Amount</th>
                  <th className="px-6 py-4 text-left">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {settlements.map((s) => (
                  <tr
                    key={s.id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4">{s.date}</td>

                    <td className="px-6 py-4 font-medium text-indigo-600">
                      {s.bookingId}
                    </td>

                    <td className="px-6 py-4">{s.carName}</td>

                    <td className="px-6 py-4 font-semibold">
                      ${s.amount}
                    </td>

                    <td className="px-6 py-4">
                      {s.status === "Paid" ? (
                        <StatusBadge
                          text="Paid"
                          icon={<FiCheckCircle />}
                          color="green"
                        />
                      ) : (
                        <StatusBadge
                          text="Pending"
                          icon={<FiClock />}
                          color="yellow"
                        />
                      )}
                    </td>
                  </tr>
                ))}

                {settlements.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-10 text-gray-400"
                    >
                      No settlement records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({
  title,
  value,
  icon,
  gradient,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  gradient: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl shadow-lg text-white bg-gradient-to-r ${gradient}`}
    >
      <div className="p-6 flex justify-between items-center">
        <div>
          <p className="text-sm opacity-90">{title}</p>
          <h2 className="text-3xl font-bold mt-1">{value}</h2>
        </div>
        <div className="text-4xl opacity-80">{icon}</div>
      </div>
      <div className="absolute inset-0 bg-white/10 pointer-events-none" />
    </div>
  );
}

function StatusBadge({
  text,
  icon,
  color,
}: {
  text: string;
  icon: React.ReactNode;
  color: "green" | "yellow";
}) {
  const styles =
    color === "green"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${styles}`}
    >
      {icon}
      {text}
    </span>
  );
}
