import { writable, derived } from 'svelte/store';

// Helper function for localStorage persistence
const persistStore = (key: string, initialValue: string) => {
  // Get stored value or fall back to initialValue
  const storedValue = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
  const initial = storedValue ? storedValue : initialValue;

  // Create the writable store
  const store = writable(initial);

  // Subscribe to store changes and persist to localStorage
  if (typeof window !== 'undefined') {
    store.subscribe(value => {
      localStorage.setItem(key, value);
    });
  }

  return store;
};


// Create persisted stores
export const onPage = persistStore('onPage', 'main');
export const tripName = persistStore('tripName', 'Santa Monica');

// Trip data for all trips
const allTripData = {
  'Santa Monica': {
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
          temperature: { high: 75, low: 60 },
          conditions: "Sunny"
        },
        end: {
          temperature: { high: 78, low: 62 },
          conditions: "Partly cloudy"
        }
      },
      average: {
        temperature: 72,
        conditions: "Mostly sunny"
      }
    }
  },

  'Vancouver': {
    location: {
      city: "Vancouver",
      state: "British Columbia",
      country: "Canada"
    },
    dates: {
      startDate: "2025-06-01",
      endDate: "2025-06-07"
    },
    weather: {
      forecast: {
        start: {
          temperature: { high: 68, low: 54 },
          conditions: "Cloudy"
        },
        end: {
          temperature: { high: 70, low: 55 },
          conditions: "Showers"
        }
      },
      average: {
        temperature: 66,
        conditions: "Partly cloudy"
      }
    }
  },

  'Tokyo': {
    location: {
      city: "Tokyo",
      state: "Tokyo",
      country: "Japan"
    },
    dates: {
      startDate: "2025-07-10",
      endDate: "2025-07-15"
    },
    weather: {
      forecast: {
        start: {
          temperature: { high: 85, low: 72 },
          conditions: "Humid"
        },
        end: {
          temperature: { high: 88, low: 75 },
          conditions: "Thunderstorms"
        }
      },
      average: {
        temperature: 82,
        conditions: "Hot and humid"
      }
    }
  }
};

// Derived store that returns the selected trip's data
export const tripData = derived(tripName, ($tripName) => allTripData[$tripName]);
