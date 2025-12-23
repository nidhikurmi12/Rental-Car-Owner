// app/redux/slice/ownerDashboardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = 'https://zoomridebackend-2.onrender.com/api/owner/dashboard/overview';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchOwnerDashboard = createAsyncThunk(
  'ownerDashboard/fetch',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(API_BASE, {
        headers: getAuthHeader(),
      });
      return res.data;
    } catch (err) {
      console.error('fetchOwnerDashboard error:', err.response?.data || err.message);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to load owner dashboard'
      );
    }
  }
);

const ownerDashboardSlice = createSlice({
  name: 'ownerDashboard',
  initialState: {
    loading: false,
    error: null,
    stats: {
      totalCars: 0,
      activeBookings: 0,
      totalEarnings: 0,
      pendingPayouts: 0,
    },
    recentBookings: [],
    charts: {
      monthlyRevenue: [],
      dailyEarnings: [],
    },
    carPerformance: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOwnerDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOwnerDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.stats = action.payload.stats;
        state.recentBookings = action.payload.recentBookings;
        state.charts = action.payload.charts;
        state.carPerformance = action.payload.carPerformance;
      })
      .addCase(fetchOwnerDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default ownerDashboardSlice.reducer;
