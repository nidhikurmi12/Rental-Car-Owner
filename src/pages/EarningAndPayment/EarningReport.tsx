import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CompletedEarningsTable from '../../components/ecommerce/CompletedEarningsTable';

const API_BASE = 'https://zoomridebackend-2.onrender.com/api';

const formatINR = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value || 0);

export default function OwnerEarningsPage() {
  const [cars, setCars] = useState([]);
  const [selectedCarId, setSelectedCarId] = useState('all');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [rows, setRows] = useState([]);
  const [totals, setTotals] = useState({ fare: 0, commission: 0, net: 0 });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  const fetchCars = async () => {
    try {
      const res = await axios.get(`${API_BASE}/owner/cars-for-earnings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCars(res.data?.data || []);
    } catch (err) {
      alert('Failed to load cars');
    }
  };

  const fetchEarnings = async () => {
    try {
      setLoading(true);
      const params = {};
      if (selectedCarId !== 'all') params.carId = selectedCarId;
      if (from) params.from = from;
      if (to) params.to = to;

      const res = await axios.get(`${API_BASE}/owner/earnings`, {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });

      setRows(res.data?.data?.rides || []);
      setTotals(res.data?.data?.totals || { fare: 0, commission: 0, net: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
    fetchEarnings();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-full rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 md:p-6 shadow-sm">
      <h2 className="text-sm font-semibold text-slate-500 dark:text-gray-400 mb-3">
        Earnings
      </h2>

      {/* Filters */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchEarnings();
        }}
        className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-4"
      >
        {/* Car */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-700 dark:text-gray-300">Car</span>
          <select
            value={selectedCarId}
            onChange={(e) => setSelectedCarId(e.target.value)}
            className="rounded-lg border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-1.5 text-sm text-slate-800 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Cars</option>
            {cars.map((c) => (
              <option key={c._id} value={c._id}>
                {c.brand} {c.model}
              </option>
            ))}
          </select>
        </div>

        {/* Dates */}
        {['From', 'To'].map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <span className="text-sm text-slate-700 dark:text-gray-300">
              {label}
            </span>
            <input
              type="date"
              value={i === 0 ? from : to}
              onChange={(e) =>
                i === 0 ? setFrom(e.target.value) : setTo(e.target.value)
              }
              className="rounded-lg border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-1.5 text-sm text-slate-800 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        ))}

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? 'Loading…' : 'Filter'}
          </button>

          <button
            type="button"
            onClick={() => rows.length && window.alert('CSV Downloaded')}
            className="rounded-md border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-1.5 text-sm text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-700"
          >
            Download CSV
          </button>
        </div>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border-collapse">
          <thead>
            <tr className="border-y border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800">
              {['Ride ID', 'Car', 'Date', 'Fare', 'Commission', 'Net'].map(
                (h, i) => (
                  <th
                    key={h}
                    className={`py-2 px-4 font-semibold text-slate-700 dark:text-gray-300 ${
                      i >= 3 ? 'text-right' : 'text-left'
                    }`}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="py-4 text-center text-slate-500 dark:text-gray-400"
                >
                  No rides found.
                </td>
              </tr>
            )}

            {rows.map((row) => (
              <tr
                key={row.rideId}
                className="border-b border-slate-100 dark:border-gray-700"
              >
                <td className="px-4 py-2 text-indigo-600 dark:text-indigo-400 font-medium">
                  {row.rideId}
                </td>
                <td className="px-4 py-2 text-slate-800 dark:text-gray-200">
                  {row.carName}
                </td>
                <td className="px-4 py-2 text-slate-600 dark:text-gray-400">
                  {new Date(row.date).toLocaleDateString('en-GB')}
                </td>
                <td className="px-4 py-2 text-right text-slate-800 dark:text-gray-200">
                  {formatINR(row.fare)}
                </td>
                <td className="px-4 py-2 text-right text-slate-800 dark:text-gray-200">
                  {formatINR(row.commission)}
                </td>
                <td className="px-4 py-2 text-right font-semibold text-slate-900 dark:text-white">
                  {formatINR(row.net)}
                </td>
              </tr>
            ))}
          </tbody>

          {rows.length > 0 && (
            <tfoot>
              <tr className="bg-slate-50 dark:bg-gray-800 border-t border-slate-200 dark:border-gray-700">
                <td colSpan={3} className="px-4 py-2 text-right font-semibold">
                  Total
                </td>
                <td className="px-4 py-2 text-right font-semibold">
                  {formatINR(totals.fare)}
                </td>
                <td className="px-4 py-2 text-right font-semibold">
                  {formatINR(totals.commission)}
                </td>
                <td className="px-4 py-2 text-right font-semibold">
                  {formatINR(totals.net)}
                </td>
              </tr>
            </tfoot>
          )}
        </table>

        <CompletedEarningsTable
          carId={selectedCarId}
          from={from}
          to={to}
        />
      </div>
    </div>
  );
}
