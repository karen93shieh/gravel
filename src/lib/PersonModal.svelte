<script>
  export let person;            // full person object
  export let close;             // () => void
</script>

{#if person}
  <div class="overlay" on:click={close}>
    <div class="modal" on:click|stopPropagation>
      <button class="close" on:click={close}>✕</button>

      <header>
        <img src={person.photo} alt={`Photo of ${person.name}`} />
        <h2>{person.name}</h2>
        <p class="subtitle">{person.age} years old</p>
      </header>

      <section>
        <h3>Basics</h3>
        <ul>
          <li><strong>Email:</strong> {person.email}</li>
          <li><strong>Hotel:</strong> {person.hotel}</li>
          <li><strong>Arrival:</strong> {person.arrivalDate}</li>
        </ul>

        <h3>Flight</h3>
        <ul>
          <li><strong>Airline:</strong> {person.flightInfo.airline}</li>
          <li><strong>#:</strong> {person.flightInfo.flightNumber}</li>
          <li><strong>Time:</strong> {person.flightInfo.arrivalTime}</li>
          <li><strong>From:</strong> {person.flightInfo.departureAirport}</li>
        </ul>

        {#if person.dietaryRestrictions.length}
          <h3>Dietary Restrictions</h3>
          <p>{person.dietaryRestrictions.join(', ')}</p>
        {/if}

        {#if person.parents.length}
          <h3>Parents</h3>
          <p>{person.parents.join(', ')}</p>
        {/if}

        {#if person.siblings.length}
          <h3>Siblings</h3>
          <p>{person.siblings.join(', ')}</p>
        {/if}

        <h3>About Me</h3>
        <p>{person.aboutMe}</p>
      </section>
    </div>
  </div>
{/if}

<style>
  .overlay{
    position:fixed;
    inset:0;
    background:rgba(0,0,0,.55);
    display:grid;
    place-items:center;
    z-index:1000}

  .modal{width:min(90vw,480px);
  max-height:85vh;
  overflow:auto;
  background:#fff;
  padding:24px;
  border-radius:12px;
  box-shadow:0 10px 40px rgba(0,0,0,.25);
  position:relative}

  .close{position:absolute;
  top:8px;
  right:12px;
  font-size:24px;
  background:none;
  border:none;
  cursor:pointer}

  header{text-align:center}

  header img{width:120px;
  height:120px;
  border-radius:50%;
  object-fit:cover;
  margin-bottom:12px}

  .subtitle{color:#666;
  margin-top:-6px}

  h3{margin:16px 0 4px}

  ul{margin:0 0 8px 0;
  padding:0;
  list-style:none}

  li{margin-bottom:4px}
  
</style>
