// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import { useDispatch, useSelector } from "react-redux";
// import { getAllCars,getCarById,deleteCar,updateCar } from "../redux/slice/carSlice";



// export default function CarManagement() {
//   const [cars, setCars] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
//   const [query, setQuery] = useState('')

//   // fetch cars from API
//   const fetchCars = async () => {
//     try {
//       setLoading(true)
//       setError('')
//       const res = await axios.get('/api/cars') // <-- change to your API endpoint
//       setCars(res.data || [])
//     } catch (err) {
//       console.error(err)
//       setError('Failed to load cars')
//       // fallback: setCars(sampleData)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchCars()
//   }, [])

//   const handleDelete = async (id) => {
//     if (!confirm('Delete this car?')) return
//     try {
//       await axios.delete(`/api/cars/${id}`)
//       setCars(prev => prev.filter(c => c._id !== id))
//     } catch (err) {
//       console.error(err)
//       alert('Delete failed')
//     }
//   }

//   const filtered = cars?.filter(car => {
//     const t = query.trim().toLowerCase()
//     if (!t) return true
//     return (
//       (car.brand || '').toLowerCase().includes(t) ||
//       (car.model || '').toLowerCase().includes(t) ||
//       (car.variant || '').toLowerCase().includes(t) ||
//       (car.vehicleNumber || '').toLowerCase().includes(t)
//     )
//   })

//   return (
//     <div className="min-h-screen bg-pink-50 p-6">
//       <div className="max-w-5xl mx-auto">
//         <h2 className="text-gray-500 text-sm mb-4">manage car</h2>

//         {/* Search area */}
//         <div className="flex justify-center mb-8">
//           <input
//             value={query}
//             onChange={e => setQuery(e.target.value)}
//             placeholder="Search"
//             className="w-3/4 md:w-2/3 bg-white/80 placeholder-gray-400 text-gray-700 text-2xl text-center rounded-xl py-3 shadow-inner border border-gray-200"
//           />
//         </div>

//         {/* Table container with card-like background similar to the image */}
//         <div className="bg-white/80 rounded-md p-6 shadow-sm border border-gray-200">
//           {loading ? (
//             <div className="text-center py-8 text-gray-500">Loading...</div>
//           ) : error ? (
//             <div className="text-center py-8 text-red-500">{error}</div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full border-collapse table-fixed">
//                 <thead>
//                   <tr className="bg-pink-100">
//                     <th className="px-3 py-2 border text-left w-16">s.no</th>
//                     <th className="px-3 py-2 border text-left">Car Model</th>
//                     <th className="px-3 py-2 border text-left">Variant</th>
//                     <th className="px-3 py-2 border text-left">Registration Number</th>
//                     <th className="px-3 py-2 border text-left">Car Type</th>
//                     <th className="px-3 py-2 border text-left">Color</th>
//                     <th className="px-3 py-2 border text-left">Seating capacity</th>
//                     <th className="px-3 py-2 border text-left w-40">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filtered.length === 0 ? (
//                     <tr>
//                       <td className="px-3 py-8 border text-center" colSpan={8}>
//                         No cars found
//                       </td>
//                     </tr>
//                   ) : (
//                     filtered.map((car, idx) => (
//                       <tr key={car._id || idx} className="odd:bg-white even:bg-pink-50">
//                         <td className="px-3 py-5 border align-top">{idx + 1}</td>
//                         <td className="px-3 py-5 border align-top">{car.brand} {car.model}</td>
//                         <td className="px-3 py-5 border align-top">{car.variant}</td>
//                         <td className="px-3 py-5 border align-top">{car.vehicleNumber}</td>
//                         <td className="px-3 py-5 border align-top">{car.carType}</td>
//                         <td className="px-3 py-5 border align-top">{car.color}</td>
//                         <td className="px-3 py-5 border align-top">{car.seats}</td>
//                         <td className="px-3 py-5 border align-top">
//                           <div className="flex flex-col gap-2">
//                             <button
//                               onClick={() => alert('View: ' + (car._id || ''))}
//                               className="text-left hover:underline"
//                             >
//                               View
//                             </button>
//                             <button
//                               onClick={() => alert('Edit: ' + (car._id || ''))}
//                               className="text-left hover:underline"
//                             >
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => handleDelete(car._id)}
//                               className="text-left text-red-600 hover:underline"
//                             >
//                               Delete
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//       </div>
//     </div>
//   )
// }
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllCars, deleteCar, getCarById } from "../../redux/slice/carSlice";
import { useNavigate } from 'react-router-dom';

