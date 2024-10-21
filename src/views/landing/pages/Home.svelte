<script lang="ts">
import LandingLayout from "../LandingLayout.svelte"
import Counter from "../../../components/Counter.svelte"
</script>

<LandingLayout>
    <div slot="main">
        <h2>Home Page</h2>
        <p>Welcome to the home page!</p>
        <Counter />
    </div>
</LandingLayout>
