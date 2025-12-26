import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCarById } from "../../redux/slice/carSlice";
import {
  MapPin,
  Calendar,
  Fuel,
  Settings,
  Users,
  Palette,
  Shield,
  Star,
  CheckCircle,
  Clock,
  Car as CarIcon,
  CreditCard,
  Navigation,
  FileText,
  Image as ImageIcon,
  ChevronRight,
  Heart,
  Share2,
  Phone,
  MessageCircle,
  Award,
  Zap,
  Wind,
  Music,
  Wifi,
  Smartphone,
  Sun,
  Droplets,
  Radio,
} from "lucide-react";
import { format } from "date-fns";

export default function CarDetail({ carDetails } : { car?: any }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleCar, loading, error } = useSelector((s) => s.cars);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    dispatch(getCarById(id));
  }, [id]);
console.log(singleCar,"singleCar")

  if (loading || !singleCar) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
        <div className="text-center">
          <div className="mb-4 h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
            Loading car details...
          </p>
        </div>
      </div>
    );
  }
  const car = singleCar[0] || carDetails;
  console.log("Car:", car);
  // Feature icons mapping
  const featureIcons = {
    AC: <Wind className="h-4 w-4" />,
    Bluetooth: <Music className="h-4 w-4" />,
    GPS: <Navigation className="h-4 w-4" />,
    "Rear Camera": <Camera className="h-4 w-4" />,
    "Sunroof": <Sun className="h-4 w-4" />,
    "Heated Seats": <Droplets className="h-4 w-4" />,
    "Apple CarPlay": <Smartphone className="h-4 w-4" />,
    "Android Auto": <Smartphone className="h-4 w-4" />,
    "Touchscreen": <Smartphone className="h-4 w-4" />,
    "Keyless Entry": <Zap className="h-4 w-4" />,
    "Parking Sensors": <Navigation className="h-4 w-4" />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-lg dark:border-gray-800 dark:bg-gray-900/80">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CarIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Car Details
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`rounded-full p-2 transition-colors ${
                  isFavorite
                    ? "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                }`}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
              </button>
              <button className="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Images & Basic Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-900">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={car?.images?.[selectedImage]?.url || "https://via.placeholder.com/800x450?text=Car+Image"}
                  alt={`${car.brand} ${car.model}`}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
                {car.isVerified && (
                  <div className="absolute left-4 top-4 rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
                    <CheckCircle className="mr-1 inline h-3 w-3" />
                    Verified
                  </div>
                )}
                <div className="absolute bottom-4 right-4 rounded-full bg-black/50 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                  {selectedImage + 1} / {car.images?.length || 1}
                </div>
              </div>
              
              {/* Thumbnail Gallery */}
              {car.images?.length > 1 && (
                <div className="grid grid-cols-4 gap-2 p-4">
                  {car.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative overflow-hidden rounded-lg transition-all ${
                        selectedImage === idx
                          ? "ring-2 ring-blue-500 ring-offset-2"
                          : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={`Thumbnail ${idx + 1}`}
                        className="h-20 w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Car Title & Rating */}
            <div className="rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {car.brand} {car.model}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    {car.year} • {car.variant || car.carType}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(car.rating?.average || 0)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {car.rating?.average || 4.5}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    ({car.rating?.count || 0} reviews)
                  </span>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300">{car.description}</p>
            </div>

            {/* Tabs Navigation */}
            <div className="sticky top-24 z-40">
              <div className="flex space-x-1 rounded-xl bg-white p-1 shadow-lg dark:bg-gray-900">
                {["overview", "features", "documents", "location"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                      activeTab === tab
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow"
                        : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="mt-6">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Specifications Grid */}
                  <div className="rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">
                    <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                      Specifications
                    </h3>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                      <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                        <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/30">
                          <Fuel className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Fuel Type</p>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {car.fuelType}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                        <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900/30">
                          <Settings className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Transmission</p>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {car.transmission}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                        <div className="rounded-full bg-green-100 p-2 dark:bg-green-900/30">
                          <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Seats</p>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {car.seats} People
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                        <div className="rounded-full bg-yellow-100 p-2 dark:bg-yellow-900/30">
                          <Palette className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Color</p>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {car.color}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                        <div className="rounded-full bg-red-100 p-2 dark:bg-red-900/30">
                          <Calendar className="h-5 w-5 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Year</p>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {car.year}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                        <div className="rounded-full bg-indigo-100 p-2 dark:bg-indigo-900/30">
                          <Shield className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Vehicle No.</p>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {car.vehicleNumber}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Features Section */}
                  <div className="rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">
                    <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                      Features & Amenities
                    </h3>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                      {car.features?.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 dark:border-gray-700"
                        >
                          <div className="rounded-md bg-blue-50 p-1.5 dark:bg-blue-900/20">
                            {featureIcons[feature] || <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
                          </div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "features" && (
                <div className="rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">
                  <h3 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
                    All Features
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      { icon: <Wind className="h-5 w-5" />, label: "Climate Control", value: "Dual Zone AC" },
                      { icon: <Music className="h-5 w-5" />, label: "Audio System", value: "Premium Sound System" },
                      { icon: <Navigation className="h-5 w-5" />, label: "Navigation", value: "Built-in GPS" },
                      { icon: <Shield className="h-5 w-5" />, label: "Safety", value: "6 Airbags, ABS" },
                      { icon: <Zap className="h-5 w-5" />, label: "Power Features", value: "Windows & Locks" },
                      { icon: <Smartphone className="h-5 w-5" />, label: "Connectivity", value: "Apple CarPlay & Android Auto" },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/30">
                            {item.icon}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{item.value}</p>
                          </div>
                        </div>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "documents" && (
                <div className="rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">
                  <h3 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
                    Documents & Certificates
                  </h3>
                  <div className="grid gap-4">
                    {Object.entries(car.documents || {}).map(([key, doc]) => (
                      <div key={key} className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="rounded-full bg-indigo-100 p-2 dark:bg-indigo-900/30">
                              <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                              </h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Valid and verified document
                              </p>
                            </div>
                          </div>
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
                          >
                            View
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "location" && (
                <div className="rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">
                  <h3 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
                    Pickup Location
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/30">
                        <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Address</p>
                        <p className="text-gray-600 dark:text-gray-300">{car.location?.address}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                        <p className="text-sm text-gray-500 dark:text-gray-400">City</p>
                        <p className="font-medium text-gray-900 dark:text-white">{car.location?.city}</p>
                      </div>
                      <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                        <p className="text-sm text-gray-500 dark:text-gray-400">State</p>
                        <p className="font-medium text-gray-900 dark:text-white">{car.location?.state}</p>
                      </div>
                      <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Pincode</p>
                        <p className="font-medium text-gray-900 dark:text-white">{car.location?.pincode}</p>
                      </div>
                    </div>
                    <div className="h-64 rounded-xl bg-gray-200 dark:bg-gray-800">
                      {/* Map placeholder */}
                      <div className="flex h-full items-center justify-center">
                        <MapPin className="h-12 w-12 text-gray-400" />
                        <p className="ml-2 text-gray-500">Map view coming soon</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Pricing & Booking */}
          <div className="space-y-8">
            {/* Pricing Card */}
            <div className=" rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 shadow-2xl">
              <h3 className="mb-6 text-xl font-bold text-white">Pricing</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-blue-200" />
                    <span className="text-blue-100">Hourly</span>
                  </div>
                  <span className="text-2xl font-bold text-white">
                    ₹{car.pricing?.hourly}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-blue-200" />
                    <span className="text-blue-100">Daily</span>
                  </div>
                  <span className="text-2xl font-bold text-white">
                    ₹{car.pricing?.daily}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-blue-200" />
                    <span className="text-blue-100">Weekly</span>
                  </div>
                  <span className="text-2xl font-bold text-white">
                    ₹{car.pricing?.weekly}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-blue-200" />
                    <span className="text-blue-100">Monthly</span>
                  </div>
                  <span className="text-2xl font-bold text-white">
                    ₹{car.pricing?.monthly}
                  </span>
                </div>
              </div>
              <div className="mt-6 border-t border-blue-400 pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-blue-200" />
                    <span className="text-blue-100">Security Deposit</span>
                  </div>
                  <span className="text-xl font-bold text-white">
                    ₹{car.securityDeposit}
                  </span>
                </div>
              </div>
              <button className="mt-6 w-full rounded-xl bg-white px-6 py-3 text-lg font-bold text-blue-600 transition-all hover:scale-[1.02] hover:shadow-xl">
                Book Now
              </button>
            </div>

            {/* Owner Info Card */}
            <div className="rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">
              <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                Owner Information
              </h3>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">
                    {car.owner?.name?.charAt(0) || "O"}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    {car.owner?.name || "Car Owner"}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    <Phone className="mr-1 inline h-4 w-4" />
                    {car.owner?.phone || "Not provided"}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Award className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Verified Owner
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 rounded-lg bg-blue-50 px-4 py-3 text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50">
                  <Phone className="h-4 w-4" />
                  Call
                </button>
                <button className="flex items-center justify-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-green-600 transition-colors hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50">
                  <MessageCircle className="h-4 w-4" />
                  Message
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">
              <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                Car Stats
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Availability</span>
                  <span className={`rounded-full px-3 py-1 text-sm font-medium ${
                    car.availability
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                  }`}>
                    {car.availability ? "Available" : "Booked"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Car Type</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {car.carType}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Verified Status</span>
                  <span className="flex items-center gap-1 font-medium text-green-600 dark:text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    Verified
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Listed On</span>
                  {/* <span className="font-medium text-gray-900 dark:text-white">
                    {format(new Date(car.createdAt), "MMM dd, yyyy")}
                  </span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for Camera icon
const Camera = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);