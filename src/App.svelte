<script>
    import {windowRouter} from "./lib/navigation.ts";
    import Dashboard from "./views/app/pages/Dashboard.svelte"
    import Settings from "./views/app/pages/Settings.svelte"
    import NotFound from "./views/NotFound.svelte"
    import Home from "./views/landing/pages/Home.svelte"
    import Profile from "./views/landing/pages/Profile.svelte"

    const router = windowRouter()
        .name('home')
        .route('/', Home)

        .name('profile')
        .route('/profile/{id}', Profile)

        .name('app-dashboard')
        .route('/app/dashboard', Dashboard)

        .name('app-settings')
        .route('/app/settings', Settings)

        .route('*', NotFound)

    let currentPage = $state(router.current().target)
    const View = $derived(currentPage)

    router.registerPathChangeHandler(route => {
        currentPage = route.target
    })

</script>

<View />
