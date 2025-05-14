<script>
  import { tripData } from '$lib/stores/Stores.ts';
  import { onDestroy } from 'svelte';

  let data;
  const unsubscribe = tripData.subscribe(value => {
    data = value;
  });

  onDestroy(unsubscribe);
/* UNCOMMENT THIS PART IF NEED TO CLEAR LOCAL STORAGE */
//   // Get all keys from localStorage
// const keys = Object.keys(localStorage);

// // Filter keys that contain "Tokyo"
// const tokyoKeys = keys.filter(key => key.includes("Tokyo"));

// // Remove each matching item
// tokyoKeys.forEach(key => {
//     localStorage.removeItem(key);
//     console.log(`Removed: ${key}`);
// });

// console.log(`Cleared ${tokyoKeys.length} items containing "Tokyo"`);


// // Filter keys that contain "Tokyo"
// const smKeys = keys.filter(key => key.includes("Santa Monica"));

// // Remove each matching item
// smKeys.forEach(key => {
//     localStorage.removeItem(key);
//     console.log(`Removed: ${key}`);
// });

// console.log(`Cleared ${smKeys.length} items containing "Santa Monica"`);


// // Filter keys that contain "Tokyo"
// const vKeys = keys.filter(key => key.includes("Vancouver"));

// // Remove each matching item
// vKeys.forEach(key => {
//     localStorage.removeItem(key);
//     console.log(`Removed: ${key}`);
// });

// console.log(`Cleared ${tokyoKeys.length} items containing "Vancouver"`);

  // destructure the data
  $: location = data?.location;
  $: dates = data?.dates;
  $: weather = data?.weather;

  // calculate days until trip
  $: daysUntilTrip = (() => {
    if (!dates) return 0;
    const today = new Date();
    const startDate = new Date(dates.startDate);
    const diff = startDate.getTime() - today.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  })();
</script>
  
<main class="container">
  <h1 class="title">🌴 Trip to {location.city}, {location.state}</h1>
  <div class="summary-card">
    <div class="section">
      <h2>📍 Location</h2>
      <p>{location.city}, {location.state}, {location.country}</p>
    </div>

    <div class="section">
      <h2>📅 Dates</h2>
      <p>{dates.startDate} → {dates.endDate}</p>
      <p class="countdown">⏳ {daysUntilTrip} days to go!</p>
    </div>

    <div class="section">
      <h2>🌦️ Weather Forecast</h2>
      <div class="weather-blocks">
        <div class="weather-box">
          <h3>Start</h3>
          <p>{weather.forecast.start.conditions}</p>
          <p>High: {weather.forecast.start.temperature.high}°F</p>
          <p>Low: {weather.forecast.start.temperature.low}°F</p>
        </div>
        <div class="weather-box">
          <h3>End</h3>
          <p>{weather.forecast.end.conditions}</p>
          <p>High: {weather.forecast.end.temperature.high}°F</p>
          <p>Low: {weather.forecast.end.temperature.low}°F</p>
        </div>
        <div class="weather-box">
          <h3>Avg</h3>
          <p>{weather.average.conditions}</p>
          <p>Temp: {weather.average.temperature}°F</p>
        </div>
      </div>
    </div>
  </div>
</main>
  
<style>
  .container {
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
  }

  .title {
    text-align: center;
    color: black;
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  .summary-card {
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 10px 20px rgba(137, 43, 226, 0.2);
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border-left: 8px solid #8a2be2;
  }

  .section h2 {
      color: #3b82f6;
      margin-bottom: 0.5rem;
      font-size: 1.25rem; /* Bigger font */
      font-weight: 600;
      letter-spacing: 0.5px;
  }

  .section p {
    margin: 0.3rem 0;
  }

  .countdown {
    color: #d946ef;
    font-weight: bold;
    font-size: 1.1rem;
  }
  
  .weather-blocks {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .weather-box {
    flex: 1;
    min-width: 120px;
    background: #e9d5ff;
    padding: 1rem;
    border-radius: 0.75rem;
    text-align: center;
    box-shadow: 0 2px 8px rgba(139, 92, 246, 0.15);
  }
  
  .weather-box h3 {
    color: #9333ea;
    margin-bottom: 0.5rem;
  }
</style>
  