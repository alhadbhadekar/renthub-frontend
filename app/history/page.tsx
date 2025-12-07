"use client";

import { useEffect, useState } from "react";

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("rentals") || "[]");
    setHistory(data);
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-20 text-white">
      <h1 className="text-3xl font-bold mb-6">Your Rentals</h1>

      {history.length === 0 && <p>No rentals yet</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {history.map((item, i) => (
          <div key={i} className="bg-white/30 backdrop-blur-md border border-white/40 rounded-xl p-4 shadow-xl">
            <img src={item.image} className="w-full h-48 object-cover rounded" />
            <h3 className="mt-2 font-bold">{item.title}</h3>
            <p className="text-white/70">{item.location}</p>
            <p className="text-sm mt-1">Rented on {new Date(item.rentedAt).toDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
