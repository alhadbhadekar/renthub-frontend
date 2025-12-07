// /app/checkout/[id]/page.tsx

"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { addDays, differenceInDays } from "date-fns";
import { DateRange } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

// Define the insurance fee outside the component
const PRICE_PER_DAY = 55;
const INSURANCE_FEE = 6; // $6 per day

export default function CheckoutPage() {
  const { id } = useParams(); // Listing ID
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isInsured, setIsInsured] = useState(false); // Insurance state

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  // --- Calculation Logic ---
  const days = differenceInDays(range[0].endDate, range[0].startDate) || 1;
  const subtotal = days * PRICE_PER_DAY;
  const insuranceTotal = isInsured ? days * INSURANCE_FEE : 0;
  const total = subtotal + insuranceTotal;
  // -------------------------

  async function confirmBooking() {
    setIsLoading(true);

    const bookingData = {
        listingId: id,
        startDate: range[0].startDate.toISOString(),
        endDate: range[0].endDate.toISOString(),
        renterId: 'mock_renter_456', // Mock User
        isInsured: isInsured,
    };

    try {
        const response = await fetch('/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData),
        });

        const data = await response.json();

        if (response.ok) {
            alert(`✅ Booking confirmed! Commission saved on the backend.`);
            // Redirect to the lister dashboard to see the results
            router.push(`/dashboard/business`); 
        } else {
            console.error('Booking failed:', data.message);
            alert(`Booking failed: ${data.message || 'Internal error'}`);
        }

    } catch (error) {
        console.error('Network Error:', error);
        alert('Could not connect to booking service.');
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-24 text-white">
      <h1 className="text-3xl font-bold mb-6">Checkout for Listing #{id}</h1>

      <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 space-y-8">
        
        {/* CALENDAR */}
        <DateRange
          ranges={range}
          onChange={(item) => setRange([item.selection as any])}
          minDate={new Date()}
          rangeColors={["#22c55e"]}
        />

        {/* INSURANCE ADD-ON */}
        <div className="flex items-center justify-between p-4 rounded-lg border border-white/20 bg-yellow-900/40">
            <label htmlFor="insurance-toggle" className="flex flex-col">
                <span className="font-semibold">Add Damage Protection</span>
                <span className="text-sm text-gray-300">
                    Covers accidental damage. (${INSURANCE_FEE} / day)
                </span>
            </label>
            <input
                type="checkbox"
                id="insurance-toggle"
                checked={isInsured}
                onChange={() => setIsInsured(!isInsured)}
                className="w-5 h-5 text-yellow-500 bg-gray-700 rounded border-gray-600 focus:ring-yellow-500"
            />
        </div>

        {/* PRICE SUMMARY */}
        <div className="bg-black/40 p-4 rounded-lg border border-white/20 space-y-1">
          <h2 className="text-xl font-bold mb-2">Order Summary</h2>
          <div className="flex justify-between text-base">
            <span>{PRICE_PER_DAY} x {days} days</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {isInsured && (
            <div className="flex justify-between text-base text-yellow-400">
                <span>Damage Protection ({days} days)</span>
                <span>${insuranceTotal.toFixed(2)}</span>
            </div>
          )}
          <hr className="border-white/20 my-2" />
          <div className="flex justify-between text-xl font-bold">
            <span>Total to Pay</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* CONFIRM BUTTON */}
        <button
          onClick={confirmBooking}
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-700 py-3 rounded font-semibold disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isLoading ? "Processing..." : "Confirm & Pay (Mock)"}
        </button>
      </div>
    </div>
  );
}