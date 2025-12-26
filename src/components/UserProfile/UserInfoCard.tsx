import { useEffect, useState } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { 
  User, 
  Mail, 
  Phone, 
  Shield, 
  FileText, 
  Calendar, 
  MapPin, 
  Edit2,
  CheckCircle,
  XCircle,
  Clock,
  Navigation
} from "lucide-react";
import Request from "../../lib/axios";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function UserInfoCard({ userData, onUpdateSuccess ,userFun}: any) {
  const { isOpen, openModal, closeModal } = useModal();

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      gender: "",
      dateOfBirth: "",
      state: "",
      pincode: "",
      address: "",
    },
  });

  /* ✅ PREFILL FORM WHEN MODAL OPENS */
  useEffect(() => {
    if (userData && isOpen) {
      console.log("Prefilling form with user data:", userData);
      reset({
        name: userData.name || "",
        gender: userData.gender || "",
        email: userData.email || "",
        phone: userData.phone || "",
        dateOfBirth: userData.dateOfBirth
          ? userData.dateOfBirth.split("T")[0]
          : "",
        state: userData.state || "",
        pincode: userData.pincode || "",
        address: userData.address || "",
      });
    }
  }, [userData, isOpen, reset]);

  const onSubmit = async (data: any) => {
    try {
      const response = await Request.put("/auth/profile", data);
      toast.success("Profile updated successfully!");
      closeModal();
      if (onUpdateSuccess) {
        onUpdateSuccess(response.data);
      }
      userFun();
      
    } catch (error: any) {
      console.error("Profile update failed", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <>
      {/* ================= PROFILE CARD ================= */}
      <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-6 shadow-sm dark:border-gray-800 dark:from-gray-900 dark:to-gray-950 dark:shadow-gray-900/20">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Profile Information
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Personal details and account information
            </p>
          </div>
          <button
            onClick={openModal}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:from-blue-600 hover:to-blue-700 hover:shadow-md active:scale-95"
          >
            <Edit2 size={16} />
            Edit Profile
          </button>
        </div>

        <div className="space-y-8">
          {/* BASIC INFO */}
          <Section 
            title="Basic Information" 
            icon={<User className="h-4 w-4" />}
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <InfoItem 
                icon={<User size={16} />}
                label="Full Name" 
                value={userData?.name} 
              />
              <InfoItem 
                icon={<Mail size={16} />}
                label="Email Address" 
                value={userData?.email} 
                isEmail
              />
              <InfoItem 
                icon={<Phone size={16} />}
                label="Phone Number" 
                value={userData?.phone} 
              />
              <InfoItem 
                icon={<Shield size={16} />}
                label="Role" 
                value={userData?.role} 
                isBadge
              />
            </div>
          </Section>

          {/* STATUS & DOCUMENTS */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* STATUS */}
            <Section 
              title="Account Status" 
              icon={<Shield className="h-4 w-4" />}
            >
              <div className="grid grid-cols-1 gap-3">
                <StatusBadge 
                  label="KYC Status" 
                  value={userData?.kycStatus}
                  icon={<FileText size={14} />}
                />
                <StatusBadge 
                  label="Verified Account" 
                  value={userData?.isVerified ? "Verified" : "Pending"}
                  success={userData?.isVerified}
                  icon={userData?.isVerified ? <CheckCircle size={14} /> : <Clock size={14} />}
                />
                <StatusBadge 
                  label="Account Status" 
                  value={userData?.isActive ? "Active" : "Inactive"}
                  success={userData?.isActive}
                  icon={userData?.isActive ? <CheckCircle size={14} /> : <XCircle size={14} />}
                />
              </div>
            </Section>

            {/* DOCUMENTS */}
            <Section 
              title="Document Verification" 
              icon={<FileText className="h-4 w-4" />}
            >
              <div className="grid grid-cols-1 gap-3">
                <DocumentItem 
                  label="Driving License"
                  verified={userData?.drivingLicense?.verified}
                  lastVerified={userData?.drivingLicense?.lastVerified}
                />
                <DocumentItem 
                  label="Aadhaar Card"
                  verified={userData?.aadhaarCard?.verified}
                  lastVerified={userData?.aadhaarCard?.lastVerified}
                />
              </div>
            </Section>
          </div>

          {/* META INFO */}
          <Section 
            title="Account Meta" 
            icon={<Clock className="h-4 w-4" />}
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InfoItem 
                icon={<Calendar size={16} />}
                label="Created At" 
                value={formatDate(userData?.createdAt)} 
              />
              <InfoItem 
                icon={<Calendar size={16} />}
                label="Last Updated" 
                value={formatDate(userData?.updatedAt)} 
              />
            </div>
          </Section>

          {/* LOCATIONS */}
          <Section 
            title="Preferred Locations" 
            icon={<MapPin className="h-4 w-4" />}
          >
            <div className="rounded-xl bg-gradient-to-r from-gray-50 to-white p-4 dark:from-gray-800/50 dark:to-gray-900/50">
              {userData?.preferredLocations?.length ? (
                <div className="flex flex-wrap gap-2">
                  {userData.preferredLocations.map((location: string, index: number) => (
                    <span 
                      key={index}
                      className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-1.5 text-sm font-medium text-blue-700 dark:from-blue-900/20 dark:to-indigo-900/20 dark:text-blue-300"
                    >
                      <Navigation size={12} />
                      {location}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No preferred locations set
                </p>
              )}
            </div>
          </Section>
        </div>
      </div>

      {/* ================= EDIT MODAL ================= */}
      <Modal 
        isOpen={isOpen} 
        onClose={closeModal} 
        className="max-w-[680px] h-[96%] m-4"
      >
        <div className="rounded-2xl bg-gradient-to-b from-white to-gray-50 p-6 shadow-2xl dark:from-gray-900 dark:to-gray-950">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                Edit Profile
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Update your personal information
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Name Field with Controller */}
              <Controller
                name="name"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <div>
                    <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <User size={16} />
                      Full Name
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      {...field}
                      className="h-11 rounded-xl border border-gray-200 bg-white px-4 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                    )}
                  </div>
                )}
              />

              {/* Gender Field with Controller */}
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <div>
                    <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <User size={16} />
                      Gender
                    </Label>
                    <select
                      {...field}
                      className="w-full h-11 rounded-xl border border-gray-200 bg-white px-4 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                    {errors.gender && (
                      <p className="mt-1 text-sm text-red-500">{errors.gender.message}</p>
                    )}
                  </div>
                )}
              />

              {/* Email Field with Controller */}
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                }}
                render={({ field }) => (
                  <div>
                    <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <Mail size={16} />
                      Email Address
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      {...field}
                      type="email"
                      className="h-11 rounded-xl border border-gray-200 bg-white px-4 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                )}
              />

              {/* Phone Field with Controller */}
              <Controller
                name="phone"
                control={control}
                rules={{
                  pattern: {
                    value: /^[0-9+\-\s]*$/,
                    message: "Invalid phone number"
                  }
                }}
                render={({ field }) => (
                  <div>
                    <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <Phone size={16} />
                      Phone Number
                    </Label>
                    <Input
                      {...field}
                      type="tel"
                      className="h-11 rounded-xl border border-gray-200 bg-white px-4 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                    )}
                  </div>
                )}
              />

              {/* Date of Birth Field with Controller */}
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => (
                  <div>
                    <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <Calendar size={16} />
                      Date of Birth
                    </Label>
                    <Input
                      {...field}
                      type="date"
                      className="h-11 rounded-xl border border-gray-200 bg-white px-4 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    />
                    {errors.dateOfBirth && (
                      <p className="mt-1 text-sm text-red-500">{errors.dateOfBirth.message}</p>
                    )}
                  </div>
                )}
              />

              {/* State Field with Controller */}
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <div>
                    <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <MapPin size={16} />
                      State
                    </Label>
                    <Input
                      {...field}
                      className="h-11 rounded-xl border border-gray-200 bg-white px-4 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      placeholder="Enter your state"
                    />
                    {errors.state && (
                      <p className="mt-1 text-sm text-red-500">{errors.state.message}</p>
                    )}
                  </div>
                )}
              />

              {/* Pincode Field with Controller */}
              <Controller
                name="pincode"
                control={control}
                rules={{
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "Pincode must be 6 digits"
                  }
                }}
                render={({ field }) => (
                  <div>
                    <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <MapPin size={16} />
                      Pincode
                    </Label>
                    <Input
                      {...field}
                      className="h-11 rounded-xl border border-gray-200 bg-white px-4 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      placeholder="Enter 6-digit pincode"
                      maxLength={6}
                    />
                    {errors.pincode && (
                      <p className="mt-1 text-sm text-red-500">{errors.pincode.message}</p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Address Field with Controller */}
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <div>
                  <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <MapPin size={16} />
                    Address
                  </Label>
                  <textarea
                    {...field}
                    rows={3}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    placeholder="Enter your full address"
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>
                  )}
                </div>
              )}
            />

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button 
                type="button" 
                variant="outline" 
                onClick={closeModal}
                className="rounded-xl"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

