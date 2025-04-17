<script>
    import { goto } from "$app/navigation";
    import { Calendar, Megaphone, Activity, Users, User, Settings, LogOut, Plane, Home } from 'lucide-svelte';

    let activeTab = "calendar";
</script>

<style>
.page-layout {
    display: flex;
}

/* NavBar styles */
.NavBar {
    display: flex;
    flex-direction: column;
    align-items: stretch; /* stretch children to full width */
    background-color: #333;
    padding: 20px 10px;
    height: 100vh;
    width: 220px;
    border-right: 2px solid #444;
    position: fixed;
    top: 0;
    left: 0;
}

/* Logo area */
.logo {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 30px;
    cursor: pointer;
    color: white;
    font-size: 1.4rem;
    font-weight: bold;
}

.logo img {
    width: 30px;
    height: 30px;
    object-fit: contain;
}

/* Tabs styling */
.tab {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 15px 20px;
    cursor: pointer;
    color: white;
    font-weight: bold;
    text-align: left;
    transition: background-color 0.3s ease;
    width: 100%;
    box-sizing: border-box;
}

.tab:hover {
    background-color: #555;
}

.tab.active {
    background-color: #6a00f4;
    border-radius: 5px;
}

/* Specific active tab colors */
.tab.active.calendar {
    background-color: #0047ff;
}
.tab.active.announcements {
    background-color: #5a32ff;
}
.tab.active.activities {
    background-color: #9020d5;
}
.tab.active.people {
    background-color: #b0008b;
}
.tab.active.profile {
    background-color: #0077cc;
}
.tab.active.settings {
    background-color: #5555aa;
}

/* Main content styling */
.main-content {
    margin-left: 220px;
    padding: 30px;
    width: calc(100% - 220px);
}

/* Bottom navigation styling */
.bottom-tabs {
    margin-top: auto;
}

/* Styling for the logout button */
.logout-btn {
    color: white;
    font-weight: bold;
    cursor: pointer;
    padding: 10px 20px;
    width: 100%;
    text-align: left;
    display: flex;
    align-items: center;
    gap: 8px;
    box-sizing: border-box;
}

.logout-btn:hover {
    background-color: #e74c3c;
}
</style>

<div class="page-layout">
    <div class="NavBar">
        <!-- Logo and title -->
        <div class="logo" on:click={() => goto('/')}>
            GRAVEL
            <Plane size="24" style="margin-right: 8px;" />
        </div>

        <!-- Main tab -->
        <div class="tab main" class:active={activeTab === 'main'} on:click={() => { activeTab = 'main'; goto('main'); }}>
            <Home size="18" style="margin-right: 8px;" />
            Main
        </div>

        <!-- Navigation tabs -->
        <div class="tab calendar" class:active={activeTab === 'calendar'} on:click={() => { activeTab = 'calendar'; goto('calendar'); }}>
            <Calendar size="18" style="margin-right: 8px;" />
            Calendar
        </div>
        <div class="tab announcements" class:active={activeTab === 'announcements'} on:click={() => { activeTab = 'announcements'; goto('announcements'); }}>
            <Megaphone size="18" style="margin-right: 8px;" />
            Announcements
        </div>
        <div class="tab activities" class:active={activeTab === 'activities'} on:click={() => { activeTab = 'activities'; goto('activities'); }}>
            <Activity size="18" style="margin-right: 8px;" />
            Activities
        </div>
        <div class="tab people" class:active={activeTab === 'people'} on:click={() => { activeTab = 'people'; goto('people'); }}>
            <Users size="18" style="margin-right: 8px;" />
            People
        </div>

        <!-- Bottom navigation tabs -->
        <div class="bottom-tabs">
            <div class="tab profile" class:active={activeTab === 'profile'} on:click={() => { activeTab = 'profile'; goto('profile'); }}>
                <User size="18" style="margin-right: 8px;" />
                My Profile 
            </div>
            <div class="tab settings" class:active={activeTab === 'settings'} on:click={() => { activeTab = 'settings'; goto('setting'); }}>
                <Settings size="18" style="margin-right: 8px;" />
                Settings
            </div>
            <div class="logout-btn" on:click={() => goto('/')}>
                <LogOut size="18" style="margin-right: 8px;" />
                Logout
            </div>
        </div>
    </div>

    <!-- Page Content Area -->
    <div class="main-content">
        <slot></slot>
    </div>
</div>
