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

  // Fetch owner's cars for dropdown
  const fetchCars = async () => {
    try {
      const res = await axios.get(`${API_BASE}/owner/cars-for-earnings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const list = res.data?.data || [];
      setCars(list);
      if (!selectedCarId && list[0]) {
        setSelectedCarId(list[0]._id);
      }
    } catch (err) {
      console.error('fetchCars error', err);
      alert('Failed to load cars');
    }
  };

  // Fetch earnings
  const fetchEarnings = async () => {
    try {
      setLoading(true);
      const params = {};
      if (selectedCarId && selectedCarId !== 'all') params.carId = selectedCarId;
      if (from) params.from = from;
      if (to) params.to = to;

      const res = await axios.get(`${API_BASE}/owner/earnings`, {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data?.data || {};
      setRows(data.rides || []);
      setTotals(data.totals || { fare: 0, commission: 0, net: 0 });
    } catch (err) {
      console.error('fetchEarnings error', err);
      alert('Failed to load earnings');
    } finally {
      setLoading(false);
    }
  };

  // Initial: load cars and earnings
  useEffect(() => {
    fetchCars();
    fetchEarnings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchEarnings();
  };

  const handleDownloadCSV = () => {
    if (!rows.length) {
      alert('No data to download');
      return;
    }

    const header = ['Ride ID', 'Car', 'Date', 'Fare', 'Commission', 'Net'];
    const csvRows = [header.join(',')];

    rows.forEach((r) => {
      const dateStr = new Date(r.date).toLocaleDateString('en-GB'); // dd/mm/yyyy
      csvRows.push(
        [
          r.rideId,
          r.carName,
          dateStr,
          r.fare,
          r.commission,
          r.net,
        ].join(',')
      );
    });

    const blob = new Blob([csvRows.join('\n')], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'earnings.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-slate-100 p-4 md:p-6">
      <h2 className="text-sm font-semibold text-slate-500 mb-3">Earnings</h2>

      {/* Filter row */}
      <form
        onSubmit={handleFilter}
        className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4 mb-4"
      >
        {/* Car select */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-700">Car</span>
          <select
            value={selectedCarId}
            onChange={(e) => setSelectedCarId(e.target.value)}
            className="min-w-[180px] rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Cars</option>
            {cars.map((c) => (
              <option key={c._id} value={c._id}>
                {c.brand} {c.model}
              </option>
            ))}
          </select>
        </div>

        {/* From date */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-700">From</span>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* To date */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-700">To</span>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-1">
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white shadow hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? 'Loading...' : 'Filter'}
          </button>

          <button
            type="button"
            onClick={handleDownloadCSV}
            className="rounded-md border border-slate-300 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Download CSV
          </button>
        </div>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border-collapse">
          <thead>
            <tr className="border-y border-slate-200 bg-slate-50">
              <th className="py-2 px-4 text-left font-semibold text-slate-700">
                Ride ID
              </th>
              <th className="py-2 px-4 text-left font-semibold text-slate-700">
                Car
              </th>
              <th className="py-2 px-4 text-left font-semibold text-slate-700">
                Date
              </th>
              <th className="py-2 px-4 text-right font-semibold text-slate-700">
                Fare
              </th>
              <th className="py-2 px-4 text-right font-semibold text-slate-700">
                Commission
              </th>
              <th className="py-2 px-4 text-right font-semibold text-slate-700">
                Net
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="py-4 px-4 text-center text-slate-500"
                >
                  No rides found for the selected filters.
                </td>
              </tr>
            )}

            {rows.map((row) => (
              <tr key={row.rideId} className="border-b border-slate-100">
                <td className="py-2 px-4 text-indigo-600 font-medium">
                  {row.rideId}
                </td>
                <td className="py-2 px-4 text-slate-800">{row.carName}</td>
                <td className="py-2 px-4 text-slate-700">
                  {new Date(row.date).toLocaleDateString('en-GB')}
                </td>
                <td className="py-2 px-4 text-right text-slate-800">
                  {formatINR(row.fare)}
                </td>
                <td className="py-2 px-4 text-right text-slate-800">
                  {formatINR(row.commission)}
                </td>
                <td className="py-2 px-4 text-right font-semibold text-slate-900">
                  {formatINR(row.net)}
                </td>
              </tr>
            ))}
          </tbody>

          {rows.length > 0 && (
            <tfoot>
              <tr className="border-t border-slate-200 bg-slate-50">
                <td className="py-2 px-4 text-right font-semibold" colSpan={3}>
                  Total
                </td>
                <td className="py-2 px-4 text-right font-semibold">
                  {formatINR(totals.fare)}
                </td>
                <td className="py-2 px-4 text-right font-semibold">
                  {formatINR(totals.commission)}
                </td>
                <td className="py-2 px-4 text-right font-semibold">
                  {formatINR(totals.net)}
                </td>
              </tr>
            </tfoot>
          )}
        </table>
       <> <CompletedEarningsTable carId={selectedCarId} from={from} to={to} /></>
      </div>
    </div>
  );
}
