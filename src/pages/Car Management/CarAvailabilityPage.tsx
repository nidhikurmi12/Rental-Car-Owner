import React, { useEffect, useState, useCallback } from 'react';
import Calendar from 'react-calendar';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCarAvailability,
  blockCarDates,
  unblockCarDates,
  updateCarStatus,
} from '../../redux/slice/carAvailabilitySlice';
import {
  Calendar as CalendarIcon,
  Lock,
  Unlock,
  ToggleLeft,
  ToggleRight,
  Check,
  X,
  AlertCircle,
  RefreshCw,
  Shield,
  Car,
  Clock,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Zap,
} from 'lucide-react';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';

// ------------ helpers --------------
const normalizeDate = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const isSameDay = (d1, d2) =>
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();

const formatDate = (date) => format(date, 'MMM dd, yyyy');

// ------------ component ------------
export default function CarAvailabilityPage() {
  const { carId } = useParams();
  const dispatch = useDispatch();

  const {
    loading,
    availability,
    blockedDates,
    savingBlock,
    savingUnblock,
    savingStatus,
    error,
  } = useSelector((s) => s.carAvailability);

  // UI state
  const [activeTab, setActiveTab] = useState('block');
  const [selectedBlockDates, setSelectedBlockDates] = useState([]);
  const [selectedUnblockDates, setSelectedUnblockDates] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // load data from backend
  useEffect(() => {
    if (carId) dispatch(fetchCarAvailability(carId));
  }, [carId, dispatch]);

  // Show success message
  const showSuccessAlert = (message) => {
    setSuccessMessage(message);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // calendar handlers
  const handleBlockClick = useCallback((date) => {
    const nd = normalizeDate(date);
    setSelectedBlockDates((prev) => {
      const exists = prev.some((d) => isSameDay(d, nd));
      return exists ? prev.filter((d) => !isSameDay(d, nd)) : [...prev, nd];
    });
  }, []);

  const handleUnblockClick = useCallback((date) => {
    const nd = normalizeDate(date);
    setSelectedUnblockDates((prev) => {
      const exists = prev.some((d) => isSameDay(d, nd));
      return exists ? prev.filter((d) => !isSameDay(d, nd)) : [...prev, nd];
    });
  }, []);

  // Custom tile content
  const blockTileContent = ({ date, view }) => {
    if (view !== 'month') return null;
    const nd = normalizeDate(date);
    const selected = selectedBlockDates.some((d) => isSameDay(d, nd));
    return selected ? (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
          <Lock className="h-4 w-4 text-white" />
        </div>
      </div>
    ) : null;
  };

  const unblockTileContent = ({ date, view }) => {
    if (view !== 'month') return null;
    const nd = normalizeDate(date);
    const isBlocked = blockedDates.some((d) => isSameDay(d, nd));
    const isSelected = selectedUnblockDates.some((d) => isSameDay(d, nd));
    
    if (isBlocked) {
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
            isSelected 
              ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
              : 'bg-gradient-to-r from-orange-500 to-amber-500'
          }`}>
            {isSelected ? (
              <Unlock className="h-4 w-4 text-white" />
            ) : (
              <Lock className="h-4 w-4 text-white" />
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  // tile classes
  const blockTileClassName = ({ date, view }) => {
    if (view !== 'month') return '';
    const nd = normalizeDate(date);
    const selected = selectedBlockDates.some((d) => isSameDay(d, nd));
    return selected ? 'selected-tile' : '';
  };

  const unblockTileClassName = ({ date, view }) => {
    if (view !== 'month') return '';
    const nd = normalizeDate(date);
    const isBlocked = blockedDates.some((d) => isSameDay(d, nd));
    const isSelected = selectedUnblockDates.some((d) => isSameDay(d, nd));

    if (!isBlocked) return '';
    return isSelected ? 'unselected-tile' : 'blocked-tile';
  };

  // actions
  const handleSaveBlock = () => {
    if (!selectedBlockDates.length) {
      alert('Please select at least one date to block.');
      return;
    }
    dispatch(blockCarDates({ carId, dates: selectedBlockDates }))
      .unwrap()
      .then(() => {
        setSelectedBlockDates([]);
        showSuccessAlert('Dates blocked successfully!');
      })
      .catch((err) => alert(err));
  };

  const handleSaveUnblock = () => {
    if (!selectedUnblockDates.length) {
      alert('Please select at least one date to unblock.');
      return;
    }
    dispatch(unblockCarDates({ carId, dates: selectedUnblockDates }))
      .unwrap()
      .then(() => {
        setSelectedUnblockDates([]);
        showSuccessAlert('Dates unblocked successfully!');
      })
      .catch((err) => alert(err));
  };

  const handleToggleStatus = () => {
    dispatch(updateCarStatus({ carId, availability: !availability }))
      .unwrap()
      .then(() => {
        showSuccessAlert(`Car ${!availability ? 'activated' : 'deactivated'} successfully!`);
      })
      .catch((err) => alert(err));
  };

  const handleClearSelection = () => {
    if (activeTab === 'block') {
      setSelectedBlockDates([]);
    } else if (activeTab === 'unblock') {
      setSelectedUnblockDates([]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-950">
        <div className="text-center">
          <div className="relative">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            <Car className="absolute inset-0 m-auto h-8 w-8 text-blue-500" />
          </div>
          <p className="mt-4 text-lg font-medium text-gray-600 dark:text-gray-300">
            Loading availability...
          </p>
        </div>
      </div>
    );
  }

  // Stats calculation
  const upcomingBlocked = blockedDates.filter(d => d > new Date()).length;
  const today = new Date();
  const isTodayBlocked = blockedDates.some(d => isSameDay(d, today));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-950 px-4 py-8 md:px-8 lg:px-12">
      {/* Success Alert */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 p-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-white/20 p-1">
                <Check className="h-5 w-5 text-white" />
              </div>
              <p className="font-medium text-white">{successMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-red-50 to-red-100 border border-red-200 p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="font-medium text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Car Availability Manager
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage blocked dates and overall availability for your car
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className={`rounded-full px-4 py-2 text-sm font-medium ${
              availability
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
            }`}>
              {availability ? 'Active' : 'Inactive'}
            </div>
            <button
              onClick={() => dispatch(fetchCarAvailability(carId))}
              className="rounded-full bg-white p-2 shadow-lg hover:shadow-xl dark:bg-gray-800"
            >
              <RefreshCw className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Blocked Dates</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{blockedDates.length}</p>
            </div>
            <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/30">
              <Lock className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {upcomingBlocked} upcoming
            </span>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Current Status</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {availability ? 'Active' : 'Inactive'}
              </p>
            </div>
            <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/30">
              <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-4">
            <span className={`text-sm ${isTodayBlocked ? 'text-red-600' : 'text-green-600'}`}>
              Today: {isTodayBlocked ? 'Blocked' : 'Available'}
            </span>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {format(new Date(), 'MMM dd')}
              </p>
            </div>
            <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900/30">
              <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">Real-time updates</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8">
        <div className="inline-flex rounded-2xl bg-white p-1 shadow-lg dark:bg-gray-900">
          {['block', 'unblock', 'status'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              {tab === 'block' && <Lock className="h-4 w-4" />}
              {tab === 'unblock' && <Unlock className="h-4 w-4" />}
              {tab === 'status' && <Shield className="h-4 w-4" />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Block Dates Card */}
        <div className={`rounded-2xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-2xl dark:from-gray-900 dark:to-gray-950 ${
          activeTab !== 'block' ? 'hidden lg:block' : ''
        }`}>
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-gradient-to-r from-red-100 to-pink-100 p-2 dark:from-red-900/30 dark:to-pink-900/30">
                  <Lock className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Block Dates</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Select dates to mark as unavailable
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">
                {selectedBlockDates.length} selected
              </span>
            </div>
          </div>

          <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <Calendar
              onClickDay={handleBlockClick}
              tileClassName={blockTileClassName}
              tileContent={blockTileContent}
              className="custom-calendar w-full border-0"
              nextLabel={<ChevronRight className="h-4 w-4" />}
              prevLabel={<ChevronRight className="h-4 w-4 rotate-180" />}
            />
          </div>

          <div className="flex flex-col items-center justify-between gap-3">
            <button
              onClick={handleClearSelection}
              disabled={!selectedBlockDates.length}
              className="rounded-xl border border-gray-300 px-2 w-full py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Clear Selection
            </button>
            <button
              onClick={handleSaveBlock}
              disabled={savingBlock || !selectedBlockDates.length}
              className="rounded-xl bg-gradient-to-r from-red-500 to-pink-500 w-full px-4 py-1 font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {savingBlock ? (
                <>
                  <RefreshCw className="mr-2 inline h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Lock className="mr-2 inline h-4 w-4" />
                  Block Selected Dates
                </>
              )}
            </button>
          </div>
        </div>

        {/* Unblock Dates Card */}
        <div className={`rounded-2xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-2xl dark:from-gray-900 dark:to-gray-950 ${
          activeTab !== 'unblock' ? 'hidden lg:block' : ''
        }`}>
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-gradient-to-r from-green-100 to-emerald-100 p-2 dark:from-green-900/30 dark:to-emerald-900/30">
                  <Unlock className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Unblock Dates</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Remove existing blocks
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                {selectedUnblockDates.length} selected
              </span>
            </div>
          </div>

          <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <Calendar
              onClickDay={handleUnblockClick}
              tileClassName={unblockTileClassName}
              tileContent={unblockTileContent}
              className="custom-calendar w-full border-0"
              nextLabel={<ChevronRight className="h-4 w-4" />}
              prevLabel={<ChevronRight className="h-4 w-4 rotate-180" />}
            />
          </div>

          <div className="flex flex-col items-center justify-between gap-3">
            <button
              onClick={handleClearSelection}
              disabled={!selectedUnblockDates.length}
              className="rounded-xl border border-gray-300 px-2 py-2 w-full text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Clear Selection
            </button>
            <button
              onClick={handleSaveUnblock}
              disabled={savingUnblock || !selectedUnblockDates.length}
              className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 px-2 py-1 w-full font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {savingUnblock ? (
                <>
                  <RefreshCw className="mr-2 inline h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Unlock className="mr-2 inline h-4 w-4" />
                  Unblock Selected Dates
                </>
              )}
            </button>
          </div>
        </div>

        {/* Car Status Card */}
        <div className={`rounded-2xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-2xl dark:from-gray-900 dark:to-gray-950 ${
          activeTab !== 'status' ? 'hidden lg:block' : ''
        }`}>
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 p-2 dark:from-blue-900/30 dark:to-indigo-900/30">
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Car Status</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Control overall availability
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white p-6 dark:from-gray-800 dark:to-gray-900">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Status</p>
                <p className={`text-2xl font-bold ${
                  availability ? 'text-green-600' : 'text-red-600'
                }`}>
                  {availability ? 'ACTIVE' : 'INACTIVE'}
                </p>
              </div>
              <div className="relative">
                <button
                  type="button"
                  onClick={handleToggleStatus}
                  disabled={savingStatus}
                  className={`relative inline-flex h-8 w-8 items-center rounded-full shadow-lg transition-all duration-300 bg-white ${
                    availability 
                      ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                      : 'bg-gradient-to-r from-gray-300 to-gray-400'
                  } ${savingStatus ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:shadow-xl'}`}
                >
                  <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-2xl transition-all duration-300 ${
                    availability ? 'translate-x-12' : 'translate-x-2'
                  }`} />
                </button>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">When active:</span>
                <span className="text-sm font-medium text-green-600">Car appears in search</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">When inactive:</span>
                <span className="text-sm font-medium text-red-600">Hidden from all users</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleToggleStatus}
            disabled={savingStatus}
            className={`w-full rounded-xl py-3 font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed ${
              availability
                ? 'bg-gradient-to-r from-red-500 to-orange-500'
                : 'bg-gradient-to-r from-green-500 to-emerald-500'
            }`}
          >
            {savingStatus ? (
              <>
                <RefreshCw className="mr-2 inline h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : availability ? (
              'Deactivate Car'
            ) : (
              'Activate Car'
            )}
          </button>
        </div>
      </div>

      {/* Selected Dates Summary */}
      {(selectedBlockDates.length > 0 || selectedUnblockDates.length > 0) && (
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">
          <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Selected Dates</h3>
          <div className="flex flex-wrap gap-2">
            {activeTab === 'block' && selectedBlockDates.map((date, idx) => (
              <div key={idx} className="flex items-center gap-2 rounded-full bg-red-100 px-3 py-1.5 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">
                <Lock className="h-3 w-3" />
                {formatDate(date)}
              </div>
            ))}
            {activeTab === 'unblock' && selectedUnblockDates.map((date, idx) => (
              <div key={idx} className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-400">
                <Unlock className="h-3 w-3" />
                {formatDate(date)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}