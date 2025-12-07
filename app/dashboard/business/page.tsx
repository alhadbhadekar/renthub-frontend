"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import mockListings from "@/data/mockListings";

type WalletTransaction = {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  date: string;
  status: "completed" | "pending";
};

type WalletState = {
  available: number;
  pending: number;
  totalEarned: number;
  transactions: WalletTransaction[];
};

type ProfileState = {
  name: string;
  email: string;
  avatar: string;
  accountType: "User" | "Business";
  verified: boolean;
};

type KycState = {
  status: "not_started" | "pending" | "verified" | "rejected";
};

export default function BusinessDashboard() {
  const [profile, setProfile] = useState<ProfileState | null>(null);
  const [wallet, setWallet] = useState<WalletState | null>(null);
  const [kyc, setKyc] = useState<KycState>({ status: "not_started" });

  useEffect(() => {
    const p = localStorage.getItem("renthub_profile");
    const w = localStorage.getItem("renthub_wallet");
    const k = localStorage.getItem("renthub_kyc");

    if (p) setProfile(JSON.parse(p));
    if (w) setWallet(JSON.parse(w));
    if (k) setKyc(JSON.parse(k));
  }, []);

  if (!profile)
    return <p className="text-white p-10">Loading dashboard...</p>;

  if (profile.accountType !== "Business") {
    return (
      <div className="max-w-xl mx-auto py-32 text-center text-white">
        <h1 className="text-3xl font-bold mb-4">Business Dashboard Locked</h1>
        <p className="text-white/60 mb-6">
          Upgrade your account to access business tools.
        </p>
        <Link
          href="/profile"
          className="bg-yellow-500 text-black px-5 py-3 rounded-lg font-semibold"
        >
          Go Upgrade
        </Link>
      </div>
    );
  }

  const activeListings = mockListings.filter(
    (l) => l.ownerId === profile.email
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      {/* 🔑 NEW CONTAINER FOR OPAQUE BACKGROUND & BORDER */}
      <h1 className="text-3xl font-bold pt-4 pb-4">Business Dashboard</h1>
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <div>
            
            <p className="text-white/60 text-sm mt-1">
              Welcome back, {profile.name}
            </p>
          </div>
          {/* ✅ BOOKINGS AND PROFILE LINKS ADDED/MODIFIED HERE */}
          <div className="flex space-x-3">
            <Link
              href="/bookings" // <-- New Link Added
              className="bg-white/10 px-4 py-2 rounded hover:bg-white/20"
            >
              My Bookings
            </Link>
            <Link
              href="/profile"
              className="bg-white/10 px-4 py-2 rounded hover:bg-white/20"
            >
              My Profile
            </Link>
          </div>
        </div>

        {/* KYC WARNING */}
        {kyc.status !== "verified" && (
          <div className="bg-red-700/20 border border-red-500/40 p-4 rounded-xl mb-8">
            ⚠ Your account is not **KYC verified**. Payouts are locked.
          </div>
        )}

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Stat title="Available Balance" value={`$${wallet?.available?.toFixed(2) || '0.00'}`} />
          <Stat title="Pending Payouts" value={`$${wallet?.pending?.toFixed(2) || '0.00'}`} />
          <Stat
            title="Total Earned"
            value={`$${wallet?.totalEarned?.toFixed(2) || '0.00'}`}
          />
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ACTIVE LISTINGS */}
          <div className="lg:col-span-2 bg-black/30 p-6 rounded-xl">
            <h2 className="font-bold mb-4">Active Listings</h2>

            {activeListings.length === 0 ? (
              <p className="text-white/50">No active listings yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeListings.map((l) => (
                  <div
                    key={l.id}
                    className="bg-black/30 p-4 rounded shadow"
                  >
                    <img
                      src={l.image}
                      className="h-32 w-full object-cover rounded mb-2"
                      alt={l.title}
                    />
                    <p className="font-semibold">{l.title}</p>
                    <p className="text-sm text-white/60">{l.location}</p>
                    <p className="mt-1 text-sm">${l.pricePerDay}/day</p>
                    <Link
                      href={`/listing/${l.id}`}
                      className="text-blue-300 text-sm underline mt-2 inline-block"
                    >
                      View
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* PAYOUTS */}
          <div className="bg-black/30 p-6 rounded-xl">
            <h2 className="font-bold mb-4">Payout Control</h2>

            <p className="text-sm text-white/60 mb-4">
              Stripe Ready Integration
            </p>

            <button
              disabled={kyc.status !== "verified"}
              className="w-full bg-green-600 py-3 rounded disabled:opacity-40 hover:bg-green-700 transition"
            >
              Withdraw Funds
            </button>

            <button className="w-full mt-3 bg-white/10 py-3 rounded hover:bg-white/20 transition">
              Connect Bank (Stripe)
            </button>
          </div>
        </div>

        {/* RECENT TRANSACTIONS */}
        <div className="bg-black/30 p-6 rounded-xl mt-10">
          <h2 className="font-bold mb-4">Recent Earnings</h2>

          {wallet?.transactions.length === 0 ? (
            <p className="text-white/50">No transactions yet.</p>
          ) : (
            <div className="space-y-3">
              {wallet?.transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex justify-between items-center bg-black/30 p-3 rounded"
                >
                  <div>
                    <p className="text-sm font-medium">{tx.description}</p>
                    <p className="text-xs text-white/50">{tx.date}</p>
                  </div>
                  <p
                    className={
                      tx.type === "credit"
                        ? "text-green-400 font-semibold"
                        : "text-red-400 font-semibold"
                    }
                  >
                    {tx.type === "credit" ? "+" : "-"}${tx.amount.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-black/30 p-6 rounded-xl text-center">
      <p className="text-sm text-white/60">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}