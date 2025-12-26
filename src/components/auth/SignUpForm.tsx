import { useState } from "react";
import { Link } from "react-router";
import { ChevronLeftIcon } from "../../icons";
import Label from "../form/Label";
import Checkbox from "../form/input/Checkbox";
import api from "../../services/api.services";
import { useForm } from "react-hook-form";
import Request from "../../lib/axios";
import EnvVars from "../../config/EnVars.conf";
import Toast from "../ui/toast/toastContainer";
import { toast } from "react-toastify";

/* ✅ Define form type OUTSIDE component */
type SignUpInputs = {
  name: string;
  email: string;
  phone: string;
  aadhar: string;
  city: string;
  queries?: string;
};

export default function SignUpForm() {
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
console.log(EnvVars.API_ENDPOINT,"hello");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpInputs>();

  /* ✅ Submit handler */
  const ownerRequest = async (data: SignUpInputs) => {
    if (!isChecked) {
      setError("Please accept terms and conditions");
      return;
    }
    setError("");
    setLoading(true);

    try {
      console.log("Submitting owner request:", data);
      const res = await Request.post(api.OwnerRequest, data);
     toast.success(res.message || "Request submitted successfully");
      reset();
      setIsChecked(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
     
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      {/* Back */}
      <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ChevronLeftIcon className="size-5" />
          Back to dashboard
        </Link>
      </div>

      {/* Form */}
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <form
          onSubmit={handleSubmit(ownerRequest)}
          className="space-y-5"
        >
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          {/* Name */}
          <div>
            <Label>
              Name <span className="text-error-500">*</span>
            </Label>
            <input
              type="text"
              placeholder="Enter your name"
              className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-xs text-red-500">Name is required</p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label>
              Email <span className="text-error-500">*</span>
            </Label>
            <input
              type="email"
              placeholder="Enter your email"
                     className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-xs text-red-500">Email is required</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <Label>
              Phone Number <span className="text-error-500">*</span>
            </Label>
            <input
              type="tel"
              placeholder="Enter phone number"
                     className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
              {...register("phone", { required: true })}
            />
            {errors.phone && (
              <p className="text-xs text-red-500">Phone is required</p>
            )}
          </div>
      {/* city */}
          <div>
              <Label>
              City <span className="text-error-500">*</span>
            </Label>
            <input
              placeholder="Enter Aadhar number"
                     className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
              {...register("city", { required: true })}
            />
            {errors.city && (
              <p className="text-xs text-red-500">
                Aadhar is required
              </p>
            )}
          </div>

          {/* Aadhar */}
          <div>
            <Label>
              Aadhar Number <span className="text-error-500">*</span>
            </Label>
            <input
              placeholder="Enter Aadhar number"
                     className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
              {...register("aadhar", { required: true })}
            />
            {errors.aadhar && (
              <p className="text-xs text-red-500">
                Aadhar is required
              </p>
            )}
          </div>
        {/* QUERIES */}
          <div>
            <Label>
              Quries <span className="text-error-500">*</span>
            </Label>
            <input
              type="text"
              placeholder="Enter your name"
              className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
              {...register("queries", { required: true })}
            />
            {errors.queries && (
              <p className="text-xs text-red-500">Name is required</p>
            )}
          </div>
          {/* Checkbox */}
          <div className="flex items-center gap-3">
            <Checkbox
              className="w-5 h-5"
              checked={isChecked}
              onChange={setIsChecked}
            />
            <p className="text-sm text-gray-500">
              I agree to the{" "}
              <span className="text-gray-800">
                Terms & Conditions
              </span>
            </p>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 text-sm font-medium text-white rounded-lg bg-brand-500 hover:bg-brand-600 disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Sign Up"}
          </button>
        </form>

        {/* Sign In */}
        <p className="mt-5 text-sm text-center">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-brand-500 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
