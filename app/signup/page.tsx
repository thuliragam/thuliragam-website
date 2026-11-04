
"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/app/lib/supabase/client";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
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

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,

        options: {
          data: {
            full_name: name.trim(),
          },

          // Redirect customer to My Account after email confirmation
          emailRedirectTo: `${window.location.origin}/account`,
        },
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      if (data.user && !data.session) {
        setMessage(
          "Your account has been created! Please check your email and click the confirmation link to activate your account."
        );
      } else if (data.session) {
        window.location.href = "/account";
        return;
      }

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f8f1] flex items-center justify-center px-4 py-12">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

        {/* HEADER */}
        <div className="mb-8 text-center">

          <h1 className="text-3xl font-bold text-[#164b35]">
            Join Thuliragam 🌱
          </h1>

          <p className="mt-2 text-gray-500">
            Create your customer account
          </p>

          <p className="mt-2 text-sm text-green-700">
            Grow Healthier Tomorrow
          </p>

        </div>

        {/* SIGNUP FORM */}
        <form onSubmit={handleSignup} className="space-y-5">

          {/* FULL NAME */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              placeholder="Enter your full name"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-700"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-700"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="Create a password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-700"
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Confirm Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="Confirm your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-700"
            />
          </div>

          {/* ERROR MESSAGE */}
          {errorMessage && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {errorMessage}
            </div>
          )}

          {/* SUCCESS MESSAGE */}
          {message && (
            <div className="rounded-lg bg-green-50 p-4 text-sm text-green-800">
              <p className="font-semibold">
                Registration successful! 🌱
              </p>

              <p className="mt-2">
                {message}
              </p>
            </div>
          )}

          {/* CREATE ACCOUNT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#287a48] py-3 font-semibold text-white transition hover:bg-[#164b35] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        {/* LOGIN LINK */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}

          <Link
            href="/login"
            className="font-semibold text-green-700 hover:underline"
          >
            Login
          </Link>
        </p>

      </div>

    </main>
  );
}
