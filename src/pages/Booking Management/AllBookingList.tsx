import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../../redux/slice/bookingsSlice";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";

export default function AllBookingList() {
  const dispatch = useDispatch();
  const { bookings, loading } = useSelector((s) => s.bookingsall);
  console.log("Bookings in AllBookings.jsx:", bookings);

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">All Bookings</h2>
      {loading ? "Loading..." : <BasicTableOne bookings={bookings} />}
    </div>
  );
}
