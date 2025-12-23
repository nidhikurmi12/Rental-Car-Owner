import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompletedEarnings } from '../../redux/slice/completedEarningsSlice';


const formatINR = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value || 0);

export default function CompletedEarningsTable({ carId, from, to }) {
  const dispatch = useDispatch();
  const { loading, error, rows } = useSelector((s) => s.completedEarnings);

  // load on mount / filters change
  useEffect(() => {
    const params = {};
    if (carId && carId !== 'all') params.carId = carId;
    if (from) params.from = from;
    if (to) params.to = to;

    dispatch(fetchCompletedEarnings(params));
  }, [carId, from, to, dispatch]);

  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold text-slate-500 mb-2">
        Completed earning
      </h3>

      <div className="border border-blue-400 rounded-lg bg-white overflow-hidden">
        {loading && (
          <div className="px-4 py-2 text-sm text-slate-600">Loading...</div>
        )}

        {error && (
          <div className="px-4 py-2 text-sm text-red-600 border-b border-slate-200">
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="py-2 px-4 text-left font-semibold text-slate-700">
                  Ride ID
                </th>
                <th className="py-2 px-4 text-left font-semibold text-slate-700">
                  Date
                </th>
                <th className="py-2 px-4 text-left font-semibold text-slate-700">
                  Car
                </th>
                <th className="py-2 px-4 text-left font-semibold text-slate-700">
                  Type
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
                <th className="py-2 px-4 text-left font-semibold text-slate-700">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {(!rows || rows.length === 0) && !loading && (
                <tr>
                  <td
                    colSpan={8}
                    className="py-3 px-4 text-center text-slate-500"
                  >
                    No completed rides found.
                  </td>
                </tr>
              )}

              {rows.map((r) => (
                <tr key={r.rideId} className="border-b border-slate-100">
                  <td className="py-2 px-4 text-indigo-600 font-medium">
                    {r.rideId}
                  </td>
                  <td className="py-2 px-4 text-slate-700">
                    {new Date(r.date).toLocaleDateString('en-GB')}
                  </td>
                  <td className="py-2 px-4 text-slate-800">{r.carName}</td>
                  <td className="py-2 px-4 text-slate-800">{r.rideType}</td>
                  <td className="py-2 px-4 text-right text-slate-800">
                    {formatINR(r.fare)}
                  </td>
                  <td className="py-2 px-4 text-right text-slate-800">
                    {formatINR(r.commission)}
                  </td>
                  <td className="py-2 px-4 text-right font-semibold text-slate-900">
                    {formatINR(r.net)}
                  </td>
                  <td className="py-2 px-4 text-slate-800">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium
                        ${
                          r.status === 'Settled'
                            ? 'bg-emerald-50 text-emerald-700'
                            : r.status === 'Pending'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-slate-50 text-slate-600'
                        }
                      `}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
