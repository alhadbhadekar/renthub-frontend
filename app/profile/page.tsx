"use client";

import { useEffect, useState, ChangeEvent } from "react";

type KycStatus = "not_started" | "pending" | "verified" | "rejected";

type KycState = {
  status: KycStatus;
  idFile?: string;
  addressFile?: string;
  submittedAt?: string;
};

const KYC_STORAGE_KEY = "renthub_kyc";

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

const PROFILE_STORAGE_KEY = "renthub_profile";
const WALLET_STORAGE_KEY = "renthub_wallet";

export default function MyProfilePage() {
  const [profile, setProfile] = useState<ProfileState>({
    name: "John Doe",
    email: "john@email.com",
    phone: "",
    bio: "",
    avatar: "/avatar.png",
    accountType: "User",
    verified: true,
  });

  const [wallet, setWallet] = useState<WalletState>({
    available: 0,
    pending: 0,
    totalEarned: 0,
    transactions: [],
  });

  const [showUpgrade, setShowUpgrade] = useState(false);
  const [walletLoading, setWalletLoading] = useState(true);
  const [kyc, setKyc] = useState<KycState>({ status: "not_started" });

  // Load profile + wallet from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (storedProfile) {
      const parsed = JSON.parse(storedProfile);
      setProfile((prev) => ({ ...prev, ...parsed }));
    }

    const storedWallet = localStorage.getItem(WALLET_STORAGE_KEY);
    if (storedWallet) {
      setWallet(JSON.parse(storedWallet));
    } else {
      // Seed with demo data for first-time Business users
      const seed: WalletState = {
        available: 240.0,
        pending: 80.0,
        totalEarned: 320.0,
        transactions: [
          {
            id: "t1",
            type: "credit",
            amount: 120,
            description: "DJ Speakers Rental · 2 days",
            date: new Date().toDateString(),
            status: "completed",
          },
          {
            id: "t2",
            type: "credit",
            amount: 200,
            description: "Camera Kit Rental · 3 days",
            date: new Date(Date.now() - 3 * 86400000).toDateString(),
            status: "completed",
          },
          {
            id: "t3",
            type: "debit",
            amount: 80,
            description: "Payout to bank",
            date: new Date(Date.now() - 1 * 86400000).toDateString(),
            status: "pending",
          },
        ],
      };
      setWallet(seed);
      localStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify(seed));
    }

    setWalletLoading(false);

    const storedKyc = localStorage.getItem(KYC_STORAGE_KEY);
    if (storedKyc) {
        setKyc(JSON.parse(storedKyc));
    }
  }, []);

  function persistWallet(next: WalletState) {
    setWallet(next);
    localStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify(next));
  }

  function persistKyc(next: KycState) {
    setKyc(next);
    localStorage.setItem(KYC_STORAGE_KEY, JSON.stringify(next));
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  }

  function handleAvatarChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      setProfile((prev) => ({ ...prev, avatar: url }));
    };
    reader.readAsDataURL(file);
  }

  function saveProfile() {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    alert("Profile updated ✅");
  }

  // Business Upgrade Action
  function upgradeToBusiness() {
    const upgraded: ProfileState = {
      ...profile,
      accountType: "Business",
      verified: false, // we’ll handle KYC later
    };

    setProfile(upgraded);
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(upgraded));

    // Optionally seed wallet when upgrading (if empty)
    const storedWallet = localStorage.getItem(WALLET_STORAGE_KEY);
    if (!storedWallet) {
      const seed: WalletState = {
        available: 0,
        pending: 0,
        totalEarned: 0,
        transactions: [],
      };
      persistWallet(seed);
    }

    setShowUpgrade(false);
    alert("Business Account Activated ✅");
  }

  // Request Payout (Stripe-ready)
  function requestPayout() {
    if (wallet.available <= 0) {
      alert("No available balance to withdraw.");
      return;
    }

    // 👉 Here is where you'd call your backend / Stripe:
    // await fetch("/api/payouts", { method: "POST", body: JSON.stringify({...}) })
    // For now we just simulate moving available → pending
    const amount = wallet.available;

    const next: WalletState = {
      available: 0,
      pending: wallet.pending + amount,
      totalEarned: wallet.totalEarned,
      transactions: [
        {
          id: `payout-${Date.now()}`,
          type: "debit",
          amount,
          description: "Payout requested to bank account",
          date: new Date().toDateString(),
          status: "pending",
        },
        ...wallet.transactions,
      ],
    };

    persistWallet(next);
    alert(`Payout of $${amount.toFixed(2)} requested ✅`);
  }

  function handleKycFile(
    e: ChangeEvent<HTMLInputElement>,
    type: "idFile" | "addressFile"
  ) {
    const file = e.target.files?.[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = () => {
      // 🔑 FIXED: Use the functional update to ensure we have the latest base state,
      // and immediately persist the resulting state object to prevent race conditions.
      setKyc((prev) => {
        const next = { ...prev, [type]: reader.result as string };
        localStorage.setItem(KYC_STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    };
    reader.readAsDataURL(file);
  }  
  
  function submitKyc() {
        if (!kyc.idFile || !kyc.addressFile) {
        alert("Please upload both ID and address proof");
        return;
        }
    
        const next: KycState = {
        status: "pending",
        idFile: kyc.idFile,
        addressFile: kyc.addressFile,
        submittedAt: new Date().toISOString(),
        };
    
        persistKyc(next);
    
        // FORCE UI REFRESH CONFIRMATION
        setTimeout(() => {
        alert("✅ KYC Submitted and waiting for review");
        }, 50);
    }
  
  // DEV ONLY
  function approveKyc() {
    persistKyc({ ...kyc, status: "verified" });
    setProfile((prev) => ({ ...prev, verified: true }));
  }

  return (
    <div className="max-w-5xl mx-auto py-20 px-6 text-white">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      {/* PROFILE HEADER */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-10 bg-white/10 backdrop-blur-md p-6 rounded-xl">
        <div className="flex flex-col items-center gap-3">
          <img
            src={profile.avatar}
            className="w-24 h-24 rounded-full object-cover border border-white/30"
            alt="avatar"
          />

          <label className="cursor-pointer text-sm px-3 py-1 rounded-lg bg-white/15 border border-white/30 hover:bg-white/25 transition">
            Change Photo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </label>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h2 className="text-xl font-semibold">{profile.name}</h2>
          <p className="text-sm text-white/60">{profile.email}</p>

          <div className="flex flex-wrap gap-3 mt-3 justify-center md:justify-start">
            {profile.verified && (
                <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs">
                ✅ Verified
                </span>
            )}

            <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs">
                {profile.accountType} Account
            </span>

            {profile.accountType === "Business" && (
                <span
                className={`px-3 py-1 rounded-full text-xs ${
                    kyc.status === "verified"
                    ? "bg-green-700/30 text-green-300"
                    : kyc.status === "pending"
                    ? "bg-yellow-600/30 text-yellow-300"
                    : kyc.status === "rejected"
                    ? "bg-red-700/30 text-red-300"
                    : "bg-gray-600/30 text-gray-300"
                }`}
                >
                KYC: {kyc.status.replace("_", " ").toUpperCase()}
                </span>
            )}
          </div>
        </div>

        {/* UPGRADE CTA */}
        {profile.accountType === "User" && (
          <button
            onClick={() => setShowUpgrade(true)}
            className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
          >
            Upgrade to Business
          </button>
        )}
      </div>

      {/* UPGRADE MODAL */}
      {showUpgrade && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl max-w-md w-full">
            <h2 className="text-xl font-bold mb-3">Upgrade to Business</h2>

            <ul className="text-sm text-white/70 mb-4 space-y-2">
              <li>✅ Post unlimited listings</li>
              <li>✅ Accept bookings & get paid</li>
              <li>✅ Business Dashboard & stats</li>
              <li>✅ Payouts to your bank</li>
            </ul>

            <div className="flex gap-4 mt-4">
              <button
                onClick={upgradeToBusiness}
                className="flex-1 bg-green-600 py-2 rounded font-semibold hover:bg-green-700"
              >
                Confirm Upgrade
              </button>

              <button
                onClick={() => setShowUpgrade(false)}
                className="flex-1 bg-white/10 py-2 rounded hover:bg-white/20"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/10 p-6 rounded-xl backdrop-blur-md mb-10">
        <input
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="bg-black/40 p-3 rounded border border-white/20"
        />

        <input
          name="email"
          value={profile.email}
          onChange={handleChange}
          placeholder="Email"
          className="bg-black/40 p-3 rounded border border-white/20"
        />

        <input
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="bg-black/40 p-3 rounded border border-white/20"
        />

        <textarea
          name="bio"
          value={profile.bio}
          onChange={handleChange}
          placeholder="Short Bio"
          className="bg-black/40 p-3 rounded border border-white/20 md:col-span-2 min-h-[80px]"
        />

        <button
          onClick={saveProfile}
          className="md:col-span-2 bg-blue-600 hover:bg-blue-700 py-3 rounded font-semibold mt-2"
        >
          Save Profile
        </button>
      </div>

      {/* 💰 WALLET & EARNINGS (BUSINESS GATED) */}
      <div className="bg-white/10 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Wallet & Earnings</h2>

        {profile.accountType !== "Business" ? (
          <p className="text-white/60 text-sm">
            🚫 Upgrade to a Business Account to unlock wallet, payouts, and
            earnings.
          </p>
        ) : walletLoading ? (
          <p className="text-white/60 text-sm">Loading wallet...</p>
        ) : (
          <>
            {/* KYC VERIFICATION (BUSINESS ONLY) */}
            {profile.accountType === "Business" && (
            <div className="bg-white/10 p-6 rounded-xl mt-10 space-y-4">
                <h2 className="text-xl font-bold">KYC Verification</h2>

                {kyc.status === "not_started" && (
                <>
                    {/* These inputs now reliably update the state before the button is enabled */}
                    <input type="file" onChange={(e) => handleKycFile(e, "idFile")} className="w-full bg-black/40 p-3 rounded border border-white/20 text-sm"/>
                    <input type="file" onChange={(e) => handleKycFile(e, "addressFile")} className="w-full bg-black/40 p-3 rounded border border-white/20 text-sm"/>

                    <button
                    onClick={submitKyc}
                    className="bg-blue-600 px-4 py-2 rounded disabled:opacity-40 hover:bg-blue-700 transition"
                    disabled={!kyc.idFile || !kyc.addressFile}
                    >
                    Submit KYC
                    </button>
                </>
                )}

                {kyc.status === "pending" && (
                <>
                    <p className="text-yellow-400">⏳ KYC Under Review</p>
                    <button
                    onClick={approveKyc}
                    className="bg-green-700 px-4 py-2 rounded text-xs hover:bg-green-600 transition"
                    >
                    DEV: Approve KYC
                    </button>
                </>
                )}

                {kyc.status === "verified" && (
                <p className="text-green-400">✅ You are fully verified!</p>
                )}

                {kyc.status === "rejected" && (
                <button
                    onClick={() => persistKyc({ status: "not_started" })}
                    className="bg-red-700 px-4 py-2 rounded text-sm hover:bg-red-600 transition"
                >
                    Re-submit KYC
                </button>
                )}
            </div>
            )}
            {/* Summary cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 mt-6">
              <div className="bg-black/40 p-4 rounded-lg border border-green-500/40">
                <p className="text-xs text-white/60">Available Balance</p>
                <p className="text-2xl font-bold mt-1">
                  ${wallet.available.toFixed(2)}
                </p>
              </div>

              <div className="bg-black/40 p-4 rounded-lg border border-yellow-500/40">
                <p className="text-xs text-white/60">Pending Payouts</p>
                <p className="text-2xl font-bold mt-1">
                  ${wallet.pending.toFixed(2)}
                </p>
              </div>

              <div className="bg-black/40 p-4 rounded-lg border border-blue-500/40">
                <p className="text-xs text-white/60">Total Earned</p>
                <p className="text-2xl font-bold mt-1">
                  ${wallet.totalEarned.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Payout CTA */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <button
                onClick={requestPayout}
                className="flex-1 bg-green-600 hover:bg-green-700 py-3 rounded font-semibold disabled:opacity-40"
                disabled={wallet.available <= 0}
              >
                Withdraw to Bank
              </button>
              <button className="flex-1 bg-white/10 hover:bg-white/20 py-3 rounded text-sm">
                Connect Payout Method (Stripe)
              </button>
            </div>

            {/* Transactions */}
            <h3 className="text-lg font-semibold mb-3">Recent Activity</h3>
            {wallet.transactions.length === 0 ? (
              <p className="text-white/60 text-sm">No transactions yet.</p>
            ) : (
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {wallet.transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between bg-black/40 p-3 rounded-lg text-sm"
                  >
                    <div>
                      <p className="font-medium">{tx.description}</p>
                      <p className="text-xs text-white/50">{tx.date}</p>
                    </div>
                    <div className="text-right">
                      <p
                        className={
                          tx.type === "credit"
                            ? "text-green-400 font-semibold"
                            : "text-red-400 font-semibold"
                        }
                      >
                        {tx.type === "credit" ? "+" : "-"}$
                        {tx.amount.toFixed(2)}
                      </p>
                      <p className="text-[11px] text-white/50 capitalize">
                        {tx.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}