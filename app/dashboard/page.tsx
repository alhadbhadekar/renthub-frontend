"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ListingCard from "@/components/ListingCard";
import { getRecommendations } from "@/lib/recommendEngine";

// ✅ TYPE MATCHING YOUR GO API
type Listing = {
  id: number;
  title: string;
  pricePerDay: number;
  location: string;
  rating: number;
  images: string[];
  category: string;
};

export default function DashboardPage() {
  const [recentViews, setRecentViews] = useState<Listing[]>([]);
  const [recs, setRecs] = useState<Listing[]>([]);
  const [allListings, setAllListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ LOAD ALL LISTINGS FROM GO API FIRST
  useEffect(() => {
    fetch("http://localhost:8080/listings")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAllListings(data);
        } else {
          setAllListings([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Failed to load listings:", err);
        setAllListings([]);
        setLoading(false);
      });
  }, []);

  // ✅ LOAD RECENT VIEWS FROM LOCALSTORAGE (REAL DATA)
  useEffect(() => {
    if (allListings.length === 0) return;

    const views = JSON.parse(localStorage.getItem("views") || "[]")
      .slice(-3)
      .reverse();

    const mapped = views
      .map((v: any) =>
        allListings.find((x) => x.id === Number(v.id))
      )
      .filter(Boolean);

    setRecentViews(mapped as Listing[]);
  }, [allListings]);

  // ✅ LOAD RECOMMENDATIONS USING REAL LISTINGS
  useEffect(() => {
    if (allListings.length === 0) return;

    const recommendations = getRecommendations(allListings);
    setRecs(recommendations);
  }, [allListings]);

  // ✅ LOADING STATE
  if (loading) {
    return (
      <div className="flex justify-center items-start pt-24 px-4 text-white">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
    {/* ✅ SMALLER HEADER */}
    <h2 className="text-4xl font-bold text-white mb-3">Your Dashboard</h2>
    <div className="flex justify-center items-start pt-4 px-4">
      <div
        className="
          w-full max-w-4xl
          bg-white/10 backdrop-blur-md 
          border border-white/20
          rounded-2xl p-8 shadow-xl
          text-white
        "
      >
        {/* --- TITLE --- */}
        <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>

        {/* --- ACTIONS: Add Listing and View Bookings --- */}
        <div className="flex flex-wrap gap-4 mb-10">
            {/* Add New Listing Button */}
            <Link
            href="/add-listing"
            className="
                inline-block
                px-6 py-3 
                bg-white text-black
                rounded-xl font-semibold
                shadow-lg
                hover:bg-gray-200 transition
            "
            >
            ➕ Add New Listing
            </Link>

            {/* ✅ NEW: My Bookings Button */}
            <Link
            href="/bookings"
            className="
                inline-block
                px-6 py-3 
                bg-blue-500 text-white
                rounded-xl font-semibold
                shadow-lg
                hover:bg-blue-600 transition
            "
            >
            📅 My Bookings
            </Link>
        </div>


        {/* --- RECENT VIEWS --- */}
        {recentViews.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-4">
              Recently Viewed
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {recentViews.map((item) => (
                <ListingCard
                  key={item.id}
                  listing={{
                    ...item,
                    image: item.images?.[0],
                  }}
                />
              ))}
            </div>
          </>
        )}

        {/* --- RECOMMENDED FOR YOU --- */}
        {recs.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-4">
              Recommended For You
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {recs.map((item) => (
                <ListingCard
                  key={item.id}
                  listing={{
                    ...item,
                    image: item.images?.[0],
                  }}
                />
              ))}
            </div>
          </>
        )}

        {/* ✅ EMPTY STATE */}
        {recentViews.length === 0 && recs.length === 0 && (
          <p className="text-white/70">
            Start browsing items to see recommendations here.
          </p>
        )}
      </div>
    </div>
    </div>
  );
}