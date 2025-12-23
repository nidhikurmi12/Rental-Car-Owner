import React, { useState, useMemo } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createCar } from "../../redux/slice/carSlice";

const initialBasic = {
  brand: "",
  model: "",
  variant: "",
  vehicleNumber: "",
  carType: "Hatchback",
  fuelType: "Petrol",
  year: "",
  color: "",
  transmission: "Automatic",
  seats: 4,
  features: [],
  pricing: { hourly: 0, daily: 0, weekly: 0, monthly: 0 },
  securityDeposit: 0,
  location: { address: "", city: "", state: "", pincode: "",lat: "",   
    lng: ""  },
  description: ""
};

export default function AddCar() {
  const dispatch = useDispatch();
  const [step, setStep] = useState(0);
  const [basic, setBasic] = useState(initialBasic);

  // documents -> single file per required doc (4)
  const [docs, setDocs] = useState([null, null, null, null]); // 4 docs

  // images -> 4 exterior + 4 interior slots
  const [exteriorSlots, setExteriorSlots] = useState([null, null, null, null]);
  const [interiorSlots, setInteriorSlots] = useState([null, null, null, null]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // helper to create preview URLs (remember to revoke if heavy in production)
  const fileToObjectURL = (f) => (f ? URL.createObjectURL(f) : "");

  function handleBasicChange(e) {
    const { name, value } = e.target;
    if (name.startsWith("pricing.")) {
      const key = name.split(".")[1];
      setBasic((s) => ({ ...s, pricing: { ...s.pricing, [key]: value } }));
    } else {
      setBasic((s) => ({ ...s, [name]: value }));
    }
  }

  // docs handlers - single file per row
  function handleDocChange(index, e) {
    const file = e.target.files[0] || null;
    setDocs((prev) => {
      const copy = [...prev];
      copy[index] = file;
      return copy;
    });
  }

  // images handlers - per-slot
  function handleExteriorChange(index, e) {
    const file = e.target.files[0] || null;
    setExteriorSlots((prev) => {
      const copy = [...prev];
      copy[index] = file;
      return copy;
    });
  }
  function handleInteriorChange(index, e) {
    const file = e.target.files[0] || null;
    setInteriorSlots((prev) => {
      const copy = [...prev];
      copy[index] = file;
      return copy;
    });
  }
async function handleSubmit(e) {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const formData = new FormData();

    // Skip location, pricing, features here
    Object.keys(basic).forEach((key) => {
      if (key === "pricing" || key === "location" || key === "features") return;
      formData.append(key, basic[key]);
    });

    // Pricing
    Object.keys(basic.pricing).forEach((p) => {
      formData.append(`pricing[${p}]`, basic.pricing[p]);
    });

    // Location
    Object.keys(basic.location).forEach((p) => {
      formData.append(`location[${p}]`, basic.location[p]);
    });

    // Features
    basic.features.forEach((f) => formData.append("features[]", f));

    // Documents
    docs.forEach((f) => f && formData.append("documents", f));

    // Images
    exteriorSlots.forEach((f) => f && formData.append("exteriorImages", f));
    interiorSlots.forEach((f) => f && formData.append("interiorImages", f));

    const res = await dispatch(createCar(formData)).unwrap();

    alert("Car created successfully!");

    setBasic(initialBasic);
    setDocs([null, null, null, null]);
    setExteriorSlots([null, null, null, null]);
    setInteriorSlots([null, null, null, null]);
    setStep(0);

  } catch (err) {
    console.error(err);
    setError(err.message || "Network error");
  } finally {
    setLoading(false);
  }
}


  const steps = ["Basic Car Details", "Vehicle Documents Upload", "Vehicle Images Upload"];
  const progressPercent = useMemo(() => ((step / (steps.length - 1)) * 100).toFixed(2), [step]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-12 px-4">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-md p-6">
        {/* Stepper */}
        <div>
          <div className="relative">
            <div className="h-1 bg-gray-200 rounded-full" />
            <div className="h-1 bg-indigo-600 rounded-full absolute top-0 left-0 transition-all duration-300" style={{ width: `${progressPercent}%` }} />
            <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
              {steps.map((s, i) => {
                const completed = i <= step;
                return (
                  <div key={i} className="relative w-12 flex flex-col items-center -mt-6">
                    <button
                      type="button"
                      onClick={() => setStep(i)}
                      className={`pointer-events-auto w-9 h-9 rounded-full flex items-center justify-center transition ${
                        completed ? "bg-green-500 text-white shadow-lg" : "bg-white border border-gray-300 text-gray-600"
                      }`}
                    >
                      <span className="text-sm font-medium">{i + 1}</span>
                    </button>
                    <div className="text-xs text-gray-500 mt-1 text-center w-28">{s}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Add gap between stepper and form */}
        <div className="mt-8" />

        <form onSubmit={handleSubmit}>
          {/* center container */}
          <div className="max-w-3xl mx-auto">
            {/* STEP 0 - Basic details */}
            <div className={step === 0 ? "block" : "hidden"}>
              <h2 className="text-center text-lg font-semibold mb-6">Basic Car Details</h2>

              <div className="space-y-4">
                {[
                  { label: "Car Name", name: "brand" },
                  { label: "Car Model", name: "model" },
                  { label: "Variant", name: "variant" },
                  { label: "Registration Number", name: "vehicleNumber" },
                ].map((f) => (
                  <div key={f.name} className="grid grid-cols-12 items-center gap-4">
                    <label className="col-span-4 text-sm text-gray-700">{f.label}</label>
                    <div className="col-span-8">
                      <input
                        name={f.name}
                        value={basic[f.name]}
                        onChange={handleBasicChange}
                        className="w-full p-3 border rounded bg-white focus:ring-2 focus:ring-indigo-100"
                        placeholder=""
                      />
                    </div>
                  </div>
                ))}

                <div className="grid grid-cols-12 items-center gap-4">
                  <label className="col-span-4 text-sm text-gray-700">Car Type</label>
                  <div className="col-span-8">
                    <select name="carType" value={basic.carType} onChange={handleBasicChange} className="w-full p-3 border rounded bg-white">
                      <option>Hatchback</option>
                      <option>Sedan</option>
                      <option>SUV</option>
                      <option>Luxury</option>
                      <option>EV</option>
                      <option>Minivan</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-12 items-center gap-4">
                  <label className="col-span-4 text-sm text-gray-700">Year of Manufacture</label>
                  <div className="col-span-8">
                    <input name="year" value={basic.year} onChange={handleBasicChange} className="w-full p-3 border rounded bg-white" />
                  </div>
                </div>

                <div className="grid grid-cols-12 items-center gap-4">
                  <label className="col-span-4 text-sm text-gray-700">Color</label>
                  <div className="col-span-8">
                    <input name="color" value={basic.color} onChange={handleBasicChange} className="w-full p-3 border rounded bg-white" />
                  </div>
                </div>

                <div className="grid grid-cols-12 items-center gap-4">
                  <label className="col-span-4 text-sm text-gray-700">Transmission</label>
                  <div className="col-span-8">
                    <select name="transmission" value={basic.transmission} onChange={handleBasicChange} className="w-full p-3 border rounded bg-white">
                      <option>Automatic</option>
                      <option>Manual</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-12 items-center gap-4">
                  <label className="col-span-4 text-sm text-gray-700">Seating capacity</label>
                  <div className="col-span-8">
                    <select name="seats" value={basic.seats} onChange={handleBasicChange} className="w-full p-3 border rounded bg-white">
                      <option value={2}>2</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={7}>7</option>
                      <option value={12}>12</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-12 items-center gap-4">
  <label className="col-span-4 text-sm text-gray-700">Fuel Type</label>
  <div className="col-span-8">
    <select name="fuelType" value={basic.fuelType} onChange={handleBasicChange} className="w-full p-3 border rounded bg-white">
      <option>Petrol</option>
      <option>Diesel</option>
      <option>Electric</option>
      <option>Hybrid</option>
      <option>CNG</option>
    </select>
  </div>
</div>
<div className="grid grid-cols-12 items-center gap-4">
  <label className="col-span-4 text-sm text-gray-700">Pricing (₹)</label>
  <div className="col-span-8 grid grid-cols-4 gap-2">
    <input name="pricing.hourly" placeholder="Hourly" className="p-2 border rounded" value={basic.pricing.hourly} onChange={handleBasicChange}/>
    <input name="pricing.daily" placeholder="Daily" className="p-2 border rounded"  value={basic.pricing.daily} onChange={handleBasicChange}/>
    <input name="pricing.weekly" placeholder="Weekly" className="p-2 border rounded"value={basic.pricing.weekly} onChange={handleBasicChange}/>
    <input name="pricing.monthly" placeholder="Monthly" className="p-2 border rounded"value={basic.pricing.monthly} onChange={handleBasicChange}/>
  </div>
</div>
<div className="grid grid-cols-12 items-center gap-4">
  <label className="col-span-4 text-sm text-gray-700">Security Deposit (₹)</label>
  <div className="col-span-8">
    <input type="number" name="securityDeposit" value={basic.securityDeposit} onChange={handleBasicChange} className="w-full p-3 border rounded bg-white"/>
  </div>
</div>
<h3 className="text-md font-semibold mt-6 mb-2">Pickup Location</h3>
{/* {["address", "city", "state", "pincode","lat","lng"].map((key) => (
  <div className="grid grid-cols-12 items-center gap-4" key={key}>
    <label className="col-span-4 text-sm text-gray-700 capitalize">{key}</label>
    <div className="col-span-8">
      <input
        name={`location.${key}`}
        value={basic.location[key]}  // ← FIXED
        onChange={(e) => {
          const { value } = e.target;
          setBasic((s) => ({
            ...s,
            location: { ...s.location, [key]: value },  // ← FIXED
          }));
        }}
        className="w-full p-3 border rounded bg-white"
      />
    </div>
  </div>
))} */}
{[
  { key: "address", label: "Address", type: "text" },
  { key: "city", label: "City", type: "text" },
  { key: "state", label: "State", type: "text" },
  { key: "pincode", label: "Pincode", type: "text" },
  { key: "lat", label: "Latitude (optional)", type: "number" },   // 👈 NEW
  { key: "lng", label: "Longitude (optional)", type: "number" }   // 👈 NEW
].map(({ key, label, type }) => (
  <div className="grid grid-cols-12 items-center gap-4" key={key}>
    <label className="col-span-4 text-sm text-gray-700">{label}</label>
    <div className="col-span-8">
      <input
        type={type}
        name={`location.${key}`}
        value={basic.location[key]}
        onChange={(e) => {
          const { value } = e.target;
          setBasic((s) => ({
            ...s,
            location: { ...s.location, [key]: value }
          }));
        }}
        className="w-full p-3 border rounded bg-white"
      />
    </div>
  </div>
))}

{/* OPTIONAL: auto-fill lat/lng from browser location */}
<div className="flex justify-end mt-2">
  <button
    type="button"
    onClick={() => {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser");
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setBasic((s) => ({
            ...s,
            location: {
              ...s.location,
              lat: latitude,
              lng: longitude
            }
          }));
        },
        (err) => {
          console.error(err);
          alert("Unable to fetch current location");
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }}
    className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
  >
    Use Current Location
  </button>
</div>
<div className="mt-4">
  <label className="block text-sm font-semibold mb-2">Features</label>
  <div className="grid grid-cols-2 gap-2">
    {["AC","Bluetooth","GPS","Sunroof","Leather Seats","Backup Camera","USB Port","Keyless Entry"].map((f)=> (
      <label key={f} className="flex items-center gap-2 text-sm">
        <input type="checkbox"
               checked={basic.features.includes(f)}
               onChange={()=> {
                 setBasic((s)=>({
                   ...s,
                   features: s.features.includes(f)
                     ? s.features.filter(x=>x!==f)
                     : [...s.features,f]
                 }))
               }}
        />
        {f}
      </label>
    ))}
  </div>
</div>
</div>

              {/* Right aligned Next */}
              <div className="mt-8 flex justify-end">
                <button type="button" onClick={() => setStep(1)} className="px-6 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700">
                  Next
                </button>
              </div>
            </div>

            {/* STEP 1 - Documents (fancier card-centered UI) */}
            <div className={step === 1 ? "block" : "hidden"}>
              <h2 className="text-center text-lg font-semibold mb-6">Vehicle Documents Upload</h2>

              <div className="border rounded-lg p-6 bg-gray-50 shadow-sm">
                <table className="w-full text-sm table-fixed border-collapse">
                  <thead>
                    <tr className="bg-white">
                      <th className="border px-4 py-3 text-left">Document Name</th>
                      <th className="border px-4 py-3 text-left">Upload</th>
                      <th className="border px-4 py-3 text-left w-40">Preview</th>
                    </tr>
                  </thead>
                  <tbody>
                    {["Registration certificate", "Pollution Certificate", "Insurance Document", "Fitness Certificate"].map((label, idx) => (
                      <tr key={label} className="">
                        <td className="border px-4 py-3 align-top">{label}</td>
                        <td className="border px-4 py-3">
                          <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleDocChange(idx, e)} />
                        </td>
                        <td className="border px-4 py-3">
                          {docs[idx] ? (
                            docs[idx].type.startsWith("image/") ? (
                              <img src={fileToObjectURL(docs[idx])} alt="doc" className="w-24 h-16 object-cover rounded" />
                            ) : (
                              <div className="text-xs text-gray-600">{docs[idx].name}</div>
                            )
                          ) : (
                            <div className="text-xs text-gray-400">No file</div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mt-6 flex justify-between">
                  <button type="button" onClick={() => setStep(0)} className="px-6 py-2 rounded-full bg-gray-200 text-gray-700">
                    Back
                  </button>

                  <button type="button" onClick={() => setStep(2)} className="px-6 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700">
                    Next
                  </button>
                </div>
              </div>
            </div>

            {/* STEP 2 - Images (4 exterior + 4 interior) */}
            <div className={step === 2 ? "block" : "hidden"}>
              <h2 className="text-center text-lg font-semibold mb-6">Vehicle Images Upload</h2>

              <div className="space-y-6">
                <div>
                  <div className="text-sm font-semibold mb-3">Exterior Images (4)</div>
                  <div className="grid grid-cols-4 gap-4">
                    {exteriorSlots.map((f, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <div className="w-28 h-20 bg-gray-100 border rounded flex items-center justify-center overflow-hidden">
                          {f ? <img src={fileToObjectURL(f)} alt={`ext-${idx}`} className="w-full h-full object-cover" /> : <div className="text-xs text-gray-400">No image</div>}
                        </div>
                        <input className="mt-2" type="file" accept="image/*" onChange={(e) => handleExteriorChange(idx, e)} />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-semibold mb-3">Interior Images (4)</div>
                  <div className="grid grid-cols-4 gap-4">
                    {interiorSlots.map((f, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <div className="w-28 h-20 bg-gray-100 border rounded flex items-center justify-center overflow-hidden">
                          {f ? <img src={fileToObjectURL(f)} alt={`int-${idx}`} className="w-full h-full object-cover" /> : <div className="text-xs text-gray-400">No image</div>}
                        </div>
                        <input className="mt-2" type="file" accept="image/*" onChange={(e) => handleInteriorChange(idx, e)} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex justify-between">
                  <button type="button" onClick={() => setStep(1)} className="px-6 py-2 rounded-full bg-gray-200 text-gray-700">
                    Back
                  </button>

                  <button type="submit" disabled={loading} className="px-8 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700">
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </div>
            </div>

            {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
          </div>
        </form>
      </div>
    </div>
  );
}