<script>
  import { onMount } from 'svelte';
  
  let editing = false;
  let profile = {
    name: 'Amy',
    age: '',
    email: '',
    dietary: '',
    parents: '',
    siblings: '',
    hotel: '',
    arrival: '',
    flight: '',
    about: '',
    photo: '' // New field for profile image
  };

  onMount(() => {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      profile = JSON.parse(saved);
    }
  });

  function saveProfile() {
    localStorage.setItem('userProfile', JSON.stringify(profile));
    editing = false;
  }

  function enableEditing() {
    editing = true;
  }

  // Handle the profile picture upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        profile.photo = reader.result; // Save the base64 image to profile
      };
      reader.readAsDataURL(file);  // Convert image to base64 format
    }
  };

  // Trigger the hidden file input when the upload button is clicked
  const triggerFileInput = () => {
    document.getElementById('file-upload').click();
  };
</script>

<main class="profile-container">
  <h1>My Profile</h1>

  <div class="profile-form">
    <div class="form-controls">
      {#if editing}
        <button on:click={saveProfile}>Save</button>
      {:else}
        <button on:click={enableEditing}>Edit</button>
      {/if}
    </div>

    <label>
      <div class="image-upload">
        <img src={profile.photo || '/default-profile.jpg'} alt="Profile Picture" class="profile-photo" />
        {#if editing}
          <!-- Upload Button triggers file input click -->
          <button type="button" on:click={triggerFileInput}>Upload Image</button>
          <!-- Hidden File Input -->
          <input id="file-upload" type="file" accept="image/*" on:change={handleFileUpload} style="display: none;" />
        {/if}
      </div>
    </label>

    <label>
      Name:
      <input bind:value={profile.name} readonly={!editing} />
    </label>

    <label>
      Age:
      <input type="number" bind:value={profile.age} readonly={!editing} />
    </label>

    <label>
      Email:
      <input type="email" bind:value={profile.email} readonly={!editing} />
    </label>

    <label>
      Dietary Restrictions:
      <input bind:value={profile.dietary} readonly={!editing} />
    </label>

    <label>
      Parents:
      <input bind:value={profile.parents} readonly={!editing} />
    </label>

    <label>
      Siblings:
      <input bind:value={profile.siblings} readonly={!editing} />
    </label>

    <label>
      Hotel:
      <input bind:value={profile.hotel} readonly={!editing} />
    </label>

    <label>
      Arrival Date:
      <input type="date" bind:value={profile.arrival} readonly={!editing} />
    </label>

    <label>
      Flight Details:
      <input bind:value={profile.flight} readonly={!editing} />
    </label>

    <label>
      About Me:
      <textarea bind:value={profile.about} readonly={!editing}></textarea>
    </label>
  </div>
</main>

<style>
  .profile-container {
    padding: 2rem;
    max-width: 600px;
    margin: auto;
    background: #fdfdfd;
    border-radius: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-left: 8px solid #8a2be2;
  }

  .profile-form {
    display: flex;
    flex-direction: column;
  }

  .form-controls {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
  }

  .profile-form label {
    display: block;
    margin-bottom: 1rem;
  }

  input,
  textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
    background-color: #f9f9f9;
    
  }

  input[readonly],
  textarea[readonly] {
    background-color: #eaeaea;
    color: #555;
    border: 1px solid #ddd;
    
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #8a2be2;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }

  button:hover {
    background-color: #5b4bc8;
  }

  .image-upload {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .profile-photo {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 1rem;
  }

  .image-upload button {
    margin-top: 10px;
    padding: 0.5rem 1rem;
    background-color: #8a2be2;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }

  .image-upload button:hover {
    background-color: #45a049;
  }
</style>
