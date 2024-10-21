<script>
    export let content;
</script>

{#if content}
    <svelte:component this={content} />
{/if}
