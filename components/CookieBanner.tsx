"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="
        fixed bottom-4 left-1/2 -translate-x-1/2
        w-[90%] max-w-xl
        bg-white/20
        backdrop-blur-md
        border border-white/30
        text-white
        p-5 rounded-xl
        shadow-lg
        z-50
      "
    >
      <p className="text-white/90 text-sm mb-3">
        We use cookies for authentication, personalization, and analytics.
        By using RentHub, you agree to our{" "}
        <Link href="/legal/cookies" className="underline">
          Cookie Policy
        </Link>.
      </p>

      <button
        onClick={acceptCookies}
        className="
          bg-white text-black px-4 py-2 rounded-lg 
          hover:bg-gray-200 transition text-sm font-semibold
        "
      >
        Accept
      </button>
    </div>
  );
}
