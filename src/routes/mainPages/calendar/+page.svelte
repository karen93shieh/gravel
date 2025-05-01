<script>
  let view = 'week';
  let startDate = new Date();

  let activities = [
    {
      title: 'Morning Run',
      date: new Date(),
      startHour: 6,
      endHour: 7,
      color: '#8A2BE2',
    },
    {
      title: 'Meeting',
      date: new Date(),
      startHour: 10,
      endHour: 11,
      color: '#FF00FF',
    }
  ];

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
    if (view === 'day') {
      startDate.setDate(startDate.getDate() - 1);
    } else if (view === 'week') {
      startDate.setDate(startDate.getDate() - 7);
    }
    startDate = new Date(startDate);
  }

  function goForward() {
    if (view === 'day') {
      startDate.setDate(startDate.getDate() + 1);
    } else if (view === 'week') {
      startDate.setDate(startDate.getDate() + 7);
    }
    startDate = new Date(startDate);
  }

  // Show most recent announcement
  let latestAnnouncement = null;

  import { onMount } from 'svelte';

  onMount(() => {
    const saved = localStorage.getItem('announcements');
    if (saved) {
      const announcements = JSON.parse(saved);
      if (announcements.length > 0) {
        latestAnnouncement = announcements[announcements.length - 1];
      }
    }
  });
</script>

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

{#if view === 'week'}
  <div class="calendar-grid week-view">
    <div class="header-row">
      <div class="time-cell"></div>
      {#each getDatesForWeek(startDate) as date}
        <div class="day-header">{formatDate(date)}</div>
      {/each}
    </div>

    {#each Array(24) as _, hour}
      <div class="time-row">
        <div class="time-cell">{hour}:00</div>
        {#each getDatesForWeek(startDate) as date}
          <div class="calendar-cell">
            {#each activities.filter(a =>
              a.date.toDateString() === date.toDateString() &&
              a.startHour === hour) as activity}
              <div
                class="activity"
                style="background-color: {activity.color}; height: {(activity.endHour - activity.startHour) * 100}%;">
                {activity.title}
              </div>
            {/each}
          </div>
        {/each}
      </div>
    {/each}
  </div>
{:else if view === 'day'}
  <div class="calendar-grid day-view">
    <div class="header-row">
      <div class="time-cell"></div>
      <div class="day-header">{formatDate(startDate)}</div>
    </div>

    {#each Array(24) as _, hour}
      <div class="time-row">
        <div class="time-cell">{hour}:00</div>
        <div class="calendar-cell">
          {#each activities.filter(a =>
            a.date.toDateString() === startDate.toDateString() &&
            a.startHour === hour) as activity}
            <div
              class="activity"
              style="background-color: {activity.color}; height: {(activity.endHour - activity.startHour) * 100}%;">
              {activity.title}
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
{/if}

<style>
  :global(body) {
    margin: 0;
    font-family: system-ui, sans-serif;
    background: beige;
    color: #333;
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
    left: 5px;
    right: 5px;
    top: 0;
    padding: 0.25rem;
    color: white;
    font-size: 0.75rem;
    border-radius: 4px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
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
</style>
