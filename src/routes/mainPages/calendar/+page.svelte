<script>
  import { onMount } from 'svelte';
  import { tripName, tripData } from "$lib/stores/Stores.ts";
  import Modal from '$lib/CalendarModal.svelte';


  const START_HOUR = 8;
  const END_HOUR = 22; // 10 PM
  let latestAnnouncement = null;
  let currentTrip = '';
  let view = 'week';
  let startDate = new Date();
  let activities = [];
  let tripDates = { startDate: new Date(), endDate: new Date() };

  // Default activities for each trip
  const tripDefaultActivities = {
    'Santa Monica': [
      { title: 'Beach Day', startHour: 9, endHour: 13, color: '#e7b869' },
      { title: 'Pier Walk', startHour: 14, endHour: 16, color: '#49aaeb' },
      { title: 'Movie', startHour: 15, endHour: 17, color: '#49aaeb' },
      { title: 'Sunset Dinner', startHour: 18, endHour: 20, color: '#FF4500' },
      { title: 'Surf Lesson', startHour: 9, endHour: 11, color: '#26c1b2', dateOffset: 1 },
      { title: 'Shopping', startHour: 12, endHour: 15, color: '#FF00FF', dateOffset: 1 }
    ],
    'Vancouver': [
      { title: 'Stanley Park', startHour: 9, endHour: 12, color: '#14c127' },
      { title: 'Granville Island', startHour: 13, endHour: 16, color: '#49aaeb' },
      { title: 'Seafood Dinner', startHour: 18, endHour: 20, color: '#FF4500' },
      { title: 'Grouse Mountain', startHour: 10, endHour: 15, color: '#8A2BE2', dateOffset: 1 },
      { title: 'Capilano Bridge', startHour: 16, endHour: 18, color: '#e769c0', dateOffset: 1 }
    ],
    'Tokyo': [
      { title: 'Tsukiji Market', startHour: 8, endHour: 10, color: '#FF4500' },
      { title: 'Shibuya Crossing', startHour: 11, endHour: 13, color: '#8A2BE2' },
      { title: 'Sushi Dinner', startHour: 18, endHour: 20, color: '#14c127' },
      { title: 'Akihabara Tour', startHour: 10, endHour: 14, color: '#e769c0', dateOffset: 1 },
      { title: 'Tokyo Tower', startHour: 15, endHour: 17, color: '#49aaeb', dateOffset: 1 }
    ]
  };

  let selectedActivity = null;

  function openActivityModal(activity) {
    selectedActivity = activity;
  }

  function closeModal() {
    selectedActivity = null;
  }

  function generateDefaultActivities() {
    if (!currentTrip || !tripDates.startDate) return [];
    
    const defaults = tripDefaultActivities[currentTrip] || [];
    // const day2 = new Date(tripDates.startDate);
    // day2.setDate(day2.getDate() + 1);
    const day1 = new Date(tripDates.startDate);
    day1.setDate(day1.getDate() + 1);
    const day2 = new Date(day1);
    day2.setDate(day2.getDate() + 1);
    
    // return defaults.map(activity => {
    //   const activityDate = activity.dateOffset === 1 ? 
    //     new Date(day2) : 
    //     new Date(tripDates.startDate);
        
    //   return {
    //     title: activity.title,
    //     date: activityDate,
    //     startHour: activity.startHour,
    //     endHour: activity.endHour,
    //     color: activity.color
    //   };
    // });
    return defaults.map(activity => {
      const activityDate = activity.dateOffset === 1 ? new Date(day2) : new Date(day1);
      return {
        title: activity.title,
        date: activityDate,
        startHour: activity.startHour,
        endHour: activity.endHour,
        color: activity.color
      };
    });
  }

  function shouldShowDefaults() {
    const savedActivities = JSON.parse(localStorage.getItem(`calendarActivities-${currentTrip}`)) || [];
    return savedActivities.length === 0;
  }

  onMount(() => {
    const unsubscribeTripName = tripName.subscribe(name => {
      currentTrip = name;
      const saved = localStorage.getItem(`announcements-${currentTrip}`);
      if (saved) {
        const announcements = JSON.parse(saved);
        if (announcements.length > 0) {
          latestAnnouncement = announcements[announcements.length - 1];
        }
      }

      // Get trip dates
      const unsubscribeTripData = tripData.subscribe(data => {
        if (data?.dates) {
          tripDates.startDate = new Date(data.dates.startDate);
          tripDates.endDate = new Date(data.dates.endDate);
          startDate = new Date(tripDates.startDate);
          startDate.setDate(startDate.getDate() + 1); // Fix off-by-one display
          
          const savedActivities = JSON.parse(localStorage.getItem(`calendarActivities-${currentTrip}`)) || [];
          console.log("Saved activities from localStorage:", savedActivities);
          activities = savedActivities.map(activity => ({
            ...activity,
            // date: new Date(activity.date), 
            date: new Date(new Date(activity.date).setDate(new Date(activity.date).getDate() + 1)), // Adjust date to next day
          }));

          console.log("Activities from localStorage:", activities);
          // Only add defaults if no saved activities exist
          // if (shouldShowDefaults()) {
            activities = [
              ...generateDefaultActivities(),
              ...activities
            ];
            
          // }
        }
      });
      
      return () => unsubscribeTripData();
    });
    
    return () => unsubscribeTripName();
  });

  const getDatesForWeek = (start) => {
    const dates = [];
    const d = new Date(start);
    const day = d.getDay();
    d.setDate(d.getDate() - day);
    for (let i = 0; i < 7; i++) {
      const next = new Date(d);
      next.setDate(d.getDate() + i);
      dates.push(next);
    }
    return dates;
  };

  const formatDate = (date) =>
    date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });

  function goBack() {
    startDate.setDate(startDate.getDate() - (view === 'day' ? 1 : 7));
    startDate = new Date(startDate);
  }

  function goForward() {
    startDate.setDate(startDate.getDate() + (view === 'day' ? 1 : 7));
    startDate = new Date(startDate);
  }

  function layoutActivitiesForDate(dateActivities) {
    // Sort by start time
    dateActivities.sort((a, b) => a.startHour - b.startHour);

    let columns = [];

    for (const activity of dateActivities) {
      let placed = false;

      for (const column of columns) {
        if (!column.some(a => isOverlap(a, activity))) {
          column.push(activity);
          placed = true;
          break;
        }
      }

      if (!placed) {
        columns.push([activity]);
      }
    }

    // Flatten and assign layout info
    const positioned = [];
    columns.forEach((column, colIndex) => {
      column.forEach(activity => {
        positioned.push({
          ...activity,
          left: `${(colIndex / columns.length) * 100}%`,
          width: `${100 / columns.length}%`
        });
      });
    });

    return positioned;
  }

  function isOverlap(a, b) {
    return a.startHour < b.endHour && b.startHour < a.endHour;
  }
