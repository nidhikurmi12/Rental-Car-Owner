import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = 'https://zoomridebackend-2.onrender.com/api';

// Thunk: fetch completed earnings list
export const fetchCompletedEarnings = createAsyncThunk(
  'completedEarnings/fetchCompletedEarnings',
  async (params = {}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');

      const res = await axios.get(`${API_BASE}/owner/completed-earnings`, {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data?.data || [];
    } catch (err) {
      console.error('fetchCompletedEarnings error', err);
      return rejectWithValue(
        err.response?.data?.message || 'Failed to load completed earnings'
      );
    }
  }
);

const completedEarningsSlice = createSlice({
  name: 'completedEarnings',
  initialState: {
    loading: false,
    error: null,
    rows: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompletedEarnings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompletedEarnings.fulfilled, (state, action) => {
        state.loading = false;
        state.rows = action.payload;
      })
      .addCase(fetchCompletedEarnings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default completedEarningsSlice.reducer;
