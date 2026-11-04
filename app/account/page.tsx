
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase/client";

export default function AccountPage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [passwordSaving, setPasswordSaving] = useState(false);

  useEffect(() => {
    const loadAccount = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.replace("/login");
        return;
      }

      setUser(data.user);
      setFullName(data.user.user_metadata?.full_name || "");
      setMobile(data.user.user_metadata?.phone || "");
      setLoading(false);
    };

    loadAccount();
  }, [router]);

  const handleSaveProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");
    setErrorMessage("");

    if (!fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (mobile.trim() && !/^[0-9]{10}$/.test(mobile.trim())) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    setSaving(true);

    const { data, error } = await supabase.auth.updateUser({
      data: {
        full_name: fullName.trim(),
        phone: mobile.trim(),
      },
    });

    setSaving(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setUser(data.user);
    setEditing(false);
    setMessage("Your profile has been updated successfully! 🌱");
  };
const handleChangePassword = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  setMessage("");
  setErrorMessage("");

  if (newPassword.length < 8) {
    setErrorMessage("Password must contain at least 8 characters.");
    return;
  }

  if (newPassword !== confirmPassword) {
    setErrorMessage("Passwords do not match.");
    return;
  }

  setPasswordSaving(true);

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  setPasswordSaving(false);

  if (error) {
    setErrorMessage(error.message);
    return;
  }

  setNewPassword("");
  setConfirmPassword("");
  setMessage("Your password has been changed successfully! 🌱");
};
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      router.replace("/login");
    } else {
      setErrorMessage(error.message);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f4f8f1]">
        <p className="text-[#164b35]">Loading your account...</p>
      </main>
    );
  }

  const customerName =
    user?.user_metadata?.full_name || "Thuliragam Customer";

  return (
    <main className="min-h-screen bg-[#f4f8f1] px-4 py-12">
      <div className="mx-auto max-w-4xl">

        {/* HEADER */}
        <div className="mb-8">
          <p className="text-sm font-medium text-green-700">
            THULIRAGAM CUSTOMER ACCOUNT
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#164b35]">
            Welcome, {customerName} 🌱
          </h1>

          <p className="mt-2 text-gray-600">
            Manage your personal details and account with Thuliragam.
          </p>
        </div>

        {/* STATUS MESSAGES */}
        {message && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800">
            {message}
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {errorMessage}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">

          {/* MY PROFILE */}
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#164b35]">
                My Profile
              </h2>

              {!editing && (
                <button
                  onClick={() => {
                    setMessage("");
                    setErrorMessage("");
                    setEditing(true);
                  }}
                  className="rounded-lg bg-green-50 px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-100"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {editing ? (
              <form onSubmit={handleSaveProfile} className="space-y-4">

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-600">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none focus:border-green-600"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-600">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={user.email || ""}
                    disabled
                    className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-500"
                  />

                  <p className="mt-1 text-xs text-gray-500">
                    Email address cannot be changed here.
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-600">
                    Mobile Number
                  </label>

                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={mobile}
                    onChange={(e) =>
                      setMobile(e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="Enter 10-digit mobile number"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none focus:border-green-600"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 rounded-lg bg-[#287a48] px-4 py-3 font-semibold text-white hover:bg-[#164b35] disabled:opacity-60"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFullName(user?.user_metadata?.full_name || "");
                      setMobile(user?.user_metadata?.phone || "");
                      setEditing(false);
                      setErrorMessage("");
                    }}
                    className="rounded-lg border border-gray-300 px-4 py-3 font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-5">

                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium text-gray-800">
                    {customerName}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="break-all font-medium text-gray-800">
                    {user.email}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Mobile Number</p>
                  <p className="font-medium text-gray-800">
                    {user.user_metadata?.phone || "Not added yet"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Email Status</p>
                  <p className="font-medium text-green-700">
                    {user.email_confirmed_at ? "Verified ✓" : "Not verified"}
                  </p>
                </div>

              </div>
            )}
          </section>

          {/* MY SHOPPING */}
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold text-[#164b35]">
              My Shopping
            </h2>

            <div className="space-y-4">
              <Link
                href="/cart"
                className="block rounded-lg border border-green-100 p-4 text-[#164b35] hover:bg-green-50"
              >
                <span className="font-semibold">My Cart</span>
                <p className="mt-1 text-sm text-gray-500">
                  View products added to your cart.
                </p>
              </Link>

              <div className="rounded-lg border border-green-100 p-4">
                <p className="font-semibold text-[#164b35]">
                  My Orders
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Order history will be available when online ordering launches.
                </p>
              </div>
            </div>
          </section>

        </div>
{/* CHANGE PASSWORD */}
<section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
  <h2 className="mb-2 text-xl font-bold text-[#164b35]">
    Change Password
  </h2>

  <p className="mb-5 text-sm text-gray-500">
    Update your password to keep your account secure.
  </p>

  <form onSubmit={handleChangePassword} className="max-w-lg space-y-4">
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-600">
        New Password
      </label>

      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter new password"
        minLength={8}
        required
        autoComplete="new-password"
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none focus:border-green-600"
      />
    </div>

    <div>
      <label className="mb-2 block text-sm font-medium text-gray-600">
        Confirm New Password
      </label>

      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm new password"
        minLength={8}
        required
        autoComplete="new-password"
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none focus:border-green-600"
      />
    </div>

    <button
      type="submit"
      disabled={passwordSaving}
      className="rounded-lg bg-[#287a48] px-6 py-3 font-semibold text-white hover:bg-[#164b35] disabled:opacity-60"
    >
      {passwordSaving ? "Updating..." : "Update Password"}
    </button>
  </form>
</section>
        {/* ACCOUNT ACTIONS */}
        <div className="mt-8 flex flex-wrap gap-4">

          <Link
            href="/"
            className="rounded-lg bg-[#287a48] px-6 py-3 font-semibold text-white hover:bg-[#164b35]"
          >
            Continue Shopping
          </Link>

          <button
            onClick={handleLogout}
            className="rounded-lg border border-red-200 px-6 py-3 font-semibold text-red-600 hover:bg-red-50"
          >
            Logout
          </button>

        </div>

      </div>
    </main>
  );
}