</script>

<!-- Toolbar and Announcement -->
<div class="top-bar">
  <div class="view-controls">
    <button class="day-btn" class:selected={view === 'day'} on:click={() => (view = 'day')}>Day</button>
    <button class="week-btn" class:selected={view === 'week'} on:click={() => (view = 'week')}>Week</button>
  </div>

  <div class="nav-controls">
    <button on:click={goBack}>&larr; Prev</button>
    <button on:click={goForward}>Next &rarr;</button>
  </div>
</div>

{#if latestAnnouncement}
  <div class="latest-announcement">
    <h3>{latestAnnouncement.title}</h3>
    <p>{latestAnnouncement.details}</p>
    <p class="announcer">— {latestAnnouncement.name}</p>
    <p class="timestamp">{latestAnnouncement.timestamp}</p>
  </div>
{/if}

<!-- Week View -->
{#if view === 'week'}
  <div class="calendar-grid week-view">
    <div class="header-row">
      <div class="time-cell"></div>
      {#each getDatesForWeek(startDate) as date}
        <div class="day-header">{formatDate(date)}</div>
      {/each}
    </div>

    {#each Array(END_HOUR - START_HOUR).fill(0).map((_, i) => START_HOUR + i) as hour}
      <div class="time-row">
        <div class="time-cell">{hour}:00</div>
        {#each getDatesForWeek(startDate) as date}
          <div class="calendar-cell">
            {#each layoutActivitiesForDate(
              activities.filter(a => a.date.toDateString() === date.toDateString())
            ).filter(a => a.startHour <= hour && a.endHour > hour) as activity}            
              <div
                class="activity"
                on:click={() => openActivityModal(activity)}
                style="background-color: {activity.color}; top: {(activity.startHour - hour) * 100}%; height: {(activity.endHour - activity.startHour) * 100}%; left: {activity.left}; width: {activity.width};">
                {activity.title}
              </div>
            {/each}
          </div>
        {/each}
      </div>
    {/each}
  </div>

<!-- Day View -->
{:else if view === 'day'}
  <div class="calendar-grid day-view">
    <div class="header-row">
      <div class="time-cell"></div>
      <div class="day-header">{formatDate(startDate)}</div>
    </div>

    {#each Array(END_HOUR - START_HOUR).fill(0).map((_, i) => START_HOUR + i) as hour}
      <div class="time-row">
        <div class="time-cell">{hour}:00</div>
        <div class="calendar-cell">
          {#each layoutActivitiesForDate(
              activities.filter(a => a.date.toDateString() === startDate.toDateString())
              ).filter(a => a.startHour <= hour && a.endHour > hour) as activity}          
            <div
              class="activity"
              style="background-color: {activity.color}; top: {(activity.startHour - hour) * 100}%; height: {(activity.endHour - activity.startHour) * 100}%; left: {activity.left}; width: {activity.width};">
              {activity.title}
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
{/if}

{#if selectedActivity}
  <Modal activity={selectedActivity} onClose={closeModal} />
{/if}

<style>
  :global(body) {
    /* margin: 0;
    font-family: system-ui, sans-serif;
    background: beige;
    color: #333; */
  }

  .top-bar {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
  }

  .view-controls button,
  .nav-controls button {
    margin-right: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    color: #333;
    transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  }

  .view-controls .day-btn {
    background-color: #e3d7f4;
  }

  .view-controls .week-btn {
    background-color: #d5e8f7;
  }

  .view-controls button.selected {
    background-color: #4f4f4f;
    color: #ffffff;
  }

  .view-controls .day-btn:hover {
    background-color: #512da8;
    color: white;
  }

  .view-controls .week-btn:hover {
    background-color: #1976d2;
    color: white;
  }

  .nav-controls button:hover {
    background-color: #bdbdbd;
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  .calendar-grid {
    border-radius: 8px;
    overflow: hidden;
    margin: 1rem;
  }

  .week-view {
    background: #d5e8f7;
  }

  .day-view {
    background: #e3d7f4;
  }

  .header-row {
    display: grid;
    grid-template-columns: 80px repeat(7, 1fr);
    background: rgba(255, 255, 255, 0.7);
  }

  .day-header {
    padding: 0.5rem;
    text-align: center;
    font-weight: bold;
    border-left: 1px solid #ccc;
  }

  .time-row {
    display: grid;
    grid-template-columns: 80px repeat(7, 1fr);
    min-height: 40px;
  }

  .time-cell {
    background: #f0f0f0;
    text-align: right;
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
    border-right: 1px solid #ddd;
  }

  .calendar-cell {
    border-left: 1px solid #eee;
    border-top: 1px solid #eee;
    position: relative;
    background-color: white;
  }

  .activity {
  position: absolute;
  padding: 0.25rem;
  color: white;
  font-size: 0.75rem;
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}


  .calendar-grid.day-view .header-row {
    grid-template-columns: 80px 1fr;
  }

  .calendar-grid.day-view .time-row {
    grid-template-columns: 80px 1fr;
  }

  .latest-announcement {
    position: relative;
    background: #ffffff;
    padding: 1.25rem;
    margin-top: 1rem;
    border-radius: 1rem;
    box-shadow: 0 4px 8px rgba(138, 43, 226, 0.15);
    border-left: 8px solid #8a2be2;
  }

  .latest-announcement h3 {
    margin: 0 0 0.5rem 0;
    color: #1976d2;
  }

  .latest-announcement .timestamp {
    margin-top: 0.5rem;
    font-size: 0.85rem;
    color: #1976d2;
  }

  .announcer {
    font-style: italic;
    color: #555;
  }
  .activity {
    position: absolute;
    top: 0;
    bottom: 0;
    padding: 0.25rem;
    color: white;
    font-size: 0.75rem;
    border-radius: 4px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
  }

  .calendar-cell {
    border-left: 1px solid #eee;
    border-top: 1px solid #eee;
    position: relative;
    background-color: white;
    height: 100px; /* controls vertical spacing of each hour slot */
  }

  .time-row {
    min-height: 100px;
  }
</style>
