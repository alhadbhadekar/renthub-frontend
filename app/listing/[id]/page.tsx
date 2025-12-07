"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Reviews from "@/components/Reviews";
import { saveRental } from "@/lib/saveRental";
import Link from "next/link";
import mockListings from "@/data/mockListings";

import { useSearchParams } from "next/navigation";


// ✅ STAR RATING COMPONENT
function StarRating({ value }: { value: number }) {
  const rounded = Math.round(value);

  return (
    <div className="flex items-center gap-1 text-yellow-400">
      {"★".repeat(rounded)}
      {"☆".repeat(5 - rounded)}
    </div>
  );
}

// ✅ TYPE MATCHING MOCK DATA
type Listing = {
  id: string;
  title: string;
  pricePerDay: number;
  location: string;
  rating: number;
  image: string;
  category: string;
  description?: string;
  ownerId: string; // ✅ REQUIRED FOR PROFILE LINK
};

export default function ListingPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();

  // ✅ LOAD SINGLE LISTING FROM MOCK DATA
  useEffect(() => {
    if (!id) return;

    const found = mockListings.find((x) => x.id === id) || null;
    setListing(found);
    setLoading(false);
  }, [id]);

  // ✅ TRACK RECENT VIEWS
  useEffect(() => {
    if (!listing) return;

    const existing = JSON.parse(localStorage.getItem("views") || "[]");
    const filtered = existing.filter((x: any) => x.id !== listing.id);
    const updated = [...filtered, { id: listing.id, viewedAt: Date.now() }];

    localStorage.setItem("views", JSON.stringify(updated));
  }, [listing]);

  // ✅ LOADING STATE
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-white">
        <p className="text-white/80 text-center">Loading listing...</p>
      </div>
    );
  }

  // ✅ NOT FOUND STATE
  if (!listing) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-white">
        <h1 className="text-3xl font-bold mb-4">Listing not found</h1>
        <p className="text-white/80">
          This listing does not exist or was removed.
        </p>
      </div>
    );
  }

  // ✅ RENT HANDLER
  const handleRent = () => {
    saveRental(listing);
    router.push("/history");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-white">

      {/* ✅ BACK BUTTON */}
      <button
        onClick={() => {
          const from = searchParams.get("from");

          if (from === "browse") {
            const qs = searchParams.toString();
            router.push(`/browse?${qs}`);
          } else {
            router.push("/browse");
          }
        }}
        className="
          inline-block mb-6
          px-4 py-2 rounded-lg 
          bg-white/10 backdrop-blur-md 
          text-white border border-white/30
          hover:bg-white/20 transition
        "
      >
        ← Back To Browse
      </button>


      {/* ✅ MAIN LISTING CARD */}
      <div
        className="
          bg-white/10 backdrop-blur-md border border-white/20
          rounded-2xl p-8 shadow-2xl
        "
      >
        {/* ✅ IMAGE */}
        <img
          src={listing.image}
          className="w-full h-72 object-cover rounded-xl mb-6"
          alt={listing.title}
        />

        <h1 className="text-4xl font-bold mb-2">{listing.title}</h1>

        <div className="flex items-center gap-4 text-white/90 mb-4">
          <p className="text-lg">${listing.pricePerDay}/day</p>
          <p className="text-sm text-white/60">{listing.location}</p>
          <StarRating value={listing.rating} /> ✅
        </div>

        {/* ✅ OWNER LINK */}
        <Link
          href={`/profile/${listing.ownerId}`}
          className="text-sm text-blue-300 underline mb-6 inline-block"
        >
          View Owner Profile
        </Link>

        {/* ✅ DESCRIPTION */}
        <p className="text-white/80 text-lg mb-8">
          {listing.description ||
            "High-quality rental item available for short- and long-term use."}
        </p>

        {/* ✅ RENT BUTTON */}
       <Link
          href={`/checkout/${listing.id}`}
          className="
            inline-block 
            px-6 py-3 rounded-xl bg-white text-black font-semibold 
            hover:bg-gray-200 transition
          "
        >
          Rent Now
        </Link>
      </div>

      {/* ✅ REVIEWS SECTION */}
      <Reviews listingId={listing.id} />
    </div>
  );
}
