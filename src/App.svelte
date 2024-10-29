<script>
    import {RouterBuilder} from "./lib/router.ts";
    import Dashboard from "./views/app/pages/Dashboard.svelte"
    import Settings from "./views/app/pages/Settings.svelte"
    import NotFound from "./views/NotFound.svelte"
    import Home from "./views/landing/pages/Home.svelte"
    import Profile from "./views/landing/pages/Profile.svelte"
    import {BrowserWindowFrontController} from "./lib/navigation.ts"
    import LandingLayout from "./views/landing/LandingLayout.svelte"
    import AppLayout from "./views/app/AppLayout.svelte"

    let Layout = $state(LandingLayout)
    let Content = $state(Home)
    let contentProps = $state({})

    // const router = new RouterBuilder()
    //     .route('/', Home)
    //     .route('/profile/{id}', Profile).name('profile')
    //     .route('/app/dashboard', Dashboard).name('app/dashboard')
    //     .route('/app/settings', Settings).name('app/settings')
    //     .route('*', NotFound)
    //     .build()
    //
    // const newRouter = new Router()
    //     .route('/', viewSetter(Home))
    //     .route('/profile/{id}', (id) => Layout = Profile).name('profile')
    //     .route('/app/dashboard', viewSetter(Dashboard)).name('app/dashboard')
    //     .route('/app/settings', viewSetter(Settings)).name('app/settings')
    //     .route('*', viewSetter(NotFound))
    //
    //
    // const viewSetter = (v) => () => Layout = v
    // const layoutSetter = (l, v) => () => {
    //     Layout = l
    //     contents = v
    // }

    // const viewSetter = (v) => () => View = v
    // function view(v) {
    //     return () => {
    //         View = v
    //     }
    // }

    // const view(v) = () => View = v

    // const router = new Router()
    //     .route('/', () => View = Home)
    //     .route('/profile/{id}', id => View = Profile)
    //     .group('/app/*', (router) => router
    //         .route('/dashboard', () => View = Dashboard)
    //         .route('/settings', () => View = Settings)
    //     )
    //     .route('*', () => View = NotFound)

        // .group(
        //     '/app',
        //     router => {
        //         router
        //             .route('/dashboard', () => View = Dashboard)
        //             .route('/settings', () => View = Settings)
        //     },
        //     route => View = route.target
        // )
        // .route('*', () => View = NotFound)

    // new BrowserWindowFrontController(router).setupDispatcher(route => {
    //     Layout = route.target
    // })

    setTimeout(() => {
        Content = Profile
        contentProps = {userId: 987654}
    }, 4000)

</script>

<a href="#/profile/1" on:click={() => Content = Home}>Home</a>
<a href="#/profile/1" on:click={() => {Content = Profile; contentProps={userId: 43543}}}>Profile</a>
<a href="#/profile/1" on:click={() => {Content = Profile}}>Profile 2</a>

<Layout {Content} {contentProps} />
