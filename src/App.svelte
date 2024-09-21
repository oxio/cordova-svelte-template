<script>
    import LandingLayout from './pages/landing/LandingLayout.svelte';
    import AppLayout from './pages/app/AppLayout.svelte';
    import Home from './pages/landing/pages/Home.svelte';
    import Profile from './pages/landing/pages/Profile.svelte';
    import Dashboard from './pages/app/pages/Dashboard.svelte';
    import Route from "./lib/navigation.js";
    import Settings from "./pages/app/pages/Settings.svelte"

    const router = {
        home: new Route(Home, LandingLayout),
        profile: new Route(Profile, LandingLayout),
        appDashboard: new Route(Dashboard, AppLayout),
        appSettings: new Route(Settings, AppLayout)
    }

    let currentPage = $state('home');
    const content = $derived(router[currentPage].page);
    let Layout = $derived(router[currentPage].layout);

    function navigate(page) {
        currentPage = page;
    }
</script>

<!-- Navigation -->
<nav>
    <button onclick={() => navigate('home')}>Home</button>
    <button onclick={() => navigate('profile')}>Profile</button>
    <button onclick={() => navigate('appDashboard')}>App Dashboard</button>
    <button onclick={() => navigate('appSettings')}>App Settings</button>
</nav>

<!-- Render the current layout with the current content component -->
<Layout {content} />

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
