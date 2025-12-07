"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function SafeSelect({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed top-[80px] left-0 w-full px-4 z-[999999]">
      {children}
    </div>,
    document.body
  );
}
