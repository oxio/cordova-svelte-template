<script>
    import {RouterBuilder} from "./lib/router.ts";
    import Dashboard from "./views/app/pages/Dashboard.svelte"
    import Settings from "./views/app/pages/Settings.svelte"
    import NotFound from "./views/NotFound.svelte"
    import Home from "./views/landing/pages/Home.svelte"
    import Profile from "./views/landing/pages/Profile.svelte"
    import {makeWindowNavigator, Navigator} from "./lib/navigation.js"

    const router = new RouterBuilder()
        .route('/', Home).name('home')
        .route('/profile/{id}', Profile).name('profile')
        .route('/app/dashboard', Dashboard).name('app-dashboard')
        .route('/app/settings', Settings)
        .route('*', NotFound)
        .build()

    let View = $state(router.match('/').target)

    makeWindowNavigator(router, route => {
        View = route.target
    })

    // const nav = new Navigator(router, route => {
    //     View = route.target
    // })
    // window.addEventListener('hashchange', () => {
    //     nav.navigate(getPathFromHash())
    // })

    // const router = newWindowRouter()
    //     .route('/', Home).name('home')
    //     .route('/profile/{id}', Profile).name('profile')
    //     .route('/app/dashboard', Dashboard).name('app-dashboard')
    //     .route('/app/settings', Settings)
    //     .route('*', NotFound)

    // router.registerPathChangeHdler(route => {
    //     View = route.target
    // })

</script>

<View />
