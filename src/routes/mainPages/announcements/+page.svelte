<script>
  let announcements = [];
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
      announcements = [...announcements, { title: titleInput, details: detailsInput }];
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
      </div>
    {/each}
  </div>

  {#if showForm}
    <div id="announcementForm">
      <h2>New Announcement</h2>
      <input type="text" bind:value={titleInput} placeholder="Title" />
      <textarea rows="4" bind:value={detailsInput} placeholder="Details..."></textarea>
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

  .title {
    text-align: center;
    color: black;
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  .announcement-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .new-btn {
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
    background: #e9d5ff;
    padding: 1rem;
    margin-top: 1rem;
    border-radius: 0.75rem;
    box-shadow: 0 2px 8px rgba(139, 92, 246, 0.15);
  }

  .announcement-box h3 {
    margin-bottom: 0.5rem;
    color: #9333ea;
  }

  #announcementForm {
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    z-index: 10;
    max-width: 400px;
    width: 90%;
  }

  #announcementForm input,
  #announcementForm textarea {
    width: 100%;
    margin-bottom: 1rem;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
  }

  #announcementForm button {
    background-color: #8a2be2;
    color: white;
    padding: 0.6rem 1rem;
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
