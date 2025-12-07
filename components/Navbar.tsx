"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";
import { useRouter } from "next/navigation";
// Standard import for NotificationsBell
import NotificationsBell from "@/components/NotificationsBell"; 

// --- Type Definitions ---
type AccountType = "User" | "Business";

type ProfileState = {
  name: string;
  email: string;
  phone: string;
  bio: string;
  avatar: string;
  accountType: AccountType;
  verified: boolean;
};

const PROFILE_STORAGE_KEY = "renthub_profile";

// --- Navbar Component ---
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState<ProfileState | null>(null);
  const router = useRouter();

  // ✅ LOAD PROFILE: Reads user data and account type from localStorage on client mount.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
    
    // Use try/catch to safely parse potentially corrupt JSON data.
    try {
      if (stored) {
        setProfile(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to parse stored profile data:", error);
      // Clear corrupt data to prevent future crashes
      localStorage.removeItem(PROFILE_STORAGE_KEY);
      setProfile(null);
    }
  }, []); // Empty dependency array ensures it runs only once.

  // ✅ SMART DASHBOARD REDIRECT: Directs users based on their loaded profile type.
  function handleDashboardClick(e: React.MouseEvent) {
    e.preventDefault();

    if (profile?.accountType === "Business") {
      router.push("/dashboard/business");
    } else {
      router.push("/dashboard");
    }

    setOpen(false);
  }

  return (
    <>
      {/* 1. NAVBAR STRUCTURE */}
      <nav className="w-full fixed top-0 left-0 z-40 bg-black/10 backdrop-blur-md border-b border-white/10">
        <div className="w-full px-6 py-4 flex items-center">
          
          {/* ✅ LOGO */}
          <Link href="/" className="text-white font-extrabold text-3xl tracking-wide">
            RentHub
          </Link>

          {/* ✅ 2. DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8 text-white font-medium ml-auto">
            <Link className="hover:text-gray-300 transition" href="/browse">
              Browse
            </Link>

            <Link className="hover:text-gray-300 transition" href="/blog">
              Blog
            </Link>

            {/* ✅ SMART DASHBOARD BUTTON */}
            <button
              onClick={handleDashboardClick}
              className="hover:text-gray-300 transition"
            >
              Dashboard
            </button>

            <Link className="hover:text-gray-300 transition" href="/add-listing">
              Add Listing
            </Link>

            <Link className="hover:text-gray-300 transition" href="/profile">
              My Profile
            </Link>
            
            {/* 🔔 NotificationsBell: Wrapped to ensure vertical alignment within the flex container */}
            <div className="flex items-center justify-center h-full">
              <NotificationsBell />
            </div>

            <Link
              href="/signup"
              className="px-5 py-2 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition"
            >
              Sign Up
            </Link>
          </div>

          {/* ✅ MOBILE HAMBURGER */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-white text-3xl ml-auto"
          >
            <HiMenu />
          </button>
        </div>
      </nav>

      {/* ✅ 3. MOBILE SLIDE-IN MENU */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-72 h-full bg-white/10 backdrop-blur-xl border-l border-white/20 p-6 shadow-xl">
            
            <div className="flex justify-between items-center mb-8">
              <p className="text-white text-xl font-semibold">Menu</p>
              <button
                onClick={() => setOpen(false)}
                className="text-white text-3xl"
              >
                <HiX />
              </button>
            </div>

            <div className="flex flex-col gap-6 text-white text-lg">
              <Link href="/browse" onClick={() => setOpen(false)}>
                Browse
              </Link>

              <Link href="/blog" onClick={() => setOpen(false)}>
                Blog
              </Link>

              {/* ✅ SMART DASHBOARD (MOBILE) */}
              <button
                onClick={handleDashboardClick}
                className="text-left hover:text-gray-300 transition"
              >
                Dashboard
              </button>

              <Link href="/add-listing" onClick={() => setOpen(false)}>
                Add Listing
              </Link>

              <Link href="/profile" onClick={() => setOpen(false)}>
                My Profile
              </Link>

              {/* 🔔 NotificationsBell for mobile menu */}
              <div className="flex items-center">
                <NotificationsBell />
              </div>

              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg bg-white text-black font-semibold text-center hover:bg-gray-200 transition"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}