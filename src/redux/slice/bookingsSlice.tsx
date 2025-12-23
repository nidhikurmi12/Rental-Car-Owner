import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://zoomridebackend-2.onrender.com/api/bookings";
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};


// Get all bookings
export const getAllBookings = createAsyncThunk("bookings/all", 
async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${API}/owner`, {
        headers: getAuthHeader(),
      });

      // Backend: { success: true, bookings: [...] }
      console.log("getAllBookings API response:", res.data);
      return res.data.bookings || [];
    } catch (err) {
      console.error("getAllBookings error:", err.response?.data || err.message);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to load bookings"
      );
    }
  }
);

// Get bookings by status
export const getBookingsByStatus = createAsyncThunk(
  "bookings/status",
  async (status, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API}/status/${status}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// Update return status
export const updateReturnStatus = createAsyncThunk(
  "bookings/return-status",
  async ({ id, status }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${API}/return/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// Upload vehicle condition images
export const uploadConditionImages = createAsyncThunk(
  "bookings/upload-condition",
  async ({ id, formData }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${API}/condition/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: {
    bookings: [],
    loading: false,
    error: null,
    success: false,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllBookings.pending, (s) => { s.loading = true; })
      .addCase(getAllBookings.fulfilled, (state, action) => {
        state.loading = false;
        console.log("getAllBookings fulfilled payload:", action.payload);
        state.bookings = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(getAllBookings.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      .addCase(getBookingsByStatus.pending, (s) => { s.loading = true; })
      .addCase(getBookingsByStatus.fulfilled, (s, a) => {
        s.loading = false;
        s.bookings = a.payload;
      })
      .addCase(getBookingsByStatus.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      .addCase(updateReturnStatus.fulfilled, (s, a) => {
        s.bookings = s.bookings.map((b) =>
          b._id === a.payload._id ? a.payload : b
        );
      })

      .addCase(uploadConditionImages.fulfilled, (s, a) => {
        s.bookings = s.bookings.map((b) =>
          b._id === a.payload._id ? a.payload : b
        );
      });
  },
});

export default bookingsSlice.reducer;
export const bookingsActions = bookingsSlice.actions;