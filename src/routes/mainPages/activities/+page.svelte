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
    main {
        padding: 2rem;
        margin: 0 auto;
    }

    .header {
        display: flex;
        justify-content: center; 
        align-items: center;
        margin-bottom: 2rem;
        position: relative; 
    }

    .title {
        font-size: 2rem;
        font-weight: bold;
        color: #333;
        text-align: center;
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

    .activity-container {
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
        justify-content: center;
    }

    .activity-box {
        border: 1px solid #ccc;
        padding: 1.5rem;
        width: 280px;
        border-left: 8px solid #8a2be2;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .activity-box:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }

    .activity-box h3 {
        margin: 0 0 0.5rem 0;
        font-size: 1.25rem;
        color: #1976d2;
        text-align: center;
    }

    .activity-box p {
        margin: 0.5rem 0;
        font-size: 1rem;
        color: #555;
        text-align: center;
    }

    .vote-section {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 1rem;
    }

    .vote-button {
        background: #8a2be2;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.2s ease;
    }

    .vote-button:hover {
        background: #6a1bbd;
        transform: scale(1.1);
    }

    .vote-button.selected {
        background: #1976d2;
    }

    .vote-count {
        margin-left: 0.5rem;
        font-size: 1.2rem;
        font-weight: bold;
        color: #1976d2;
    }

    .popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        width: 90%;
        max-width: 400px;
        z-index: 1000;
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

    .popup input:focus {
        border-color: #8a2be2;
    }

    .popup .button {
        display: block;
        width: 100%;
        padding: 0.75rem;
        font-size: 1rem;
        font-weight: bold;
        color: white;
        background-color: #8a2be2;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.2s ease;
    }

    .popup .button:hover {
        background-color: #6a1bbd;
        transform: translateY(-2px);
    }

    .popup .button.cancel {
        background-color: #ccc;
        color: #333;
        margin-top: 0.5rem;
    }

    .popup .button.cancel:hover {
        background-color: #bbb;
    }

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
    }
</style>

<main>
    <div class="header">
        <h1 class="title">Activity Voting Page</h1>
        <button class="create-button" on:click={() => (showCreatePopup = true)}>
            + Create New Activity
        </button>
    </div>

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

    {#if showCreatePopup}
        <div class="overlay"></div>
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
            <button class="button cancel" on:click={() => (showCreatePopup = false)}>
                Cancel
            </button>
        </div>
    {/if}
</main>