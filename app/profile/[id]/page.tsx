"use client";

import { users } from "@/data/users";
import mockListings from "@/data/mockListings";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const { id } = useParams();
  const router = useRouter();

  const user = users.find((u) => u.id === id);

  const [pastRentals, setPastRentals] = useState<any[]>([]);

  // ✅ LOAD PAST RENTALS FROM LOCAL STORAGE
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("rentals") || "[]");
    setPastRentals(data.filter((x: any) => x.ownerId === id));
  }, [id]);

  if (!user) {
    return (
      <div className="p-10 text-white text-center">
        <h1 className="text-2xl font-bold mb-4">User not found</h1>
        <Link href="/" className="underline text-blue-300">
          ← Back to Listings
        </Link>
      </div>
    );
  }

  // ✅ ACTIVE LISTINGS (CURRENTLY OWNED)
  const activeListings = mockListings.filter(
    (listing) => listing.ownerId === id
  );

  return (
    <div className="max-w-5xl mx-auto py-20 text-white">

      {/* ✅ BACK TO LISTINGS */}
      <button
        onClick={() => router.back()}
        className="
          mb-6 px-4 py-2 rounded-lg 
          bg-white/10 backdrop-blur-md 
          text-white border border-white/30
          hover:bg-white/20 transition
        "
      >
        ← Back to Listings
      </button>

      {/* ✅ PROFILE CARD */}
      <div className="flex gap-6 items-center bg-white/25 p-6 rounded-xl backdrop-blur-md shadow-xl mb-12">
        <img
          src={user.avatar}
          className="w-24 h-24 rounded-full"
          alt={user.name}
        />

        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-white/80">{user.bio}</p>

          <p className="mt-2 text-yellow-300">
            ⭐ {user.rating} · {user.totalRentals} rentals
          </p>

          <p className="text-sm text-white/60">
            Joined {user.joinedAt}
          </p>
        </div>
      </div>

      {/* ✅ ACTIVE LISTINGS SECTION */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Active Listings</h2>

        {activeListings.length === 0 && (
          <p className="text-white/60">No active listings.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeListings.map((item) => (
            <div
              key={item.id}
              className="bg-white/20 p-4 rounded-xl shadow-lg"
            >
              <img
                src={item.image}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-white/70">{item.location}</p>
              <p className="text-sm mt-1">${item.pricePerDay}/day</p>

              <Link
                href={`/listing/${item.id}`}
                className="text-blue-300 underline text-sm mt-2 inline-block"
              >
                View Listing
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ PAST LISTINGS / RENTAL HISTORY */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Past Listings</h2>

        {pastRentals.length === 0 && (
          <p className="text-white/60">No past listings yet.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pastRentals.map((item, i) => (
            <div
              key={i}
              className="bg-black/40 p-4 rounded-xl shadow-lg"
            >
              <img
                src={item.image}
                className="w-full h-40 object-cover rounded mb-3 opacity-80"
              />
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-white/70">{item.location}</p>
              <p className="text-xs mt-1 text-white/50">
                Rented on {new Date(item.rentedAt).toDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
