// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import axios from "axios";

// // // Base URL (you can move to env var)
// // const API_BASE = "https://zoomridebackend-2.onrender.com/api/car/";

// // /**
// //  * createCar
// //  * - Expects a FormData instance as payload (or a plain object; we convert if needed)
// //  * - Sends POST to API_BASE
// //  * - Uses auth token from state.auth.token if present
// //  */
// export const createCar = createAsyncThunk(
//   "cars/createCar",
//   async (formDataOrObject, thunkAPI) => {
//     try {
//       // allow passing plain object or FormData
//       let payload;
//       if (formDataOrObject instanceof FormData) {
//         payload = formDataOrObject;
//       } else {
//         // convert plain object -> FormData (for non-file test cases)
//         const fd = new FormData();
//         Object.keys(formDataOrObject || {}).forEach((k) => {
//           const val = formDataOrObject[k];
//           if (Array.isArray(val)) {
//             val.forEach((v) => fd.append(k, v));
//           } else if (val !== undefined && val !== null) {
//             fd.append(k, val);
//           }
//         });
//         payload = fd;
//       }

//       const token = thunkAPI.getState()?.auth?.token;
//       const headers = {
//         // Let axios set boundary for multipart/form-data; but include header type
//         "Content-Type": "multipart/form-data",
//       };
//       if (token) headers.Authorization = `Bearer ${token}`;

//       const res = await axios.post(API_BASE, payload, { headers });
//       return res.data;
//     } catch (err) {
//       // return user-friendly message
//       const message =
//         err.response?.data?.message || err.response?.data?.error || err.message || "Create car failed";
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// // /**
// //  * getCars
// //  * - Fetch list of cars (GET)
// //  * - Accepts optional params object which is appended as query params
// //  */
// // export const getCars = createAsyncThunk("cars/getCars", async (params = {}, thunkAPI) => {
// //   try {
// //     const token = thunkAPI.getState()?.auth?.token;
// //     const headers = {};
// //     if (token) headers.Authorization = `Bearer ${token}`;

// //     const res = await axios.get(API_BASE, { params, headers });
// //     // Expect API returns { success: true, data: [...] } or similar
// //     // normalize to return array
// //     const payload = res.data?.data ?? res.data ?? [];
// //     return payload;
// //   } catch (err) {
// //     const message = err.response?.data?.message || err.message || "Failed to fetch cars";
// //     return thunkAPI.rejectWithValue(message);
// //   }
// // });

// // const initialState = {
// //   list: [], // cars array
// //   loading: false,
// //   creating: false,
// //   createSuccess: false,
// //   error: null,
// // };

// // const carSlice = createSlice({
// //   name: "cars",
// //   initialState,
// //   reducers: {
// //     // reset create state
// //     resetCreateState(state) {
// //       state.creating = false;
// //       state.createSuccess = false;
// //       state.error = null;
// //     },
// //     // clear generic error
// //     clearCarError(state) {
// //       state.error = null;
// //     },
// //     // optional helper to set list locally
// //     setCarsLocal(state, action) {
// //       state.list = action.payload || [];
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     // getCars
// //     builder
// //       .addCase(getCars.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(getCars.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.list = Array.isArray(action.payload) ? action.payload : [];
// //       })
// //       .addCase(getCars.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload || action.error?.message;
// //       });

// //     // createCar
// //     builder
// //       .addCase(createCar.pending, (state) => {
// //         state.creating = true;
// //         state.createSuccess = false;
// //         state.error = null;
// //       })
// //       .addCase(createCar.fulfilled, (state, action) => {
// //         state.creating = false;
// //         state.createSuccess = true;
// //         // if API returns created car in action.payload.data or action.payload, append to list
// //         const newCar = action.payload?.data ?? action.payload;
// //         if (newCar) {
// //           // if API returns entire object (not array), append; if returns array (unlikely), replace
// //           if (Array.isArray(newCar)) state.list = newCar;
// //           else state.list = [newCar, ...state.list];
// //         }
// //       })
// //       .addCase(createCar.rejected, (state, action) => {
// //         state.creating = false;
// //         state.createSuccess = false;
// //         state.error = action.payload || action.error?.message;
// //       });
// //   },
// // });

// // export const { resetCreateState, clearCarError, setCarsLocal } = carSlice.actions;
// // export default carSlice.reducer;

// // src/redux/slice/carSlice.js

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // BASE URL
// const API = axios.create({
//   baseURL: "https://zoomridebackend-2.onrender.com/api", // change when needed
// });

// // ADD TOKEN IN HEADER
// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");
//   if (token) req.headers.Authorization = `Bearer ${token}`;
//   return req;
// });

// // 📌 1) CREATE CAR API Thunk
// export const createCar = createAsyncThunk("car/create", async (formData, { rejectWithValue }) => {
//   try {
//     const res = await API.post("/cars/", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     return res.data;
//   } catch (err) {
//     return rejectWithValue(err.response?.data?.message || "Create Failed");
//   }
// });

// // 📌 2) GET ALL CARS API Thunk (Optional)
// export const getCars = createAsyncThunk("car/getAll", async (_, { rejectWithValue }) => {
//   try {
//     const res = await API.get("/cars");
//     return res.data;
//   } catch (err) {
//     return rejectWithValue(err.response?.data?.message || "Fetch Error");
//   }
// });

