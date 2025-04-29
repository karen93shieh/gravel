<script context="module" lang="ts">
  export { load } from './+page.js';
</script>

<script>
  export let data;          // SvelteKit injects `{ people }`
	let { people } = data;
	let selectedPerson = null;
	let showModal = false;

	const openProfile = (person) => { selectedPerson = person; showModal = true; };
	const closeModal = () => { showModal = false; selectedPerson = null; };
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

   .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    width: 90%;
    max-width: 500px;
    border-radius: 8px;
  }

  .overlay {
   position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    z-index: 10;
  }

  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: #fff;
    border-radius: 8px;
    max-width: 400px;
    width: 90%;
    padding: 1.5rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 11;
  }
  .modal img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 50%;
    display: block;
    margin: 0 auto 1rem;
  }
  .modal h2 {
    text-align: center;
    margin-bottom: 1rem;
  }
  .modal p {
    margin: 0.4rem 0;
    font-size: 0.9rem;
    color: #333;
  }
  .close-btn {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
  }
</style>

<div class="profile-container">
  {#each people as person}
    <div class="profile-card" on:click={() => openProfile(person)}>
      <img src={person.photo} alt={person.name} />
      <h3>{person.name}</h3>
    </div>
  {/each}
</div>

{#if showModal}
  <div class="overlay" on:click={closeModal} />
  <div class="modal" role="dialog" aria-modal="true">
    <button class="close-btn" aria-label="Close" on:click={closeModal}>×</button>
    <img src={selectedPerson.photo} alt={selectedPerson.name} />
    <h2>{selectedPerson.name}</h2>

    <p><strong>Age:</strong> {selectedPerson.age}</p>
    <p><strong>Email:</strong> {selectedPerson.email}</p>
    <p>
      <strong>Dietary:</strong>
      {selectedPerson.dietaryRestrictions.length
        ? selectedPerson.dietaryRestrictions.join(', ')
        : 'None'}
    </p>
    <p><strong>Parents:</strong> {selectedPerson.parents.join(', ')}</p>
    <p>
      <strong>Siblings:</strong>
      {selectedPerson.siblings.length
        ? selectedPerson.siblings.join(', ')
        : 'None'}
    </p>
    <p><strong>Hotel:</strong> {selectedPerson.hotel}</p>
    <p><strong>Arrival:</strong> {selectedPerson.arrivalDate}</p>
    <p>
      <strong>Flight:</strong>
      {selectedPerson.flightInfo.airline} {selectedPerson.flightInfo.flightNumber}
      arriving at {selectedPerson.flightInfo.arrivalTime} from
      {selectedPerson.flightInfo.departureAirport}
    </p>
    <p><strong>About Me:</strong> {selectedPerson.aboutMe}</p>
  </div>

  
{/if}

