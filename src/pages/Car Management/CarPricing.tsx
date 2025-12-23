import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

type CarPrice = {
  id: number;
  carName: string;
  hourly: number;
  daily: number;
  weekly: number;
};

export default function CarPricingPage() {
  const [pricingList, setPricingList] = useState<CarPrice[]>([
    { id: 1, carName: "Toyota Corolla", hourly: 10, daily: 50, weekly: 300 },
    { id: 2, carName: "Honda Civic", hourly: 12, daily: 60, weekly: 350 },
  ]);

  const [form, setForm] = useState({
    carName: "",
    hourly: "",
    daily: "",
    weekly: "",
  });

  const [editId, setEditId] = useState<number | null>(null);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update pricing
  const handleSubmit = () => {
    if (!form.carName || !form.hourly || !form.daily || !form.weekly) return;

    if (editId !== null) {
      setPricingList((prev) =>
        prev.map((item) =>
          item.id === editId
            ? {
                ...item,
                carName: form.carName,
                hourly: Number(form.hourly),
                daily: Number(form.daily),
                weekly: Number(form.weekly),
              }
            : item
        )
      );
      setEditId(null);
    } else {
      const newEntry: CarPrice = {
        id: Date.now(),
        carName: form.carName,
        hourly: Number(form.hourly),
        daily: Number(form.daily),
        weekly: Number(form.weekly),
      };
      setPricingList([...pricingList, newEntry]);
    }

    setForm({ carName: "", hourly: "", daily: "", weekly: "" });
  };

  const handleEdit = (id: number) => {
    const item = pricingList.find((p) => p.id === id);
    if (!item) return;
    setForm({
      carName: item.carName,
      hourly: item.hourly.toString(),
      daily: item.daily.toString(),
      weekly: item.weekly.toString(),
    });
    setEditId(id);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this pricing?")) {
      setPricingList((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Car Pricing Management</h2>

      {/* Add / Edit Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">
          {editId !== null ? "Edit Pricing" : "Add New Pricing"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Car Name"
            name="carName"
            value={form.carName}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="number"
            placeholder="Hourly Price ($)"
            name="hourly"
            value={form.hourly}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="number"
            placeholder="Daily Price ($)"
            name="daily"
            value={form.daily}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="number"
            placeholder="Weekly Price ($)"
            name="weekly"
            value={form.weekly}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition"
        >
          {editId !== null ? "Update Pricing" : "Add Pricing"}
        </button>
      </div>

      {/* Pricing List Table */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-pink-100 text-left">
            <tr>
              <th className="px-4 py-2">Car Name</th>
              <th className="px-4 py-2">Hourly ($)</th>
              <th className="px-4 py-2">Daily ($)</th>
              <th className="px-4 py-2">Weekly ($)</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pricingList.map((price) => (
              <tr
                key={price.id}
                className="even:bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <td className="px-4 py-3">{price.carName}</td>
                <td className="px-4 py-3">{price.hourly}</td>
                <td className="px-4 py-3">{price.daily}</td>
                <td className="px-4 py-3">{price.weekly}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(price.id)}
                    className="flex items-center px-3 py-1 bg-yellow-300 text-yellow-800 rounded hover:bg-yellow-400 transition"
                  >
                    <FiEdit className="mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(price.id)}
                    className="flex items-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    <FiTrash2 className="mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}

            {pricingList.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-400">
                  No pricing added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
