<script>
    function getCurrentTimestamp() {
      const now = new Date();
      return now.toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short'
      });
    }
  
    let announcements = [
      {
        title: "Dinner in 30 minutes",
        details: "Meet at the Hotel la Villa lobby at 8:00 pm.",
        timestamp: getCurrentTimestamp()
      },
      {
        title: "Beach anyone in 5 minutes?",
        details: "bring sunscreen pls!",
        timestamp: getCurrentTimestamp()
      }
    ];
  
    let showForm = false;
    let titleInput = '';
    let detailsInput = '';
  
    function openForm() {
      showForm = true;
    }
  
    function closeForm() {
      showForm = false;
      titleInput = '';
      detailsInput = '';
    }
  
    function addAnnouncement() {
      if (titleInput.trim() && detailsInput.trim()) {
        announcements = [
          ...announcements,
          {
            title: titleInput,
            details: detailsInput,
            timestamp: getCurrentTimestamp()
          }
        ];
        closeForm();
      }
    }
  </script>
  
  <main class="container">
    <div class="announcement-header">
      <h1 class="title">Announcements</h1>
      <button class="new-btn" on:click={openForm}>+ New</button>
    </div>
  
    <div id="announcementsList">
      {#each announcements as announcement}
        <div class="announcement-box">
          <h3>{announcement.title}</h3>
          <p>{announcement.details}</p>
          <p class="timestamp">{announcement.timestamp}</p>
        </div>
      {/each}
    </div>
  
    {#if showForm}
      <div id="announcementForm">
        <h2>New Announcement</h2>
        <input type="text" bind:value={titleInput} placeholder="Title" />
        <textarea rows="4" bind:value={detailsInput} placeholder="Details..." />
        <div>
          <button on:click={addAnnouncement}>Add</button>
          <button class="cancel" on:click={closeForm}>Cancel</button>
        </div>
      </div>
    {/if}
  </main>
  
  <style>
    .container {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
  
    .announcement-header {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
      margin-bottom: 2rem;
      position: relative;
    }
  
    .title {
      grid-column: 2;
      text-align: center;
      font-size: 2.5rem;
      color: black;
      margin: 0;
    }
  
    .new-btn {
      grid-column: 3;
      justify-self: end;
      background-color: #8a2be2;
      color: white;
      border: none;
      padding: 0.6rem 1rem;
      border-radius: 0.5rem;
      cursor: pointer;
      font-weight: bold;
      box-shadow: 0 4px 8px rgba(138, 43, 226, 0.2);
    }
  
    .announcement-box {
      background: #ffffff;
      padding: 1.25rem;
      margin-top: 1rem;
      border-radius: 1rem;
      box-shadow: 0 4px 8px rgba(138, 43, 226, 0.15);
      border-left: 8px solid #8a2be2;
    }
  
    .announcement-box h3 {
      margin-bottom: 0.5rem;
      color: #1976d2;
      font-weight: bold;
    }
  
    .announcement-box .timestamp {
      font-size: 0.85rem;
      color: #1976d2;
      margin-top: 0.75rem;
    }
  
    #announcementForm {
      position: fixed;
      top: 20%;
      left: 50%;
      transform: translateX(-50%);
      background: #ffffff;
      padding: 2rem;
      border-radius: 1rem;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
      z-index: 10;
      max-width: 400px;
      width: 90%;
    }
  
    #announcementForm h2 {
      color: #7e22ce;
      margin-bottom: 1rem;
    }
  
    #announcementForm input,
    #announcementForm textarea {
      width: 100%;
      margin-bottom: 1rem;
      padding: 0.75rem;
      border: 1px solid #d8b4fe;
      border-radius: 0.75rem;
      background-color: #f9f5ff;
    }
  
    #announcementForm button {
      background-color: #8a2be2;
      color: white;
      padding: 0.6rem 1.1rem;
      border: none;
      border-radius: 0.5rem;
      font-weight: bold;
      cursor: pointer;
    }
  
    #announcementForm .cancel {
      background-color: #8a2be2;
      margin-left: 0.5rem;
    }
  </style>
  