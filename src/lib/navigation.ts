import {Route, Router} from "./router";
import {HashFragmentExtractor} from "./uri"

type PathProvider = () => string
type DispatchHandler<T> = (route: Route<T>) => void

const hashFragmentExtractor: HashFragmentExtractor = new HashFragmentExtractor()

const getPathFromWindowHash: PathProvider = () => hashFragmentExtractor.extract(window.location.hash)

abstract class FrontController<T> {
    protected constructor(protected readonly router: Router<T>) {
    }

    abstract setupDispatcher(handler: DispatchHandler<T>)
}

class BrowserWindowFrontController<T> extends FrontController<T> {
    constructor(router: Router<T>) {
        super(router)
    }

    setupDispatcher(handler: DispatchHandler<T>) {
        window.addEventListener('hashchange', () => handler(this.router.match(getPathFromWindowHash())))
    }
}

export type {
    PathProvider,
    DispatchHandler,
}

export {
    FrontController,
    BrowserWindowFrontController,
}
