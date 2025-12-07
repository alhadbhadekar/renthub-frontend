import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WeatherWrapper from "@/components/WeatherWrapper";
import AuthProvider from "@/components/AuthProvider";

import { getThemeByWeather } from "@/lib/weatherTheme";
import { weatherImages } from "@/lib/themeCss";

import CookieBanner from "@/components/CookieBanner";

import "leaflet/dist/leaflet.css";

// Fetch weather info (server component)
async function fetchWeather() {
  const lat = 39.9526;
  const lon = -75.1652;

  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`,
      { next: { revalidate: 3600 } }
    );

    const data = await res.json();
    const weatherCode = data.current_weather?.weathercode ?? 1;
    const isNight = data.current_weather?.is_day === 0;

    const themeName = getThemeByWeather(weatherCode, isNight);
    const backgroundUrl = weatherImages[themeName];

    return { themeName, backgroundUrl };
  } catch {
    return {
      themeName: "cloudy",
      backgroundUrl: weatherImages["cloudy"],
    };
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { themeName, backgroundUrl } = await fetchWeather();

  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="min-h-screen overflow-x-hidden">
        <AuthProvider>
          <WeatherWrapper themeName={themeName} backgroundUrl={backgroundUrl}>
            <Navbar />
            <CookieBanner />
            <main className="pb-[220px]">{children}</main>
            <Footer />
          </WeatherWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
