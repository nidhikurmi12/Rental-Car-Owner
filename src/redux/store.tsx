import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'
import carReducer from "./slice/carSlice";
import  carAvailabilityReducer  from './slice/carAvailabilitySlice';
import bookingsReducer from "./slice/bookingSlice";
import completedEarningsReducer from './slice/completedEarningsSlice';
import bookingsallReducer from './slice/bookingsSlice';
import ownerDashboardReducer from './slice/ownerDashboardSlice';
// ...other reducers

export const store = configureStore({
reducer: {
auth: authReducer,
cars: carReducer,
carAvailability: carAvailabilityReducer,
 bookings: bookingsReducer,
 completedEarnings: completedEarningsReducer,
 bookingsall:bookingsallReducer,
 ownerDashboard: ownerDashboardReducer,
},
 devTools: process.env.NODE_ENV !== 'production',
})