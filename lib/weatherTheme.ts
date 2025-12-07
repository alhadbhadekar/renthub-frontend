export type WeatherTheme =
  | "sunny"
  | "cloudy"
  | "rain"
  | "snow"
  | "fog"
  | "storm"
  | "night";

export function getThemeByWeather(weatherCode: number, isNight: boolean): WeatherTheme {
  if (isNight) return "night";

  // Weather codes from Open-Meteo
  if (weatherCode === 0) return "sunny"; // clear sky
  if ([1, 2, 3].includes(weatherCode)) return "cloudy";
  if ([45, 48].includes(weatherCode)) return "fog";
  if ([51, 53, 55, 61, 63, 65].includes(weatherCode)) return "rain";
  if ([71, 73, 75, 77].includes(weatherCode)) return "snow";
  if ([95, 96, 99].includes(weatherCode)) return "storm";

  return "cloudy";
}
