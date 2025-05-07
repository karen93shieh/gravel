<script>
    export let activity;
    export let onClose;
  </script>
  
  {#if activity}
    <div class="overlay" on:click={onClose}>
      <div
        class="modal"
        on:click|stopPropagation
        style="border-left: 6px solid {activity.color};"
      >
        <button class="close" on:click={onClose}>✕</button>
  
        <header>
          <h2>{activity.title}</h2>
          <p class="subtitle">{activity.date.toLocaleDateString()}</p>
        </header>
  
        <section>
          <h3>Details</h3>
          <ul>
            <li><strong>Start:</strong> {activity.startHour}:00</li>
            <li><strong>End:</strong> {activity.endHour}:00</li>
            {#if activity.price}
              <li><strong>Price:</strong> {activity.price}</li>
            {/if}
          </ul>
  
          {#if activity.description}
            <h3>Description</h3>
            <p>{activity.description}</p>
          {/if}
        </section>
      </div>
    </div>
  {/if}
  
  <style>
    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.55);
      display: grid;
      place-items: center;
      z-index: 1000;
    }
  
    .modal {
      width: min(90vw, 480px);
      max-height: 85vh;
      overflow: auto;
      background: #fff;
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.25);
      position: relative;
      border-top: 6px solid transparent; /* fallback default */
    }
  
    .close {
      position: absolute;
      top: 8px;
      right: 12px;
      font-size: 24px;
      background: none;
      border: none;
      cursor: pointer;
    }
  
    header {
      text-align: center;
    }
  
    .subtitle {
      color: #666;
      margin-top: -6px;
    }
  
    h3 {
      margin: 16px 0 4px;
    }
  
    ul {
      margin: 0 0 8px 0;
      padding: 0;
      list-style: none;
    }
  
    li {
      margin-bottom: 4px;
    }
  </style>
  