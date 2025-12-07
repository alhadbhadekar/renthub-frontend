import Link from "next/link";

export default function ListingCard({ listing }: any) {
  const stars = Math.round(listing.rating || 0);

  return (
    <div className="
      bg-white rounded-lg overflow-hidden 
      hover:shadow-xl hover:-translate-y-1 
      transition-all duration-300
      w-full
    ">
      {/* IMAGE (AUTO SCALE HEIGHT) */}
      <div className="h-28 bg-gray-200"></div>

      <div className="p-2 text-sm">
        <h3 className="font-semibold text-gray-800 truncate">
          {listing.title}
        </h3>

        <p className="text-xs text-gray-500 truncate">
          {listing.location}
        </p>

        {/* RATING */}
        <div className="flex items-center text-yellow-500 text-xs mt-1">
          {"★".repeat(stars)}
          <span className="text-gray-400 ml-1">
            {listing.rating}
          </span>
        </div>

        <p className="font-bold text-sm mt-1">
          ${listing.pricePerDay}/day
        </p>

        <Link
          href={`/listing/${listing.id}`}
          className="text-blue-600 text-xs mt-1 inline-block"
        >
          View →
        </Link>
      </div>
    </div>
  );
}