/* ================= ENHANCED HELPERS ================= */

const Section = ({ title, children, icon }: any) => (
  <div className="relative">
    <div className="mb-4 flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 dark:from-blue-900/30 dark:to-indigo-900/30 dark:text-blue-400">
        {icon}
      </div>
      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h4>
    </div>
    {children}
  </div>
);

const InfoItem = ({ label, value, icon, isEmail, isBadge }: any) => (
  <div className="rounded-xl border border-gray-100 bg-white p-4 transition-all hover:border-blue-200 hover:shadow-sm dark:border-gray-800 dark:bg-gray-800/50 dark:hover:border-blue-900">
    <div className="mb-2 flex items-center gap-2">
      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-600 dark:from-blue-900/40 dark:to-indigo-900/40 dark:text-blue-400">
        {icon}
      </div>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
        {label}
      </p>
    </div>
    {isBadge ? (
      <span className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 px-3 py-1 text-sm font-medium text-blue-700 dark:from-blue-900/30 dark:to-indigo-900/30 dark:text-blue-300">
        {value || "—"}
      </span>
    ) : isEmail ? (
      <a 
        href={`mailto:${value}`} 
        className="text-sm font-medium text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
      >
        {value || "—"}
      </a>
    ) : (
      <p className="text-sm font-medium text-gray-900 dark:text-white">
        {value || "—"}
      </p>
    )}
  </div>
);

