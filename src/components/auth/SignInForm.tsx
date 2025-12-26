import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Request from "../../lib/axios";
import api from "../../services/api.services";
import { Modal } from "../ui/modal";
import { useModal } from "../../hooks/useModal";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { FiEyeOff } from "react-icons/fi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignInForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [resetEmail, setResetEmail] = useState("");

  const { isOpen, openModal, closeModal } = useModal();
const { verifyAuth } = useAuth();
  // ================= LOGIN =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const res = await Request.post(api.login, { email, password });

      if (res.data?.token) {

        toast.success(res.data.message || "Login successful ");
      } else {
        setError("Invalid login response");
      }
  await verifyAuth();
        navigate("/");
      
    } catch (err) {
    toast.error(err.response?.data?.message || "Login failed, please try again");
    } finally {
      setLoading(false);
    }
  };

  // ================= FORGOT PASSWORD =================
  const handleForgotPassword = async () => {
    if (!resetEmail) {
      alert("Please enter your email");
      return;
    }
    try {
      await Request.post(api.forgetPassword, { email: resetEmail });
      toast.success("Password reset link sent to your email");
      setResetEmail("");
      closeModal();
    } catch (err) {
      toast.error("Failed to send reset link, please try again");
    }
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Back Link */}
      <div className="w-full max-w-md pt-10 mx-auto">
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
        <form onSubmit={handleSubmit}>
          {error && (
            <p className="mb-4 text-sm text-red-600">{error}</p>
          )}

          {/* Email */}
          <label className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-3 border rounded-md"
            placeholder="you@example.com"
            required
          />

          {/* Password */}
          <label className="block text-sm font-medium mb-1">
            Password
          </label>
          <div className="relative mb-4">
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-md"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
            >
              {showPass ? <FaEye />:<FaEyeSlash />}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-right mb-4">
            <button
              type="button"
              onClick={openModal}
              className="text-sm text-violet-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-lg"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Sign Up */}
        <p className="mt-5 text-sm text-center">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-violet-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>

      {/* ================= MODAL ================= */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-md p-6">
        <h2 className="text-lg font-semibold mb-4">
          Reset Password
        </h2>

        <p className="text-sm mb-4 text-gray-600">
          Enter your email to receive a password reset link.
        </p>

        <input
          type="email"
          value={resetEmail}
          onChange={(e) => setResetEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full mb-4 p-3 border rounded-md"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={closeModal}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleForgotPassword}
            className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
          >
            Send Link
          </button>
        </div>
      </Modal>
    </div>
  );
}