export default function CarManagement() {
  const dispatch = useDispatch();
  const navigatory = useNavigate();

  // Redux Store Data
  const { cars, loading, error } = useSelector((state) => state.cars);
  console.log("Cars from Redux Store:", cars,loading,error);

  // Local State
  const [query, setQuery] = useState("");

  // Fetch cars on page load
  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  // Delete Handler
  const handleDelete = (id) => {
    if (!window.confirm("Delete this car?")) return;
    dispatch(deleteCar(id)).then(() => {
      dispatch(getAllCars());
    }).then(()=>{
      dispatch(getAllCars());
    })
  };
const handleAvailability = (id) => {
   navigatory(`/dashboard/owner/cars/${id}/availability`)
  };
  // View / Edit Handler
  const handleView = (id) => {
    // dispatch(getCarById(id)); // You can show modal or navigate to details page
    // alert(`View Car ID: ${id}`);
    navigatory(`/dashboard/view-car/${id}`)
  };

  const handleEdit = (id) => {
    dispatch(getCarById(id)); // You can pre-fill form in modal
    navigatory(`/dashboard/EditCar/${id}`);
  };

  // 🔍 Search Filter
  const filteredCars = cars?.filter((car) => {
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
    <div className=" min-h-screen bg-pink-50 p-6">
      <div className="w-full mx-auto">
        <h2 className="text-gray-500 text-sm mb-4">Manage Car</h2>

        {/* 🔎 Search */}
        <div className="flex justify-center mb-8">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="w-3/4 md:w-2/3 bg-white/80 placeholder-gray-400 text-gray-700 text-2xl text-center rounded-xl py-3 shadow-inner border border-gray-200"
          />
        </div>

        {/* 🏷️ Table */}
        <div className=" bg-white/80 rounded-md p-6 shadow-sm border border-gray-200 ">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="container-fluid min-w-full border-collapse table-fixed">
                <thead>
                  <tr className="bg-pink-100">
                    <th className="px-3 py-2 border text-left w-16">S.No</th>
                    <th className="px-3 py-2 border text-left">Car Model</th>
                    <th className="px-3 py-2 border text-left">Variant</th>
                    <th className="px-3 py-2 border text-left">Registration Number</th>
                    <th className="px-3 py-2 border text-left">Car Type</th>
                    <th className="px-3 py-2 border text-left">Color</th>
                    <th className="px-3 py-2 border text-left">Seating</th>
                    <th className="px-3 py-2 border text-left w-40">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredCars?.length === 0 ? (
                    <tr>
                      <td className="px-3 py-8 border text-center" colSpan={8}>
                        No cars found
                      </td>
                    </tr>
                  ) : (
                    filteredCars.map((car, idx) => (
                      <tr key={car._id || idx} className="odd:bg-white even:bg-pink-50">
                        <td className="px-3 py-5 border align-top">{idx + 1}</td>
                        <td className="px-3 py-5 border align-top">{car.brand} {car.model}</td>
                        <td className="px-3 py-5 border align-top">{car.variant}</td>
                        <td className="px-3 py-5 border align-top">{car.vehicleNumber}</td>
                        <td className="px-3 py-5 border align-top">{car.carType}</td>
                        <td className="px-3 py-5 border align-top">{car.color}</td>
                        <td className="px-3 py-5 border align-top">{car.seats}</td>

                        {/* 🚦 Actions */}
                        <td className="px-3 py-5 border align-top">
                          <div className="flex flex-row gap-4 items-center">
                            <button
                              onClick={() => handleView(car._id)}
                              className="text-left hover:underline"
                            >
                              View
                            </button>

                            <button
                              onClick={() => handleEdit(car._id)}
                              className="text-left hover:underline"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => handleDelete(car._id)}
                              className="text-left text-red-600 hover:underline"
                            >
                              Delete
                            </button>
                             <button
                              onClick={() => handleAvailability(car._id)}
                              className="text-left text-red-600 hover:underline"
                            >
                              Availability
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
