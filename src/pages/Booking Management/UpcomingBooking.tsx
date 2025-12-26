import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../../redux/slice/bookingsSlice";

export default function UpcomingBooking() {
    const dispatch = useDispatch();
    const { bookings, loading, error } = useSelector((s) => s.bookingsall);
    console.log("Bookings in AllBookings.jsx:", bookings);
  
    useEffect(() => {
      dispatch(getAllBookings());
    }, [dispatch]);

    const UpcomingBooking = bookings.filter((booking) => booking.status === "pending");
    console.log("Upcoming Bookings:", UpcomingBooking);
    return (
      <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
  
          {/* 🔝 Header + Search */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              Upcoming Bookings
            </h1>
          </div>
  
          {/* 📊 Table */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
            {loading ? (
              <div className="text-center py-10 text-gray-500">Loading bookings...</div>
            ) : error ? (
              <div className="text-center py-10 text-red-500">{error}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-gray-700">
                  <thead className="bg-gray-100 sticky top-0 dark:bg-gray-800">
                    <tr>
                      {[
                        "S.No",
                        "Customer Name",
                        "Car",
                        "Reg No",
                        "Start Date",
                        "End Date",
                        "Total Amount",
                        "Status",
                        
                      ].map((head) => (
                        <th
                          key={head}
                          className="px-4 py-3 text-nowrap text-left font-semibold text-gray-600 uppercase text-xs dark:text-gray-200"
                        >
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
  
                  <tbody className="divide-y">
                    {UpcomingBooking.length === 0 ? (
                      <tr>
                        <td
                          colSpan={9}
                          className="text-center py-10 text-gray-500"
                        >
                          No upcoming bookings found
                        </td>
                      </tr>
                    ) : (
                      UpcomingBooking.map((booking, idx) => (
                        <tr
                          key={booking._id}
                          className="hover:bg-gray-50 transition duration-200 dark:hover:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:bg-gray-900"
                        >
                          <td className="px-4 py-4 font-medium">{idx + 1}</td>
                          <td className="px-4 py-4 font-medium">
                            {booking.user?.name || "N/A"}
                          </td>
                          <td className="px-4 py-4 font-semibold text-nowrap">
                            {booking.car?.brand} {booking.car?.model}
                          </td>
                          <td className="px-4 py-4">{booking.car?.vehicleNumber || "N/A"}</td>
                          <td className="px-4 py-4">
                            {new Date(booking.startDate).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-4">
                            {new Date(booking.endDate).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-4 font-semibold">
                            ₹{booking.totalAmount?.toLocaleString() || "0"}
                          </td>
                          <td className="px-4 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              booking.status === "pending" 
                                ? "bg-yellow-100 text-yellow-800" 
                                : booking.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}>
                              {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)}
                            </span>
                          </td>
  
                         
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    );
}