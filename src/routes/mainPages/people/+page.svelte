<script context="module" lang="ts">
  export { load } from './+page.js';
</script>

<script>
  export let data;
  const { people } = data;
</script>

<style>
  .profile-container {
    display: flex;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .profile-card {
    background-color: #f7f7f7;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .profile-card img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 10px 10px 0 0;
  }

  .profile-card h3 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .profile-card p {
    font-size: 14px;
    color: #666;
  }
</style>


<div class="trip-page">
  <h1 class="trip-label">People on this trip</h1>
  <div class="profile-container">
    {#each people as person}
      <div class="profile-card">
        <img src={person.photo} alt={`Photo of ${person.name}`} />
        <h3>{person.name}</h3>
        <p>{person.description}</p>
      </div>
    {/each}
  </div>
</div>