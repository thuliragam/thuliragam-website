
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/app/components/cart/CartContext";
import { checkDeliveryAvailability } from "@/app/lib/delivery";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartCount,
    cartTotal,
  } = useCart();

  const [pincode, setPincode] = useState("");
  const [deliveryChecked, setDeliveryChecked] = useState(false);
  const [deliveryAvailable, setDeliveryAvailable] = useState(false);

  function checkDelivery() {
    const validFormat = /^[0-9]{6}$/.test(pincode.trim());

    if (!validFormat) {
      setDeliveryChecked(true);
      setDeliveryAvailable(false);
      return;
    }

    const available = checkDeliveryAvailability(pincode);
    setDeliveryChecked(true);
    setDeliveryAvailable(available);
  }

  function handlePincodeChange(value: string) {
    setPincode(value.replace(/\D/g, "").slice(0, 6));
    setDeliveryChecked(false);
    setDeliveryAvailable(false);
  }

  return (
    <main className="min-h-screen bg-[#F7FFF9] px-4 pb-20 pt-32 sm:px-8">
      <div className="mx-auto max-w-5xl">

        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
            Thuliragam
          </p>

          <h1 className="mt-3 text-4xl font-black text-[#064E3B]">
            Your Shopping Cart
          </h1>

          <p className="mt-3 text-[#607568]">
            Fresh greens, selected just for you.
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-3xl border border-emerald-100 bg-white p-10 text-center shadow-sm">
            <div className="text-6xl">🛒</div>

            <h2 className="mt-5 text-2xl font-bold text-[#064E3B]">
              Your cart is empty
            </h2>

            <p className="mt-3 text-[#607568]">
              Explore our fresh microgreens and add your favourites.
            </p>

            <Link
              href="/products/microgreens"
              className="mt-7 inline-flex rounded-xl bg-emerald-700 px-7 py-3 font-bold text-white transition hover:bg-emerald-800"
            >
              Explore Microgreens
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">

            {/* CART ITEMS */}
            <div className="space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item.name}
                  className="flex flex-col gap-5 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center"
                >
                  <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl bg-emerald-50 sm:w-28">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#064E3B]">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-sm text-[#607568]">
                      ₹{item.price50g.toFixed(2)} / 50 g
                    </p>

                    <p className="mt-2 font-bold text-emerald-800">
                      ₹{(item.price50g * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                    <div className="flex items-center gap-3 rounded-xl border border-emerald-200 px-3 py-2">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.name, item.quantity - 1)
                        }
                        className="font-bold text-emerald-800"
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        −
                      </button>

                      <span className="min-w-5 text-center font-bold">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.name, item.quantity + 1)
                        }
                        className="font-bold text-emerald-800"
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.name)}
                      className="text-sm font-semibold text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <Link
                href="/products/microgreens"
                className="inline-flex font-semibold text-emerald-800 hover:underline"
              >
                ← Continue Shopping
              </Link>
            </div>

            {/* ORDER SUMMARY */}
            <aside className="h-fit rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-extrabold text-[#064E3B]">
                Order Summary
              </h2>

              <div className="mt-6 flex justify-between text-sm text-[#607568]">
                <span>Total Items</span>
                <span>{cartCount}</span>
              </div>

              <div className="mt-4 flex justify-between text-sm text-[#607568]">
                <span>Subtotal</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>

              <div className="my-5 border-t border-emerald-100" />

              <div className="flex justify-between text-lg font-black text-[#064E3B]">
                <span>Total</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>

              {/* DELIVERY PIN CODE */}
              <div className="mt-7 rounded-xl border border-emerald-100 bg-emerald-50/70 p-4">
                <h3 className="font-bold text-[#064E3B]">
                  Check Delivery Availability
                </h3>

                <p className="mt-1 text-xs text-[#607568]">
                  Enter your 6-digit delivery PIN code.
                </p>

                <div className="mt-4 flex gap-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => handlePincodeChange(e.target.value)}
                    placeholder="Enter PIN code"
                    className="min-w-0 flex-1 rounded-lg border border-emerald-200 bg-white px-3 py-3 text-sm text-[#064E3B] outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  />

                  <button
                    type="button"
                    onClick={checkDelivery}
                    disabled={pincode.length !== 6}
                    className="rounded-lg bg-emerald-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-gray-300"
                  >
                    Check
                  </button>
                </div>

                {deliveryChecked && (
                  <div
                    className={`mt-3 rounded-lg p-3 text-sm font-semibold ${
                      deliveryAvailable
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-700"
                    }`}
                    role="status"
                  >
                    {deliveryAvailable
                      ? "✓ Delivery is available in your area!"
                      : "Delivery is currently unavailable for this PIN code."}
                  </div>
                )}
              </div>

              <p className="mt-4 text-xs leading-5 text-[#607568]">
                Each quantity represents one 50 g pack. Delivery charges, if
                applicable, will be calculated separately.
              </p>

              <button
                type="button"
                disabled
                className="mt-7 w-full cursor-not-allowed rounded-xl bg-gray-300 px-5 py-4 font-bold text-gray-600"
              >
                Checkout — Coming Soon
              </button>

              <p className="mt-3 text-center text-xs text-[#607568]">
                Phone verification and final delivery confirmation will be
                required before ordering.
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
