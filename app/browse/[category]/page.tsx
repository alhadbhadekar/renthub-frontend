"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ListingCard from "@/components/ListingCard";
import mockListings from "@/data/mockListings";
import { categories } from "@/data/categories";

// ---------------- TYPES ----------------

type Listing = {
  id: string;
  title: string;
  pricePerDay: number;
  location: string;
  rating: number;
  category: string;
  image: string;
  ownerId: string;
};

type Category = {
  id: number;
  key: string;
  label: string;
  icon: string;
  heroImage: string;
  description: string;
};

const PAGE_SIZE = 6;

// ---------------- COMPONENT ----------------

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const category = (params.category as string).toLowerCase();

  // ✅ FIX: NO LOCAL STATE SHADOWING categories
  const categoryMap = useMemo(() => {
    const map: Record<string, Category> = {};
    categories.forEach((c) => (map[c.key] = c));
    return map;
  }, []);

  const config = categoryMap[category];

  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">(0);
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [minRating, setMinRating] = useState<number | "">(0);
  const [sortBy, setSortBy] = useState<
    "relevance" | "price-asc" | "price-desc" | "rating-desc"
  >("relevance");

  const [page, setPage] = useState(1);

  // ---------------- LOAD LISTINGS FROM MOCK DATA ----------------

  useEffect(() => {
    setLoading(true);

    const filtered = mockListings.filter(
      (l) => l.category.toLowerCase() === category
    );

    setListings(filtered);
    setPage(1);
    setLoading(false);
  }, [category]);

  // ---------------- FILTERING ----------------

  const filteredListings = useMemo(() => {
    let items = [...listings];

    if (search) {
      const q = search.toLowerCase();
      items = items.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.location.toLowerCase().includes(q)
      );
    }

    if (minPrice !== "") items = items.filter((i) => i.pricePerDay >= minPrice);
    if (maxPrice !== "") items = items.filter((i) => i.pricePerDay <= maxPrice);
    if (minRating !== "") items = items.filter((i) => i.rating >= minRating);

    switch (sortBy) {
      case "price-asc":
        return [...items].sort((a, b) => a.pricePerDay - b.pricePerDay);
      case "price-desc":
        return [...items].sort((a, b) => b.pricePerDay - a.pricePerDay);
      case "rating-desc":
        return [...items].sort((a, b) => b.rating - a.rating);
      default:
        return items;
    }
  }, [listings, search, minPrice, maxPrice, minRating, sortBy]);

  const paginated = filteredListings.slice(0, page * PAGE_SIZE);
  const hasMore = filteredListings.length > paginated.length;

  // ---------------- UI ----------------

  return (
    <div className="max-w-6xl mx-auto px-4 py-20 text-white">
      {/* ✅ BACK TO BROWSE */}
      <button
        onClick={() => router.push("/browse")}
        className="
          inline-block mb-6
          px-4 py-2 rounded-lg 
          bg-white/10 backdrop-blur-md 
          text-white border border-white/30
          hover:bg-white/20 transition
        "
      >
        ← Back to Browse
      </button>

      {/* ✅ ✅ ✅ CATEGORY ICONS (NOW FIXED) ✅ ✅ ✅ */}
      <div className="overflow-x-auto scrollbar-hide mb-10">
        <div className="flex justify-center md:justify-start space-x-4 w-max mx-auto px-2">
          {categories.map((c) => {
            const isActive = c.key === category;

            return (
              <button
                key={c.id}
                onClick={() => router.push(`/browse/${c.key}`)}
                className={`flex flex-col items-center justify-center
                  w-28 h-28 rounded-2xl border shrink-0 transition
                  ${
                    isActive
                      ? "bg-white text-black border-white"
                      : "bg-white/10 border-white/20 text-white"
                  }`}
              >
                <span className="text-3xl mb-2">{c.icon}</span>
                <span className="text-sm text-center whitespace-nowrap">
                  {c.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ✅ ✅ ✅ HERO WITH IMAGE ✅ ✅ ✅ */}
      {config && (
        <div className="relative h-56 md:h-72 w-full mb-10 rounded-2xl overflow-hidden shadow-2xl">

          {/* ✅ BACKGROUND IMAGE */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${config.heroImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* ✅ DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/50" />

          {/* ✅ TEXT */}
          <div className="relative z-10 h-full flex flex-col justify-end p-8">
            <h1 className="text-3xl md:text-4xl font-bold">
              {config.label}
            </h1>
            <p className="text-white/80 mt-2">
              {config.description}
            </p>
          </div>
        </div>
      )}

      {/* ✅ ✅ ✅ LISTINGS ✅ ✅ ✅ */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl">
        {loading ? (
          <p className="text-white/60 text-center py-10">Loading items...</p>
        ) : paginated.length === 0 ? (
          <p className="text-white/60 text-center py-10">
            No items match your filters.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {paginated.map((item) => (
                <ListingCard key={item.id} listing={item} />
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setPage((p) => p + 1)}
                  className="px-6 py-2 rounded-full bg-white text-black font-medium hover:bg-gray-200"
                >
                  Load more
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
