<script>
    export let content;
</script>

<div class="app-container">
    <header>
        <h1>App Layout</h1>
    </header>

    <aside>
        <p>App Sidebar</p>
    </aside>

    <section>
        {#if content}
            <svelte:component this={content} />
        {/if}
    </section>

    <footer>
        <p>App Footer</p>
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