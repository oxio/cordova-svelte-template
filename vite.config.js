import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
    // root: 'public',
    plugins: [svelte()],
    build: {
        outDir: 'www',
        emptyOutDir: false,
    },
});
