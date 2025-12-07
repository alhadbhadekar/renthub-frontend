"use client";

import { useEffect, useState } from "react";

export default function LightningEffect() {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlash(true);
      setTimeout(() => setFlash(false), 200);
    }, Math.random() * 5000 + 3000);

    return () => clearInterval(interval);
  }, []);

  return flash ? (
    <div className="fixed inset-0 bg-white opacity-60 pointer-events-none z-10"></div>
  ) : null;
}
