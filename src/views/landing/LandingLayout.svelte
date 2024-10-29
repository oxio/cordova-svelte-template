<script lang="ts">
import Navigation from "../shared/Navigation.svelte";
export let Header, Content, Footer
export let headerProps, contentProps, footerProps
</script>

<slot name="navigation">
    <Navigation />
</slot>

<div class="landing-container">
    <header>
        {#if Header}
            <svelte:component this={Header} {...headerProps} />
        {:else}
            <h1>Landing Layout v2</h1>
        {/if}
    </header>

    <main>
        {#if Content}
            <svelte:component this={Content} {...contentProps} />
        {:else}
            <p>Landing Mainnn</p>
        {/if}
    </main>

    <footer>
        {#if Footer}
            <svelte:component this={Footer} {...footerProps} />
        {:else}
            <p>Landing Footer</p>
        {/if}
    </footer>
</div>

<style>
    .landing-container {
        display: flex;
        flex-direction: column;
        min-height: 80vh;
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