// // 🚗 SLICE
// const carSlice = createSlice({
//   name: "cars",
//   initialState: {
//     cars: [],
//     loading: false,
//     error: null,
//     success: false,
//   },

//   reducers: {},

//   extraReducers: (builder) => {
//     builder
//       // 👉 CREATE CAR
//       .addCase(createCar.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(createCar.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         state.cars.push(action.payload.data);
//       })
//       .addCase(createCar.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // 👉 GET CARS
//       .addCase(getCars.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getCars.fulfilled, (state, action) => {
//         state.loading = false;
//         state.cars = action.payload.data;
//       })
//       .addCase(getCars.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default carSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://zoomridebackend-2.onrender.com/api";

// 📌 CREATE CAR
// export const createCar = createAsyncThunk("cars/createCar", async (carData, { rejectWithValue }) => {
//   try {
//     const res = await axios.post(`${API}/cars/`, carData, {
//       headers: { "Content-Type": "multipart/form-data" },
//       withCredentials: true,
//     });
//     return res.data;
//   } catch (err) {
//     return rejectWithValue(err.response?.data || err.message);
//   }
// });
export const createCar = createAsyncThunk(
  "cars/createCar",
  async (formDataOrObject, thunkAPI) => {
    try {
      // allow passing plain object or FormData
      let payload;
      if (formDataOrObject instanceof FormData) {
        payload = formDataOrObject;
      } else {
        // convert plain object -> FormData (for non-file test cases)
        const fd = new FormData();
        Object.keys(formDataOrObject || {}).forEach((k) => {
          const val = formDataOrObject[k];
          if (Array.isArray(val)) {
            val.forEach((v) => fd.append(k, v));
          } else if (val !== undefined && val !== null) {
            fd.append(k, val);
          }
        });
        payload = fd;
      }

      const token = localStorage.getItem("token");

      const headers = {
        // Let axios set boundary for multipart/form-data; but include header type
        "Content-Type": "multipart/form-data",
      };
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await axios.post(`${API}/cars/`, payload, { headers });
      return res.data;
    } catch (err) {
      // return user-friendly message
      const message =
        err.response?.data?.message || err.response?.data?.error || err.message || "Create car failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 📌 GET ALL CARS
// export const getAllCars = createAsyncThunk("cars/getAllCars", async (_, { rejectWithValue }) => {
//   try {
//     const res = await axios.get(`${API}/owner/my-cars`,{
//       headers:{Authorization: `Bearer ${localStorage.getItem("token")}`},
//     });
//     return res.data.data;
//   } catch (err) {
//     return rejectWithValue(err.response?.data || err.message);
//   }
// });
export const getAllCars = createAsyncThunk(
  "cars/getAllCars",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API}/cars/owner/my-cars`, {
        headers: { Authorization: `Bearer ${token}` },
      });
console.log("API Response:", res.data.data); // Debug log
      return res.data.data; // always return only data array
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// 📌 GET CAR BY ID
export const getCarById = createAsyncThunk("cars/getCarById", async (id, { rejectWithValue }) => {
  console.log("Fetching car with ID:", id); // Debug log
  try {
     const token = localStorage.getItem("token");
    const res = await axios.get(`${API}/cars/${id}`,{
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Car Data:", res.data.data); // Debug log
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// 📌 UPDATE CAR
export const updateCar = createAsyncThunk("cars/updateCar", async ({ id, formData }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
      const headers = {
        // Let axios set boundary for multipart/form-data; but include header type
        "Content-Type": "multipart/form-data",
      };
      if (token) headers.Authorization = `Bearer ${token}`;

    const res = await axios.put(`${API}/cars/${id}`, formData, {
      headers,
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// 📌 DELETE CAR
export const deleteCar = createAsyncThunk("cars/deleteCar", async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.delete(`${API}/cars/${id}`, { 
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true 
    });
    return { id, ...res.data };
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// ================= SLICE =================
const carSlice = createSlice({
  name: "cars",
  initialState: {
    loading: false,
    cars: [],
    singleCar: {},
    message: null,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createCar.pending, (state) => { state.loading = true; })
      .addCase(createCar.fulfilled, (state, action) => {
        state.loading = false;
        state.cars.push(action.payload?.car);
        state.message = action.payload?.message;
        state.error = null;
      })
      .addCase(createCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ALL
      .addCase(getAllCars.pending, (state) => { state.loading = true; })
      .addCase(getAllCars.fulfilled, (state, action) => {
  state.loading = false;
  state.cars = action.payload || [];  // FIXED
  state.error = null;
})
      .addCase(getAllCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET BY ID
      .addCase(getCarById.pending, (state) => { state.loading = true; })
      .addCase(getCarById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleCar = action.payload;
        state.error = null;
      })
      .addCase(getCarById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateCar.pending, (state) => { state.loading = true; })
      .addCase(updateCar.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCar = action.payload?.car;
        state.cars = state.cars.map((car) => (car._id === updatedCar._id ? updatedCar : car));
        state.message = action.payload?.message;
        state.error = null;
      })
      .addCase(updateCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteCar.pending, (state) => { state.loading = true; })
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = state.cars.filter((car) => car._id !== action.payload.id);
        state.message = action.payload?.message;
        state.error = null;
      })
      .addCase(deleteCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default carSlice.reducer;
