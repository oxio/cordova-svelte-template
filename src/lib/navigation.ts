class Route<T> {
    private readonly pathRegex: PathRegex

    constructor(public readonly path: string, public readonly target: T) {
        this.pathRegex = new PathRegex(path)
    }

    matches(path: string): boolean {
        return this.pathRegex.test(path)
    }
}

class PathRegex {
    private _regex: RegExp

    constructor(private readonly path: string) {}

    public test(path: string): boolean {
        return this.regex.test(path)
    }

    private get regex() {
        if (!this._regex) {
            // escape special characters
            let path = this.path.replace(/[.+?^$()|[\]\\]/g, '\\$&')
            // replace any asterisk with regular expression matching all characters .*
            path = path.replace(/[*]/g, '.*')
            // replace any variables within mustaches
            path = path.replace(/{\s*[^}]+\s*}/g, '.*')
            this._regex = new RegExp(`^${path}$`);
        }
        return this._regex
    }
}

type PathProvider = () => string

class HashFragmentExtractor {
    public extract(hash: string): string {
        const hashIdx = hash.indexOf('#')
        if (hashIdx === -1) {
            return '/'
        }
        let fragment = hash.substring(hashIdx + 1)
        fragment = this.clearSlashes(fragment)
        if ('' === fragment) {
            return '/'
        }
        return fragment
    }

    private clearSlashes(fragment: string): string {
        fragment = fragment.replace(/\\\/$/, '')
        fragment = fragment.replace(/^\\\//, '')
        return fragment
    }
}

type NameAdder<T> = (name: string, path: string, target: any) => Router<T>

class RouteAdder<T> {
    constructor(
        private router: Router<T>,
        private namedAdder: NameAdder<T>,
        private name: string,
    ) {
    }

    public route(path: string, target: T): Router<any> {
        this.namedAdder(this.name, path, target)
        return this.router
    }
}

class Router<T> {
    private routes: Route<T>[] = []
    private namedRoutes: { [key: string]: Route<T> } = {}
    private _notFound: Route<T> | null
    private pathChangeHandler: () => void = null

    constructor(
        private readonly eventTarget: EventTarget,
        private readonly getPath: PathProvider,
    ) {
    }

    public current(): Route<T> {
        return this.match(this.getPath())
    }

    public match(path): Route<T>  {
        const route = this.routes.find(route => route.matches(path))
        if (route) {
            return route
        }
        throw new Error(`No route matches path "${path}"`)
    }

    public name(name: string): RouteAdder<T> {
        return new RouteAdder<T>(
            this,
            (name: string, path: string, target: T) => {
                const route = new Route(path, target)
                this.routes.push(route)
                this.namedRoutes[name] = route
                return this
            },
            name
        )
    }

    public notFound(target: T): Router<T> {
        this._notFound = new Route('', target)
        return this
    }

    public route(path: string, target: T): Router<T> {
        this.routes.push(new Route(path, target))
        return this
    }

    public registerPathChangeHandler(cb): Router<T> {
        this.unregisterListeners()
        this.pathChangeHandler = () => {
            cb(this.match(this.getPath()))
        }
        this.eventTarget.addEventListener('hashchange', this.pathChangeHandler)
        return this
    }

    unregisterListeners() {
        if (!this.pathChangeHandler) {
            return
        }
        this.eventTarget.removeEventListener('hashchange', this.pathChangeHandler)
    }
}

const fragmentExtractor: HashFragmentExtractor = new HashFragmentExtractor()

const getPathFromWindowHash: PathProvider = () => fragmentExtractor.extract(window.location.hash)

function windowRouter() {
    return new Router(window, getPathFromWindowHash)
}

export { Route, Router, windowRouter, getPathFromWindowHash }
