import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Request from "../../lib/axios";
import api from "../../services/api.services";
import { toast } from "react-toastify";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    if (!password || !confirmPassword) {
      setError("Please fill both fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await Request.post(`${api.resetPassword}/${token}`, {
        password,
        confirmPassword,
      });
      toast.success(res.message || "Password reset successfully");
        navigate("/signin");
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
          Set New Password
        </h2>

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
            New Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 mb-4 w-full rounded-md border-gray-200 shadow-sm focus:ring-2 focus:ring-violet-400 focus:border-transparent p-3"
            placeholder="••••••••"
            required
          />

          <label className="block text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 mb-6 w-full rounded-md border-gray-200 shadow-sm focus:ring-2 focus:ring-violet-400 focus:border-transparent p-3"
            placeholder="••••••••"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white font-medium py-3 rounded-lg shadow"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
