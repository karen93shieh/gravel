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
    }

    .popup {
        background: white;
        padding: 2rem;
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