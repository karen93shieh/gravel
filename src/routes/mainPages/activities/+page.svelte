<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    let activities = writable([
        { id: 1, title: 'Hiking', description: 'Explore the mountains.', price: '$20', votes: 0 },
        { id: 2, title: 'Cooking Class', description: 'Learn to cook delicious meals.', price: '$50', votes: 0 },
        { id: 3, title: 'Painting Workshop', description: 'Unleash your creativity.', price: '$30', votes: 0 }
    ]);

    let showCreatePopup = false;
    let newActivity = { title: '', description: '', price: '' };

    const toggleVote = (id) => {
        activities.update((list) =>
            list.map((activity) =>
                activity.id === id
                    ? { ...activity, votes: activity.votes === 0 ? 1 : 0 }
                    : activity
            )
        );
    };

    const createActivity = () => {
        if (newActivity.title && newActivity.description && newActivity.price) {
            activities.update((list) => [
                ...list,
                { id: Date.now(), ...newActivity, votes: 0 }
            ]);
            newActivity = { title: '', description: '', price: '' };
            showCreatePopup = false;
        }
    };
</script>

<style>
    .vote-section {
        display: flex;
        align-items: center;
    }

    .vote-button {
        font-size: 1.5rem;
    }

    .vote-button:hover {
        transform: scale(1.2);
    }

    .vote-count {
        margin-left: 0.5rem;
        font-size: 1.2rem;
    }

    h1 {
        text-align: center;
    }

    .activity-container {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        justify-content: center;
    }

    .activity-box {
        border: 1px solid black;
        padding: 1rem;
        width: 300px; 
        background: #d5e8f7;
        border-radius: 6px;
    }

    .button-container {
        display: flex;
        justify-content: center; 
        margin-top: 2rem;
    }

    .button {
        margin-top: 1rem;
        padding: 0.5rem 1rem;
        background-color: purple;
        color: white;
        border-radius: 6px; 
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .popup {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #ffffff;
        padding: 2rem;
        border-radius: 12px; /* Rounded corners */
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Subtle shadow */
        width: 90%;
        max-width: 400px; /* Limit the width */
        z-index: 1000; /* Ensure it appears above other elements */
    }

    .popup h2 {
        margin-top: 0;
        margin-bottom: 1rem;
        font-size: 1.5rem;
        color: #333;
        text-align: center;
    }

    .popup input {
        display: block;
        width: 100%;
        padding: 0.75rem;
        margin-bottom: 1rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        font-size: 1rem;
        background: #f9f9f9;
        outline: none;
        transition: border-color 0.3s ease;
    }

    .popup .button {
        margin-top: 1rem;
        width: 100%;
    }
</style>

<main>
    <h1>Activity Voting Page</h1>

    <div class="activity-container">
        {#each $activities as activity}
            <div class="activity-box">
                <h3>{activity.title}</h3>
                <p>{activity.description}</p>
                <p>Price: {activity.price}</p>
                <div class="vote-section">
                    <button
                        class="vote-button {activity.votes > 0 ? 'selected' : ''}"
                        on:click={() => toggleVote(activity.id)}
                    >
                        ⬆️
                    </button>
                    <span class="vote-count">{activity.votes}</span>
                </div>
            </div>
        {/each}
    </div>

    <div class="button-container">
        <button class="button" on:click={() => (showCreatePopup = true)}>
            Create New Activity
        </button>
    </div>

    {#if showCreatePopup}
        <div class="popup">
            <h2>Create New Activity</h2>
            <input
                type="text"
                placeholder="Title"
                bind:value={newActivity.title}
            />
            <input
                type="text"
                placeholder="Description"
                bind:value={newActivity.description}
            />
            <input
                type="text"
                placeholder="Price"
                bind:value={newActivity.price}
            />
            <button class="button" on:click={createActivity}>
                Create
            </button>
            <button class="button" on:click={() => (showCreatePopup = false)}>
                Cancel
            </button>
        </div>
    {/if}
</main>