<script lang="ts">
  import { onMount } from 'svelte';

  let count: number = 0;

  onMount(() => {
    const interval = setInterval(() => count++, 1000);
    return () => {
      clearInterval(interval);
    };
  });
</script>

<main class="flex flex-col justify-center w-screen h-screen text-center">
  <h1 class="text-4xl">gotoAndPlay app</h1>
  <p>{count}</p>
</main>

<style lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  :global(*) {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
</style>
