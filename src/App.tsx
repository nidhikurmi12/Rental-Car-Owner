import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import FormElements from "./pages/Forms/FormElements";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import CarManagement from "./pages/Car Management/CarManagement";
import CarPricingPage from "./pages/Car Management/CarPricing";
import AllBookingList from "./pages/Booking Management/AllBookingList"
import CompletedBooking from "./pages/Booking Management/CompletedBooking"
import OngoingBooking from "./pages/Booking Management/OngoingBooking"
import ReturnStatusUpdate from "./pages/Booking Management/ReturnStatusUpdate"
import UpcomingBooking from "./pages/Booking Management/UpcomingBooking"
import CancelledBooking from "./pages/Booking Management/CancelledBooking"
import UploadVehicalCondition from "./pages/Booking Management/UploadVehicalCondition"
import OwnerEarningsPage from "./pages/EarningAndPayment/EarningReport";
import PaymentSettlementHistory from "./pages/EarningAndPayment/PaymentSettlementHistory";
import CommissionDeductionDetails from "./pages/EarningAndPayment/CommissionDeductionDetails";
import GSTInvoice from "./pages/EarningAndPayment/GSTInvoice";
export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />
            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/car-pricing" element={<CarPricingPage />} />       
            {/* Forms */}
            <Route path="/add-cars" element={<FormElements />} />
            {/* Tables */}
            <Route path="/car-management" element={<CarManagement />} />
            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

          {/* Ui Elements */}
            <Route path="/cars/allbookings" element={<AllBookingList />} />
            <Route path="/cars/upcoming" element={<UpcomingBooking />} />
            <Route path="/cars/Ongoing" element={<OngoingBooking />} />
            <Route path="/cars/completed" element={<CompletedBooking />} />
            <Route path="/cars/cancelled" element={<CancelledBooking />} />
            <Route path="/cars/return-status" element={<ReturnStatusUpdate />} />
            <Route path="/cars/vehical/upload" element={<UploadVehicalCondition />} />
            {/* Earning And Payments */}
             <Route path="/earning" element={<OwnerEarningsPage />} />
              <Route path="/payment" element={<PaymentSettlementHistory />} />
             <Route path="/earning/commition" element={<CommissionDeductionDetails/>} />
             <Route path="/earning/gstinvoice" element={<GSTInvoice/>} />

             

            {/* Charts */}
            <Route path="/cars/vehical/upload" element={<LineChart />} />
            {/* Charts */}
            <Route path="/cars/vehical/upload" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>
          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}