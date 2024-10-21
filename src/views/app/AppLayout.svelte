<script lang="ts">
    import Navigation from "../shared/Navigation.svelte"

    export let content;
</script>

<slot name="navigation">
    <Navigation />
</slot>

<div class="app-container">
    <header>
        <slot name="header">
            <h1>App Layout v2</h1>
        </slot>
    </header>

    <aside>
        <slot name="aside">
            <p>App Sidebar</p>
        </slot>
    </aside>

    <section>
        <slot name="content"></slot>
    </section>

    <footer>
        <slot name="footer">
            <p>App Footer</p>
        </slot>
    </footer>
</div>

<style>
    .app-container {
        display: grid;
        grid-template-areas:
      "header header"
      "aside section"
      "footer footer";
        grid-template-columns: 200px 1fr;
        min-height: 100vh;
    }
    header, footer {
        background-color: #e0e0e0;
        padding: 1rem;
        grid-column: span 2;
    }
    header {
        grid-area: header;
    }
    aside {
        grid-area: aside;
        background-color: #f0f0f0;
        padding: 1rem;
    }
    section {
        grid-area: section;
        padding: 1rem;
    }
    footer {
        grid-area: footer;
    }
</style>