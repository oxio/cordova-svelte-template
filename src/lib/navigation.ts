import {Route, Router} from "./router";

type PathProvider = () => string
type PathChangeHandler = (path: string) => void
type Handler<T> = (route: Route<T>) => void

class Navigator<T> {

    constructor(
        private readonly router: Router<T>,
        private readonly handler: Handler<T>
    ) {
    }

    public navigate(path: string) {
        this.handler(this.router.match(path))
    }
}

class FrontController<T> {

    constructor(
        private readonly navigator: Navigator<T>,
        private readonly dispatcher: () => void,
    ) {
    }

    public dispatch(route: Route<T>) {

    }
}

function makeWindowNavigator<T>(router: Router<T>, handler: Handler<T>): Navigator<T> {
    const navigator = new Navigator(router, handler)
    window.addEventListener('hashchange', () => navigator.navigate(router.getCurrentPath()))
    return navigator
}



// public registerPathChangeHandler(cb): Router<T> {
//     this.unregisterListeners()
//     this.pathChangeHandler = () => {
//         cb(this.match(this.getCurrentPath()))
//     }
//     this.hashChangeEventTarget.addEventListener('hashchange', this.pathChangeHandler)
//     return this
// }
//
// private unregisterListeners() {
//     if (!this.pathChangeHandler) {
//         return
//     }
//     this.hashChangeEventTarget.removeEventListener('hashchange', this.pathChangeHandler)
// }

// const fragmentExtractor: HashFragmentExtractor = new HashFragmentExtractor()
//
// const getPathFromWindowHash: PathProvider = () => fragmentExtractor.extract(window.location.hash)
//
// function newWindowRouter() {
//     return new Router(window, getPathFromWindowHash)
// }

export {
    Navigator,
    makeWindowNavigator,
}
