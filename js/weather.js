'use strict';
const weatherPanel = document.getElementById('weather-panel');
const weatherStatus = document.getElementById('weather-status');
const weatherButton = document.getElementById('weather-refresh');
const weatherUrl = 'https://api.open-meteo.com/v1/forecast?latitude=51.1694&longitude=71.4491&current=temperature_2m,weather_code,wind_speed_10m&timezone=Asia%2FAlmaty';
function weatherDescription(code) {
  if (code === 0) return 'Clear sky';
  if ([1, 2, 3].includes(code)) return 'Partly cloudy / overcast';
  if ([45, 48].includes(code)) return 'Fog';
  if ([51, 53, 55, 56, 57].includes(code)) return 'Drizzle';
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'Rain';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Snow';
  if ([95, 96, 99].includes(code)) return 'Thunderstorm';
  return 'Conditions unavailable';
}
async function loadWeather() {
  weatherPanel.setAttribute('aria-busy', 'true');
  weatherButton.disabled = true;
  weatherStatus.textContent = 'Loading current weather…';
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(weatherUrl, { signal: controller.signal });
    if (!response.ok) throw new Error('Weather request failed');
    const data = await response.json();
    const current = data.current;
    if (!current || !Number.isFinite(current.temperature_2m) || !Number.isFinite(current.weather_code) || !Number.isFinite(current.wind_speed_10m) || typeof current.time !== 'string') throw new Error('Incomplete weather response');
    const temperature = current.temperature_2m;
    const conditions = weatherDescription(current.weather_code);
    const calm = current.weather_code <= 3;
    const advice = calm && temperature >= 5 && temperature <= 28 && current.wind_speed_10m < 25
      ? 'Consider a light outdoor session. Check local conditions before you leave.'
      : 'An indoor session may be more comfortable today. Explore our strength, cardio and group programs.';
    const temp = document.createElement('strong');
    temp.className = 'weather-temp';
    temp.textContent = `${Math.round(temperature)} °C`;
    const details = document.createElement('span');
    details.className = 'weather-detail';
    details.textContent = `${conditions} · Wind ${current.wind_speed_10m} km/h · ${current.time.replace('T', ' ')}`;
    const recommendation = document.createElement('p');
    recommendation.className = 'weather-advice';
    recommendation.textContent = advice;
    weatherStatus.replaceChildren(temp, details, recommendation);
    weatherPanel.dataset.state = 'success';
  } catch (_) {
    weatherStatus.textContent = 'Weather is unavailable right now. Check your connection and try again. You can still explore our indoor programs.';
    weatherPanel.dataset.state = 'error';
  } finally {
    clearTimeout(timeout);
    weatherPanel.setAttribute('aria-busy', 'false');
    weatherButton.disabled = false;
  }
}
weatherButton.addEventListener('click', loadWeather);
loadWeather();
