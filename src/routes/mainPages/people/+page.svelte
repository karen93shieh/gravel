<script context="module" lang="ts">
  export { load } from './+page.js';
</script>

<script>
  import { tripData, tripName } from '$lib/stores/Stores';
  import { get } from 'svelte/store';

  export let data;

  $: currentTripName = $tripName;
  $: currentTripPeople = data.allPeople.filter(person => person.trip === currentTripName);

  $: safeTripData = $tripData || {};

  let selectedPerson = null;
  let showModal = false;

  const openProfile = (person) => { selectedPerson = person; showModal = true; };
  const closeModal = () => { showModal = false; selectedPerson = null; };

  async function sharePage() {
    const pageUrl = window.location.href;
    const pageTitle = "Check out this People page!";

    if (navigator.share) {
      try {
        await navigator.share({
          title: pageTitle,
          url: pageUrl
        });
        // alert("Page link shared successfully!");
      } catch (error) {
        console.error("Error sharing the page:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(pageUrl);
        alert("Page link copied to clipboard!");
      } catch (error) {
        console.error("Error copying the link:", error);
        alert("Failed to copy the link. Please copy it manually.");
      }
    }
  }

</script>

<style>
  .container {
    padding: 2rem;
    max-width: 1000px;
    margin: 0 auto;
  }

  .activity-header {
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

  .invite-button {
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

  .profile-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    justify-items: center;
  }

  .profile-card {
    width: 100%;
    border: 1px solid #d8b4fe;
    border-radius: 1rem;
    background: white;
    padding: 1.25rem;
    box-shadow: 0 4px 8px rgba(138, 43, 226, 0.15);
    border-left: 8px solid #8a2be2;
    transition: transform 0.2s ease;
    cursor: pointer;
  }

  .profile-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(138, 43, 226, 0.2);
  }

  .profile-card img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 0.75rem;
    margin-bottom: 1rem;
  }

  .profile-card h3 {
    margin: 0 0 0.5rem 0;
    color: #1976d2;
    font-size: 1.25rem;
    text-align: center;
  }

  .view-profile-button {
    display: block;
    width: 100%;
    background-color: #8a2be2;
    color: white;
    border: none;
    padding: 0.6rem;
    border-radius: 0.5rem;
    font-weight: bold;
    cursor: pointer;
    margin-top: 1rem;
    transition: background-color 0.3s ease;
  }

  .view-profile-button:hover {
    background-color: #6a1bbd;
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

  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #ffffff;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    z-index: 10;
    max-width: 500px;
    width: 90%;
    border-left: 8px solid #8a2be2;
  }

  .modal img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
    display: block;
    margin: 0 auto 1.5rem;
    border: 3px solid #8a2be2;
  }

  .modal h2 {
    color: #7e22ce;
    margin-bottom: 1rem;
    text-align: center;
  }

  .modal p {
    margin: 0.5rem 0;
    color: #555;
  }

  .modal strong {
    color: #333;
  }

  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: transparent;
    border: none;
    color: #8a2be2;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    line-height: 1;
  }

  .close-btn:hover {
    color: #6a1bbd;
  }
</style>

<main class="container">
  <div class="activity-header">
    <div></div>
    <h1 class="title">People on this Trip</h1>
    <button class="invite-button" on:click={sharePage}>Invite Friends</button>
  </div>
  <div class="trip-buttons">
    {#each Object.keys(safeTripData) as tripKey}
    <button
      class="trip-button {tripKey === $tripName ? 'active' : ''}"
      on:click={() => tripName.set(tripKey)}
    >
        {tripKey}
      </button>
    {/each}
  </div>

  <div class="profile-container">
  {#if currentTripPeople && currentTripPeople.length > 0}
    {#each currentTripPeople as person}
      <div class="profile-card" on:click={() => openProfile(person)}>
        <img src={person.photo} alt="{person.name}'s photo"  />
        <h3>{person.name}</h3>
        <button class="view-profile-button">View Profile</button>
      </div>
    {/each}
  {/if}
</div>

  {#if showModal}
    <div class="overlay" on:click={closeModal} />
    <div class="modal" role="dialog" aria-modal="true">
      <button class="close-btn" aria-label="Close" on:click={closeModal}>×</button>
      <img src={selectedPerson.photo} alt={selectedPerson.name} />
      <h2>{selectedPerson.name}</h2>
      <p><strong>Age:</strong> {selectedPerson.age}</p>
      <p><strong>Email:</strong> {selectedPerson.email}</p>
      <p><strong>Dietary:</strong> {selectedPerson.dietaryRestrictions.length ? selectedPerson.dietaryRestrictions.join(', ') : 'None'}</p>
      <p><strong>Parents:</strong> {selectedPerson.parents.join(', ')}</p>
      <p><strong>Siblings:</strong> {selectedPerson.siblings.length ? selectedPerson.siblings.join(', ') : 'None'}</p>
      <p><strong>Hotel:</strong> {selectedPerson.hotel}</p>
      <p><strong>Arrival:</strong> {selectedPerson.arrivalDate}</p>
      <p><strong>Flight:</strong> {selectedPerson.flightInfo.airline} {selectedPerson.flightInfo.flightNumber} arriving at {selectedPerson.flightInfo.arrivalTime} from {selectedPerson.flightInfo.departureAirport}</p>
      <p><strong>About Me:</strong> {selectedPerson.aboutMe}</p>
    </div>
  {/if}
</main>