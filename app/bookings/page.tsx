"use client";

import { useEffect, useState } from "react";

type BookingStatus = "pending" | "confirmed" | "cancelled";

type Booking = {
  id: string;
  title: string;
  from: string;
  to: string;
  days: number;
  total: number;
  status: BookingStatus;
};

const VALID_STATUSES: BookingStatus[] = ["pending", "confirmed", "cancelled"];

// ✅ Runtime validation for unknown JSON data
function normalizeBookings(raw: any[]): Booking[] {
  return raw
    .filter(Boolean)
    .map((b) => ({
      ...b,
      status: VALID_STATUSES.includes(b.status)
        ? b.status
        : "pending", // ✅ fallback for broken data
    }));
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    try {
      const raw = JSON.parse(
        localStorage.getItem("renthub_bookings") || "[]"
      );

      const safe = normalizeBookings(raw);
      setBookings(safe);
    } catch (e) {
      console.error("Failed to parse bookings:", e);
      setBookings([]);
    }
  }, []);

  function cancelBooking(id: string) {
    const updated: Booking[] = bookings.map((b) =>
      b.id === id ? { ...b, status: "cancelled" } : b
    );

    setBookings(updated);
    localStorage.setItem("renthub_bookings", JSON.stringify(updated));

    const notifs = JSON.parse(
      localStorage.getItem("renthub_notifications") || "[]"
    );

    localStorage.setItem(
      "renthub_notifications",
      JSON.stringify([
        {
          id: Date.now(),
          message: "❌ Booking cancelled",
          date: new Date().toLocaleString(),
          read: false,
        },
        ...notifs,
      ])
    );
  }

  function getStatusStyles(status: BookingStatus) {
    switch (status) {
      case "confirmed":
        return "bg-green-600/30 text-green-300";
      case "cancelled":
        return "bg-red-600/30 text-red-300";
      case "pending":
      default:
        return "bg-yellow-600/30 text-yellow-300";
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-24 text-white">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl">
        {bookings.length === 0 ? (
          <p className="text-white/60">No bookings yet. Start renting!</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="bg-black/30 p-6 rounded-xl border border-white/10"
              >
                <h2 className="font-semibold text-lg">{b.title}</h2>

                <p className="text-sm text-white/60">
                  {b.from} → {b.to}
                </p>

                <p className="mt-2">Days: {b.days}</p>
                <p className="font-bold mt-1">
                  Total: ${b.total.toFixed(2)}
                </p>

                <span
                  className={`inline-block mt-3 px-3 py-1 text-xs rounded ${getStatusStyles(
                    b.status
                  )}`}
                >
                  {b.status}
                </span>

                {b.status === "confirmed" && (
                  <button
                    onClick={() => cancelBooking(b.id)}
                    className="mt-4 w-full bg-red-600 hover:bg-red-700 py-2 rounded text-sm transition"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
