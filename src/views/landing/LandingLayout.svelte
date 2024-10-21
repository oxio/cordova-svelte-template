<script lang="ts">
import Navigation from "../shared/Navigation.svelte";
</script>

<slot name="navigation">
    <Navigation />
</slot>

<div class="landing-container">
    <header>
        <slot name="header">
            <h1>Landing Layout v2</h1>
        </slot>
    </header>

    <main>
        <slot name="main">
            <p>Landing Main</p>
        </slot>
    </main>

    <footer>
        <slot name="footer">
            <p>Landing Footer</p>
        </slot>
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
