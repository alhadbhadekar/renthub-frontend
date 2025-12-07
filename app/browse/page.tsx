"use client";

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import ListingCard from "@/components/ListingCard";
import { haversineMiles } from "@/lib/location";
import type { LatLngExpression } from "leaflet";
import zipcodes from "zipcodes";
import mockListings from "@/data/mockListings";
import { categories } from "@/data/categories";


// ✅ SAFE LEAFLET DYNAMIC IMPORTS
const MapContainer = dynamic(() => import("react-leaflet").then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(m => m.Popup), { ssr: false });
const MarkerClusterGroup = dynamic(() => import("react-leaflet-cluster").then(m => m.default), { ssr: false });

// ✅ COLORS
const categoryColors: Record<string, string> = {
  furniture: "#8B5CF6",
  electronics: "#2563EB",
  decor: "#EC4899",
  lighting: "#F59E0B",
  staging: "#10B981",
};

// ✅ TYPE
type Listing = {
  id: string;
  title: string;
  pricePerDay: number;
  location: string;
  rating: number;
  image: string;
  category: string;
  lat?: number;
  lng?: number;
};

export default function BrowsePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [zip, setZip] = useState("");
  const [radius, setRadius] = useState(25);
  const [mapZoom, setMapZoom] = useState(12);

  const [listings, setListings] = useState<Listing[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [Llib, setLlib] = useState<any>(null);
  const [topPicks, setTopPicks] = useState<Listing[]>([]);

  // ✅ SAFE LEAFLET LOAD
  useEffect(() => {
    import("leaflet").then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      setLlib(L);
    });
  }, []);

  useEffect(() => {
    setListings(mockListings as Listing[]);
  }, []);

  useEffect(() => {
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    setSearch(searchParams.get("search") || "");
    setLocation(searchParams.get("location") || "");
    setZip(searchParams.get("zip") || "");

    const r = searchParams.get("radius");
    if (r) setRadius(Number(r));

    if (lat && lng) setUserLocation({ lat: Number(lat), lng: Number(lng) });
  }, [searchParams]);

  useEffect(() => {
    if (zip.length === 5) {
      const info = zipcodes.lookup(zip);
      if (info?.latitude && info?.longitude) {
        setUserLocation({ lat: info.latitude, lng: info.longitude });
      }
    }
  }, [zip]);

  useEffect(() => {
    if (radius <= 5) setMapZoom(14);
    else if (radius <= 10) setMapZoom(13);
    else if (radius <= 25) setMapZoom(12);
    else if (radius <= 50) setMapZoom(11);
    else setMapZoom(10);
  }, [radius]);

  useEffect(() => {
    try {
      const views = JSON.parse(localStorage.getItem("views") || "[]");
      const interest = new Set<string>();

      views.slice(-5).forEach((v: any) => {
        const item = mockListings.find((x) => x.id === v.id);
        if (item) interest.add(item.category);
      });

      const picks = (mockListings as Listing[])
        .filter((l) => interest.has(l.category))
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 6);

      setTopPicks(picks);
    } catch {
      setTopPicks([]);
    }
  }, []);

  const detectLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });
  };

  const filteredListings = useMemo(() => {
    return listings.filter((l) => {
      const mt = l.title.toLowerCase().includes(search.toLowerCase());
      const mc = location ? l.location.toLowerCase().includes(location.toLowerCase()) : true;

      let md = true;
      if (userLocation && l.lat && l.lng) {
        const d = haversineMiles(userLocation.lat, userLocation.lng, l.lat, l.lng);
        md = d <= radius;
      }

      return mt && mc && md;
    });
  }, [search, location, listings, userLocation, radius]);

  const aiRankedListings = useMemo(() => {
    return [...filteredListings]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);
  }, [filteredListings]);

  const mapCenter: LatLngExpression = userLocation
    ? [userLocation.lat, userLocation.lng]
    : [39.9526, -75.1652];

  // ✅ PRICE BUBBLE PIN
  const createCategoryIcon = (category: string, price: number) => {
    if (!Llib) return undefined;

    const color = categoryColors[category] || "#EF4444";

    return Llib.divIcon({
      className: "",
      html: `
        <div style="display:flex;flex-direction:column;align-items:center;">
          <div style="
            background:#fff;
            color:#000;
            padding:4px 8px;
            border-radius:8px;
            font-weight:800;
            font-size:12px;
            margin-bottom:-6px;
            box-shadow:0 2px 6px rgba(0,0,0,0.35);
          ">
            $${price}
          </div>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="${color}">
            <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z"/>
          </svg>
        </div>
      `,
      iconSize: [34, 50],
      iconAnchor: [17, 50],
      popupAnchor: [0, -45],
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-white">
      <h2 className="text-4xl mb-4">Browse Items</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="bg-white/10 p-3 rounded" />
        <input value={location} onChange={e => setLocation(e.target.value)} placeholder="City" className="bg-white/10 p-3 rounded" />
        <input value={zip} onChange={e => setZip(e.target.value)} placeholder="ZIP" className="bg-white/10 p-3 rounded" />
        <button onClick={detectLocation} className="bg-white/20 p-3 rounded">📍 Near Me</button>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <span>Radius:</span>
        <input type="range" min={5} max={100} step={5} value={radius} onChange={e => setRadius(Number(e.target.value))} className="w-full" />
        <span>{radius} mi</span>
      </div>

      {Llib && (
        <MapContainer center={mapCenter} zoom={mapZoom} className="h-96 w-full mb-10 rounded-xl">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MarkerClusterGroup>
            {filteredListings.map((l) =>
              l.lat && l.lng ? (
                <Marker key={l.id} position={[l.lat, l.lng]} icon={createCategoryIcon(l.category, l.pricePerDay)}>
                  <Popup>
                    <div className="text-black space-y-1 text-sm">
                        <h3 className="font-bold">{l.title}</h3>
                        <div className="font-semibold mb-1">
                            ${l.pricePerDay}/day
                            </div>

                            {/* ✅ FORCED NEW LINE WITH BLOCK + MARGIN */}
                            <div className="text-yellow-500 font-bold mb-2">
                            ⭐ {l.rating}
                        </div>
                        <button
                        onClick={() => router.push(`/listing/${l.id}`)}
                        className="mt-1 w-full bg-black text-white text-xs py-1 rounded"
                        >
                        View Listing →
                        </button>
                    </div>
                    </Popup>
                </Marker>
              ) : null
            )}
          </MarkerClusterGroup>
        </MapContainer>
      )}

      {/* ✅ ✅ ✅ CATEGORY STRIP (RESTORED) ✅ ✅ ✅ */}
        <div className="overflow-x-auto scrollbar-hide mb-12">
        <div className="flex justify-center md:justify-start space-x-4 w-max mx-auto px-2">
            {categories.map((c) => (
            <button
                key={c.id}
                onClick={() => router.push(`/browse/${c.key}`)}
                className="flex flex-col items-center justify-center
                w-28 h-28 rounded-2xl border shrink-0 transition
                bg-white/10 border-white/20 text-white
                hover:bg-white hover:text-black"
            >
                <span className="text-3xl mb-2">{c.icon}</span>
                <span className="text-sm text-center whitespace-nowrap">
                {c.label}
                </span>
            </button>
            ))}
        </div>
        </div>

      {topPicks.length > 0 && (
        <div className="mb-10">
          <h3 className="text-2xl mb-4 text-center">🔥 Top Picks For You</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {topPicks.map(l => <ListingCard key={l.id} listing={l} category={l.category} />)}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-2xl mb-4 text-center">🔥 AI Ranked For You</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {aiRankedListings.map(l => <ListingCard key={l.id} listing={l} category={l.category} />)}
        </div>
      </div>
    </div>
  );
}
