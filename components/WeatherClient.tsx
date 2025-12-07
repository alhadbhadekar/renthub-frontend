"use client";

import { useEffect } from "react";

export default function WeatherClient({ onLocation }: { onLocation: (lat: number, lon: number) => void }) {
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onLocation(pos.coords.latitude, pos.coords.longitude);
      },
      () => {
        // permission denied → fallback on server weather
      }
    );
  }, []);

  return null;
}
