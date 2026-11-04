
"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/app/lib/supabase/client";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setErrorMessage("");

    if (password.length < 8) {
      setErrorMessage("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setSuccess(true);
    setMessage("Your password has been updated successfully.");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <main className="min-h-screen bg-[#f4f8f1] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#164b35]">
            Create New Password
          </h1>
          <p className="mt-2 text-gray-500">
            Choose a new password for your Thuliragam account.
          </p>
        </div>

        {!success ? (
          <form onSubmit={handleUpdatePassword} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                placeholder="Enter new password"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-700"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                placeholder="Confirm new password"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-700"
              />
            </div>

            {errorMessage && (
              <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#287a48] py-3 font-semibold text-white hover:bg-[#164b35] disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        ) : (
          <div className="text-center">
            <p className="mb-6 rounded-lg bg-green-50 p-4 text-green-800">
              {message}
            </p>
            <Link
              href="/login"
              className="inline-block rounded-lg bg-[#287a48] px-8 py-3 font-semibold text-white hover:bg-[#164b35]"
            >
              Go to Login
            </Link>
          </div>
        )}

        {!success && errorMessage && (
          <p className="mt-5 text-center text-sm text-gray-600">
            <Link href="/login" className="text-green-700 hover:underline">
              Back to Login
            </Link>
          </p>
        )}
      </div>
    </main>
  );
}
