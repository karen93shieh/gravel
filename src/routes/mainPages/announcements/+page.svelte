<script>
  import { onMount } from 'svelte';
  import { tripName } from "$lib/stores/Stores.ts";

  function getCurrentTimestamp() {
    const now = new Date();
    return now.toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  }

  let announcements = [];
  let currentTrip = '';
  let unsubscribe;

  // Watch for changes in tripName
  onMount(() => {
    unsubscribe = tripName.subscribe(name => {
      currentTrip = name;
      loadAnnouncements();
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  });

  function getStorageKey() {
    return `announcements-${currentTrip}`;
  }

  function loadAnnouncements() {
    // localStorage.removeItem(getStorageKey());

    const saved = localStorage.getItem(getStorageKey());
    if (saved) {
      announcements = JSON.parse(saved);
    } else {
      // Default announcements per trip
      const defaultAnnouncements = {
        'Santa Monica': [
          {
            title: "Breakfast in 30 minutes",
            details: "Meet at the Hotel la Villa lobby at 8:00 am.",
            name: "Sarah",
            timestamp: getCurrentTimestamp()
          },
          {
            title: "Heading towards the movie!",
            details: "Please start heading over to the AMC if you want to join us for movie at 11:30!",
            name: "Chelsea",
            timestamp: getCurrentTimestamp()
          }
        ],
        'Vancouver': [
          {
            title: "City tour starts at 10 AM",
            details: "Meet at the front desk for the guided walk.",
            name: "David",
            timestamp: getCurrentTimestamp()
          }
        ],
        'Tokyo': [
          {
            title: "Sushi night!",
            details: "We're heading to Tsukiji market at 6:30 PM.",
            name: "Yuki",
            timestamp: getCurrentTimestamp()
          }
        ]
      };

      announcements = defaultAnnouncements[currentTrip] || [];
      saveAnnouncements();
    }
  }

  function saveAnnouncements() {
    localStorage.setItem(getStorageKey(), JSON.stringify(announcements));
  }

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
          name: "Amy",
          timestamp: getCurrentTimestamp()
        }
      ];
      saveAnnouncements();
      closeForm();
    }
  }

  function deleteAnnouncement(index) {
    announcements = announcements.filter((_, i) => i !== index);
    saveAnnouncements();
  }
</script>


<main class="container">
  <div class="announcement-header">
    <div></div>
    <h1 class="title">📢 Announcements</h1>
    <button class="new-btn" on:click={openForm}>+ New</button>
  </div>

  <div id="announcementsList">
    {#each announcements as announcement, index}
      <div class="announcement-box">
        <button class="delete-btn" on:click={() => deleteAnnouncement(index)}>×</button>
        <h3>{announcement.title}</h3>
        <p>{announcement.details}</p>
        <p class="announcer">— {announcement.name}</p>
        <p class="timestamp">{announcement.timestamp}</p>
      </div>
    {/each}
  </div>

  {#if showForm}
    <div class="overlay" on:click={closeForm}></div>
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
  }

  .title {
    text-align: center;
    font-size: 2.5rem;
    color: black;
    margin: 0;
  }

  .new-btn {
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
    position: relative;
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

  .announcement-box p {
    margin: 0.25rem 0;
  }

  .announcer {
    font-style: italic;
    color: #555;
  }

  .timestamp {
    font-size: 0.85rem;
    color: #1976d2;
    margin-top: 0.5rem;
  }

  .delete-btn {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    background: transparent;
    border: none;
    color: #8a2be2;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    line-height: 1;
  }

  .delete-btn:hover {
    color: #6b21a8;
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
    background-color: red;
    margin-left: 0.5rem;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 5;
  }

</style>
  