"use client";

import Link from "next/link";

const categories = [
  { name: "Furniture", slug: "furniture" },
  { name: "Electronics", slug: "electronics" },
  { name: "Party Supplies", slug: "party" },
  { name: "Tools", slug: "tools" },
  { name: "Outdoor", slug: "outdoor" },
  { name: "Vehicles", slug: "vehicles" },
];

export default function Categories({ currentCategory }: { currentCategory?: string }) {
  const active = currentCategory?.toLowerCase();

  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((cat) => {
        const isActive = active === cat.slug;
        return (
          <Link
            key={cat.slug}
            href={`/browse/${cat.slug}`}
            className={`
              px-4 py-2 rounded-full text-sm font-medium
              border backdrop-blur-md
              transition shadow-md
              ${isActive
                ? "bg-white text-black border-white"
                : "bg-white/10 text-white border-white/30 hover:bg-white/20"
              }
            `}
          >
            {cat.name}
          </Link>
        );
      })}
    </div>
  );
}
