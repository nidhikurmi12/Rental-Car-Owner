import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Request from "../../lib/axios";
import api from "../../services/api.services";
import { toast } from "react-toastify";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    if (!email) {
      setError("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      const res = await Request.post(api.forgetPassword, { email });
      toast.success(res.message || "Reset link sent to your email");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-violet-600 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-2">
          Forgot Password
        </h2>
        <p className="text-center text-sm text-gray-500 mb-4">
          Enter your registered email, we will send you a reset link.
        </p>

        {error && (
          <div className="bg-red-50 text-red-700 text-sm p-3 rounded mb-3">
            {error}
          </div>
        )}

        {msg && (
          <div className="bg-green-50 text-green-700 text-sm p-3 rounded mb-3">
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 mb-5 w-full rounded-md border-gray-200 shadow-sm focus:ring-2 focus:ring-violet-400 focus:border-transparent p-3"
            placeholder="you@example.com"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white font-medium py-3 rounded-lg shadow"
          >
            {loading ? "Sending reset link..." : "Send Reset Link"}
          </button>
        </form>

        <button
          className="w-full mt-4 text-sm text-gray-500 hover:text-violet-600"
          type="button"
          onClick={() => navigate("/login")}
        >
          ← Back to Login
        </button>
      </div>
    </div>
  );
}
