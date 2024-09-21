/**
 * @typedef {typeof import('svelte').SvelteComponent} SvelteComponent
 */

class Route {
    constructor(page, layout) {
        this.page = page
        this.layout = layout
    }
}

export default Route
