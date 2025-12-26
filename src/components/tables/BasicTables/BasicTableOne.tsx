import { useState } from "react";
import { useDispatch } from "react-redux";
import { format } from "date-fns";
import { updateBookingStatus } from "../../../redux/slice/bookingSlice";
import Badge from "../../ui/badge/Badge";

interface BookingData {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  car: {
    _id: string;
    brand: string;
    model: string;
    vehicleNumber: string;
  };
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  securityDeposit: number;
  paymentMethod: string;
  totalDays: number;
  totalHours: number;
  pickupLocation: {
    address: string;
    city: string;
  };
  dropLocation: {
    address: string;
    city: string;
  };
  cancellationReason?: string;
}

interface BasicTableOneProps {
  bookings: BookingData[];
}

export default function BookingCards({ bookings }: BasicTableOneProps) {
  const dispatch = useDispatch();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState<string>("");
  const [showRejectModal, setShowRejectModal] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return dateString;
    }
  };

  const formatTime = (dateString: string) => {
    try {
      return format(new Date(dateString), "hh:mm a");
    } catch {
      return dateString;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'confirmed':
      case 'accepted':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'cancelled':
      case 'rejected':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleAccept = async (booking: BookingData) => {
    setLoadingId(booking._id);
    try {
      await dispatch(updateBookingStatus({ 
        id: booking._id, 
        status: "confirmed" 
      }));
    } finally {
      setLoadingId(null);
    }
  };

  const handleReject = async (bookingId: string) => {
    setLoadingId(bookingId);
    try {
      await dispatch(
        updateBookingStatus({
          id: bookingId,
          status: "rejected",
          cancellationReason: rejectReason || "Owner rejected booking",
        })
      );
      setShowRejectModal(null);
      setRejectReason("");
    } finally {
      setLoadingId(null);
    }
  };

  const isActionable = (status: string) => {
    const lowerStatus = status.toLowerCase();
    return lowerStatus === 'pending';
  };

  const toggleCardExpand = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <>
      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Reject Booking?</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Please provide a reason</p>
            </div>
            <textarea
              className="w-full h-24 px-4 py-3 text-sm border border-gray-300 dark:border-gray-700 rounded-xl dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter reason..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              autoFocus
            />
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowRejectModal(null);
                  setRejectReason("");
                }}
                className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReject(showRejectModal)}
                disabled={!rejectReason.trim() || loadingId === showRejectModal}
                className="flex-1 px-4 py-3 text-sm font-medium text-white bg-red-600 rounded-xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loadingId === showRejectModal ? "Rejecting..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <div 
            key={booking._id} 
            className={`bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 ${expandedCard === booking._id ? 'ring-2 ring-blue-500' : ''}`}
          >
            {/* Card Header */}
            <div className="p-4 pb-2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 ${getStatusColor(booking.status)} rounded-full`}></span>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(booking.totalAmount)}
                  </h3>
                </div>
                <button
                  onClick={() => toggleCardExpand(booking._id)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <svg 
                    className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform ${expandedCard === booking._id ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Car & Customer Info */}
              <div className="space-y-2">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {booking.car.brand} {booking.car.model}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {booking.car.vehicleNumber}
                    </span>
                    <span className="text-gray-300 dark:text-gray-700">•</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {booking.totalDays}d • {booking.totalHours}h
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {booking.user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{booking.user.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{booking.pickupLocation.city}</p>
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Pickup</span>
                    </div>
                    <p className="font-semibold text-gray-900 dark:text-white">{formatDate(booking.startDate)}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{formatTime(booking.startDate)}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <svg className="w-3 h-3 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Drop-off</span>
                    </div>
                    <p className="font-semibold text-gray-900 dark:text-white">{formatDate(booking.endDate)}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{formatTime(booking.endDate)}</p>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedCard === booking._id && (
                <div className="mt-6 space-y-4 animate-fadeIn">
                  {/* Payment Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Payment Status</p>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${booking.paymentStatus === 'paid' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Payment Method</p>
                      <p className="font-medium text-gray-900 dark:text-white">{booking.paymentMethod.toUpperCase()}</p>
                    </div>
                  </div>

                  {/* Security Deposit */}
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span className="font-medium text-blue-700 dark:text-blue-300">Security Deposit</span>
                      </div>
                      <span className="text-lg font-bold text-blue-700 dark:text-blue-300">
                        {formatCurrency(booking.securityDeposit)}
                      </span>
                    </div>
                  </div>

                  {/* Cancellation Reason */}
                  {booking.cancellationReason && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800/30">
                      <div className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-red-500 dark:text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <div>
                          <p className="text-xs font-medium text-red-600 dark:text-red-400 mb-1">Cancellation Reason</p>
                          <p className="text-sm text-red-600 dark:text-red-300">{booking.cancellationReason}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="p-6 pt-0">
              {isActionable(booking.status) ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleAccept(booking)}
                    disabled={loadingId === booking._id}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-1 rounded-xl hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 h-[40px] disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    {loadingId === booking._id ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Accept</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setShowRejectModal(booking._id)}
                    disabled={loadingId === booking._id}
                    className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold py-3.5 rounded-xl h-[40px] hover:from-red-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Reject</span>
                  </button>
                </div>
              ) : (
                <div className="text-center py-3">
                  <span className="text-sm text-gray-500 dark:text-gray-400 italic">
                    No actions available for this status
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Empty State */}
        {bookings.length === 0 && (
          <div className="col-span-full py-16 text-center">
            <div className="max-w-sm mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">No bookings yet</h3>
              <p className="text-gray-500 dark:text-gray-400">
                When you receive booking requests, they'll appear here
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Add these animations to your global CSS */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}