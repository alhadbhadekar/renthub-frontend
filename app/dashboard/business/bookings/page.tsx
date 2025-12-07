"use client";

import { useEffect, useState } from "react";

export default function BusinessBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("renthub_bookings") || "[]"
    );
    setBookings(data);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 text-white">
      <h1 className="text-3xl font-bold mb-8">Incoming Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-white/60">No incoming bookings.</p>
      ) : (
        <div className="space-y-5">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-white/10 p-6 rounded-xl border border-white/20 flex justify-between"
            >
              <div>
                <h2 className="font-semibold">{b.title}</h2>
                <p className="text-sm text-white/60">
                  {b.from} → {b.to}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold">${b.total}</p>
                <p className="text-xs text-white/60">{b.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
