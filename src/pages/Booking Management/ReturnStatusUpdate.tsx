import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCars, deleteCar, getCarById } from "../../redux/slice/carSlice";
import { useNavigate } from "react-router-dom";

export default function ReturnStatusUpdate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux State
  const { cars = [], loading, error } = useSelector((state: any) => state.cars);

  // Local State
  const [query, setQuery] = useState("");

  // Fetch Cars
  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  // Handlers
  const handleDelete = (id: string) => {
    if (!window.confirm("Delete this car?")) return;
    dispatch(deleteCar(id)).then(() => {
      dispatch(getAllCars());
    });
  };

  const handleView = (id: string) => {
    navigate(`/dashboard/view-car/${id}`);
  };

  const handleEdit = (id: string) => {
    dispatch(getCarById(id));
    navigate(`/dashboard/EditCar/${id}`);
  };

  const handleAvailability = (id: string) => {
    navigate(`/dashboard/owner/cars/${id}/availability`);
  };

  // Filter
  const filteredCars = cars.filter((car: any) => {
    const t = query.trim().toLowerCase();
    if (!t) return true;
    return (
      (car.brand || "").toLowerCase().includes(t) ||
      (car.model || "").toLowerCase().includes(t) ||
      (car.variant || "").toLowerCase().includes(t) ||
      (car.vehicleNumber || "").toLowerCase().includes(t)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* 🔝 Header + Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            Car Management
          </h1>

          <div className="relative w-full md:w-80">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cars..."
              className="
                w-full pl-10 pr-4 py-2 rounded-lg
                border border-gray-300
                bg-white text-gray-700
                focus:ring-2 focus:ring-pink-400
                focus:outline-none
                shadow-sm
              "
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M16.65 10.5a6.15 6.15 0 11-12.3 0 6.15 6.15 0 0112.3 0z"
              />
            </svg>
          </div>
        </div>

        {/* 📊 Table */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="text-center py-10 text-gray-500">Loading cars...</div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-gray-100 sticky top-0">
                  <tr>
                    {[
                      "S.No",
                      "Car",
                      "Variant",
                      "Reg No",
                      "Type",
                      "Color",
                      "Seats",
                      "Actions",
                    ].map((head) => (
                      <th
                        key={head}
                        className="px-4 py-3 text-left font-semibold text-gray-600 uppercase text-xs"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {filteredCars.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="text-center py-10 text-gray-500"
                      >
                        No cars found
                      </td>
                    </tr>
                  ) : (
                    filteredCars.map((car: any, idx: number) => (
                      <tr
                        key={car._id}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="px-4 py-4 font-medium">{idx + 1}</td>
                        <td className="px-4 py-4 font-semibold">
                          {car.brand} {car.model}
                        </td>
                        <td className="px-4 py-4">{car.variant}</td>
                        <td className="px-4 py-4">{car.vehicleNumber}</td>
                        <td className="px-4 py-4">{car.carType}</td>
                        <td className="px-4 py-4">{car.color}</td>
                        <td className="px-4 py-4">{car.seats}</td>

                        {/* 🚦 Actions */}
                        <td className="px-4 py-4">
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => handleView(car._id)}
                              className="px-3 py-1 rounded-md text-xs bg-blue-50 text-blue-600 hover:bg-blue-100"
                            >
                              View
                            </button>

                            <button
                              onClick={() => handleEdit(car._id)}
                              className="px-3 py-1 rounded-md text-xs bg-yellow-50 text-yellow-600 hover:bg-yellow-100"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => handleAvailability(car._id)}
                              className="px-3 py-1 rounded-md text-xs bg-green-50 text-green-600 hover:bg-green-100"
                            >
                              Availability
                            </button>

                            <button
                              onClick={() => handleDelete(car._id)}
                              className="px-3 py-1 rounded-md text-xs bg-red-50 text-red-600 hover:bg-red-100"
                            >
                              Delete
                            </button>
                          </div>
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
