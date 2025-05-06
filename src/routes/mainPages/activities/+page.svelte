<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { CircleArrowUp } from 'lucide-svelte';
    import { tripName } from '$lib/stores/Stores.ts';
    import '../../../styles/main.css';

    let activities = writable([]);
    let currentTrip = '';
    let unsubscribe;

    onMount(() => {
        unsubscribe = tripName.subscribe(name => {
            currentTrip = name;
            loadActivities();
        });

        return () => {
            if (unsubscribe) unsubscribe();
        };
    });

    function getStorageKey() {
        return `activities-${currentTrip}`;
    }
    function saveActivities() {
        activities.subscribe(value => {
            localStorage.setItem(getStorageKey(), JSON.stringify(value));
        });
    }
    function loadActivities() {
        const saved = localStorage.getItem(getStorageKey());
        if (saved) {
            activities.set(JSON.parse(saved));
        } else {
            const defaultActivities = {
            'Santa Monica': [
                { id: 1, title: 'Hiking', description: 'Explore the mountains.', price: '$20', date: '2025-05-09', votes: 1 },
                { id: 2, title: 'Cooking Class', description: 'Learn to cook delicious meals.', price: '$50', date: '2025-05-09', votes: 3 },
                { id: 3, title: 'Beach Volleyball', description: 'Play volleyball on the beach.', price: 'Free', date: '2025-05-10', votes: 0 },
                { id: 4, title: 'Surfing Lessons', description: 'Learn to surf the waves.', price: '$60', date: '2025-05-11', votes: 5 },
                { id: 5, title: 'Bike Rentals', description: 'Rent a bike and explore the Santa Monica Pier.', price: '$15', date: '2025-05-12', votes: 2 }
            ],
            'Vancouver': [
                { id: 1, title: 'City Bike Tour', description: 'Guided cycling tour of downtown.', price: '$25', date: '2025-05-11', votes: 3 },
                { id: 2, title: 'Stanley Park Walk', description: 'Take a scenic walk through Stanley Park.', price: 'Free', date: '2025-05-12', votes: 2 },
                { id: 3, title: 'Granville Island Market', description: 'Explore the local food and crafts market.', price: 'Free', date: '2025-05-13', votes: 3 },
                { id: 4, title: 'Kayaking', description: 'Go kayaking in False Creek.', price: '$40', date: '2025-05-14', votes: 0 },
                { id: 5, title: 'Capilano Suspension Bridge', description: 'Visit the famous suspension bridge.', price: '$55', date: '2025-05-15', votes: 1 }
            ],
            'Tokyo': [
                { id: 1, title: 'Sushi Night', description: 'Enjoy sushi at Tsukiji market.', price: '$45', date: '2025-05-10', votes: 1 },
                { id: 2, title: 'Cherry Blossom Viewing', description: 'Relax under the cherry blossoms in Ueno Park.', price: 'Free', date: '2025-05-11', votes: 2 },
                { id: 3, title: 'Akihabara Tour', description: 'Explore the anime and electronics district.', price: '$30', date: '2025-05-12', votes: 0 },
                { id: 4, title: 'Tea Ceremony', description: 'Experience a traditional Japanese tea ceremony.', price: '$50', date: '2025-05-13', votes: 3 },
                { id: 5, title: 'Tokyo Tower Visit', description: 'Enjoy the view from Tokyo Tower.', price: '$25', date: '2025-05-14', votes: 4 }
            ]
        };

            activities.set(defaultActivities[currentTrip] || []);
            saveActivities();
        }
    }

    let showCreatePopup = false;
    let newActivity = { title: '', description: '', price: '', date: '' };

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
        if (newActivity.title && newActivity.description && newActivity.price >= 0 && newActivity.date) {
            activities.update((list) => [
                ...list,
                { id: Date.now(), ...newActivity, votes: 0 }
            ]);
            newActivity = { title: '', description: '', price: '', date: '' };
            saveActivities();
            showCreatePopup = false;
        }
    };
    
    const groupActivitiesByDate = (activities) => {
        const grouped = {};
        activities.forEach(activity => {
            if (!grouped[activity.date]) {
                grouped[activity.date] = [];
            }
            grouped[activity.date].push(activity);
        });
        return grouped;
    };

    const sortDates = (dates) => {
        return dates.sort((a, b) => new Date(a) - new Date(b));
    };


    const suggestActivity = async () => {
        try {
            const response = await fetch(
                'https://noggin.rea.gent/fierce-cheetah-8297',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer rg_v1_v8x4v0intklea8f9tnhwq3r0rd0lvglgcd3t_ngk',
                    },
                    body: JSON.stringify({
                        location: currentTrip,
                        activities: $activities.map((activity) => activity.title).join(', '),
                    }),
                }
            );
            let suggestedActivity = await response.text();
            suggestedActivity = JSON.parse(suggestedActivity);

            newActivity.title = suggestedActivity.name || '';
            newActivity.description = suggestedActivity.description || '';
            newActivity.price = suggestedActivity.price || 0;
        } catch (error) {
            console.error('Error suggesting activity:', error);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
</script>

<main class="container">
    <div class="activity-header">
        <div></div>
        <h1 class="title">📊 Activity Voting</h1>
        <button class="new-btn" on:click={() => (showCreatePopup = true)}>
            + Create New Activity
        </button>
    </div>

    {#each sortDates(Object.keys(groupActivitiesByDate($activities))) as date}
        <div class="date-section">
            <h2 class="date-heading">{formatDate(date)}</h2>
            <div class="three-col-container">
                {#each groupActivitiesByDate($activities)[date] as activity}
                    <div class="small-content-box">
                        <h3>{activity.title}</h3>
                        <p>{activity.description}</p>
                        <p>Price: {activity.price}</p>
                        <div class="vote-section">
                            <button
                                class="vote-button {activity.votes > 0 ? 'selected' : ''}"
                                on:click={() => toggleVote(activity.id)}
                            >
                                <CircleArrowUp size="32"/>
                            </button>
                            <span class="vote-count">{activity.votes}</span>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {/each}

    {#if showCreatePopup}
        <div class="overlay" on:click={() => (showCreatePopup = false)}></div>
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
            <input
                type="date"
                bind:value={newActivity.date}
                class="date-input"
            />
            <div class="button-group">
                <button class="button" on:click={createActivity}>
                    Create
                </button>
                <button class="button suggest" on:click={suggestActivity}>
                    Suggest Activity
                </button>
                <button class="button cancel" on:click={() => (showCreatePopup = false)}>
                    Cancel
                </button>
            </div>
        </div>
    {/if}
</main>


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

    .new-btn {
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

    /* Your existing vote styles */
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

    /* Add these to match your modal styles */
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        z-index: 5;
    }

    .popup {
        position: fixed;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        background: #ffffff;
        padding: 2rem;
        border-radius: 1rem;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        z-index: 10;
        max-width: 400px;
        width: 90%;
    }

    .popup h2 {
        color: #7e22ce;
        margin-bottom: 1rem;
    }

    .popup input {
        width: 100%;
        margin-bottom: 1rem;
        padding: 0.75rem;
        border: 1px solid #d8b4fe;
        border-radius: 0.75rem;
        background-color: #f9f5ff;
    }

    .popup .button {
        background-color: #8a2be2;
        color: white;
        padding: 0.6rem 1.1rem;
        border: none;
        border-radius: 0.5rem;
        font-weight: bold;
        cursor: pointer;
        margin-right: 0.5rem;
    }

    .popup .button.cancel {
        background-color: red;
    }

    .activity-date {
        color: #555;
        font-size: 0.9rem;
        margin: 0.5rem 0;
    }

    .date-input {
        width: 100%;
        margin-bottom: 1rem;
        padding: 0.75rem;
        border: 1px solid #d8b4fe;
        border-radius: 0.75rem;
        background-color: #f9f5ff;
        font-family: inherit;
    }

    .date-section {
        margin-bottom: 2rem;
        text-align: left; /* Ensure content is left-aligned */
    }

    .date-heading {
        font-size: 1.5rem;
        color: #7e22ce;
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid #d8b4fe;
        text-align: left; /* Left-align the date heading */
    }

    .three-col-container {
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
        justify-content: flex-start; /* Changed from 'center' to 'flex-start' */
    }

    .small-content-box {
        border: 1px solid #ccc;
        padding: 1.5rem;
        width: 280px;
        border-left: 8px solid #8a2be2;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        text-align: left;
    }

    .container {
        padding: 2rem;
        max-width: 1000px;
        margin: 0 auto;
    }

</style>