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

  async function sharePage() {
    const pageUrl = window.location.href; // Get the current page URL
    const pageTitle = "Check out this People page!";

    if (navigator.share) {
      // Use the Web Share API if available
      try {
        await navigator.share({
          title: pageTitle,
          url: pageUrl
        });
        alert("Page link shared successfully!");
      } catch (error) {
        console.error("Error sharing the page:", error);
      }
    } else {
      // Fallback: Copy the link to the clipboard
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
 /* :global(body) {
      margin: 0;
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(to bottom, #dbeafe, #f3e8ff, #fde7f7);
      color: #333;
    } */

/* Page Layout */
  .page-container {
    position: relative;
    padding: 2rem;
  }

  .profile-container {
    display: flex;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .profile-card {
    width: 250px;
    height: 250px;
    border: 1px solid #ddd;
    border-radius: 8px;

    flex-direction: column;
    text-align: center;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 10px 20px rgba(137, 43, 226, 0.2);
    background-color: white;
    padding: 20px;
   
    
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

  .invite-button {
    background: #8a2be2;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    margin-bottom: 1rem;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  .invite-button:hover {
    background: #218838;
  }

  .header {
        display: flex;
        justify-content: center; 
        align-items: center;
        margin-bottom: 2rem;
        position: relative; 
    }

    .title {
      text-align: center;
      /* color: #6a0dad; */
      color: black;
      font-size: 2.5rem;
      margin-bottom: 2rem;
    }

    .create-button {
        position: absolute;
        right: 0;
        padding: 0.5rem 1rem;
        font-size: 1rem;
        font-weight: bold;
        color: white;
        background-color: #8a2be2;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.2s ease;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .create-button:hover {
        background-color: #6a1bbd;
        transform: translateY(-2px);
    }

ul {
    list-style: none;
    padding: 0;
  }

  li {
    position: relative;
    margin: 1rem 0;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .hover-button {
    display: none;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: #007bff;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }

  li:hover .hover-button {
    display: inline-block;
  }

  .hover-button:hover {
    background: #0056b3;
  }

  /* View Profile Button */
  .view-profile-button {
    background: #8a2be2;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background 0.3s ease;
  }

  .view-profile-button:hover {
    background: #0056b3;
  }
</style>

<div class = "header">
  <h1 class = "title">People on this Trip</h1>
  <button class="invite-button" on:click={sharePage}>Invite Friends</button>

</div>

<div class="profile-container">
  {#each people as person}
  <li>
    <div class="profile-card" on:click={() => openProfile(person)}>
      <img src={person.photo} alt={person.name} />
      <h3>{person.name}</h3>
      <button class="view-profile-button" on:click={() => openProfile(person)}>View Profile</button>

    </div>
    </li>
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

