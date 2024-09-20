<script>
    import LandingLayout from './pages/landing/LandingLayout.svelte';
    import AppLayout from './pages/app/AppLayout.svelte';
    import Home from './pages/landing/pages/Home.svelte';
    import Profile from './pages/landing/pages/Profile.svelte';
    import Dashboard from './pages/app/pages/Dashboard.svelte';
    import Settings from './pages/app/pages/Settings.svelte';

    // State variables
    let currentLayout = LandingLayout;
    let currentPage = 'home';

    // Mapping of pages to content components
    const pages = {
        home: Home,
        profile: Profile,
        appDashboard: Dashboard,
        appSettings: Settings
    };

    // Mapping of pages to layouts
    const pageLayouts = {
        home: LandingLayout,
        profile: LandingLayout,
        appDashboard: AppLayout,
        appSettings: AppLayout
    };

    $: content = pages[currentPage];

    function navigate(page) {
        currentPage = page;
        currentLayout = pageLayouts[page] || LandingLayout;
    }
</script>

<!-- Navigation -->
<nav>
    <button on:click={() => navigate('home')}>Home</button>
    <button on:click={() => navigate('profile')}>Profile</button>
    <button on:click={() => navigate('appDashboard')}>App Dashboard</button>
    <button on:click={() => navigate('appSettings')}>App Settings</button>
</nav>

<!-- Render the current layout with the current content component -->
<svelte:component this={currentLayout} {content} />

<style>
    nav {
        background-color: #ddd;
        padding: 1rem;
        text-align: center;
    }
    button {
        margin: 0 0.5rem;
        padding: 0.5rem 1rem;
    }
</style>
