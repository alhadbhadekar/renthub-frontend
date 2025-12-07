"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { addDays, differenceInDays } from "date-fns";
import { DateRange } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

type Booking = {
  id: string;
  listingId: number;
  title: string;
  from: string;
  to: string;
  days: number;
  total: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
};

export default function CheckoutPage() {
  const { id } = useParams();
  const router = useRouter();

  const pricePerDay = 55;

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  const days =
    differenceInDays(range[0].endDate, range[0].startDate) || 1;
  const total = days * pricePerDay;

  function confirmBooking() {
    const bookings: Booking[] = JSON.parse(
      localStorage.getItem("renthub_bookings") || "[]"
    );

    const newBooking: Booking = {
      id: `bk-${Date.now()}`,
      listingId: Number(id),
      title: "Modern Sofa",
      from: range[0].startDate.toDateString(),
      to: range[0].endDate.toDateString(),
      days,
      total,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "renthub_bookings",
      JSON.stringify([newBooking, ...bookings])
    );

    // Notification
    const notifs = JSON.parse(
      localStorage.getItem("renthub_notifications") || "[]"
    );

    localStorage.setItem(
      "renthub_notifications",
      JSON.stringify([
        {
          id: Date.now(),
          message: `✅ Booking confirmed for ${newBooking.title}`,
          date: new Date().toLocaleString(),
          read: false,
        },
        ...notifs,
      ])
    );

    router.push("/bookings");
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-24 text-white">
      <h1 className="text-3xl font-bold mb-6">Select Rental Dates</h1>

      <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 space-y-8">
        {/* CALENDAR */}
        <DateRange
          ranges={range}
          onChange={(item: any) => // ✅ FIX APPLIED HERE
            setRange([item.selection as any])
          }
          minDate={new Date()}
          rangeColors={["#22c55e"]}
        />

        {/* PRICE SUMMARY */}
        <div className="bg-black/40 p-4 rounded-lg border border-white/20">
          <p>Price per day: ${pricePerDay}</p>
          <p>Days: {days}</p>
          <p className="text-xl font-bold mt-2">Total: ${total}</p>
        </div>

        {/* CONFIRM */}
        <button
          onClick={confirmBooking}
          className="w-full bg-green-600 hover:bg-green-700 py-3 rounded font-semibold"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}