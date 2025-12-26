import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Request from "../../lib/axios";
import { toast } from "react-toastify";

const API_BASE = "https://zoomridebackend-2.onrender.com/api/bookings";

// owner/admin ke bookings
export const fetchOwnerBookings = createAsyncThunk(
  "bookings/fetchOwnerBookings",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token || localStorage.getItem("token");

      const { data } = await axios.get(`${API_BASE}/owner`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return data.bookings;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load bookings"
      );
    }
  }
);

// status update (Accept / Reject / Handover-Return)
export const updateBookingStatus = createAsyncThunk(
  "bookings/updateBookingStatus",
  async ({ id, status, cancellationReason }, { getState, rejectWithValue }) => {
    try {
      // const token = getState().auth.token || localStorage.getItem("token");
      const data = await Request.patch(
        `/bookings/${id}/status`,
        { status, cancellationReason },
      );
      console.log("Updated booking data:", data);
      toast.success(data.message || "Booking status updated successfully");
      return data.booking;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update booking"
      );
    }
  }
);

const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOwnerBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOwnerBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchOwnerBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        const idx = state.items.findIndex((b) => b._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      });
  },
});

export default bookingSlice.reducer;