const StatusBadge = ({ label, value, success, icon }: any) => (
  <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-800/50">
    <div className="flex items-center gap-3">
      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
        success 
          ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-600 dark:from-green-900/30 dark:to-emerald-900/30 dark:text-green-400"
          : "bg-gradient-to-r from-yellow-50 to-amber-50 text-yellow-600 dark:from-yellow-900/30 dark:to-amber-900/30 dark:text-yellow-400"
      }`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">Current status</p>
      </div>
    </div>
    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
      success 
        ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 dark:from-green-900/30 dark:to-emerald-900/30 dark:text-green-300"
        : "bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 dark:from-yellow-900/30 dark:to-amber-900/30 dark:text-yellow-300"
    }`}>
      {value}
    </span>
  </div>
);

const DocumentItem = ({ label, verified, lastVerified }: any) => (
  <div className="rounded-xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-800/50">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
          verified 
            ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-600 dark:from-green-900/30 dark:to-emerald-900/30 dark:text-green-400"
            : "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 dark:from-gray-800 dark:to-gray-900 dark:text-gray-400"
        }`}>
          <FileText size={20} />
        </div>
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{label}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {verified ? `Verified on ${formatDate(lastVerified)}` : "Not verified"}
          </p>
        </div>
      </div>
      <div className={`h-2 w-2 rounded-full ${
        verified ? "bg-green-500 animate-pulse" : "bg-gray-400"
      }`} />
    </div>
  </div>
);

const formatDate = (date: string) =>
  date ? new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : "—";