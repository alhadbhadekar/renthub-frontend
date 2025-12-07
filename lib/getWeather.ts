export async function getWeather(lat: number, lon: number) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  
    const res = await fetch(url);
    const data = await res.json();
  
    return {
      weatherCode: data.current_weather?.weathercode ?? 1,
      isNight: data.current_weather?.is_day === 0
    };
  }
  