<script>
    import {RouterBuilder} from "./lib/router.ts";
    import Dashboard from "./views/app/pages/Dashboard.svelte"
    import Settings from "./views/app/pages/Settings.svelte"
    import NotFound from "./views/NotFound.svelte"
    import Home from "./views/landing/pages/Home.svelte"
    import Profile from "./views/landing/pages/Profile.svelte"
    import {BrowserWindowFrontController} from "./lib/navigation.ts"

    let View = $state(Home)

    const router = new RouterBuilder()
        .route('/', Home)
        .route('/profile/{id}', Profile).name('profile')
        .route('/app/dashboard', Dashboard).name('app/dashboard')
        .route('/app/settings', Settings).name('app/settings')
        .route('*', NotFound)
        .build()

    new BrowserWindowFrontController(router).setupDispatcher(route => {
        View = route.target
    })

</script>

<View />
