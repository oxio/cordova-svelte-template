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
