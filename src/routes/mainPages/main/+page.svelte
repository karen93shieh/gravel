<script>
    let tripSummary = {
      tripSummary: {
        location: {
          city: "Santa Monica",
          state: "California",
          country: "USA"
        },
        dates: {
          startDate: "2025-05-15",
          endDate: "2025-05-20"
        },
        weather: {
          forecast: {
            start: {
              temperature: {
                high: 75,
                low: 60
              },
              conditions: "Sunny"
            },
            end: {
              temperature: {
                high: 78,
                low: 62
              },
              conditions: "Partly cloudy"
            }
          },
          average: {
            temperature: 72,
            conditions: "Mostly sunny"
          }
        }
      }
    };
  
    const { location, dates, weather } = tripSummary.tripSummary;
  
    // ✅ Calculate "days until trip" dynamically
    const today = new Date();
    const startDate = new Date(dates.startDate);
    const timeDiff = startDate.getTime() - today.getTime();
    const daysUntilTrip = Math.max(0, Math.ceil(timeDiff / (1000 * 60 * 60 * 24))); // No negative days
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
    /* :global(body) {
      margin: 0;
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(to bottom, #dbeafe, #f3e8ff, #fde7f7);
      color: #333;
    } */
  
    .container {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
  
    .title {
      text-align: center;
      /* color: #6a0dad; */
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
      /* background: linear-gradient(135deg, #dbeafe, #e9d5ff); */
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
  