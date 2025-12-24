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

  useEffect(() => {
    const params = {};
    if (carId && carId !== 'all') params.carId = carId;
    if (from) params.from = from;
    if (to) params.to = to;
    dispatch(fetchCompletedEarnings(params));
  }, [carId, from, to, dispatch]);

  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold text-slate-500 dark:text-gray-400 mb-2">
        Completed Earnings
      </h3>

      <div className="border border-blue-400 dark:border-blue-500 rounded-lg bg-white dark:bg-gray-900 overflow-hidden">
        {loading && (
          <div className="px-4 py-2 text-sm text-slate-600 dark:text-gray-300">
            Loading...
          </div>
        )}

        {error && (
          <div className="px-4 py-2 text-sm text-red-600 dark:text-red-400 border-b border-slate-200 dark:border-gray-700">
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800">
                {[
                  'Ride ID',
                  'Date',
                  'Car',
                  'Type',
                  'Fare',
                  'Commission',
                  'Net',
                  'Status',
                ].map((h, i) => (
                  <th
                    key={h}
                    className={`py-2 px-4 font-semibold text-slate-700 dark:text-gray-300 ${
                      i >= 4 ? 'text-right' : 'text-left'
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {(!rows || rows.length === 0) && !loading && (
                <tr>
                  <td
                    colSpan={8}
                    className="py-3 px-4 text-center text-slate-500 dark:text-gray-400"
                  >
                    No completed rides found.
                  </td>
                </tr>
              )}

              {rows.map((r) => (
                <tr
                  key={r.rideId}
                  className="border-b border-slate-100 dark:border-gray-700"
                >
                  <td className="py-2 px-4 text-indigo-600 dark:text-indigo-400 font-medium">
                    {r.rideId}
                  </td>

                  <td className="py-2 px-4 text-slate-700 dark:text-gray-400">
                    {new Date(r.date).toLocaleDateString('en-GB')}
                  </td>

                  <td className="py-2 px-4 text-slate-800 dark:text-gray-200">
                    {r.carName}
                  </td>

                  <td className="py-2 px-4 text-slate-800 dark:text-gray-200">
                    {r.rideType}
                  </td>

                  <td className="py-2 px-4 text-right text-slate-800 dark:text-gray-200">
                    {formatINR(r.fare)}
                  </td>

                  <td className="py-2 px-4 text-right text-slate-800 dark:text-gray-200">
                    {formatINR(r.commission)}
                  </td>

                  <td className="py-2 px-4 text-right font-semibold text-slate-900 dark:text-white">
                    {formatINR(r.net)}
                  </td>

                  <td className="py-2 px-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium
                        ${
                          r.status === 'Settled'
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                            : r.status === 'Pending'
                            ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                            : 'bg-slate-100 text-slate-600 dark:bg-gray-700 dark:text-gray-300'
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
