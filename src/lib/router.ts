class Route<T> {
    private readonly pathRegex: PathRegex

    constructor(public readonly path: string, public readonly target: T) {
        this.pathRegex = new PathRegex(path)
    }

    matches(path: string): boolean {
        return this.pathRegex.test(path)
    }
}


class RoutesCollection<T> {
    private readonly _anon: Route<T>[] = []
    private readonly _named: { [key: string]: Route<T> } = {}

    public getNamed(name: string): Route<T> {
        const route = this._named[name]
        if (route) {
            return route
        }
        throw new Error(`No route with name "${name}"`)
    }

    public get anon(): Route<T>[] {
        return this._anon
    }

    public get named(): { [key: string]: Route<T> } {
        return this._named
    }
}

class RouterBuilder<T> {
    constructor(
        private readonly routes: RoutesCollection<T> = new RoutesCollection<T>(),
    ) {
    }

    public route(path: string, target: T): RouteBuilderItem<T> {
        return new RouteBuilderItem<T>(this, this.routes).route(path, target)
    }

    public build(): Router<T> {
        return new Router<T>(this.routes)
    }
}

class RouteBuilderItem<T> {
    constructor(
        private readonly builder: RouterBuilder<T>,
        private readonly routes: RoutesCollection<T>,
        public route: Route<T> = undefined,
    ) {
    }

    public route(path: string, target: T): RouteBuilderItem<T> {
        if (this.route) {
            return new RouteBuilderItem<T>(this.builder, this.routes).route(path, target)
        }
        this.route = new Route(path, target);
        this.routes.anon.push(this.route)
        return this
    }

    public name(name: string): RouteBuilderItem<T> {
        if (!this.route) {
            throw new Error('Cannot call `name()` before `route()`')
        }
        this.routes.named[name] = this.route
        return this
    }

    public build(): Router<T> {
        return this.builder.build()
    }
}

class Router<T> {
    constructor(
        private readonly routes: RoutesCollection<T>
    ) {
    }

    public match(path): Route<T>  {
        const route = this.tryMatch(path)
        if (route) {
            return route
        }
        throw new Error(`No route matches path "${path}"`)
    }

    public tryMatch(path: string): Route<T>|null {
        const route = this.routes.anon.find(route => route.matches(path))
        if (route) {
            return route
        }
        return null
    }

    public named(name: string): Route<T> {
        return this.routes.getNamed(name)
    }
}

export {
    Route,
    Router,
    RouterBuilder,
}
