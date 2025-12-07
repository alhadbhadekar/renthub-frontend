"use client";

import { useState } from "react";
import WeatherClient from "@/components/WeatherClient";
import { getThemeByWeather } from "@/lib/weatherTheme";
import { weatherImages } from "@/lib/themeCss";

import RainEffect from "@/components/effects/Rain";
import SnowEffect from "@/components/effects/Snow";
import CloudsEffect from "@/components/effects/Clouds";
import LightningEffect from "@/components/effects/Lightning";

// ✅ FIX: Proper Type Definitions
interface WeatherWrapperProps {
  children: React.ReactNode;
  themeName: string;
  backgroundUrl: string;
}

export default function WeatherWrapper({
    children,
    themeName,
    backgroundUrl,
  }: WeatherWrapperProps) {
    const [theme, setTheme] = useState<string>(themeName);
    const [background, setBackground] = useState<string>(backgroundUrl);
  
    async function updateWeather(lat: number, lon: number) {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
      );
      const data = await res.json();
  
      const code = data.current_weather?.weathercode ?? 1;
      const night = data.current_weather?.is_day === 0;
  
      const newTheme = getThemeByWeather(code, night);
      setTheme(newTheme);
      setBackground(weatherImages[newTheme]);
    }
  
    return (
      <div className="relative w-full">
  
        {/* Background */}
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-[1]"
          style={{ backgroundImage: `url(${background})` }}
        />
  
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/40 pointer-events-none z-[2]" />
  
        {/* Weather Effects */}
        <div className="fixed inset-0 pointer-events-none z-[3]">
          {theme === "rain" && <RainEffect />}
          {theme === "snow" && <SnowEffect />}
          {theme === "cloudy" && <CloudsEffect />}
          {theme === "storm" && (
            <>
              <RainEffect />
              <LightningEffect />
            </>
          )}
        </div>
  
        {/* UI */}
        <div className="relative z-[10]">
          {children}
        </div>
  
        <WeatherClient onLocation={updateWeather} />
      </div>
    );
  }
  