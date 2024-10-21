<script>
    export let content;
</script>

<div class="landing-container">
    <header>
        <h1>Landing Layout</h1>
    </header>

    <main>
        {#if content}
            <svelte:component this={content} />
        {/if}
    </main>

    <footer>
        <p>Landing Footer</p>
    </footer>
</div>

<style>
    .landing-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
    header, footer {
        background-color: #f0f0f0;
        padding: 1rem;
    }
    main {
        flex: 1;
        padding: 1rem;
    }
</style>
