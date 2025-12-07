"use client";

import { useEffect, useState } from "react";

// ✅ REVIEW TYPE
type Review = {
  id: string;
  listingId: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
};

// ✅ MOCK REVIEWS (PRE-FILLED)
const mockReviews: Review[] = [
  {
    id: "r1",
    listingId: "1",
    name: "Priya Sharma",
    rating: 5,
    comment: "Amazing condition! Very smooth experience.",
    date: "2025-01-10",
  },
  {
    id: "r2",
    listingId: "1",
    name: "Aman Verma",
    rating: 4,
    comment: "Great value for money. Would rent again.",
    date: "2025-01-14",
  },
  {
    id: "r3",
    listingId: "2",
    name: "Rohan Patel",
    rating: 5,
    comment: "Perfect sound system for our wedding!",
    date: "2025-01-18",
  },

  {
    id: "r4",
    listingId: "3",
    name: "Neha Kapoor",
    rating: 5,
    comment: "Camera quality was outstanding! Perfect for my shoot.",
    date: "2025-01-20",
  },
  {
    id: "r5",
    listingId: "3",
    name: "Arjun Mehta",
    rating: 4,
    comment: "Battery life was solid, lens was clean. Good experience.",
    date: "2025-01-22",
  },
];

export default function Reviews({ listingId }: { listingId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // ✅ LOAD REVIEWS (LOCAL + MOCK)
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("reviews") || "[]");

    const combined = [...mockReviews, ...stored];

    const filtered = combined.filter(
      (r) => r.listingId === listingId
    );

    setReviews(filtered);
  }, [listingId]);

  // ✅ SUBMIT NEW REVIEW
  const handleSubmit = () => {
    if (!name || !comment) return alert("Please fill all fields");

    const newReview: Review = {
      id: Date.now().toString(),
      listingId,
      name,
      rating,
      comment,
      date: new Date().toISOString().split("T")[0],
    };

    const stored = JSON.parse(localStorage.getItem("reviews") || "[]");
    const updated = [newReview, ...stored];

    localStorage.setItem("reviews", JSON.stringify(updated));
    setReviews([newReview, ...reviews]);

    setName("");
    setRating(5);
    setComment("");
  };

  return (
    <div className="mt-12 bg-white/20 p-6 rounded-xl backdrop-blur-md shadow-xl">

      {/* ✅ HEADER */}
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>

      {/* ✅ EMPTY STATE */}
      {reviews.length === 0 && (
        <p className="text-white/70 mb-6">No reviews yet</p>
      )}

      {/* ✅ REVIEW LIST */}
      <div className="space-y-4 mb-8">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="bg-black/30 p-4 rounded-lg"
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold">{r.name}</p>
              <p className="text-yellow-300">
                {"★".repeat(r.rating)}
                {"☆".repeat(5 - r.rating)}
              </p>
            </div>

            <p className="text-white/80 mt-2">{r.comment}</p>

            <p className="text-xs text-white/50 mt-1">{r.date}</p>
          </div>
        ))}
      </div>

      {/* ✅ ADD REVIEW FORM */}
      <div className="bg-black/40 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Add a Review</h3>

        <div className="grid gap-3">

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="bg-black/50 border border-white/20 rounded px-3 py-2 text-white"
          />

          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="bg-black/50 border border-white/20 rounded px-3 py-2 text-white"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} ★
              </option>
            ))}
          </select>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
            className="bg-black/50 border border-white/20 rounded px-3 py-2 text-white"
          />

          <button
            onClick={handleSubmit}
            className="bg-white text-black font-semibold py-2 rounded hover:bg-gray-200"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}
