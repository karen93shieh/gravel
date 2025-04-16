<script>
    let view = 'week'; // Options: 'day', 'week', 'month'
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
      const day = d.getDay(); // 0 = Sunday
      d.setDate(d.getDate() - day);
      for (let i = 0; i < 7; i++) {
        const next = new Date(d);
        next.setDate(d.getDate() + i);
        dates.push(next);
      }
      return dates;
    };
  
    const formatDate = (date) => date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  
    function goBack() {
      if (view === 'day') {
        startDate.setDate(startDate.getDate() - 1);
      } else if (view === 'week') {
        startDate.setDate(startDate.getDate() - 7);
      } else if (view === 'month') {
        startDate.setMonth(startDate.getMonth() - 1);
      }
      startDate = new Date(startDate);
    }
  
    function goForward() {
        if (view === 'day') {
            startDate.setDate(startDate.getDate() + 1);
        } else if (view === 'week') {
            startDate.setDate(startDate.getDate() + 7);
        } else if (view === 'month') {
            startDate.setMonth(startDate.getMonth() + 1);
        }
            startDate = new Date(startDate);
    }

    const getDatesForMonth = (start) => {
        const dates = [];
        const year = start.getFullYear();
        const month = start.getMonth();

        // Start from the Sunday before the 1st
        const firstDay = new Date(year, month, 1);
        const startDay = firstDay.getDay(); // Sunday = 0
        const startDate = new Date(firstDay);
        startDate.setDate(firstDay.getDate() - startDay);

        // Fill 6 full weeks (42 days)
        for (let i = 0; i < 42; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            dates.push(date);
        }

        return dates;
    };

  </script>
  
  <div class="top-bar">
    <div class="view-controls">
        <button
          class="day-btn"
          class:selected={view === 'day'}
          on:click={() => view = 'day'}
        >
          Day
        </button>
        <button
          class="week-btn"
          class:selected={view === 'week'}
          on:click={() => view = 'week'}
        >
          Week
        </button>
        <button
          class="month-btn"
          class:selected={view === 'month'}
          on:click={() => view = 'month'}
        >
          Month
        </button>
      </div>
      
      
  
    <div class="nav-controls">
      <button on:click={goBack}>&larr; Prev</button>
      <button on:click={goForward}>Next &rarr;</button>
    </div>
  </div>
  
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
                <div class="activity" style="background-color: {activity.color}; height: {(activity.endHour - activity.startHour) * 100}%;">
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
              <div class="activity" style="background-color: {activity.color}; height: {(activity.endHour - activity.startHour) * 100}%;">
                {activity.title}
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  
    {:else if view === 'month'}
    <div class="calendar-grid month-view">
      <h2>{startDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</h2>
      <div class="month-header-row">
        {#each ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as day}
          <div class="month-day-header">{day}</div>
        {/each}
      </div>
      <div class="month-grid">
        {#each getDatesForMonth(startDate) as date}
          <div class="month-cell {date.getMonth() !== startDate.getMonth() ? 'dimmed' : ''}">
            <div class="date-label">{date.getDate()}</div>
            {#each activities.filter(a => a.date.toDateString() === date.toDateString()) as activity}
              <div class="activity" style="background-color: {activity.color}; position: static; margin-top: 0.2rem;">
                {activity.title}
              </div>
            {/each}
          </div>
        {/each}
      </div>
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

/* Pastel defaults for each view button */
.view-controls .day-btn {
  background-color: #f6d3ed; /* pastel magenta */
}

.view-controls .week-btn {
  background-color: #e3d7f4; /* pastel purple */
}

.view-controls .month-btn {
  background-color: #d5e8f7; /* pastel blue */
}

/* Highlight the selected button (slightly stronger color) */
.view-controls button.selected {
  background-color: #4f4f4f; /* slightly stronger blue */
  color: #ffffff;
}

/* Hover effect for all buttons */
.view-controls button:hover,
.nav-controls button:hover {
  background-color: #bdbdbd;
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

/* Strong hover for view buttons specifically */
.view-controls .day-btn:hover {
  background-color: #c2185b; /* vivid magenta */
  color: white;
}

.view-controls .week-btn:hover {
  background-color: #512da8; /* deep purple */
  color: white;
}

.view-controls .month-btn:hover {
  background-color: #1976d2; /* vivid blue */
  color: white;
}

.calendar-grid {
  border-radius: 8px;
  overflow: hidden;
  margin: 1rem;
}

.week-view {
  background: #e3d7f4; /* pastel purple */
}

.day-view {
  background: #f6d3ed; /* pastel magenta */
}

.month-view {
  background: #d5e8f7; /* pastel blue */
  padding: 2rem;
  text-align: center;
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
  box-shadow: 0 0 4px rgba(0,0,0,0.1);
}

.calendar-grid.day-view .header-row {
  grid-template-columns: 80px 1fr;
}

.calendar-grid.day-view .time-row {
  grid-template-columns: 80px 1fr;
}

.month-header-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.6);
  padding: 0.5rem 0;
}

.month-day-header {
  text-align: center;
  padding: 0.25rem;
  border-bottom: 1px solid #ccc;
}

.month-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.month-cell {
  border: 1px solid #ccc;
  min-height: 80px;
  padding: 0.25rem;
  position: relative;
  background: white;
}

.month-cell .date-label {
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.month-cell.dimmed {
  background-color: #f3f3f3;
  color: #999;
}


  </style>
  