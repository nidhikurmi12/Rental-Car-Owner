import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = 'https://zoomridebackend-2.onrender.com/api/cars';

// ---- Helpers ----
const normalizeDate = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

// ---- Thunks ----

// 1. Fetch availability + blockedDates
export const fetchCarAvailability = createAsyncThunk(
  'carAvailability/fetchCarAvailability',
  async (carId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE}/availability/${carId}/availability`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { availability, blockedDates } = res.data.data || {};
      return {
        availability,
        blockedDates: (blockedDates || []).map((d) => normalizeDate(d)),
      };
    } catch (err) {
      console.error('fetchCarAvailability error', err);
      return rejectWithValue(
        err.response?.data?.message || 'Failed to load availability'
      );
    }
  }
);

// 2. Block dates
export const blockCarDates = createAsyncThunk(
  'carAvailability/blockCarDates',
  async ({ carId, dates }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const payload = { dates: dates.map((d) => d.toISOString()) };

      const res = await axios.post(
        `${API_BASE}/availability/${carId}/block-dates`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { blockedDates } = res.data.data || {};
      return (blockedDates || []).map((d) => normalizeDate(d));
    } catch (err) {
      console.error('blockCarDates error', err);
      return rejectWithValue(
        err.response?.data?.message || 'Failed to block dates'
      );
    }
  }
);

// 3. Unblock dates
export const unblockCarDates = createAsyncThunk(
  'carAvailability/unblockCarDates',
  async ({ carId, dates }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const payload = { dates: dates.map((d) => d.toISOString()) };

      const res = await axios.post(
        `${API_BASE}/availability/${carId}/unblock-dates`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { blockedDates } = res.data.data || {};
      return (blockedDates || []).map((d) => normalizeDate(d));
    } catch (err) {
      console.error('unblockCarDates error', err);
      return rejectWithValue(
        err.response?.data?.message || 'Failed to unblock dates'
      );
    }
  }
);

// 4. Update car status
export const updateCarStatus = createAsyncThunk(
  'carAvailability/updateCarStatus',
  async ({ carId, availability }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.patch(
        `${API_BASE}/availability/${carId}/status`,
        { availability },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return res.data?.data?.availability ?? availability;
    } catch (err) {
      console.error('updateCarStatus error', err);
      return rejectWithValue(
        err.response?.data?.message || 'Failed to update status'
      );
    }
  }
);

// ---- Slice ----
const carAvailabilitySlice = createSlice({
  name: 'carAvailability',
  initialState: {
    loading: false,
    error: null,

    availability: true,
    blockedDates: [],

    savingBlock: false,
    savingUnblock: false,
    savingStatus: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // fetchCarAvailability
    builder
      .addCase(fetchCarAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.availability = action.payload.availability;
        state.blockedDates = action.payload.blockedDates;
      })
      .addCase(fetchCarAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // blockCarDates
    builder
      .addCase(blockCarDates.pending, (state) => {
        state.savingBlock = true;
        state.error = null;
      })
      .addCase(blockCarDates.fulfilled, (state, action) => {
        state.savingBlock = false;
        state.blockedDates = action.payload;
      })
      .addCase(blockCarDates.rejected, (state, action) => {
        state.savingBlock = false;
        state.error = action.payload;
      });

    // unblockCarDates
    builder
      .addCase(unblockCarDates.pending, (state) => {
        state.savingUnblock = true;
        state.error = null;
      })
      .addCase(unblockCarDates.fulfilled, (state, action) => {
        state.savingUnblock = false;
        state.blockedDates = action.payload;
      })
      .addCase(unblockCarDates.rejected, (state, action) => {
        state.savingUnblock = false;
        state.error = action.payload;
      });

    // updateCarStatus
    builder
      .addCase(updateCarStatus.pending, (state) => {
        state.savingStatus = true;
        state.error = null;
      })
      .addCase(updateCarStatus.fulfilled, (state, action) => {
        state.savingStatus = false;
        state.availability = action.payload;
      })
      .addCase(updateCarStatus.rejected, (state, action) => {
        state.savingStatus = false;
        state.error = action.payload;
      });
  },
});

export default carAvailabilitySlice.reducer;